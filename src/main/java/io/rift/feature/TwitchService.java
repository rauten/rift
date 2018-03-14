package io.rift.feature;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.mb3364.twitch.api.Twitch;
import com.mb3364.twitch.api.auth.Scopes;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.IOException;
import java.net.*;
import java.util.Map;

@Service
public class TwitchService {

    private final String clientId = "aoxhv1qbec0v2fqalc68euxkn4c66e";
    private final String clientSecret = "8zfc2d9t8f3nob3wh0u8o0l7clbecc";
    private final String oauthRedirectURI = "http://localhost";

    private final String url = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=token+id_token&client_id=aoxhv1qbec0v2fqalc68euxkn4c66e&redirect_uri=http://localhost&scope=viewing_activity_read";

    public boolean authenticateUser(String jsonWeb) {

        DecodedJWT jwt = JWT.decode(jsonWeb);
        Map<String, Claim> claims = jwt.getClaims();
        Claim claim = claims.get("preferred_username");
        String username = claim.asString();
        return true;
    }

}
