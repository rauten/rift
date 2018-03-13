package io.rift.service;

import io.rift.model.UserComplaint;
import io.rift.repository.RiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserComplaintService {

    @Autowired
    private RiftRepository riftRepository;

    private final String fileComplaint = "fileComplaint";
    private final String getUserComplaintsByUserId = "getUserComplaintsByUserId";
    private final String getNumberOfComplaintsByUserId = "getNumberOfComplaintsByUserId";
    private final String getUserComplaintsBySubmitterId = "getUserComplaintsBySubmitterId";


    public UserComplaint populateComplaint(ResultSet resultSet, Integer startPoint, String info) throws SQLException {
        UserComplaint userComplaint = new UserComplaint();
        userComplaint.setRiftId(resultSet.getInt(startPoint));
        userComplaint.setSubmitterId(resultSet.getInt(startPoint + 1));
        userComplaint.setComplaint(resultSet.getString(startPoint + 2));
        userComplaint.setComplaintType(UserComplaint.ComplaintType.fromValue(resultSet.getString(startPoint + 3)));
        return userComplaint;
    }

    public List<UserComplaint> populateComplaints(ResultSet resultSet, Integer startPoint, String info) throws SQLException {
        List<UserComplaint> userComplaints = new ArrayList<>();
        while (resultSet.next()) {
            UserComplaint userComplaint = new UserComplaint();
            userComplaint.setRiftId(resultSet.getInt(startPoint));
            userComplaint.setSubmitterId(resultSet.getInt(startPoint + 1));
            userComplaint.setComplaint(resultSet.getString(startPoint + 2));
            userComplaint.setComplaintType(UserComplaint.ComplaintType.fromValue(resultSet.getString(startPoint + 3)));
            userComplaints.add(userComplaint);
        }
        return userComplaints;
    }

    public boolean fileComplaint(String complaint, Integer submitterId, Integer riftId, String complaintType) {
        Object[] args = new Object[3];
        args[0] = riftId;
        args[1] = submitterId;
        args[2] = complaint;
        args[3] = complaintType;
        return riftRepository.doInsert(fileComplaint, args);
    }

    public List<UserComplaint> getUserComplaintsByRiftId(Integer riftId) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftId;
        ResultSet resultSet = riftRepository.doQuery(getUserComplaintsByUserId, args);
        return populateComplaints(resultSet, 1, "");
    }

    public Integer getNumberOfComplaintsByUserId(Integer riftId) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftId;
        ResultSet resultSet = riftRepository.doQuery(getNumberOfComplaintsByUserId, args);
        return resultSet.getInt(1);
    }

    public List<UserComplaint> getUserComplaintsBySubmitterId(Integer submitterId) throws SQLException {
        Object[] args = new Object[1];
        args[0] = submitterId;
        ResultSet resultSet = riftRepository.doQuery(getUserComplaintsBySubmitterId, args);
        return populateComplaints(resultSet, 1, "");
    }

    /*
    public UserComplaint getUserComplaintByRiftIdAndSubmitterId(Integer riftId, Integer submitterId) throws SQLException {
        Object[] args = new Object[2];
        args[0] = riftId;
        args[1] = submitterId;
        ResultSet resultSet = riftRepository.doQuery(getNumberOfComplaintsByUserId, args);
        return resultSet.getInt(1);
    }*/



}
