package io.rift.component;

import io.rift.service.DeferredResultService;
import io.rift.component.PostgresListenService;
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

    @RequestMapping(value = "/matchupdate/begin/{id}/{login}", method = RequestMethod.GET)
    @ResponseBody
    public String start(@PathVariable Integer id, @PathVariable boolean login) {
        resultService.subscribe();
        if (login) {
            postgresListenService.init(id);
        }
        return "OK";
    }

    @RequestMapping(value = "/startdefer", method = RequestMethod.GET)
    @ResponseBody
    public String startOnRefresh() {
        return "Ok!";
    }

    @RequestMapping("/matchupdate/deferred")
    @ResponseBody
    public DeferredResult<String> getUpdate() {
        final DeferredResult<String> result = new DeferredResult<String>();
        resultService.getUpdate(result);
        return result;
    }

}
