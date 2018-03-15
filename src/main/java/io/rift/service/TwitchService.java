package io.rift.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class TwitchService {
    public String getTwitchCode(String code) throws IOException {
        String twitchURL = "https://id.twitch.tv/oauth2/token?client_id=aoxhv1qbec0v2fqalc68euxkn4c66e" +
                "&client_secret=m0npb9vm8ax0p1xg8wqo936rgkg93q" +
                "&code=" + code +
                "&grant_type=authorization_code" +
                "&redirect_uri=http://localhost:4200";
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
