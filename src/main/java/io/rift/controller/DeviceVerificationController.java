package io.rift.controller;

import io.rift.component.DeviceVerificationService;
import io.rift.repository.RiftRepository;
import io.rift.service.UsertableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.view.RedirectView;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Locale;

@CrossOrigin(origins = "localhost:4200")
@RestController
@RequestMapping("/api")
public class DeviceVerificationController {

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private DeviceVerificationService deviceVerificationService;

    @Autowired
    private UsertableService usertableService;

    private final String getVerificationToken = "getVerificationToken";

    @RequestMapping(value = "/deviceVerification", method = RequestMethod.GET)
    public RedirectView confirmRegistration(@RequestParam("token") String token, @RequestParam("userId") String userId, @RequestParam("macaddress") String macAddress) throws SQLException {

        deviceVerificationService.completeVerification(token, userId, macAddress);
        return new RedirectView("http://localhost:4200/home");

    }

}
