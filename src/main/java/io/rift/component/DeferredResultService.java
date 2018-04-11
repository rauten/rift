package io.rift.component;

import io.rift.config.Hook;
import io.rift.config.PollingConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import javax.validation.constraints.Null;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.BlockingQueue;

@Service("DeferredService")
public class DeferredResultService {

    private Map<String, Hook> hooks = new HashMap<>();

    private volatile Map<String, Boolean> start = new HashMap<>();

    private Map<String, Thread> threads = new HashMap<>();

    private final Map<String, BlockingQueue<DeferredResult<String>>> resultQueueMap = new HashMap<>();

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
        boolean didCreate = false;
        System.out.println("Start: " + start);
        System.out.println("SessionId: " + sessionId);
        System.out.println("Start contains: " + start.containsKey(sessionId));
        if (start.containsKey(sessionId) && start.get(sessionId)) {
            synchronized (this) {
                if (start.get(sessionId)) {
                    start.put(sessionId, false);
                    Thread thread;
                    if (!threads.containsKey(sessionId)) {
                        thread = new Thread();
                        threads.put(sessionId, thread);
                        didCreate = true;
                    } else {
                        thread = threads.get(sessionId);
                    }
                    Hook hook;
                    if (!hooks.containsKey(sessionId)) {
                        hook = shutdownService.createHook();
                        hooks.put(sessionId, hook);
                    } else {
                        hook = hooks.get(sessionId);
                    }
                    if (didCreate) {
                        System.out.println("This session id: " + sessionId);
                        thread = new Thread(new LongPoll(sessionId, id.toString(), hook));
                        threads.put(sessionId, thread);
                        thread.start();
                    }
                }
            }
        }
    }

    class LongPoll implements Runnable {

        public LongPoll(String sessionId, String id, Hook hook) {
            this.sessionId = sessionId;
            this.hook = hook;
            this.id = id;
        }

        String sessionId;
        String id;
        Hook hook;
        @Override
        public void run() {
            System.out.println("First time sessionId is: " + sessionId);
            while (hook.keepRunning() && !Thread.interrupted()) {
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
                            System.out.println("Result notification: " + resultNotification);
                            //String notification = pollingConfig.theQueue().take();
                            while (result.getResult() != null) {
                                System.out.println("Result in null loop: " + result);
                                result = resultQueue.take();
                            }
                            System.out.println("Setting result: " + resultNotification + " for sessionId: " + sessionId);
                            result.setResult(resultNotification);
                        } else {
                            System.out.println("This is the notification: " + notification);
                            System.out.println("This is your key: " + id + sessionId);
                            System.out.println("Not yours!");
                        }
                    }
                    //hook.shutdown();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("DeferredResultService - Thread ending");
        }
    }

    public void getUpdate(DeferredResult<String> result, String sessionId) {
        BlockingQueue<DeferredResult<String>> resultQueue = resultQueueMap.get(sessionId);
        resultQueue.add(result);
        //System.out.println("Size of queue at API call: " + pollingConfig.theQueues().get(sessionId).size());
    }

    public void shutdown(String sessionId, String id) {
        try {
            Hook hook = hooks.get(sessionId);
            hook.setKeepRunning(false);
            hooks.remove(sessionId);

            Thread thread = threads.get(sessionId);
            thread.interrupt();
            threads.remove(sessionId);

            start.remove(sessionId);

            resultQueueMap.remove(sessionId);

            pollingConfig.theQueues().remove(id + sessionId);

        } catch (NullPointerException e) {
            e.printStackTrace();
        }
    }

}
