package io.rift.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Email {
    private String to;
    private String subject;
    private String message;
    private Timestamp sessionTime;
    private String riftTag;
    private String ign;

    public Email() {}


}
