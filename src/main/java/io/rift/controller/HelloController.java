package io.rift.controller;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/hello")
public class HelloController {

    @GetMapping
    public String hello() {
        return "Hello World";
    }

    @PostMapping("/post")
    public String helloPost(@RequestBody final String hello) {
        return hello;
    }

    @PutMapping("/put")
    public String helloPut(@RequestBody final String hello) {
        return hello;
    }
}
