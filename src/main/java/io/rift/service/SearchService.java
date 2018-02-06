package io.rift.service;

import io.rift.repository.RiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    @Autowired
    private UsertableService usertableService;

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private SessionRequestService sessionRequestService;

    @Autowired
    private ConnectionService connectionService;

    private final String searchUsertable = "searchUsertable";
    private final String searchRifterSession = "searchRifterSession";

    /**
     *
     * @param searchParam - The string search criteria a user enters into the search bar
     * @return - A list of possible results
     * @throws SQLException
     */
    public List<Object> search(String searchParam) throws SQLException {
        // Set up query arg lists
        Object[] userSearchArgs = new Object[8];
        for (int i = 0; i < userSearchArgs.length; i++) {
            userSearchArgs[i] = searchParam;
        }
        Object[] rifterGameArgs = new Object[2];
        rifterGameArgs[0] = searchParam;
        rifterGameArgs[1] = searchParam;

        // Init searchResult list
        List<Object> searchResults = new ArrayList<>();

        // Add Usertable results
        ResultSet resultSet = riftRepository.doQuery(searchUsertable, userSearchArgs);
        while (resultSet.next()) {
            searchResults.add(usertableService.populateUsertable(resultSet, 1, "levenshtein"));
        }

        // Include a null entry so we can determine where users stop and sessions start
        searchResults.add(null);

        // Add RifterSession results
        resultSet = riftRepository.doQuery(searchRifterSession, rifterGameArgs);
        while (resultSet.next()) {
            searchResults.add(rifterSessionService.populateRifterSession(resultSet, 1, ""));
        }

        // Return search results
        return searchResults;
    }

}
