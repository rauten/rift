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

    public boolean verifyCard(String customerId, Map<String, Object> paymentMetadata) {

        PaymentMethodRequest request = new PaymentMethodRequest()
                .customerId(customerId)
                .paymentMethodNonce((String)paymentMetadata.get("nonce"))
                .options()
                    .verifyCard(true)
                    .verificationAmount("0.00")
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

    public String createCustomer(String firstName, String lastName, String company, String email) {

        CustomerRequest request = new CustomerRequest()
                .firstName(firstName)
                .lastName(lastName)
                .company(company)
                .email(email);

        Result<Customer> result = gateway.customer().create(request);

        if (result.isSuccess()) {
            Customer customer = result.getTarget();
            return customer.getId();
        } else {
            return result.getMessage();
        }
    }

    public String updateCustomer(Map<String, Object> paymentMetadata, String customerId) {
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



}
