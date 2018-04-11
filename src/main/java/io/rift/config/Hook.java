package io.rift.config;

import org.springframework.context.annotation.Bean;

import java.util.concurrent.LinkedBlockingQueue;

public class Hook {

    private boolean keepRunning = true;

    //private final Thread thread;

    public Hook() {}

    /**
     * @return True if the daemon thread is to keep running
     */
    public boolean keepRunning() {
        return keepRunning;
    }

    public void setKeepRunning(boolean keepRunning) {
        this.keepRunning = keepRunning;
    }

    /**
     * Tell the client daemon thread to shutdown and wait for it to close gracefully.
     */
    public void shutdown() {
        keepRunning = false;
        /*
        thread.interrupt();
        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        */
    }

}
