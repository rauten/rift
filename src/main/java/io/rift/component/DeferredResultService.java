package io.rift.component;

import io.rift.config.Hook;
import io.rift.config.PollingConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.*;
import java.util.concurrent.*;

@Service("DeferredService")
public class DeferredResultService {

    private ConcurrentHashMap<String, Hook> hooks = new ConcurrentHashMap<>();

    private volatile ConcurrentHashMap<String, Boolean> start = new ConcurrentHashMap<>();

    private ConcurrentHashMap<String, SmartThread> threads = new ConcurrentHashMap<>();

    private Set<SmartThread> smartThreads = new LinkedHashSet<>();

    private ConcurrentHashMap<SmartThread, Boolean> interruptLine = new ConcurrentHashMap<>();

    private final ConcurrentHashMap<String, BlockingQueue<DeferredResult<String>>> resultQueueMap = new ConcurrentHashMap<>();

    @Autowired
    private ShutdownService shutdownService;

    @Autowired
    private PollingConfig pollingConfig;

    public void subscribe(Integer id, String sessionId) {
        if (!start.containsKey(sessionId)) {
            System.out.println("Putting sessionId in map");
            start.put(sessionId, true);
        }
        System.out.println("Starting server");
        System.out.println("Subscribe: " + this.pollingConfig);
        BlockingQueue<DeferredResult<String>> blockingQueue = new LinkedBlockingQueue<>();
        resultQueueMap.put(sessionId, blockingQueue);
        LinkedBlockingQueue<Map<String, String>> theQueueBlockingQueue = new LinkedBlockingQueue<>();
        pollingConfig.theQueues().put(id + sessionId, theQueueBlockingQueue);
        startThread(sessionId, id);
    }

    private void startThread(String sessionId, Integer id) {
        if (start.containsKey(sessionId) && start.get(sessionId)) {
            synchronized (this) {
                if (start.get(sessionId)) {
                    start.put(sessionId, false);
                    SmartThread smartThread;
                    ExecutorService executorService;
                    if (!threads.containsKey(sessionId)) {
                        smartThread = getAvailableSmartThread(sessionId, id.toString());
                        executorService = smartThread.executorService;
                    } else {
                        System.out.println("For some reason this didn't happen");
                        smartThread = threads.get(sessionId);
                        executorService = smartThread.executorService;
                    }
                    Hook hook;
                    if (!hooks.containsKey(sessionId)) {
                        hook = shutdownService.createHook();
                        hooks.put(sessionId, hook);
                        smartThread.longPollInfoMap.get(sessionId).hook = hook;
                    } else {
                        System.out.println("Also probably not good");
                        hook = hooks.get(sessionId);
                        smartThread.longPollInfoMap.get(sessionId).hook = hook;
                    }
                    if (smartThread.newSmartThread) {
                        System.out.println("Starting up the thread");
                        smartThread.newSmartThread = false;
                        executorService.submit(new LongPoll(smartThread));
                    }
                }
            }
        }
    }

    private SmartThread getAvailableSmartThread(String sessionId, String id) {
        Iterator smartThreadIterator = smartThreads.iterator();
        SmartThread currSmartThread;
        while(smartThreadIterator.hasNext()) {
            //currSmartThread = (SmartThread)smartThreadIterator.next();
            synchronized (currSmartThread = (SmartThread)smartThreadIterator.next()) {
                if (currSmartThread.slotsRemaining > 0) {
                    currSmartThread.slotsRemaining--;
                    currSmartThread.createLongPollInfo(sessionId, id);
                    threads.put(sessionId, currSmartThread);
                    return currSmartThread;
                }
            }
        }
        System.out.println("Creating new thread");
        SmartThread smartThread = new SmartThread(Executors.newSingleThreadExecutor(), new ConcurrentHashMap<>());
        smartThread.slotsRemaining--;
        smartThread.createLongPollInfo(sessionId, id);
        smartThreads.add(smartThread);
        threads.put(sessionId, smartThread);
        interruptLine.put(smartThread, false);
        return smartThread;
    }

    private void returnSmartThread(String sessionId) {
        SmartThread smartThread = threads.get(sessionId);
        synchronized (threads.get(sessionId)) {
            smartThread.slotsRemaining++;
            if (smartThread.slotsRemaining == 2) {
                if (smartThreads.contains(smartThread)) {
                    smartThreads.remove(smartThread);
                }
                System.out.println("Setting the interrupt line to true");
                interruptLine.put(smartThread, true);
                interruptLine.remove(smartThread);
            } else {
                System.out.println("Just removing the sessionId from the longpollmap");
                smartThread.longPollInfoMap.remove(sessionId);
            }
        }
    }

