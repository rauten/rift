package io.rift.service;


import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import com.google.common.base.CaseFormat;
import io.rift.model.*;
import io.rift.repository.RiftRepository;
import org.apache.bcel.classfile.ClassParser;
import org.apache.bcel.classfile.JavaClass;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import org.apache.bcel.classfile.Field;
import sun.misc.Cache;

import javax.imageio.ImageIO;
import javax.mail.Session;
import javax.sql.rowset.CachedRowSet;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.List;

import com.amazonaws.services.securitytoken.AWSSecurityTokenServiceClient;


@Service
public class UsertableService {

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private SessionRequestService sessionRequestService;

    @Autowired
    private ConnectionService connectionService;

    public final int POPULATESIZE = 15;


    /****************************** GET *******************************/
    /******************************************************************/
    private final String getUserById = "getUserById";
    private final String getUserByRiftTag = "getUserByRiftTag";
    private final String getRiftIdByRiftTag = "getRiftIdByRiftTag";

    private final String getNumberGamesPlayedByUserId = "getNumberGamesPlayedByUserId";
    private final String getNumberFollowing = "getNumberFollowingById";
    private final String getNumberFollowers = "getNumberFollowersById";

    private final String getBroadcastNotifications = "getBroadcastNotificationsById";
    private final String getBroadcastNotificationsForFollower = "getBroadcastNotificationsForFollower";
    private final String getSessionBroadcastsByUserId = "getSessionBroadcastsByUserId";
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

