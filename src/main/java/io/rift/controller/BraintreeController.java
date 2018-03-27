package io.rift.controller;

import com.braintreegateway.CreditCard;
import com.braintreegateway.Customer;
import com.braintreegateway.Request;
import io.rift.feature.BraintreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "https://fast-depths-16506.herokuapp.com/")
@RestController
@RequestMapping("/api")
public class BraintreeController {

    @Autowired
    private BraintreeService braintreeService;

    /**
     *
     * @return A client token which can be used on the frontend to send transaction requests
     */
    @RequestMapping(method = RequestMethod.GET, value = "/braintree/getclienttoken")
    public Map<String, String> getClientToken() {
        System.out.println("Herro");
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
    @RequestMapping(method = RequestMethod.POST, value = "/braintree/updateCustomer/{customerId}")
    public String updateCustomer(@RequestBody Map<String, String> customerInfo, @PathVariable String customerId) {
        return braintreeService.updateCustomer(customerInfo, customerId);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/braintree/updateCustomerInfo")
    public String updateCustomerInfo(@RequestBody Map<String, String> customerInfo) {
        return braintreeService.updateCustomerInfo(customerInfo, (String)customerInfo.get("customerId"));
    }

    /**
     *
     * @param customerId - The customer id as a string
     * @return - A customer object (includes all the information about the customer you could possibly want)
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/braintree/customer/{customerId}")
    public Customer getCustomer(@PathVariable String customerId) {
        return braintreeService.getCustomerFromId(customerId);
    }

    /**
     *
     * @param customerId - The customer id as a string
     * @return - A list of the customer's credit cards
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/braintree/customercards/{customerId}")
    public List<CreditCard> getCustomerCreditCards(@PathVariable String customerId) {
        return braintreeService.getCustomerCreditCardsFromId(customerId);
    }



}