    private class LongPoll implements Runnable {

        LongPoll(SmartThread smartThread) {
            this.smartThread = smartThread;
            this.longPollInfoMap = smartThread.longPollInfoMap;
        }
        Map<String, SmartThread.LongPollInfo> longPollInfoMap;
        SmartThread smartThread;
        /*
        String sessionId;
        String id;
        Hook hook;
        */
        @Override
        public void run() {
            //System.out.println("First time sessionId is: " + sessionId);
            while (!interruptLine.get(smartThread)) {
                System.out.println("Long poll info map: " + longPollInfoMap.keySet());
                Object[] sessionIds = longPollInfoMap.keySet().toArray();
                for (Object sessionIdObj : sessionIds) {
                    System.out.println("Current sessionId: " + sessionIdObj.toString());
                    String sessionId = sessionIdObj.toString();
                    Hook hook = longPollInfoMap.get(sessionId).hook;
                    String id = longPollInfoMap.get(sessionId).id;
                    if (hook.keepRunning()) {
                        try {
                            BlockingQueue<DeferredResult<String>> resultQueue = resultQueueMap.get(sessionId);
                            DeferredResult<String> result = resultQueue.take();
                            Map<String, String> notification = pollingConfig.theQueues().get(id + sessionId).peek();
                            Iterator<Map<String, String>> iterator = pollingConfig.theQueues().get(id + sessionId).iterator();
                            if (notification != null) {
                                if (iterator.hasNext()) {
                                    while (!notification.containsKey(id + sessionId) && iterator.hasNext()) {
                                        notification = iterator.next();
                                    }
                                }
                                if (notification.containsKey(id + sessionId)) {
                                    pollingConfig.theQueues().get(id + sessionId).remove(notification);
                                    String resultNotification = notification.get(id + sessionId);
                                    while (result.getResult() != null) {
                                        result = resultQueue.take();
                                    }
                                    //System.out.println("Setting result: " + resultNotification + " for sessionId: " + sessionId);
                                    result.setResult(resultNotification);
                                } else {
                                    System.out.println("This is the notification: " + notification);
                                    System.out.println("This is your key: " + id + sessionId);
                                    System.out.println("Not yours!");
                                }
                            }
                            System.out.println("At the bottom: " + System.currentTimeMillis());
                            //hook.shutdown();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
            System.out.println("DeferredResultService - Thread ending");
        }
    }

    void getUpdate(DeferredResult<String> result, String sessionId) {
        BlockingQueue<DeferredResult<String>> resultQueue = resultQueueMap.get(sessionId);
        resultQueue.add(result);
        //System.out.println("Size of queue at API call: " + pollingConfig.theQueues().get(sessionId).size());
    }

    void shutdown(String sessionId, String id) {
        try {
            Hook hook = hooks.get(sessionId);
            hook.setKeepRunning(false);
            hooks.remove(sessionId);

            //Thread thread = threads.get(sessionId);
            System.out.println("Returning smart thread");
            returnSmartThread(sessionId);
            //thread.interrupt();
            System.out.println("Removing everything else");
            threads.remove(sessionId);

            start.remove(sessionId);

            resultQueueMap.remove(sessionId);

            pollingConfig.theQueues().remove(id + sessionId);

        } catch (NullPointerException e) {
            e.printStackTrace();
        }
    }

    class SmartThread {
        boolean newSmartThread = true;
        ExecutorService executorService;
        int slotsRemaining;
        ConcurrentHashMap<String, LongPollInfo> longPollInfoMap;

        SmartThread(ExecutorService executorService, ConcurrentHashMap<String, LongPollInfo> longPollInfoMap) {
            this.executorService = executorService;
            this.slotsRemaining = 2;
            this.longPollInfoMap = longPollInfoMap;
        }

        class LongPollInfo {
            Hook hook;
            String id;

            LongPollInfo(String id) {
                this.id = id;
            }
        }

        void createLongPollInfo(String sessionId, String id) {
            LongPollInfo longPollInfo = new LongPollInfo(id);
            this.longPollInfoMap.put(sessionId, longPollInfo);
        }

    }

}
