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

    /**
     *
     * @return A client token which can be used on the frontend to send transaction requests
     */
    @RequestMapping(method = RequestMethod.GET, value = "/braintree/clientToken")
    public Map<String, String> getClientToken() {
        return braintreeService.getClientToken();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/braintree/clientNonce")
    public String getClientNonce(@RequestParam Request request) {
        return braintreeService.getClientNonce(request);
    }

    /**
     *
     * @param clientId - The id  of the current user (as a string). This should be persisted in memory after login
     * @param amount - The amount of the session (as a string). We can change this to an int, but for now, pass it in as a string (just in the URL)
     *
     * @return - A string denoting whether the transaction was successful
     */
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


    /**
     *
     * @param customerInfo - A requestbody map object that includes:
     *                     firstName - The first name of the user
     *                     lastName - The last name of the user
     * @return - In the case of success, returns the customerId
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/braintree/createCustomer")
    public Map<String, String> createCustomer(@RequestBody Map<String, String> customerInfo) {
        return braintreeService.createCustomer(customerInfo.get("firstName"),
                customerInfo.get("lastName"));

    }

    /**
     *
     * @param customerInfo - A string:object map. There should be two key:value pairs:
     *                     1) Another map (string:object). The map should be formatted as:
     *                     "paymentMetadata":Map(string:object) where the Map value contains the nonce as
     *                     "nonce":paymentNonce"
     *
     *                     2) customerId as a string: "customerId":customerId
     *
     * Sample Value: {"paymentMetadata":{"nonce":"8083-dkadk3910-dk391kd}, "customerId":"rileyid"}
     *
     * @return - A string denoting the success/failure of the update
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/braintree/updateCustomer")
    public String updateCustomer(@RequestBody Map<String, Object> customerInfo) {
        Map<String, Object> paymentMetadata = (Map)customerInfo.get("paymentMetadata");
        return braintreeService.updateCustomer(paymentMetadata, (String)customerInfo.get("customerId"));
    }



}
