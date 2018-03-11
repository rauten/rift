package io.rift.component;

import com.google.common.annotations.VisibleForTesting;
import io.rift.config.Hook;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShutdownService {

    private final List<Hook> hooks;

    public ShutdownService() {
        hooks = new ArrayList<Hook>();
        createShutdownHook();
    }

    @VisibleForTesting
    protected void createShutdownHook() {
        ShutdownDaemonHook shutdownHook = new ShutdownDaemonHook();
        Runtime.getRuntime().addShutdownHook(shutdownHook);
    }

    protected class ShutdownDaemonHook extends Thread {

        @Override
        public void run() {
            for (Hook hook : hooks) {
                hook.shutdown();
            }
        }

    }

    public Hook createHook(Thread thread) {
        thread.setDaemon(true);
        Hook retVal = new Hook(thread);
        hooks.clear();
        hooks.add(retVal);
        return retVal;
    }

}
