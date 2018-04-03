package io.rift.feature;

import com.stripe.Stripe;
import com.stripe.exception.*;
import com.stripe.model.*;
import com.stripe.net.RequestOptions;
import io.rift.repository.RiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StripeService {

    private final String apiKey = "sk_test_6UoLLyUzJtTosIjqQHScr6Le";

    @Autowired
    private RiftRepository riftRepository;


    public String createRifterAccount(String country, String city, String line1, String line2, String postalCode,
                                       String state, String day, String month, String year, String firstName, String lastName) {


        Map<String, Object> params = new HashMap<>();
        params.put("type", "custom");
        params.put("country", country);

        Map<String, Object> legalInfo = new HashMap<>();

        Map<String, String> address = new HashMap<>();
        address.put("city", city);
        address.put("line1", line1);
        address.put("line2", line2);
        address.put("postal_code", postalCode);
        address.put("state", state);
        address.put("country", country);

        Map<String, Object> dob = new HashMap<>();
        dob.put("day", day);
        dob.put("month", month);
        dob.put("year", year);

        legalInfo.put("address", address);
        legalInfo.put("dob", dob);
        legalInfo.put("first_name", firstName);
        legalInfo.put("last_name", lastName);

        params.put("legal_entity", legalInfo);

        try {
            Account response = Account.create(params, RequestOptions.builder().setApiKey(apiKey).build());
            return response.getId();
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return "";
        }
    }

    public boolean setPaymentMethodForRifter(String rifterStripeId, String token) {
        try {
            Account account = Account.retrieve(rifterStripeId, null);
            Map<String, Object> params = new HashMap<>();
            params.put("external_account", token);
            account.getExternalAccounts().create(params, RequestOptions.builder().setApiKey(apiKey).build());
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public String createRifteeAccount(Integer usertableId) {
        Map<String, Object> params = new HashMap<>();
        try {
            RequestOptions requestOptions = RequestOptions.builder().setApiKey(apiKey).build();
            Customer customer = Customer.create(params, requestOptions);
            setUserCustomerId(customer.getId(), usertableId);
            return customer.getId();
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return "";
        }
    }

    public boolean createRifteePayment(String rifteeId, String tokenId) {
        try {
            Customer customer = Customer.retrieve(rifteeId, RequestOptions.builder().setApiKey(apiKey).build());
            Map<String, Object> params = new HashMap<>();
            params.put("source", tokenId);
            customer.getSources().create(params, RequestOptions.builder().setApiKey(apiKey).build());
            return true;
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Card> getRifteeCards(String rifteeId) {
        List<Card> cards = new ArrayList<>();
        try {
            Customer customer = Customer.retrieve(rifteeId, RequestOptions.builder().setApiKey(apiKey).build());
            ExternalAccountCollection externalAccountCollection = customer.getSources();
            List<ExternalAccount> externalAccounts = externalAccountCollection.getData();
            for (ExternalAccount externalAccount : externalAccounts) {
                String id = externalAccount.getId();
                Card card = (Card) customer.getSources().retrieve(id, RequestOptions.builder().setApiKey(apiKey).build());
                cards.add(card);
            }
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return null;
        }
        return cards;
    }

    public Card getDefaultCard(String customerId) {
        try {
            Customer customer = Customer.retrieve(customerId, RequestOptions.builder().setApiKey(apiKey).build());
            ExternalAccountCollection externalAccountCollection = customer.getSources();
            List<ExternalAccount> externalAccounts = externalAccountCollection.getData();
            for (ExternalAccount externalAccount : externalAccounts) {
                String id = externalAccount.getId();
                Card card = (Card) customer.getSources().retrieve(id, RequestOptions.builder().setApiKey(apiKey).build());
                if (card.getDefaultForCurrency()) {
                    return card;
                }
            }
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean createCharge(Double amount, String currency, String sourceId, String rifterPaymentId) {
        try {

            /*
            // Retrieve the default payment method for riftee
            Customer customer = Customer.retrieve(rifteeId);
            String sourceId = customer.getDefaultSource();

            //
            Account account = Account.retrieve(rifterId, null);
            ExternalAccountCollection externalAccountCollection = account.getExternalAccounts();
            List<ExternalAccount> externalAccounts = externalAccountCollection.getData();
            for (ExternalAccount externalAccount : externalAccounts) {
                String id = externalAccount.getId();
                BankAccount bankAccount = (BankAccount) customer.getSources().retrieve(id);
                if (bankAccount.getDefaultForCurrency()) {
                    defaultBank = bankAccount;
                    break;
                }
            }
            */

            Map<String, Object> params = new HashMap<>();
            params.put("amount", amount);
            params.put("currency", currency);
            params.put("source", sourceId);
            Map<String, Object> destinationParams = new HashMap<>();
            Double transferAmount = amount * .85;
            destinationParams.put("amount", transferAmount);
            destinationParams.put("account", rifterPaymentId);
            params.put("destination", destinationParams);
            Charge.create(params, RequestOptions.builder().setApiKey(apiKey).build());
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean setUserCustomerId(String customerId, Integer usertableId) {
        List<Object> args = new ArrayList<>(2);
        args.add(0, customerId);
        args.add(1, usertableId);
        String query = "UPDATE usertable SET customer_id = ? WHERE usertableId = ?";
        return riftRepository.doUpdate(new StringBuilder(query), args);
    }





    /*
    com.stripe.model.Account JSON: {
  "id": "acct_1032D82eZvKYlo2C",
  "object": "account",
  "business_logo": null,
  "business_name": "Stripe.com",
  "business_url": null,
  "charges_enabled": false,
  "country": "US",
  "created": 1385798567,
  "debit_negative_balances": true,
  "decline_charge_on": {
    "avs_failure": true,
    "cvc_failure": false
  },
  "default_currency": "usd",
  "details_submitted": false,
  "display_name": "Stripe.com",
  "email": "bob@example.com",
  "external_accounts": {
    "object": "list",
    "data": [

    ],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/accounts/acct_1032D82eZvKYlo2C/external_accounts"
  },
  "legal_entity": {
    "additional_owners": [

    ],
    "address": {
      "city": null,
      "country": "US",
      "line1": null,
      "line2": null,
      "postal_code": null,
      "state": null
    },
    "business_name": null,
    "business_tax_id_provided": false,
    "dob": {
      "day": null,
      "month": null,
      "year": null
    },
    "first_name": null,
    "last_name": null,
    "personal_address": {
      "city": null,
      "country": "US",
      "line1": null,
      "line2": null,
      "postal_code": null,
      "state": null
    },
    "personal_id_number_provided": false,
    "ssn_last_4_provided": false,
    "type": null,
    "verification": {
      "details": null,
      "details_code": "failed_other",
      "document": null,
      "status": "unverified"
    }
  },
  "metadata": {
  },
  "payout_schedule": {
    "delay_days": 7,
    "interval": "daily"
  },
  "payout_statement_descriptor": null,
  "payouts_enabled": false,
  "product_description": null,
  "statement_descriptor": "",
  "support_email": null,
  "support_phone": null,
  "timezone": "US/Pacific",
  "tos_acceptance": {
    "date": null,
    "ip": null,
    "user_agent": null
  },
  "type": "standard",
  "verification": {
    "disabled_reason": "fields_needed",
    "due_by": null,
    "fields_needed": [
      "business_url",
      "external_account",
      "legal_entity.address.city",
      "legal_entity.address.line1",
      "legal_entity.address.postal_code",
      "legal_entity.address.state",
      "legal_entity.dob.day",
      "legal_entity.dob.month",
      "legal_entity.dob.year",
      "legal_entity.first_name",
      "legal_entity.last_name",
      "legal_entity.type",
      "product_description",
      "support_phone",
      "tos_acceptance.date",
      "tos_acceptance.ip"
    ]
  },
  "keys": {
    "secret": "sk_test_7uLUGYrGnIfmnkn9hwd1FoWG",
    "publishable": "pk_test_DwzEVqyOtWC6drNygjsGX3fl"
  }
}
     */



}
