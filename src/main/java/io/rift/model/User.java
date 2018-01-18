package io.rift.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    private Integer id;

    private String firstName;
    private String lastName;
    private String riftTag;

    public User(Integer id, String firstName, String lastName, String riftTag) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.riftTag = riftTag;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRiftTag() {
        return riftTag;
    }

    public void setRiftTag(String riftTag) {
        this.riftTag = riftTag;
    }
}
