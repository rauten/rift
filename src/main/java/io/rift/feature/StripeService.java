package io.rift.feature;

import com.google.gson.JsonSyntaxException;
import com.stripe.Stripe;
import com.stripe.exception.*;
import com.stripe.model.*;
import com.stripe.net.APIResource;
import com.stripe.net.RequestOptions;
import com.stripe.net.Webhook;
import io.rift.config.FuturePayments;
import io.rift.model.RifterSession;
import io.rift.model.SessionRequest;
import io.rift.model.Usertable;
import io.rift.repository.RiftRepository;
import io.rift.service.RifterSessionService;
import io.rift.service.SessionRequestService;
import io.rift.service.UsertableService;
import org.postgresql.util.PGInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

@Service
public class StripeService {

    public static final String STRIPE_APIKEY = "sk_live_1dYvYLmdp3maH1wTG8Ibgxb8";

    private final String getUserById = "getUserById";
    private final String getRifterGameById = "getRifterGameById";
    private final String getSessionRequestBySessionAndRifteeId = "getSessionRequestBySessionAndRifteeId";

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private UsertableService usertableService;

    @Autowired
    private SessionRequestService sessionRequestService;

    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired
    private FuturePayments futurePayments;


    /**
     * Stores all the legal information of a Rifter into a new Stripe Account object.
     * The Stripe Account object has a 1-to-1 relationship with a Rifter and stores all legal information and all payment
     *  information
     *
     * Stripe requires all individuals who receive money from Rift to enter the following information for legal purposes
     *
     * @param country - The country where the Rifter is domiciled
     * @param city - The city where the Rifter resides
     * @param addressLine1 - The first line of the Rifter's legal address
     * @param addressLine2 - The second line of the Rifter's legal address
     * @param postalCode - The 5-digit zip code of the Rifter's legal address
     * @param state - The state (if applicable) where the Rifter resides
     * @param dobDay - The birth date (0-31) of the Rifter
     * @param dobMonth - The birth month (0-12) of the Rifter
     * @param dobYear - The birth year of the Rifter
     * @param firstName - The legal first name of the Rifter
     * @param lastName - The legal last name of the Rifter
     * @param id - The Rift account id of the Rifter
     * @param type - The business type of the Rifter (individual or company)
     * @return
     */
    public String createRifterAccount(String country, String city, String addressLine1, String addressLine2, String postalCode,
                                       String state, String dobDay, String dobMonth, String dobYear, String firstName, String lastName, Integer id, String type) {


        Map<String, Object> params = new HashMap<>();
        params.put("type", "custom");
        params.put("country", country);

        Map<String, Object> legalInfo = new HashMap<>();

        Map<String, String> address = new HashMap<>();
        address.put("city", city);
        address.put("line1", addressLine1);
        address.put("line2", addressLine2);
        address.put("postal_code", postalCode);
        address.put("state", state);
        address.put("country", country);

        Map<String, Object> dob = new HashMap<>();
        dob.put("day", dobDay);
        dob.put("month", dobMonth);
        dob.put("year", dobYear);

        legalInfo.put("address", address);
        legalInfo.put("dob", dob);
        legalInfo.put("first_name", firstName);
        legalInfo.put("last_name", lastName);
        legalInfo.put("type", type);

        params.put("legal_entity", legalInfo);

        try {
            Account response = Account.create(params, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            String accountId = response.getId();
            setUserAccountId(accountId, id);
            return accountId;
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return "";
        }
    }

    /**
     * Stores a payout account (currently only a bank account) to a Rifter's Stripe Account object.
     * Takes in a Stripe bank account "ba_..." token and stores it with the corresponding Rifter Account object.
     *
     * @param rifterStripeId - The "acct_..." object for a Rifter. Stored in our own databases
     * @param token - The bank account token to be associated with the Account
     * @return
     */
    public boolean setPaymentMethodForRifter(String rifterStripeId, String token) {
        try {
            Account account = Account.retrieve(rifterStripeId, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            Map<String, Object> params = new HashMap<>();
            params.put("external_account", token);
            account.getExternalAccounts().create(params, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    /**
     * Stores a created Stripe Account id to our backend for reference/retrieval
     *
     * @param accountId - The Stripe Account id (String) for a Rifter
     * @param usertableId - The Rifter's Rift account id
     * @return
     */
    private boolean setUserAccountId(String accountId, Integer usertableId) {
        List<Object> args = new ArrayList<>(2);
        args.add(0, accountId);
        args.add(1, usertableId);
        String query = "UPDATE usertable SET account_id = ? WHERE id = ?";
        return riftRepository.doUpdate(new StringBuilder(query), args);
    }

    /**
     * Creates a Customer object for a Riftee.
     * Automatically called upon a Rift account creation
     * Calls setUserCustomerId, which stores the created "cus_..." id into our own database for reference/retrieval
     *
     * @param riftTag - The user's riftTag
     * @return String - The Stripe Customer id if successful, and empty string otherwise
     */
    public String createRifteeAccount(String riftTag) {
        Map<String, Object> params = new HashMap<>();
        try {
            RequestOptions requestOptions = RequestOptions.builder().setApiKey(STRIPE_APIKEY).build();
            Customer customer = Customer.create(params, requestOptions);
            boolean success = setUserCustomerId(customer.getId(), riftTag);
            if (success) {
                return customer.getId();
            }
            return "";
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return "";
        }
    }

    private boolean setUserCustomerId(String customerId, String riftTag) {
        List<Object> args = new ArrayList<>(2);
        args.add(0, customerId);
        args.add(1, riftTag);
        String query = "UPDATE usertable SET customer_id = ? WHERE rift_tag = ?";
        return riftRepository.doUpdate(new StringBuilder(query), args);
    }

    /**
     * Stores a payment method (currently only a credit card) to a Riftee's Stripe Customer object.
     * Takes in a Stripe credit card object "card_..." and stores it with the corresponding Riftee Customer object.
     *
     * @param customerId - The Stripe customerId of the Riftee
     * @param tokenId - The Stripe Card token created when the Riftee enters a card payment method
     * @param setDefault - Whether or not to set the card as the Riftee's default credit card
     * @return Boolean - True on success, false otherwise
     */
    public boolean createRifteePayment(String customerId, String tokenId, boolean setDefault) {
        try {
            Customer customer = Customer.retrieve(customerId, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            Map<String, Object> params = new HashMap<>();
            params.put("source", tokenId);
            ExternalAccount externalAccount = customer.getSources().create(params, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            if (setDefault) {
                Map<String, Object> updateParams = new HashMap<>();
                updateParams.put("default_source", externalAccount.getId());
                customer.update(updateParams, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            }
            return true;
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Card> getRifteeCards(String rifteeId) {
        List<Card> cards = new ArrayList<>();
        try {
            Customer customer = Customer.retrieve(rifteeId, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            ExternalAccountCollection externalAccountCollection = customer.getSources();
            List<ExternalAccount> externalAccounts = externalAccountCollection.getData();
            for (ExternalAccount externalAccount : externalAccounts) {
                String id = externalAccount.getId();
                Card card = (Card) customer.getSources().retrieve(id, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
                card.setLastResponse(null);
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
            Customer customer = Customer.retrieve(customerId, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            String defaultSource = customer.getDefaultSource();
            if (defaultSource != null) {
                return (Card) customer.getSources().retrieve(defaultSource, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            }
            return null;
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean setDefaultCard(String cardId, String customerId) {
        try {
            Customer customer = Customer.retrieve(customerId, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            Map<String, Object> updateParams = new HashMap<>();
            updateParams.put("default_source", cardId);
            customer.update(updateParams, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean deleteCard(String customerId, String cardId) {
        try {
            Customer customer = Customer.retrieve(customerId, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            customer.getSources().retrieve(cardId, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build()).delete(RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }


    public boolean createTransfer(Integer amount, String currency, String accountId, Integer rifteeId, Integer sessionId, double sessionRifteeVal) {
        try {


            Map<String, Object> transferParams = new HashMap<>();
            transferParams.put("amount", (int)(amount * .85));
            transferParams.put("currency", currency);
            transferParams.put("destination", accountId);
            transferParams.put("transfer_group", String.valueOf(sessionRifteeVal));
            Transfer transfer = Transfer.create(transferParams, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());

            String addCharge = "UPDATE gamerequest SET transfer_id = ? WHERE riftee_id = ? AND session_id = ?";
            StringBuilder addChargeUpdate = new StringBuilder(addCharge);
            List<Object> transferArgs = new ArrayList<>(3);
            transferArgs.add(0, transfer.getId());
            transferArgs.add(1, rifteeId);
            transferArgs.add(2, sessionId);
            riftRepository.doUpdate(addChargeUpdate, transferArgs);

            /*
            Map<String, Object> params = new HashMap<>();
            params.put("amount", amount);
            params.put("currency", currency);
            params.put("customer", customerId);
            Map<String, Object> destinationParams = new HashMap<>();
            Double transferAmount = amount * .01;
            transferAmount = Math.floor(transferAmount);
            double transferAmountDouble = transferAmount;
            int transferAmountInt = (int) transferAmountDouble;
            destinationParams.put("amount", transferAmountInt);
            destinationParams.put("account", accountId);
            params.put("destination", destinationParams);
            Charge charge = Charge.create(params, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            */

        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public String createCharge(Double sessionCost, String customerId, double partialCharge, double sessionRifteeVal, Integer rifteeId, Integer sessionId) {

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int)(sessionCost * partialCharge));
        chargeParams.put("currency", "usd");
        chargeParams.put("customer", customerId);
        chargeParams.put("transfer_group", String.valueOf(sessionRifteeVal));
        Charge charge = new Charge();
        try {
            charge = Charge.create(chargeParams, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            // Add charge token to backend
            String addCharge = "UPDATE gamerequest SET charge_id = ? WHERE riftee_id = ? AND session_id = ?";
            StringBuilder addChargeUpdate = new StringBuilder(addCharge);
            List<Object> chargeArgs = new ArrayList<>(3);
            chargeArgs.add(0, charge.getId());
            chargeArgs.add(1, rifteeId);
            chargeArgs.add(2, sessionId);
            riftRepository.doUpdate(addChargeUpdate, chargeArgs);
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            return e.getMessage();
        }
        return "Success";

    }

    public String setFuturePayment(Integer sessionId, Integer rifteeId, Integer hostId, double partialCharge) throws SQLException {
        Object[] sessionArgs = new Object[1];
        sessionArgs[0] = sessionId;
        ResultSet resultSet = riftRepository.doQuery(getRifterGameById, sessionArgs);
        RifterSession rifterSession = new RifterSession();
        if (resultSet.next()) {
            rifterSession = rifterSessionService.populateRifterSession(resultSet, 1, "");
        }
        resultSet.close();

        Object[] userArgs = new Object[1];
        userArgs[0] = rifteeId;
        resultSet = riftRepository.doQuery(getUserById, userArgs);
        Usertable customer = new Usertable();
        if (resultSet.next()) {
            customer = usertableService.populateUsertable(resultSet, 1, "");
        }
        final Usertable executorCustomer = customer;
        resultSet.close();

        userArgs[0] = hostId;
        resultSet = riftRepository.doQuery(getUserById, userArgs);
        Usertable rifter = new Usertable();
        if (resultSet.next()) {
            rifter = usertableService.populateUsertable(resultSet, 1, "");
        }
        final Usertable executorRifter = rifter;
        resultSet.close();

        // Get the time in milliseconds (from Jan 1, 1970) until the session is completed.
        long timeToEnd = convertTimestampAndIntervalToMillis(rifterSession.getSessionTime(), rifterSession.getSessionDuration());

        // Get a unique mapping for rifteeId/sessionId to save the Future object into.
        Double sessionRifteeVal = sessionRequestService.getFuturePaymentVal(rifterSession.getId(), customer.getId());

        // Create the initial charge, and return an error message if the charge is not successful
        String result = createCharge(rifterSession.getSessionCost(), executorCustomer.getCustomerId(), partialCharge, sessionRifteeVal, rifteeId, sessionId);

        /**
         * Commented out for testing
         */
        /*
        if (!result.equals("Success")) {
            return result;
        }
        */

        // If the charge IS successful, create a scheduled event to transfer funds to the rifter account.
        /**
         * FOR TESTING PURPOSES, CURRENT TEST VALUE OF 45 SECONDS FOR EVERY TRANSFER
         * FOR TESTING PURPOSES, TRANSFER AMOUNT IS SET TO 0, USD
         * TRUE DELAY VALUE FOR TRANSFER: timeToEnd - System.currentTimeMillis() + 86400000L
         * TRUE AMOUNT VALUE FOR TRANSFER: rifterSession.sessionCost (*.85 is handled in createTransfer method)
         */
        ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
        Future<?> future = executorService.schedule(new Runnable() {
            @Override
            public void run() {
                createTransfer((int) (0 * partialCharge), "usd", executorRifter.getAccountId(), rifteeId, sessionId, sessionRifteeVal);
                futurePayments.futurePaymentMap().remove(sessionRifteeVal);
            }
        }, 45000, TimeUnit.MILLISECONDS);

        futurePayments.futurePaymentMap().put(sessionRifteeVal, future);
        return "Success";
    }

    public boolean cancelFuturePayment(Integer sessionId, Integer rifteeId, boolean nullifyIds) {
        try {
            double futureId = sessionRequestService.getFuturePaymentVal(sessionId, rifteeId);
            Future<?> futurePayment = futurePayments.futurePaymentMap().get(futureId);
            futurePayment.cancel(true);
            futurePayments.futurePaymentMap().remove(futureId);


            if (nullifyIds) {
                List<Object> args = new ArrayList<>(2);
                args.add(0, sessionId);
                args.add(1, rifteeId);
                String query = "UPDATE gamerequest SET charge_id = null, transfer_id = null WHERE session_id = ? AND riftee_id = ?";
                StringBuilder removeChargeAndTransferId = new StringBuilder(query);
                riftRepository.doUpdate(removeChargeAndTransferId, args);
            }

        } catch (NullPointerException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean issueRefund(Integer rifteeId, Integer sessionId, Integer refundAmount) throws SQLException {

        Object[] args = new Object[2];
        args[0] = rifteeId;
        args[1] = sessionId;
        ResultSet resultSet = riftRepository.doQuery(getSessionRequestBySessionAndRifteeId, args);
        SessionRequest sessionRequest = new SessionRequest();
        if (resultSet.next()) {
            sessionRequest = sessionRequestService.populateSessionRequest(resultSet, 1);
        }
        resultSet.close();
        String chargeId = sessionRequest.getChargeId();

        Map<String, Object> refundParams = new HashMap<>();
        refundParams.put("charge", chargeId);
        if (refundAmount != null) {
            refundParams.put("amount", refundAmount);
        }
        try {
            if (sessionRequest.getTransferId() != null) {
                Transfer transfer = Transfer.retrieve(sessionRequest.getTransferId(), RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
                Map<String, Object> params = new HashMap<>();
                transfer.getReversals().create(params, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
            }
            Refund.create(refundParams, RequestOptions.builder().setApiKey(STRIPE_APIKEY).build());
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException | APIException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public long convertTimestampAndIntervalToMillis(Timestamp timestamp, PGInterval pgInterval) {
        long millis = timestamp.getTime();
        long intervalMillis = (pgInterval.getDays() * 86400000L) + (pgInterval.getHours() * 3600000L) + (pgInterval.getMinutes() * 60000);
        return millis + intervalMillis;
    }


    /*
    public void handleChargeFailed(Request request, Response response) {

        String payload = request.body();
        String sigHeader = request.headers("Stripe-Signature");
        Event event = null;

        try {
            event = Webhook.constructEvent(payload, sigHeader, "whsec_fjRJIo2VVVMMd7y4M0XxZMTPd8xk0pGK");
        } catch (JsonSyntaxException e) {
            // Invalid payload
            response.status(400);
        } catch (SignatureVerificationException e) {
            // Invalid signature
            response.status(400);
        }
        event = APIResource.GSON.fromJson(request.body(), Event.class);

    }
    */
//    public void handleChargeFailed(Request request, Response response) {
//
//        String payload = request.body();
//        String sigHeader = request.headers("Stripe-Signature");
//        Event event = null;
//
//        try {
//            event = Webhook.constructEvent(payload, sigHeader, "whsec_fjRJIo2VVVMMd7y4M0XxZMTPd8xk0pGK");
//        } catch (JsonSyntaxException e) {
//            // Invalid payload
//            response.status(400);
//        } catch (SignatureVerificationException e) {
//            // Invalid signature
//            response.status(400);
//        }
//        event = APIResource.GSON.fromJson(request.body(), Event.class);
//
//    }





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
