package io.rift.controller;


import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.RifterGame;
import io.rift.model.Views;
import io.rift.service.RifterGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RifterGameController {

    @Autowired
    private RifterGameService rifterGameService;

    @JsonView(Views.Public.class)
    @RequestMapping(method = RequestMethod.GET, value = "/rifterGame/{id}")
    public RifterGame getRifterGameById(@PathVariable Integer id) {
        return rifterGameService.getRifterGameById(id);
    }

    @JsonView(Views.InternalRifterGameNotification.class)
    @RequestMapping(method = RequestMethod.GET, value = "/rifterGame/{id}/notification")
    public RifterGame getRifterGameAndNotificationsById(@PathVariable Integer id) {
        return rifterGameService.getRifterGameById(id);
    }

}
