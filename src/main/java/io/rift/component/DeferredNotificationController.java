package io.rift.component;

import io.rift.config.PollingConfig;
import io.rift.service.UsertableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;

@Controller
@RequestMapping("/api")
public class DeferredNotificationController {

    @Autowired
    private DeferredResultService resultService;

    @Autowired
    private PostgresListenService postgresListenService;

    @Autowired
    private UsertableService usertableService;

    @Autowired
    private PollingConfig pollingConfig;

    @RequestMapping(value = "/matchupdate/begin/{id}/{login}", method = RequestMethod.GET)
    @ResponseBody
    public String start(@PathVariable Integer id, @PathVariable boolean login) {
        resultService.subscribe();
        //postgresListenService.init(id);
        if (login) {
            postgresListenService.init(id);
        }

        return "OK";
    }


    @RequestMapping("/matchupdate/deferred")
    @ResponseBody
    public DeferredResult<String> getUpdate() {
        System.out.println("Size of queue at start of deferred: " + pollingConfig.theQueue().size());
        final DeferredResult<String> result = new DeferredResult<String>();
        resultService.getUpdate(result);
        return result;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/stop/{id}")
    public void stop(@PathVariable Integer id) {
        System.out.println("Running stop");
        usertableService.logout(id);
        resultService.shutdown();
    }

}
