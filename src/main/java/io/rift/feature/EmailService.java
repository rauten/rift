package io.rift.feature;

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
        message.setSubject(getEmailSubject(email));
        message.setText(email.getMessage());
        mailSender.send(message);
        return true;

    }

    String getEmailSubject(Email email) {
        String subject =
                "Hello you are scheduled to play with " + email.getRiftTag();
        return subject;
    }
}
