package io.rift.service;

import com.braintreegateway.*;
import com.braintreegateway.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.braintreegateway.Request;
import com.braintreegateway.Transaction.Status;

import javax.xml.ws.Response;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;


@Service
public class BraintreeService {

    private static String merchantId = "kh2jy6cypsh2735c";

    private static String publicKey = "sbrqqhjpbp8pcqpm";

    private static String privateKey = "f5a7699f93f8635fc519a74c90405ab7";


    private static BraintreeGateway gateway = new BraintreeGateway(Environment.SANDBOX, merchantId, publicKey, privateKey);

    public Map<String, String> getClientToken() {
        String token = gateway.clientToken().generate();
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", token);
        return tokenMap;
    }

    public String getClientNonce(Request request) {
        String clientNonce = request.toQueryString();
        return clientNonce;
    }

    /**
     *
     * @param amount - The amount (as a BigDecimal) that the session costs
     * @param clientId - The id (as a string) of the customer
     * @return
     */
    public String doTransaction(BigDecimal amount, String clientId) {
        TransactionRequest request = new TransactionRequest()
                .amount(amount)
                .customerId(clientId)
                .options()
                    .submitForSettlement(true)
                    .done();

        Result<Transaction> result = gateway.transaction().sale(request);

        if (result.isSuccess()) {
            Transaction transaction = result.getTarget();
            return "redirect:checkouts/" + transaction.getId();
        } else if (result.getTransaction() != null) {
            Transaction transaction = result.getTransaction();
            return "redirect:checkouts/" + transaction.getId();
        } else {
            return "redirect:checkouts";
        }
    }

    /**
     *
     * @param customerId - The braintree id (as a string) of the customer. This should be persisted in
     *                   storage after login
     * @param paymentMetadata - A map consisting of any number of key-value pairs. The only one we care about
     *                        is "nonce":paymentNonce. This value must be passed in as that format
     *
     * @return A boolean - true/false, whether the card was verified
     */
    public boolean verifyCard(String customerId, Map<String, String> paymentMetadata) {

        PaymentMethodRequest request = new PaymentMethodRequest()
                .customerId(customerId)
                .paymentMethodNonce((String)paymentMetadata.get("nonce"))
                .options()
                    .verifyCard(true)
                    .done();

        Result<? extends PaymentMethod> result = gateway.paymentMethod().create(request);

        if (result.isSuccess()) {
            return true;
        } else {
            CreditCardVerification verification = result.getCreditCardVerification();
            if (verification.getStatus().equals("PROCESSOR_DECLINED")) {
                return false;
            } else if (verification.getStatus().equals("GATEWAY_REJECTED")) {
                return false;
            } else {
                return false;
            }
        }

    }

    /**
     *
     * @param firstName - The new user's first name
     * @param lastName - The new user's last name
     * @return Map with single key-value pair. Key will either be 'customerId' if the creation is a success,
     * or 'resultMessage' in the case of failure
     */
    public Map<String, String> createCustomer(String firstName, String lastName) {

        CustomerRequest request = new CustomerRequest()
                .firstName(firstName)
                .lastName(lastName);

        Result<Customer> result = gateway.customer().create(request);
        Map<String, String> resultMap = new HashMap<>();
        if (result.isSuccess()) {
            Customer customer = result.getTarget();
            resultMap.put("customerId", customer.getId());
            return resultMap;
        } else {
            resultMap.put("resultMessage", result.getMessage());
            return resultMap;
        }
    }

    /**
     *
     * @param paymentMetadata - A map consisting of any number of key:value pairs. The only one we care about is
     *                        "nonce":paymentNonce, which must be included in that format.
     *
     * @param customerId - The customer id (as a string) of the current user. This value should be persisted in memory
     *                   on the frontend
     *
     * @return - A string denoting whether the update was a success or failure.
     */
    public String updateCustomer(Map<String, String> paymentMetadata, String customerId) {
        CustomerRequest request = new CustomerRequest()
                .paymentMethodNonce((String)paymentMetadata.get("nonce"));

        try {
            if (verifyCard(customerId, paymentMetadata)) {
                Result<Customer> updateResult = gateway.customer().update(customerId, request);
                return updateResult.getMessage();
            }
        } catch (NotFoundException e) {
            e.printStackTrace();
            return "Failed";
        }
        return "Failed";
    }

    /**
     * A more robust update than updateCustomer (should be used when want to update more than just payment info)
     * @param customerInfo
     * @param customerId
     * @return
     */
    public String updateCustomerInfo(Map<String, String> customerInfo, String customerId) {

        CustomerRequest request = new CustomerRequest();
        if (customerInfo.containsKey("firstName")) {
            request.firstName((String)customerInfo.get("firstName"));
        }
        if (customerInfo.containsKey("lastName")) {
            request.lastName((String)customerInfo.get("lastName"));
        }
        if (customerInfo.containsKey("nonce")) {
            request.paymentMethodNonce((String)customerInfo.get("nonce"));
        }

        try {
            if (!customerInfo.containsKey("nonce") || verifyCard(customerId, customerInfo)) {
                Result<Customer> updateResult = gateway.customer().update(customerId, request);
                return updateResult.getMessage();
            }
        } catch (NotFoundException e) {
            e.printStackTrace();
            return "Failed";
        }
        return "Failed";


    }



}
