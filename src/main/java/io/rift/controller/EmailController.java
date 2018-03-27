package io.rift.controller;

import io.rift.model.Email;
import io.rift.feature.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://go-rift.herokuapp.com")
@RestController
//@RequestMapping("/api")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @RequestMapping(method = RequestMethod.PUT, value = "/api/email")
    public boolean sendMail(@RequestBody Email email) {
        emailService.sendEmailConfirmation(email);
        System.out.println("sent email");
        return true;
    }

}
