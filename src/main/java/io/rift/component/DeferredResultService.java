package io.rift.component;

import io.rift.component.ShutdownService;
import io.rift.config.Hook;
import io.rift.config.PollingConfig;
import io.rift.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.BlockingQueue;

@Service("DeferredService")
public class DeferredResultService implements Runnable {

    private Hook hook;

    private volatile boolean start = true;

    private Thread thread;

    private final BlockingQueue<DeferredResult<String>> resultQueue = new LinkedBlockingQueue<>();

    @Autowired
    private ShutdownService shutdownService;

    @Autowired
    private PollingConfig pollingConfig;

    public void subscribe() {
        System.out.println("Starting server");
        System.out.println("Subscribe: " + this.pollingConfig);
        startThread();
    }

    private void startThread() {
        if (start) {
            synchronized (this) {
                if (start) {
                    start = false;
                    thread = new Thread(this, "Notification");
                    hook = shutdownService.createHook(thread);
                    thread.start();
                }
            }
        }
    }

    @Override
    public void run() {
        while (hook.keepRunning()) {
            try {
                System.out.println("Size of deferred queue: " + resultQueue.size());
                DeferredResult<String> result = resultQueue.take();
                System.out.println("Size of queue before: " + pollingConfig.theQueue().size());
                String notification = pollingConfig.theQueue().take();
                System.out.println("Size of queue after: " + pollingConfig.theQueue().size());
                System.out.println("Size of hook list: " + shutdownService.getHooks());

                System.out.println("Id of notification returning: " + notification);
                System.out.println();
                System.out.println("Result: " + result.getResult());
                while (result.getResult() != null) {
                    result = resultQueue.take();
                }
                result.setResult(notification);
                //hook.shutdown();

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("DeferredResultService - Thread ending");
    }

    public void getUpdate(DeferredResult<String> result) {
        resultQueue.add(result);
        System.out.println("Size of queue at API call: " + pollingConfig.theQueue().size());

    }

}