    public Usertable getUserById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getUserById, args);
        if (resultSet.next()) {
            Usertable usertable = populateUsertable(resultSet, 1, "");
            //resultSet.close();
            return usertable;
        }
        //resultSet.close();
        return null;
    }

    public Usertable getUserByRiftTag(String riftTag) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftTag;
        ResultSet resultSet = riftRepository.doQuery(getUserByRiftTag, args);
        if (resultSet.next()) {
            Usertable usertable = populateUsertable(resultSet, 1, "");
            //resultSet.close();
            return usertable;
        }
        //resultSet.close();
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
        if (info.equals("activity")) {
            usertable.setCreatorActivityList(notificationService.populateNotifications(resultSet, 14, ""));
        } else if (info.equals("levenshtein")) {
            usertable.setRiftTagLevenshtein(resultSet.getInt(startPoint + 15));
            usertable.setFirstNameLevenshtein(resultSet.getInt(startPoint + 16));
            usertable.setFullNameLevenshtein(resultSet.getDouble(startPoint + 17));
        }
        return usertable;
    }

    public Integer getNumberGamesPlayedByUserId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getNumberGamesPlayedByUserId, args);
        if (resultSet.next()) {
            Integer num = resultSet.getInt(1);
            //resultSet.close();
            return num;
        }
        //resultSet.close();
        return null;
    }

    public Integer getNumberFollowing(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getNumberFollowing, args);
        if (resultSet.next()) {
            Integer num = resultSet.getInt(1);
            //resultSet.close();
            return num;
        }
        //resultSet.close();
        return null;
    }

    public Integer getNumberFollowers(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getNumberFollowers, args);
        if (resultSet.next()) {
            Integer num = resultSet.getInt(1);
            //resultSet.close();
            return num;
        }
        //resultSet.close();
        return null;
    }


    public List<Following> getFollowingsById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getFollowersById, args);
        List<Following> followings = new ArrayList<>();
        while (resultSet.next()) {
            Following following = new Following();
            following.setFollowerId(id);
            following.setFollowingId(resultSet.getInt(2));
            following.setAccepted(resultSet.getBoolean(3));
            followings.add(following);
        }
        //resultSet.close();
        return followings;
    }

    public List<Following> getFollowersById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getFollowingsById, args);
        List<Following> followers = new ArrayList<>();
        while (resultSet.next()) {
            Following following = new Following();
            following.setFollowerId(resultSet.getInt(1));
            following.setFollowingId(id);
            following.setAccepted(resultSet.getBoolean(3));
            followers.add(following);
        }
        //resultSet.close();
        return followers;
    }

    public List<Following> getFollowingsAndInfoById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getFollowingsAndInfoById, args);
        List<Following> followings = new ArrayList<>();
        while (resultSet.next()) {
            Following following = new Following();
            following.setFollowerId(id);
            following.setFollowingId(resultSet.getInt(2));
            following.setAccepted(resultSet.getBoolean(3));
            following.setFollowingUsertable(populateUsertable(resultSet, 4, ""));
            followings.add(following);
        }
        ////resultSet.close();
        return followings;
    }

    public List<Following> getFollowersAndInfoById(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getFollowersAndInfoById, args);
        List<Following> followings = new ArrayList<>();
        while (resultSet.next()) {
            Following following = new Following();
            following.setFollowerId(id);
            following.setFollowingId(resultSet.getInt(2));
            following.setAccepted(resultSet.getBoolean(3));
            following.setFollowerUsertable(populateUsertable(resultSet, 4, ""));
            followings.add(following);
        }
        //resultSet.close();
        return followings;
    }

    public List<SessionRequest> getGameRequestsAndInfoByUserId(Integer id, String info, Optional<String> filter, Optional<Short> value) throws SQLException {
        ResultSet resultSet;
        boolean bool;
        if (info.equals("sessionInfo")) {
            if (!filter.isPresent()) {
                resultSet = riftRepository.doQuery(getGameRequestsAndGameInfoByUserId, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                resultSet = riftRepository.doQuery(getGameRequestsAndGameInfoByUserIdAndAccepted, new Object[] {id, value.get()});
            } else {
                return null;
            }
            List<SessionRequest> sessionRequests = sessionRequestService.populateGameRequestsWithInfo(resultSet, new String[] {"sessionInfo"});
            //resultSet.close();
            return sessionRequests;
        } else if (info.equals("hostInfo")) {
            if (!filter.isPresent()) {
                resultSet = riftRepository.doQuery(getGameRequestsAndHostInfoByUserId, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                resultSet = riftRepository.doQuery(getGameRequestsAndHostInfoByUserIdAndAccepted, new Object[] {id, value.get()});
            } else {
                return null;
            }
            List<SessionRequest> sessionRequests = sessionRequestService.populateGameRequestsWithInfo(resultSet, new String[] {"hostInfo"});
            //resultSet.close();
            return sessionRequests;
        } else if (info.equals("hostInfo&sessionInfo")) {
            if (!filter.isPresent()) {
                resultSet = riftRepository.doQuery(getGameRequestsAndGameInfoAndHostInfoByUserId, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                resultSet = riftRepository.doQuery(getGameRequestsAndHostInfoAndSessionInfoByUserIdAndAccepted, new Object[] {id, value.get()});
            } else {
                return null;
            }
            List<SessionRequest> sessionRequests = sessionRequestService.populateGameRequestsWithInfo(resultSet, new String[] {"hostInfo", "sessionInfo"});
            //resultSet.close();
            return sessionRequests;
        } else {
            if (!filter.isPresent()) {
                resultSet = riftRepository.doQuery(getRequestsByUser, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                resultSet = riftRepository.doQuery(getGameRequestsByUserIdAndAccepted, new Object[] {id, value.get()});
            } else {
                return null;
            }
            List<SessionRequest> sessionRequests = sessionRequestService.populateGameRequestsWithInfo(resultSet, new String[] {});
            //resultSet.close();
            return sessionRequests;
        }
    }



    public List<Notification> getUserActivity(Integer id, String info) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet;
        if (info.equals("session")) {
            resultSet = riftRepository.doQuery(getUserActiviyAndUserSession, args);
        } else {
            resultSet = riftRepository.doQuery(getUserActivity, args);
        }
        List<Notification> notifications = notificationService.populateNotifications(resultSet, 1, info);
        //resultSet.close();
        return notifications;
    }

    public List<Notification> getUserNotifications(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getUserNotifications, args);
        if (resultSet.next()) {
            List<Notification> notifications = notificationService.populateNotifications(resultSet, 1, "");
            //resultSet.close();
            return notifications;
        }
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
        //resultSet.close();
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
        //resultSet.close();
        return transactionData;
    }


    /**
     *
     * Gets broadcast notifications: relevant notifications from people you follow that aren't necessarily directed
     * specifically at you, thus they have been broadcasted.
     * i.e. a Rifter posts a new game. The activity notification will not be directed at any one individual, but will
     * be broadcast to all his followers.
     * @param id
     * @return
     */
    public List<Notification> getBroadcastNotifications(Integer id, String type) throws SQLException {

        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet;
        if (type.equals("Followers")) {
            resultSet = riftRepository.doQuery(getBroadcastNotificationsForFollower, args);
        } else {
            resultSet = riftRepository.doQuery(getBroadcastNotifications, args);
        }
        List<Notification> notifications = new ArrayList<>();
        while (resultSet.next()) {
            Notification notification = new Notification();
            notification.setId(resultSet.getInt(1));
            notification.setUserId(resultSet.getInt(2));
            notification.setNotificationType(resultSet.getString(3));
            notification.setNotificationContent(resultSet.getString(4));
            notification.setSessionId(resultSet.getInt(5));
            notification.setCreatedTime(resultSet.getTimestamp(6));
            notification.setCreatorId(resultSet.getInt(7));
            Usertable usertable = new Usertable();
            usertable.setId(notification.getCreatorId());
            usertable.setFirstName(resultSet.getString(8));
            usertable.setLastName(resultSet.getString(9));
            usertable.setIsPrivate(resultSet.getBoolean(10));
            usertable.setIsSuspended(resultSet.getBoolean(11));
            usertable.setProfilePicturePath(resultSet.getString(12));
            usertable.setRiftTag(resultSet.getString(13));
            usertable.setRifteeRating(resultSet.getDouble(14));
            usertable.setRifterRating(resultSet.getDouble(15));
            usertable.setGender(resultSet.getBoolean(16));
            notification.setCreatorUsertable(usertable);
            notifications.add(notification);
        }
        //resultSet.close();
        resultSet = riftRepository.doQuery(getSessionBroadcastsByUserId, args);
        while(resultSet.next()) {
            Notification notification = notificationService.populateNotification(resultSet, 1, "");
            notifications.add(notification);
        }
        //resultSet.close();
        return notifications;
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
        //resultSet.close();
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
            e.printStackTrace();
            return "";
        }
    }

}
