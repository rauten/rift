package io.rift.controller;

import com.braintreegateway.Request;
import io.rift.service.BraintreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class BraintreeController {

    @Autowired
    private BraintreeService braintreeService;

    @RequestMapping(method = RequestMethod.GET, value = "/braintree/clientToken")
    public String getClientToken() {
        return braintreeService.getClientToken();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/braintree/clientNonce")
    public String getClientNonce(@RequestParam Request request) {
        return braintreeService.getClientNonce(request);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/braintree/transaction/{clientId}/{amount}")
    public String doTransaction(@PathVariable String clientId, @PathVariable String amount) {
        BigDecimal bigDecimalAmount =  new BigDecimal(amount);
        return braintreeService.doTransaction(bigDecimalAmount, clientId);
    }

    /*
    @RequestMapping(method = RequestMethod.GET, value = "/braintree/verifyCard/{customerId}/{paymentMethodNonce}")
    public String verifyCard(@PathVariable String customerId, @PathVariable String paymentMethodNonce) {
        return braintreeService.verifyCard(customerId, paymentMethodNonce);
    }
    */

    @RequestMapping(method = RequestMethod.PUT, value = "/braintree/createCustomer")
    public String createCustomer(@RequestBody Map<String, String> customerInfo) {
        return braintreeService.createCustomer(customerInfo.get("firstName"),
                customerInfo.get("lastName"), customerInfo.get("company"), customerInfo.get("email"));

    }

    @RequestMapping(method = RequestMethod.PUT, value = "/braintree/updateCustomer")
    public String updateCustomer(@RequestBody Map<String, Object> customerInfo) {
        Map<String, Object> paymentMetadata = (Map)customerInfo.get("paymentMetadata");
        return braintreeService.updateCustomer(paymentMetadata, (String)customerInfo.get("customerId"));
    }



}
