package io.rift.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://go-rift.herokuapp.com")
@RestController
public class ViewController {

    /*
    @RequestMapping(
            { "/home", "/user/{rifttag:\\w+}", "/user/{rifttag:\\w+}/update",
                    "/user/{rifttag:\\w+}/rate",
            "/sessions", "/sessions/create", "/youtube", "/twitch",
            "/therift/{searchQuery=\\w+}", "/session/{sessionId:\\w+}", "/session/{sessionId:\\w+}/update",
    "/feed"})
    public String index() {
        return "forward:/index.html";
    }
    */
}

