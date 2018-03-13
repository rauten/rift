package io.rift.component;

import io.rift.repository.RiftRepository;
import io.rift.service.*;
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
    public List<List<Object>> search(String searchParam) throws SQLException {
        // Set up query arg lists
        Object[] userSearchArgs = new Object[7];
        int levenshteinConstraint = 5 + (int)Math.ceil(3 * Math.log(searchParam.length()));
        for (int i = 0; i < 4; i++) {
            userSearchArgs[i] = searchParam;
        }
        for (int i = 4; i < userSearchArgs.length - 1; i++) {
            userSearchArgs[i] = levenshteinConstraint;
        }
        Object[] rifterGameArgs = new Object[6];
        rifterGameArgs[0] = searchParam;
        rifterGameArgs[1] = searchParam;
        rifterGameArgs[2] = searchParam;
        rifterGameArgs[3] = levenshteinConstraint;
        rifterGameArgs[4] = levenshteinConstraint;
        rifterGameArgs[5] = levenshteinConstraint;

        // Init searchResult list
        List<List<Object>> searchResults = new ArrayList<>();
        List<Object> userSearchResults = new ArrayList<>();
        List<Object> rifterSessionSearchResults = new ArrayList<>();

        // Add Usertable results
        ResultSet resultSet = riftRepository.doQuery(searchUsertable, userSearchArgs);
        while (resultSet.next()) {
            userSearchResults.add(usertableService.populateUsertable(resultSet, 1, "levenshtein"));
        }
        searchResults.add(userSearchResults);

        // Add RifterSession results
        resultSet = riftRepository.doQuery(searchRifterSession, rifterGameArgs);
        while (resultSet.next()) {
            rifterSessionSearchResults.add(rifterSessionService.populateRifterSession(resultSet, 1, "levenshteinSearch"));
        }
        searchResults.add(rifterSessionSearchResults);

        // Return search results
        resultSet.close();
        return searchResults;
    }

}
