package io.rift.controller;

import io.rift.feature.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class StripeWebhookController {

    @Autowired
    private StripeService stripeService;

    @RequestMapping(consumes="application/json",
            produces="application/json",
            method=RequestMethod.POST, value = "/webhook")
    public String handleCustomerCreated(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Got it 5/we");
        stripeService.handleChargeFailed(request, response);
        return null;
    }

}
