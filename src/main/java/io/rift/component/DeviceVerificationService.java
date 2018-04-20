package io.rift.component;


import io.rift.model.Usertable;
import io.rift.repository.RiftRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.view.RedirectView;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;


@Service
public class DeviceVerificationService {

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private MailSender mailSender;

    @Autowired
    private RiftRepository riftRepository;

    private final String getVerificationToken = "getVerificationToken";
    private final String putMacAddress = "putMacAddress";
    private final String putVerificationToken = "putVerificationToken";
    private final String deleteVerificationToken = "deleteVerificationToken";
    public void verifyDevice(Usertable usertable, String macAddress) {
        String token = UUID.randomUUID().toString();

        String recipientAddress = usertable.getEmail();
        String subject = "New Device Login";
        String confirmationUrl = "http://localhost:4200/api/deviceVerification.html?token=" + token + "&userId=" + usertable.getId() + "&macaddress=" + macAddress;

        Object[] args = new Object[3];
        args[0] = token;
        args[1] = usertable.getId();
        args[2] = new Timestamp(System.currentTimeMillis() + (1000 * 3600 * 24));

        riftRepository.doInsert(putVerificationToken, args);

        String message = "Unverified email";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom("gordonlimusic@gmail.com");
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message + " rn " + confirmationUrl);
        mailSender.send(email);

    }

    public RedirectView completeVerification(String token, String userId, String macAddress) throws SQLException {

        Object[] args = new Object[2];
        Integer userIdInt = Integer.parseInt(userId);
        args[0] = token;
        args[1] = userIdInt;
        ResultSet resultSet = riftRepository.doQuery(getVerificationToken, args);
        if (resultSet.next()) {
            riftRepository.doDelete(deleteVerificationToken, args);
            Timestamp timestamp = resultSet.getTimestamp(3);
            if (timestamp.before(new Timestamp(System.currentTimeMillis()))) {
                return new RedirectView("localhost:4200/home");
            }
            Object[] args2 = new Object[2];
            args2[0] = userIdInt;
            args2[1] = macAddress;
            riftRepository.doInsert(putMacAddress, args2);
            return new RedirectView("http://google.com");
        }
        return new RedirectView("localhost:4200/home");
    }

}
