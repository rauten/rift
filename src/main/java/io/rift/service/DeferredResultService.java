package io.rift.service;

import io.rift.component.ShutdownService;
import io.rift.config.Hook;
import io.rift.config.PollingConfig;
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
    private NotificationService notificationService;

    @Autowired
    private ShutdownService shutdownService;

    @Autowired
    private PollingConfig pollingConfig;

    public void subscribe() {
        System.out.println("Starting server");
        System.out.println("Subscribe: " + this.pollingConfig);
        startThread();
        notificationService.isSubscribed = true;
        System.out.println(notificationService.isSubscribed);
        notificationService.setSubscribed(true);
        System.out.println(notificationService.isSubscribed);
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
                DeferredResult<String> result = resultQueue.take();
                String notification = pollingConfig.theQueue().take();

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
        System.out.println("Size of queue:" + pollingConfig.theQueue().size());
    }

}
