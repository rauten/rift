package io.rift.feature;

import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.oauth2.sdk.id.ClientID;
import com.nimbusds.oauth2.sdk.id.Issuer;
import com.nimbusds.openid.connect.sdk.Nonce;
import com.nimbusds.openid.connect.sdk.claims.IDTokenClaimsSet;
import com.nimbusds.openid.connect.sdk.validators.IDTokenValidator;

import org.springframework.stereotype.Service;

import com.nimbusds.jose.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.text.ParseException;

@Service
public class TwitchService {
    private final String clientId = "aoxhv1qbec0v2fqalc68euxkn4c66e";

    public String authenticateUser(String jsonWeb) throws MalformedURLException, ParseException {
        Issuer issuer = new Issuer("https://id.twitch.tv/oauth2");
        ClientID clientID = new ClientID(clientId);
        JWSAlgorithm jwsAlgorithm = JWSAlgorithm.RS256;
        URL jwkSetURL = new URL("https://id.twitch.tv/oauth2/keys");

        IDTokenValidator validator = new IDTokenValidator(issuer, clientID, jwsAlgorithm, jwkSetURL);

        com.nimbusds.jwt.JWT idToken = com.nimbusds.jwt.JWTParser.parse(jsonWeb);
        Nonce expectedNonce = null;
        IDTokenClaimsSet claimsSet;

        try {
            claimsSet = validator.validate(idToken, expectedNonce);
            String username = (String)claimsSet.getClaim("preferred_username");
            return username;
        } catch (BadJOSEException | JOSEException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getTwitchCode(String code) throws IOException {
        String twitchURL = "https://id.twitch.tv/oauth2/token?client_id=aoxhv1qbec0v2fqalc68euxkn4c66e" +
                "&client_secret=m0npb9vm8ax0p1xg8wqo936rgkg93q" +
                "&code=" + code +
                "&grant_type=authorization_code" +
                "&redirect_uri=http://localhost:4200/twitch";
        URL url = new URL(twitchURL);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        String contentType = con.getHeaderField("Content-Type");
        con.setConnectTimeout(5000);
        con.setReadTimeout(5000);
        int status = con.getResponseCode();
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();
        con.disconnect();
        return content.toString();
    }

}
