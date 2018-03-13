package io.rift.service;


import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.google.common.base.CaseFormat;
import io.rift.component.ConnectionService;
import io.rift.model.*;
import io.rift.repository.RiftRepository;
import io.rift.service.notifications.ActivityNotificationService;
import org.apache.bcel.classfile.ClassParser;
import org.apache.bcel.classfile.JavaClass;
import org.apache.commons.codec.binary.Base64;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import org.apache.bcel.classfile.Field;

import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URISyntaxException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.List;


@Service
public class UsertableService {

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired
    private ActivityNotificationService activityNotificationService;

    @Autowired
    private SessionRequestService sessionRequestService;

    @Autowired
    private GameService gameService;

    @Autowired
    private ConnectionService connectionService;

    public final int POPULATESIZE = 16;


    /****************************** GET *******************************/
    /******************************************************************/
    private final String getUserById = "getUserById";
    private final String getUserByRiftTag = "getUserByRiftTag";
    private final String getRiftIdByRiftTag = "getRiftIdByRiftTag";
    private final String getRiftTagByRiftId = "getRiftTagByRiftId";

    private final String getNumberGamesPlayedByUserId = "getNumberGamesPlayedByUserId";
    private final String getNumberFollowing = "getNumberFollowingById";
    private final String getNumberFollowers = "getNumberFollowersById";

    private final String getBroadcastNotifications = "getBroadcastNotificationsById";
    private final String getBroadcastNotificationsForFollower = "getBroadcastNotificationsForFollower";
    private final String getSessionUpdateBroadcastsByUserId = "getSessionUpdateBroadcastsByUserId";
    private final String getSessionDeletionBroadcastsByUserId = "getSessionDeletionBroadcastsByUserId";
    private final String getUserActivity = "getUserActivity";
    private final String getUserNotifications = "getUserNotifications";
    private final String getUserActiviyAndUserSession = "getUserActiviyAndUserSession";

    private final String getUserAndRifterSessions = "getUserAndRifterSessions";
    private final String getUserAndRifteeSessions = "getUserAndRifteeSessions";
    private final String getRifteeSessionsAndRequestByRiftTag = "getRifteeSessionsAndRequestByRiftTag";

    private final String getRatingInfoByUserId = "getRatingInfoByUserId";

    private final String getFollowersById = "getFollowersById";
    private final String getFollowingsById = "getFollowingsById";
    private final String getFollowersAndInfoById = "getFollowersAndInfoById";
    private final String getFollowingsAndInfoById = "getFollowingsAndInfoById";

    private final String getRequestsByUser = "getRequestsByUser";
    private final String getGameRequestsAndGameInfoByUserId = "getGameRequestsAndGameInfoByUserId";
    private final String getGameRequestsAndHostInfoByUserId = "getGameRequestsAndHostInfoByUserId";
    private final String getGameRequestsAndGameInfoAndHostInfoByUserId = "getGameRequestsAndGameInfoAndHostInfoByUserId";

    private final String getGameRequestsAndGameInfoByUserIdAndAccepted = "getGameRequestsAndGameInfoByUserIdAndAccepted";
    private final String getGameRequestsAndHostInfoByUserIdAndAccepted = "getGameRequestsAndHostInfoByUserIdAndAccepted";
    private final String getGameRequestsAndHostInfoAndSessionInfoByUserIdAndAccepted = "getGameRequestsAndHostInfoAndSessionInfoByUserIdAndAccepted";
    private final String getGameRequestsByUserIdAndAccepted = "getGameRequestsByUserIdAndAccepted";

    private final String getSessionCostBySessionId = "getSessionCostBySessionId";
    private final String getBraintreeIdFromUserId = "getBraintreeIdFromUserId";

    private final String getListeningChannels = "getListeningChannels";
    /****************************** POST *******************************/
    /*******************************************************************/
    private final String createUser = "createUser";



    private final String updateUserStart = "UPDATE usertable SET (";
    private final String updateUserEnd = " WHERE id = ?";
    private final String usertableClassPath = "/io/rift/model/Usertable.class";
    private final String usertableClass = "Usertable.class";

    private final String booleanStr = "Boolean";
    private final String stringStr = "String";
    private final String intStr = "Integer";
    private final String doubleStr = "Double";

    private final String s3AccessKey = "AKIAIQTG73LVHQJ4FKHA";
    private final String s3AccessSecret = "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";
    private final String profilePictureBucketName = "rift-profilepictures";
    private final String coverPhotosBucketName = "rift-coverphotos";


    /*
    @Autowired
    private SwaggerConfig swaggerConfig;

    @Autowired
    private ConnectionService connectionService;
    */

