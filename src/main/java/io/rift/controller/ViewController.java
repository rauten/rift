package io.rift.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping(
            { "/home", "/user/{rifttag:\\w+}", "/user/{rifttag:\\w+}/update"
                    "/location", "/about", "/tests","/tests/new",
                    "/tests/**","/questions","/answers" })
    public String index() {
        return "forward:/index.html";
    }
}

