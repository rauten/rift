package io.rift.controller;

import io.rift.model.Notification;
import io.rift.model.Usertable;
import io.rift.service.*;
import io.rift.service.notifications.ActivityNotificationService;
import io.rift.service.notifications.BroadcastNotificationService;
import io.rift.service.notifications.UserNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "localhost:4200")
@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private UsertableService usertableService;

    @Autowired
    private BroadcastNotificationService broadcastNotificationService;

    @Autowired
    private UserNotificationService userNotificationService;

    @Autowired
    private ActivityNotificationService activityNotificationService;

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

    @RequestMapping(method = RequestMethod.GET, value = "/notification/{riftTag}/paginatedActivities/{counter}")
    public List<Notification> getPaginatedUserActivities(@PathVariable String riftTag, @PathVariable Integer counter) throws SQLException {
        Usertable usertable = usertableService.getUserByRiftTag(riftTag);
        int id = usertable.getId();
        return activityNotificationService.getPaginatedActivities(id, counter);
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
