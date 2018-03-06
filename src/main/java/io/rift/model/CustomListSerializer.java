package io.rift.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class CustomListSerializer extends StdSerializer<List<Notification>> {

    public CustomListSerializer() {
        this(null);
    }

    public CustomListSerializer(Class<List<Notification>> t) {
        super(t);
    }

    @Override
    public void serialize(List<Notification> notifications, JsonGenerator generator, SerializerProvider provider) throws IOException, JsonProcessingException {
        List<Integer> ids = new ArrayList<>();
        List<Integer> notificationTypes = new ArrayList<>();
        List<String> notificationContents = new ArrayList<>();

        for (Notification notification : notifications) {
            ids.add(notification.getId());
            notificationTypes.add(notification.getNotificationType());
            notificationContents.add(notification.getNotificationContent());
        }

        generator.writeObject(ids);
        generator.writeObject(notificationTypes);
        generator.writeObject(notificationContents);
    }

}
