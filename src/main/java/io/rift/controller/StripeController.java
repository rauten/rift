package io.rift.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.stripe.model.Card;
import com.stripe.net.StripeResponse;
import io.rift.feature.StripeService;
import io.rift.model.BusinessInfo;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://go-rift.herokuapp.com")
@RestController
@RequestMapping("/api")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/user/{id}/getMerchantAccountToken")
    public Map<String, String> createRifterAccount(@RequestBody BusinessInfo businessInfo, @PathVariable Integer id) {
        Map<String, String> accountIdMap = new HashMap<>();
        String accountId = stripeService.createRifterAccount(businessInfo.getCountry(), businessInfo.getCity(), businessInfo.getAddressLine1(),
                businessInfo.getAddressLine2(), businessInfo.getZipCode(), businessInfo.getState(), businessInfo.getDobDay(),
                businessInfo.getDobMonth(), businessInfo.getDobYear(), businessInfo.getFirstName(), businessInfo.getLastName(), id, businessInfo.getType());

        accountIdMap.put("accountId", accountId);
        return accountIdMap;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/user/{id}/storeMerchantBankAccount")
    public boolean setBankAccountForMerchant(@RequestBody Map<String, String> tokens, @PathVariable Integer id) {
        return stripeService.setPaymentMethodForRifter(tokens.get("accountId"), tokens.get("bankAccountToken"));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/user/{riftTag}/createCustomer")
    public Map<String, String> createRifteeAccount(@PathVariable String riftTag) {
        Map<String, String> customerMap = new HashMap<>();
        String customerId = stripeService.createRifteeAccount(riftTag);
        customerMap.put("customerId", customerId);
        return customerMap;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/storeCustomerCard/setDefault={setDefault}")
    public boolean createRifteePayment(@RequestBody Map<String, String> params, @PathVariable boolean setDefault) {
        return stripeService.createRifteePayment(params.get("customerId"), params.get("token"), setDefault);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/stripe/getCustomerCards/{customerId}")
    public List<Card> getRifteeCards(@PathVariable String customerId) {
        return stripeService.getRifteeCards(customerId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/stripe/getDefaultCard/{customerId}")
    public Card getDefaultCard(@PathVariable String customerId) {
        Card card = stripeService.getDefaultCard(customerId);
        card.setLastResponse(null);
        return card;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/setDefaultCard/{cardId}/cardOwner/{customerId}")
    public boolean setDefaultCard(@PathVariable String cardId, @PathVariable String customerId) {
        return stripeService.setDefaultCard(cardId, customerId);
    }


    /*
    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/createCharge/currency/{currency}/chargeAmount/{amount}")
    public boolean createCharge(@PathVariable String currency, @PathVariable Double amount, @RequestBody Map<String, String> ids) {
        return stripeService.createCharge(amount, "stuff", 0.0, 79, 78, 98);
    }
    */

    @RequestMapping(method = RequestMethod.DELETE, value = "/stripe/deleteCard/{cardId}/customer/{customerId}")
    public boolean deleteCard(@PathVariable String customerId, @PathVariable String cardId) {
        return stripeService.deleteCard(customerId, cardId);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/stripe/cancelFuturePayment/session/{sessionId}/customer/{rifteeId}/{nullifyIds}")
    public boolean cancelFuturePayment(@PathVariable Integer sessionId, @PathVariable Integer rifteeId, @PathVariable boolean nullifyIds) {
        return stripeService.cancelFuturePayment(sessionId, rifteeId, nullifyIds);
    }


    /********************************************* WEBHOOK SECTION ****************************************************/
    /*******************************************************************************************************************/

    @RequestMapping(consumes="application/json",
            produces="application/json",
            method=RequestMethod.POST, value = "/stripe/webhook/customerCreated")
    public String handleCustomerCreated(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Got it 1");
        stripeService.handleChargeFailed(request, response);
        return null;
    }



    @RequestMapping(consumes="application/json",
            produces="application/json",
            method=RequestMethod.POST, value = "/api/stripe/webhook/customerCreated")
    public String handleCustomerCreated2(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Got it 2");
        stripeService.handleChargeFailed(request, response);
        return null;

    }

    @RequestMapping(consumes="application/json",
            produces="application/json",
            method=RequestMethod.POST, value = "http://localhost:4200/api/stripe/webhook/customerCreated")
    public String handleCustomerCreated3(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("Got it 3");
        stripeService.handleChargeFailed(request, response);
        return null;
    }


}
