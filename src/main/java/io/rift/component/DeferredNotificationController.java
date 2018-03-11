package io.rift.component;

import io.rift.service.DeferredResultService;
import io.rift.service.UsertableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;

import java.sql.ResultSet;
import java.sql.SQLException;

@Controller
@RequestMapping("/api")
public class DeferredNotificationController {

    @Autowired
    private DeferredResultService resultService;

    @Autowired
    private PostgresListenService postgresListenService;

    @Autowired
    private UsertableService usertableService;

    @RequestMapping(value = "/matchupdate/begin/{id}", method = RequestMethod.GET)
    @ResponseBody
    public String start(@PathVariable Integer id) {
        resultService.subscribe();
        usertableService.logout(id);
        ResultSet res = usertableService.getListeningChannels();
        try {
            if (res.next()) {
                Object ob = res.getString(1);
                System.out.println("Res string: " + ob);
            } else {
                System.out.println("Nothing in res");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        postgresListenService.init(id);
        return "OK";
    }

    @RequestMapping(value = "/suckadick", method = RequestMethod.GET)
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
