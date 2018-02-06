package io.rift.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.rift.model.Views;
import io.rift.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @JsonView(Views.Search.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/search/searchParam={param}")
    public List<Object> search(@PathVariable String param) throws SQLException {
        return searchService.search(param);
    }
}
