package io.rift.controller;

import io.rift.service.Auth0Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class Auth0Controller {

    @Autowired
    private Auth0Service auth0Service;

    @RequestMapping(method = RequestMethod.GET, value = "/user/updateAuth0")
    public Boolean updateAuth0(@RequestHeader("Authorization") String accessToken, @RequestHeader("Metadata") Json metadata) {
        return true;
    }


}
