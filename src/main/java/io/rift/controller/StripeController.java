package io.rift.controller;

import com.stripe.model.Card;
import io.rift.feature.StripeService;
import io.rift.model.BusinessInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/user/{id}/createRifterAccount")
    public String createRifterAccount(@RequestBody BusinessInfo businessInfo, @PathVariable Integer id) {
        return stripeService.createRifterAccount(businessInfo.getCountry(), businessInfo.getCity(), businessInfo.getAddressLine1(),
                businessInfo.getAddressLine2(), businessInfo.getZipCode(), businessInfo.getState(), businessInfo.getDobDay(),
                businessInfo.getDobMonth(), businessInfo.getDobYear(), businessInfo.getFirstName(), businessInfo.getLastName());
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/user/{id}/rifterToken/{token}")
    public boolean setPaymentMethodForRifter(@RequestBody String rifterStripeId, @PathVariable String token, @PathVariable Integer id) {
        return stripeService.setPaymentMethodForRifter(rifterStripeId, token);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/user/{id}/createCustomer")
    public Map<String, String> createRifteeAccount(@PathVariable Integer id) {
        Map<String, String> customerMap = new HashMap<>();
        String customerId = stripeService.createRifteeAccount();
        customerMap.put("customerId", customerId);
        return customerMap;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/user/{id}/rifteeToken/{token}")
    public boolean createRifteePayment(@RequestBody String rifteeStripeId, @PathVariable Integer id, @PathVariable String token) {
        return stripeService.createRifteePayment(rifteeStripeId, token);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/stripe/rifteeStripeId/{id}")
    public List<Card> getRifteeCards(@PathVariable String id) {
        return stripeService.getRifteeCards(id);
    }
}
