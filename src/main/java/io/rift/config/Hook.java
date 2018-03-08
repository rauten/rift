package io.rift.config;

import org.springframework.context.annotation.Bean;

import java.util.concurrent.LinkedBlockingQueue;

public class Hook {

    private boolean keepRunning = true;

    private final Thread thread;

    public Hook(Thread thread) {
        this.thread = thread;
    }

    /**
     * @return True if the daemon thread is to keep running
     */
    public boolean keepRunning() {
        return keepRunning;
    }

    /**
     * Tell the client daemon thread to shutdown and wait for it to close gracefully.
     */
    public void shutdown() {
        keepRunning = false;
        thread.interrupt();
        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
