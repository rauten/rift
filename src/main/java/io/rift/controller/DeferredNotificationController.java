package io.rift.controller;

import io.rift.model.Notification;
import io.rift.service.DeferredResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;

@Controller
public class DeferredNotificationController {

    @Autowired
    private DeferredResultService resultService;

    @RequestMapping(value = "/matchupdate/begin", method = RequestMethod.GET)
    @ResponseBody
    public String start() {
        resultService.subscribe();
        return "OK";
    }

    @RequestMapping("/matchupdate/deferred")
    @ResponseBody
    public DeferredResult<Notification> getUpdate() {
        final DeferredResult<Notification> result = new DeferredResult<Notification>();
        resultService.getUpdate(result);
        return result;
    }

}
