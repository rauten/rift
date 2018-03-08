package io.rift.service;

import io.rift.config.EmailConfig;
import io.rift.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private MailSender mailSender;

    @Autowired
    private EmailConfig emailConfig;

    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    public boolean sendEmailConfirmation(Email email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("gordonlimusic@gmail.com");
        message.setTo(email.getTo());
        message.setSubject(email.getSubject());
        message.setText(email.getMessage());
        mailSender.send(message);
        return true;

    }
}
