package io.rift.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.Notification;
import io.rift.model.Views;
import io.rift.service.*;
import org.bouncycastle.cert.ocsp.Req;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private UsertableService usertableService;

    @Autowired
    private BroadcastNotificationService broadcastNotificationService;

    @Autowired
    private UserNotificationService userNotificationService;

    @RequestMapping(method = RequestMethod.GET, value = "/notification/{riftTag}/notifications")
    public List<Notification> getNotifications(@PathVariable String riftTag) throws SQLException {
        Integer riftId = usertableService.getRiftIdByRiftTag(riftTag);
        return userNotificationService.getNotifications(riftId, "");
    }

    @RequestMapping(method = RequestMethod.GET, value = "/notifications/{riftTag}/clearUnseen")
    public boolean clearUnseen(@PathVariable String riftTag) throws SQLException {
        Integer riftId = usertableService.getRiftIdByRiftTag(riftTag);
        return userNotificationService.clearUnseenNotifications(riftId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/notification/{riftTag}/broadcastNotifications")
    public List<Notification> getBroadcastNotifications(@PathVariable String riftTag) throws SQLException {
        Integer riftId = usertableService.getRiftIdByRiftTag(riftTag);
        return broadcastNotificationService.getNotifications(riftId, "Followers");
    }

    /*
    @RequestMapping(method = RequestMethod.GET, value = "/notifications/{riftTag}/unseenNotifications")
    public Map<String, Integer> getNumberNotificationsUnseen(@PathVariable String riftTag) throws SQLException {
        Map<String, Integer> unseenMap = new HashMap<>();
        Integer riftId = usertableService.getRiftIdByRiftTag(riftTag);
        unseenMap.put("unseen", notificationService.getNumberNotificationsUnseen(riftId));
        return unseenMap;
    }
    */


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