    public Integer getRiftIdByRiftTag(String riftTag) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftTag;
        ResultSet resultSet = riftRepository.doQuery(getRiftIdByRiftTag, args);
        if (resultSet.next()) {
            return resultSet.getInt(1);
        }
        return null;
    }

    public String getRiftTagByRiftId(Integer riftId) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftId;
        ResultSet resultSet = riftRepository.doQuery(getRiftTagByRiftId, args);
        if (resultSet.next()) {
            return resultSet.getString(1);
        }
        return null;
    }

    public Usertable getUserById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getUserById, args);
        if (resultSet.next()) {
            Usertable usertable = populateUsertable(resultSet, 1, "");
            resultSet.close();
            return usertable;
        }
        resultSet.close();
        return null;
    }

    public Usertable getUserByRiftTag(String riftTag) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftTag;
        ResultSet resultSet = riftRepository.doQuery(getUserByRiftTag, args);
        if (resultSet.next()) {
            Usertable usertable = populateUsertable(resultSet, 1, "");
            resultSet.close();
            return usertable;
        }
        resultSet.close();
        return null;
    }

    public Usertable populateUsertable(ResultSet resultSet, int startPoint, String info) throws SQLException {
        Usertable usertable = new Usertable();
        try {
            usertable.setId(resultSet.getInt(startPoint));
        } catch (PSQLException e) {
            e.printStackTrace();
            e.getServerErrorMessage();
        }
        usertable.setFirstName(resultSet.getString(startPoint + 1));
        usertable.setLastName(resultSet.getString(startPoint + 2));
        usertable.setGender(resultSet.getBoolean(startPoint + 3));
        usertable.setIsPrivate(resultSet.getBoolean(startPoint + 4));
        usertable.setIsSuspended(resultSet.getBoolean(startPoint + 5));
        usertable.setProfilePicturePath(resultSet.getString(startPoint + 6));
        usertable.setRiftTag(resultSet.getString(startPoint + 7));
        Double rifteeRating = resultSet.getDouble(startPoint + 8);
        Double rifterRating = resultSet.getDouble(startPoint + 9);
        usertable.setRifteeRating(roundRating(rifteeRating));
        usertable.setRifterRating(roundRating(rifterRating));
        usertable.setTwitchAccount(resultSet.getString(startPoint + 10));
        usertable.setYoutubeAccount(resultSet.getString(startPoint + 11));
        usertable.setBio(resultSet.getString(startPoint + 12));
        usertable.setAuth0Token(resultSet.getString(startPoint + 13));
        usertable.setBraintreeId(resultSet.getString(startPoint + 14));
        usertable.setEmail(resultSet.getString(startPoint + 15));
        if (info.equals("activity")) {
            usertable.setCreatorActivityList(activityNotificationService.populateNotifications(resultSet, POPULATESIZE, ""));
        } else if (info.equals("levenshtein")) {
            usertable.setRiftTagLevenshtein(resultSet.getInt(startPoint + POPULATESIZE));
            usertable.setFirstNameLevenshtein(resultSet.getInt(startPoint + POPULATESIZE + 1));
            usertable.setFullNameLevenshtein(resultSet.getDouble(startPoint + POPULATESIZE + 2));
        }
        return usertable;
    }

    public Integer getNumberGamesPlayedByUserId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getNumberGamesPlayedByUserId, args);
        if (resultSet.next()) {
            Integer num = resultSet.getInt(1);
            resultSet.close();
            return num;
        }
        resultSet.close();
        return null;
    }

    public Integer getNumberFollowing(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getNumberFollowing, args);
        if (resultSet.next()) {
            Integer num = resultSet.getInt(1);
            resultSet.close();
            return num;
        }
        resultSet.close();
        return null;
    }

    public Integer getNumberFollowers(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getNumberFollowers, args);
        if (resultSet.next()) {
            Integer num = resultSet.getInt(1);
            resultSet.close();
            return num;
        }
        resultSet.close();
        return null;
    }


    public List<RifterSession> getUserAndRifterSession(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getUserAndRifterSessions, args);
        List<RifterSession> rifterSessions = new ArrayList<>();
        while (resultSet.next()) {
            RifterSession rifterSession = rifterSessionService.populateRifterSession(resultSet, 1, "");
            rifterSessions.add(rifterSession);
        }
        resultSet.close();
        return rifterSessions;
    }

    public Map<String, Object> getTransactionDataFromUserAndSessionId(String id, String sessionId) throws SQLException {
        Object[] args = new Object[1];
        args[0] = Integer.valueOf(id);
        ResultSet resultSet = riftRepository.doQuery(getBraintreeIdFromUserId, args);
        Map<String, Object> transactionData = new HashMap<>();
        if (resultSet.next()) {
            transactionData.put("braintreeId", resultSet.getObject(1));
        }
        args[0] = Integer.valueOf(sessionId);
        resultSet = riftRepository.doQuery(getSessionCostBySessionId, args);
        if (resultSet.next()) {
            transactionData.put("sessionCost", resultSet.getObject(1));
        }
        resultSet.close();
        return transactionData;
    }


    public boolean logout(Integer id) {
        boolean truth = riftRepository.doUnlisten(id);
        System.out.println("Stopped polling: " + truth);
        return truth;
    }

    public ResultSet getListeningChannels() {
        Object[] args = new Object[0];
        return riftRepository.doQuery(getListeningChannels, args);
    }

    public Boolean createUser(Usertable usertable) {
        return riftRepository.doInsert(createUser,
                new Object[] {usertable.getFirstName(), usertable.getLastName(),
                        usertable.getRiftTag(), formatAuth0Token(usertable.getAuth0Token()), usertable.getBraintreeId()});
    }

    private String formatAuth0Token(String auth0Token) {
        String[] str = auth0Token.split("|");
        return str[1];
    }

    private double roundRating(double rating) {
        return Math.round(rating * 4)/4f;
    }

    public Boolean updateUser(Usertable usertable) throws SQLException, IOException, IntrospectionException, IllegalAccessException, InvocationTargetException {
        int id = usertable.getId();
        String str = updateUserStart;
        StringBuilder query = new StringBuilder(str);
        StringBuilder values = new StringBuilder("(");
        ClassParser parser = new ClassParser(UsertableService.class.getResourceAsStream(usertableClassPath), usertableClass);
        JavaClass javaClass = parser.parse();
        Field[] fields = javaClass.getFields();
        List<Object> args = new ArrayList<>();
        boolean didAdd = false;
        for (int i = 1; i < POPULATESIZE; i++) {
            String[] properties = fields[i].toString().split(" ");
            String attribute = properties[2];
            PropertyDescriptor pd = new PropertyDescriptor(attribute, Usertable.class);
            Method getter = pd.getReadMethod();
            Object f = getter.invoke(usertable);
            if (f != null && !((String) f).equals("")) {
                didAdd = true;
                if (properties[1].equals(intStr)) {
                    f = (Integer) f;
                } else if (properties[1].equals(stringStr)) {
                    f = (String) f;
                } else if (properties[1].equals(doubleStr)) {
                    f = (Double) f;
                } else if (properties[2].equals(booleanStr)) {
                    f = (boolean) f;
                }
                attribute = CaseFormat.UPPER_CAMEL.to(CaseFormat.LOWER_UNDERSCORE, attribute);
                query.append(attribute);
                query.append(", ");
                values.append("?");
                values.append(", ");
                args.add(f);
            }
        }
        if (didAdd) {
            query.delete(query.length() - 2, query.length() - 1);
            values.delete(values.length() - 2, query.length() - 1);
            query.append(") = ");
            values.append(")");
            query.append(values);
            query.append(updateUserEnd);
            args.add(id);
            return riftRepository.doUpdate(query, args);
        }
        return true;
    }

    public Object[] getRatingInfoByUserId(Integer id, String accountType) throws SQLException {

        Object[] ratingInfo = new Object[2];
        Object[] args = new Object[] {accountType, id, id};
        ResultSet resultSet = riftRepository.doQuery(getRatingInfoByUserId, args);
        if (resultSet.next()) {
            ratingInfo[0] = resultSet.getInt(1);
            ratingInfo[1] = resultSet.getInt(2);
        }
        resultSet.close();
        return ratingInfo;
    }

    public boolean putPicture(String keyBase, String base64Data, String bucket) throws URISyntaxException {
        AWSCredentials awsCredentials = new BasicAWSCredentials(s3AccessKey, s3AccessSecret);
        AmazonS3 s3Client = AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(Regions.US_EAST_2)
                .build();

        String key = keyBase + "profile-picture";
        /*
        String longStr = StringUtils.join(new String[] {
                gordonImage1, gordonImage2
        });
        */
        System.out.println();
        byte[] bytes = Base64.decodeBase64((base64Data.substring(base64Data.indexOf(",")+1)).getBytes());
        InputStream fis = new ByteArrayInputStream(bytes);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(bytes.length);
        metadata.setContentType("image/png");
        metadata.setCacheControl("public, max-age=31536000");
        s3Client.putObject(bucket, key, fis, metadata);
        s3Client.setObjectAcl(bucket, key, CannedAccessControlList.PublicRead);

        return true;
    }

    public String getPicture(String keyBase, String bucket) throws IOException {
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(s3AccessKey, s3AccessSecret);
        AmazonS3 s3Client = AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(Regions.US_EAST_2)
                .build();
        String key = keyBase + "profile-picture";
        try {
            S3Object object = s3Client.getObject(new GetObjectRequest(bucket, key));
            InputStream objectData = object.getObjectContent();
            byte[] bytes = IOUtils.toByteArray(objectData);
            Base64 base64 = new Base64();
            String byteStr = "data:image/png;base64," + new String(base64.encode(bytes), "UTF-8");
            return byteStr;
        } catch (Exception e) {
            return "";
        }
    }

}
