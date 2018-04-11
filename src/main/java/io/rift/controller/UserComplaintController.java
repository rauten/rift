package io.rift.controller;

import io.rift.model.UserComplaint;
import io.rift.service.UserComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://go-rift.herokuapp.com")
@RestController
@RequestMapping("/api")
public class UserComplaintController {

    @Autowired
    private UserComplaintService userComplaintService;

    @RequestMapping(value = "/userComplaint/{submitterId}/{riftId}")
    public boolean fileComplaint(@RequestBody String complaint, @RequestBody String type, @PathVariable Integer submitterId, @PathVariable Integer riftId) {
        return userComplaintService.fileComplaint(complaint, submitterId, riftId, type);
    }

    @RequestMapping(value = "/userComplaint/{riftId}/")
    public List<UserComplaint> getUserComplaintsByRiftId(@PathVariable Integer riftId) throws SQLException {
        return userComplaintService.getUserComplaintsByRiftId(riftId);
    }

    @RequestMapping(value = "/userComplaint/{riftId}/numberOfComplaints")
    public Integer getNumberOfComplaintsByUserId(@PathVariable Integer riftId) throws SQLException {
        return userComplaintService.getNumberOfComplaintsByUserId(riftId);
    }



}
