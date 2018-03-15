package io.rift.feature;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class YoutubeService {

    private final String clientId = "196736615110-2n7j9c9helma43g2779m66f50p2i6kij.apps.googleusercontent.com";
    private final String clientSecret = "B3iQddU6zYBRsEPiCSZX6J9V";
    private final String redirectURI = "http://localhost:4200";

    public String getYoutubeAccessCode(String code) throws IOException {
        code = code.replace("%2F", "/");
        String youtubeURL = "http://www.googleapis.com/oauth2/v4/token?" +
                "code=" + code +
                "&client_id=196736615110-2n7j9c9helma43g2779m66f50p2i6kij.apps.googleusercontent.com" +
                "&client_secret=B3iQddU6zYBRsEPiCSZX6J9V" +
                "&redirect_uri=http://localhost:4200" +
                "&grant_type=authorization_code";

        URL url = new URL(youtubeURL);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        con.setFixedLengthStreamingMode(0);
        con.setDoOutput(true);
        con.setConnectTimeout(5000);
        con.setReadTimeout(5000);
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
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
