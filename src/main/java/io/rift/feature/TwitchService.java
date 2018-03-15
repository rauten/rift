package io.rift.feature;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.impl.JWTParser;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.mb3364.twitch.api.Twitch;
import com.mb3364.twitch.api.auth.Scopes;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.oauth2.sdk.auth.Secret;
import com.nimbusds.oauth2.sdk.id.ClientID;
import com.nimbusds.oauth2.sdk.id.Issuer;
import com.nimbusds.openid.connect.sdk.Nonce;
import com.nimbusds.openid.connect.sdk.claims.IDTokenClaimsSet;
import com.nimbusds.openid.connect.sdk.validators.IDTokenValidator;
import net.minidev.json.JSONObject;
import org.springframework.security.jwt.JwtHelper;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.*;
import com.nimbusds.jwt.*;
import com.nimbusds.oauth2.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.net.*;
import java.text.ParseException;
import java.util.Map;

@Service
public class TwitchService {

    private final String clientId = "aoxhv1qbec0v2fqalc68euxkn4c66e";
    private final String clientSecret = "8zfc2d9t8f3nob3wh0u8o0l7clbecc";
    private final String oauthRedirectURI = "http://localhost";

    private final String url = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=token+id_token&client_id=aoxhv1qbec0v2fqalc68euxkn4c66e&redirect_uri=http://localhost&scope=viewing_activity_read";

    public String authenticateUser(String jsonWeb) throws MalformedURLException, ParseException {

        jsonWeb = jsonWeb + ".";

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



        /*
        DecodedJWT jwt = JWT.decode(jsonWeb);
        Map<String, Claim> claims = jwt.getClaims();
        Claim claim = claims.get("preferred_username");
        String username = claim.asString();
        return true;
        */
        return null;
    }

}
