package io.rift.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.Notification;
import io.rift.model.Views;
import io.rift.service.NotificationService;
import io.rift.service.UsertableService;
import org.bouncycastle.cert.ocsp.Req;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UsertableService usertableService;

    @RequestMapping(method = RequestMethod.GET, value = "/notification/{riftTag}/notifications")
    public List<Notification> getNotifications(@PathVariable String riftTag) throws SQLException {
        Integer riftId = usertableService.getRiftIdByRiftTag(riftTag);
        return usertableService.getUserNotifications(riftId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/notification/{riftTag}/broadcastNotifications")
    public List<Notification> getBroadcastNotifications(@PathVariable String riftTag) throws SQLException {
        Integer riftId = usertableService.getRiftIdByRiftTag(riftTag);
        return usertableService.getBroadcastNotifications(riftId, "Followers");
    }

    /*
    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/notification/{id}")
    public Notification getNotificationById(@PathVariable Integer id) {
        return notificationService.getNotificationById(id);
    }

    @JsonView(Views.InternalNotificationRG.class)
    @RequestMapping(method = RequestMethod.GET, value = "/notification/{id}/rifterSession")
    public Notification getNotificationAndRifterGameById(@PathVariable Integer id) {
        return notificationService.getNotificationById(id);
    }
    */

}
