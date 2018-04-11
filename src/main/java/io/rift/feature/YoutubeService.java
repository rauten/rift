package io.rift.feature;

import org.apache.http.client.methods.HttpGet;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class YoutubeService {

    private final String clientId = "196736615110-2n7j9c9helma43g2779m66f50p2i6kij.apps.googleusercontent.com";
    private final String clientSecret = "B3iQddU6zYBRsEPiCSZX6J9V";
    private final String redirectURI = "http://go-rift.herokuapp.com";
    public String getYoutubeAccessCode(String code) throws IOException {

        String url = "https://www.googleapis.com/oauth2/v4/token?" +
                "code=" + code +
                "&client_id=196736615110-2n7j9c9helma43g2779m66f50p2i6kij.apps.googleusercontent.com" +
                "&client_secret=B3iQddU6zYBRsEPiCSZX6J9V" +
                "&redirect_uri=http://go-rift.herokuapp.com/youtube" +
                "&grant_type=authorization_code";


        HttpPost post = new HttpPost(url);
        HttpClient client = new DefaultHttpClient();

        // add header
        post.setHeader("Host", "www.googleapis.com");
        post.setHeader("Content-Type", "application/x-www-form-urlencoded");

        //post.setEntity(new UrlEncodedFormEntity(nameValuePairs));

        HttpResponse response = client.execute(post);

        int responseCode = response.getStatusLine().getStatusCode();

        BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()));

        StringBuffer result = new StringBuffer();
        String line;
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }

        JSONObject jsonObject = new JSONObject(result.toString());
        String accessToken = jsonObject.getString("access_token");
        return getYoutubeUsername(accessToken);

    }

    private String getYoutubeUsername(String accessToken) throws IOException {

        String url = "https://www.googleapis.com/youtube/v3/channels?" +
                "access_token=" + accessToken +
                "&part=snippet" +
                "&mine=true";

        HttpGet get = new HttpGet(url);
        HttpClient client = new DefaultHttpClient();

        get.setHeader("Content-Type", "application/json");

        HttpResponse response = client.execute(get);

        int responseCode = response.getStatusLine().getStatusCode();

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent())
        );

        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = reader.readLine()) != null) {
            content.append(inputLine);
        }
        reader.close();
        JSONObject jsonObject = new JSONObject(content.toString());
        Object obj = jsonObject.get("items");
        JSONArray array = (JSONArray) obj;
        JSONObject jsonObject1 = array.getJSONObject(0);
        Object snippet = jsonObject1.get("snippet");
        JSONObject jsonSnippet = (JSONObject) snippet;
        Object title = jsonSnippet.get("title");
        return title.toString();
    }



}
