package io.rift.component;

import io.rift.config.PollingConfig;
import io.rift.model.Usertable;
import io.rift.service.UsertableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Map<String, String> start(@PathVariable Integer id, @PathVariable boolean login, HttpServletRequest request) {
        HttpSession session = request.getSession();
        System.out.println(session.getId());
        //Long currentTimeMillis = System.currentTimeMillis();
        resultService.subscribe(id, session.getId());
        if (login) {
            postgresListenService.init(id);
        }
        //postgresListenService.init(id);
        Map<String, String> res = new HashMap<>();
        res.put("result", session.getId());
        return res;
    }

    @RequestMapping("/matchupdate/deferred/{sessionId}")
    @ResponseBody
    public DeferredResult<String> getUpdate(@PathVariable String sessionId) {
        final DeferredResult<String> result = new DeferredResult<String>();
        resultService.getUpdate(result, sessionId);
        return result;
    }

}
