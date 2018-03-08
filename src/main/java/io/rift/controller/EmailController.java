package io.rift.controller;

import io.rift.config.EmailConfig;
import io.rift.model.Email;
import io.rift.model.Usertable;
import io.rift.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @RequestMapping(method = RequestMethod.PUT, value = "/email")
    public boolean sendMail(@RequestBody Email email) {
        emailService.sendEmailConfirmation(email);
        System.out.println("sent email");
        return true;
    }

}
