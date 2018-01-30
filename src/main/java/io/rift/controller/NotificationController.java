package io.rift.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.Notification;
import io.rift.model.Views;
import io.rift.service.NotificationService;
import org.bouncycastle.cert.ocsp.Req;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/notification/{id}")
    public Notification getNotificationById(@PathVariable Integer id) {
        return notificationService.getNotificationById(id);
    }

    @JsonView(Views.InternalNotificationRG.class)
    @RequestMapping(method = RequestMethod.GET, value = "/notification/{id}/rifterGame")
    public Notification getNotificationAndRifterGameById(@PathVariable Integer id) {
        return notificationService.getNotificationById(id);
    }

}
