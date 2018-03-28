package io.rift.controller;

import com.auth0.client.mgmt.ManagementAPI;
import com.auth0.exception.APIException;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.mgmt.users.User;
import com.auth0.net.Request;
import io.rift.feature.Auth0Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin(origins = "https://go-rift.herokuapp.com")
@RestController
@RequestMapping("/api")
public class Auth0Controller {

    @Autowired
    private Auth0Service auth0Service;

    private final String domain = "riftgaming.auth0.com";
    private final String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5Ea3hNekV4TlVJd00wWTJRVU5GUVRFek9FUTFOREUzUlVNeFJqWXdOekF5UlVWQ05Ua3pRUSJ9.eyJpc3MiOiJodHRwczovL3JpZnRnYW1pbmcuYXV0aDAuY29tLyIsInN1YiI6IlhrNFIydExUT2hMaHJPRE55OXkyN21yeGNIaGtyTDRpQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3JpZnRnYW1pbmcuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1MjA0Mzk4MzcsImV4cCI6MTUyMTQzOTgzNywiYXpwIjoiWGs0UjJ0TFRPaExock9ETnk5eTI3bXJ4Y0hoa3JMNGkiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.gNfyhRcD-3zXyWLfaDnMNzrt7MM1RUXOzgHZaeCbs1LSGI9OSxSgHAIXFx0I6x4Aux2j1zkfbmiHWJDlWmP4KvQSE4_hZzPqyP62f6oGBU5RfnF-yDK8MIv5g3zI2yWnwBHDtUCLTVjaC1fjrtEEmQf-qOGXltX7cY9JtQaw_BvIz8No2LmVdrznqRgdWadz1i3t_U2fogIBRblqtP-GbNT5VvZ1ODVrhgT-s6grfQvBRGdjeQacSpBptTKQGsDlxvIwZXC6DpjYEwIS3_cVThzTAP3vBOVLUATMAIpORWw3xwMvQIdD8q-Hxb9H1pN99yHiY8tlRv_f0yZhmGrG1Q";

    private final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    @RequestMapping(method = RequestMethod.PATCH, value = "/user/updateAuth")
    public Boolean updateAuth(@RequestHeader(name = "Authorization") String accessToken, @RequestHeader(name = "FirstName") String firstName,
                               @RequestHeader(name = "LastName") String lastName,
                               @RequestHeader(name = "Email") String email,
                               @RequestHeader(name = "Auth0Id") String auth0Id) {


        ManagementAPI mgmt = new ManagementAPI(domain, token);

        Map<String, Object> metadataMap = new HashMap<>();

        metadataMap.put("firstName", firstName);
        metadataMap.put("lastName", lastName);

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("user_metadata", metadataMap);


        User data = new User();
        data.setUserMetadata(metadata);
        if (validate(email)) {
            data.setEmail(email);
        }
        Request request = mgmt.users().update(auth0Id, data);
        try {
            User response = (User)request.execute();
        } catch (APIException e) {
            e.printStackTrace();
        } catch (Auth0Exception e) {
            e.printStackTrace();
        }
        /*
        try {
            User response = (User)requestTwo.execute();
        } catch (APIException e) {
            e.printStackTrace();
        } catch (Auth0Exception e) {
            e.printStackTrace();
        }
        */
        return true;
    }

    private boolean validate(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX .matcher(emailStr);
        return matcher.find();
    }

}
