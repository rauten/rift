package io.rift.feature;

import com.auth0.net.CustomRequest;
import com.auth0.net.Request;
import com.fasterxml.jackson.core.type.TypeReference;
import io.rift.model.Usertable;
import io.rift.repository.RiftRepository;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springfox.documentation.spring.web.json.Json;

@Service
public class Auth0Service {

    private final String updateUserUrl = "/api/v2/users/";

    final OkHttpClient client = new OkHttpClient();

    @Autowired
    private RiftRepository riftRepository;

    public Request<Usertable> update(String auth0Id, Json metadata, String accessToken) {

        StringBuilder stringBuilder = new StringBuilder("https://riftgaming.auth0.com");
        stringBuilder.append(updateUserUrl);
        stringBuilder.append(auth0Id);

        CustomRequest<Usertable> request = new CustomRequest<>(client, stringBuilder.toString(), "PATCH", new TypeReference<Usertable>() {
        });
        request.addHeader("Authorization", "Bearer " + accessToken);
        request.setBody(metadata);
        return request;

    }

}
