package io.rift.controller;


import com.fasterxml.jackson.annotation.JsonView;
import io.rift.component.DeferredResultService;
import io.rift.component.DeviceVerificationService;
import io.rift.feature.TwitchService;
import io.rift.model.Notification;
import io.rift.model.SessionRequest;
import io.rift.model.Usertable;
import io.rift.model.Views;
import io.rift.service.*;
import io.rift.service.notifications.ActivityNotificationService;
import io.rift.service.notifications.BroadcastNotificationService;
import io.rift.service.notifications.UserNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.WebRequest;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import javax.imageio.stream.ImageOutputStream;
import javax.imageio.stream.MemoryCacheImageInputStream;
import javax.imageio.stream.MemoryCacheImageOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.*;
import java.beans.IntrospectionException;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.net.*;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.sql.SQLException;
import java.util.*;
import java.util.List;

@CrossOrigin(origins = "localhost:4200")
@RestController
@RequestMapping("/api")
public class UsertableController {

    @Autowired
    private UsertableService usertableService;

    @Autowired
    private FollowingService followingService;

    @Autowired
    private SessionRequestService sessionRequestService;

    @Autowired
    private ActivityNotificationService activityNotificationService;

    @Autowired
    private BroadcastNotificationService broadcastNotificationService;

    @Autowired
    private UserNotificationService userNotificationService;

    @Autowired
    private TwitchService twitchService;

    @Autowired
    private DeferredResultService resultService;

    @Autowired
    private DeviceVerificationService deviceVerificationService;

    @RequestMapping(method = RequestMethod.GET, value = "/user/{riftTag}/id")
    public Map<String, Integer> getRiftIdByRiftTag(@PathVariable String riftTag) throws SQLException {
        Map<String, Integer> tagMap = new HashMap<>();
        tagMap.put("id", usertableService.getRiftIdByRiftTag(riftTag));
        return tagMap;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/riftTag")
    public Map<String, String> getRiftTagByRiftId(@PathVariable Integer id) throws SQLException {
        Map<String, String> idMap = new HashMap<>();
        idMap.put("riftTag", usertableService.getRiftTagByRiftId(id));
        return idMap;
    }

    /**
     * The result of a Usertable NATURAL JOIN Notification query
     * @param id The user id we want to get information for
     * @return A User object with notifications
     */
    @RequestMapping(method=RequestMethod.GET, value="/user/direct_notifications/{id}")
    public Usertable getUserAndDirectNotifications(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setNotificationList(userNotificationService.getNotifications(id, ""));
        return usertable;
    }

    /**
     * The result of a Usertable NATURAL JOIN Notification query (looking for activity)
     * @param id The user id we want to get activity information for
     * @return A User object with activities
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/activity/{id}")
    public Usertable getUserAndActivity(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        List<Notification> userActivities = activityNotificationService.getNotifications(id, "");
        usertable.setCreatorActivityList(userActivities);
        return usertable;
    }

    /**
     * Just data from the usertable on query by id
     * @param id The user id we want to get information for
     * @return A User object
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}")
    public Usertable getUser(@PathVariable Integer id) throws SQLException {
        return usertableService.getUserById(id);
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's followings
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followings")
    public Usertable getUserAndFollowings(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setFollowings(followingService.getFollowingsById(id));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's Followers objects
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followers")
    public Usertable getUserAndFollowers(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setFollowers(followingService.getFollowersById(id));
        return usertable;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followingsandfollowers/userInfo")
    public Usertable getUserAndFollowingsAndFollowersAndInfo(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setFollowers(followingService.getFollowersAndInfoById(id));
        usertable.setFollowings(followingService.getFollowingsAndInfoById(id));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's Following/Follower objects
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/followingsandfollowers")
    public Usertable getUserAndFollowersAndFollowings(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowing(id));
        usertable.setFollowers(followingService.getFollowersById(id));
        usertable.setFollowings(followingService.getFollowingsById(id));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's Broadcast Notification objects
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/broadcast_notifications")
    public Usertable getUserAndBroadcastNotifications(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowing(usertableService.getNumberFollowing(id));
        usertable.setBroadcastNotificationList(broadcastNotificationService.getNotifications(id, "User"));
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @return - Usertable object with info and user's Notification objects
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}/notifications")
    public Usertable getUserAndNotifications(@PathVariable Integer id) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
        usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
        usertable.setNumberFollowing(usertableService.getNumberFollowing(id));
        usertable.setBroadcastNotificationList(broadcastNotificationService.getNotifications(id, "User"));
        usertable.setNotificationList(userNotificationService.getNotifications(id, ""));
        return usertable;
    }

    /**
     *
     * @param
     * @return - Usertable object with info and user's Rifter Session objects
     * @throws SQLException
     */

    @JsonView(Views.UserRifterSessions.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{riftTag}/rifterSessions")
    public Usertable getUserAndRifterSessions(@PathVariable String riftTag) throws SQLException {
        Usertable usertable = usertableService.getUserByRiftTag(riftTag);
        usertable.setRifterSessions(usertableService.getUserAndRifterSession(usertable.getId()));
        return usertable;
    }


    @RequestMapping(method = RequestMethod.GET, value = {"/user/{riftTag}/rifteeSessions/{info}", "/user/{riftTag}/rifteeSessions"})
    public Usertable getUserAndRifteeSessionsAndInfo(@PathVariable String riftTag, @PathVariable Optional<String> info) throws SQLException {
        Usertable usertable = usertableService.getUserByRiftTag(riftTag);
        if (info.isPresent()) {
            usertable.setRifteeSessions(sessionRequestService.getSessionRequestsAndInfoByUserId(usertable.getId(), info.get(), Optional.empty(), Optional.empty()));
        } else {
            usertable.setRifteeSessions(sessionRequestService.getSessionRequestsAndInfoByUserId(usertable.getId(), "", Optional.empty(), Optional.empty()));
        }
        return usertable;
    }

    /**
     *
     * @param id - The user id
     * @param filter The filter param
     *               Options: accepted
     * @param value The filter value
     *              Options for accepted: true/false
     * @return - Usertable with SessionRequests/Session info
     * @throws SQLException
     */
    @RequestMapping(method = RequestMethod.GET, value = {"/user/{id}/rifteeSessions/filterBy:{filter}={value}/{info}", "/user/{id}/rifteeSessions/filterBy:{filter}={value}"})
    public Usertable getUserAndRifteeSessions(@PathVariable Integer id, @PathVariable String filter, @PathVariable Short value, @PathVariable Optional<String> info) throws SQLException {
        Usertable usertable = usertableService.getUserById(id);
        if (info.isPresent()) {
            usertable.setRifteeSessions(sessionRequestService.getSessionRequestsAndInfoByUserId(id, info.get(), Optional.of(filter), Optional.of(value)));
        } else {
            usertable.setRifteeSessions(sessionRequestService.getSessionRequestsAndInfoByUserId(id, "", Optional.of(filter), Optional.of(value)));
        }
        return usertable;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/{riftId}/session/{sessionId}")
    public Map<String, Object> getTransactionDataFromUserAndSessionId(@PathVariable String riftId, @PathVariable String sessionId) throws SQLException {
        return usertableService.getTransactionDataFromUserAndSessionId(riftId, sessionId);
    }

    @JsonView(Views.ProfilePageView.class)
    @RequestMapping(method = RequestMethod.GET, value = "/user/{riftTag}/profilePage")
    public Usertable getUserProfilePage(@PathVariable String riftTag, WebRequest webRequest) throws SQLException {
        Usertable usertable = usertableService.getUserByRiftTag(riftTag);
        usertable.setEmail("rileyyauten@gmail.com");
        usertable.setMacAddress("9k01ld901k");
        /**
         *
         * Uncomment once Gordon has fixed the null login problem
         */

        try {
            InetAddress address = InetAddress.getLocalHost();
            NetworkInterface nwi = NetworkInterface.getByInetAddress(address);
            byte[] macBytes = nwi.getHardwareAddress();
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < macBytes.length; i++) {
                sb.append(String.format("%02X%s", macBytes[i], (i < macBytes.length - 1) ? "-" : ""));
            }
            String macString = sb.toString();
            System.out.println(macString);
            if (usertable.getMacAddress() != null && !usertable.getMacAddress().equals(macString)) {
                List<String> registeredMacAddresses = usertableService.getMacAddresses(usertable.getId());
                if (!registeredMacAddresses.contains(macString)) {
                    deviceVerificationService.verifyDevice(usertable, macString);
                }
            } else if (usertable.getMacAddress() == null) {
                usertable.setMacAddress(macString);
                try {
                    usertableService.updateUser(usertable);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

        } catch (UnknownHostException | SocketException e) {
            e.printStackTrace();
        }

        try {
            int id = usertable.getId();
            usertable.setRifteeSessions(sessionRequestService.getSessionRequestsAndInfoByUserId(id, "hostInfo&sessionInfo", Optional.empty(), Optional.empty()));
            usertable.setFollowers(followingService.getFollowersAndInfoById(id));
            usertable.setFollowings(followingService.getFollowingsAndInfoById(id));
            usertable.setCreatorActivityList(activityNotificationService.getNotifications(id, "session"));
            usertable.setNumberFollowing(usertableService.getNumberFollowing(id));
            usertable.setNumberFollowers(usertableService.getNumberFollowers(id));
            usertable.setGamesPlayed(usertableService.getNumberGamesPlayedByUserId(id));
            usertable.setRifterSessions(usertableService.getUserAndRifterSession(id));
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        return usertable;

    }




    /**
     * Valid input:
     * {
         "firstName":"Steph",
         "lastName":"Curry",
         "gender":true,
         "riftTag":"chefcurry"
     }
     *
     * Can modify what input we want
     * @param usertable - Usertable instance we wish to put in the database
     * @return boolean - Success or not
     * @throws SQLException
     */
    @JsonView(Views.CreateUser.class)
    @RequestMapping(method = RequestMethod.PUT, value = "/user/createUser")
    public Boolean createUser(@RequestBody Usertable usertable) throws SQLException {
        try {
            List<NetworkInterface> nis = Collections.list(NetworkInterface.getNetworkInterfaces());
            NetworkInterface ni = nis.get(0);
            String macAddress = ni.getHardwareAddress().toString();
            usertable.setMacAddress(macAddress);
        } catch (SocketException e) {
            e.printStackTrace();
        }
        return usertableService.createUser(usertable);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/user/updateUser")
    public Boolean updateUpdate(@RequestBody Usertable usertable) throws SQLException, IOException, IntrospectionException, IllegalAccessException, InvocationTargetException {
        String riftTag = usertable.getRiftTag();
        if (!riftTag.equals("")) {
            Usertable user = usertableService.getUserByRiftTag(riftTag);
            if (user != null) {
                return false;
            }
        }
        return usertableService.updateUser(usertable);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/user/putPicture/{keyBase}/{bucket}")
    public boolean putProfilePicture(@PathVariable String keyBase, @RequestBody String image, @PathVariable String bucket) throws URISyntaxException {

        byte[] bytes = image.getBytes();
        int[] ints = new int[bytes.length];
        for (int i = 0; i < bytes.length; i++) {
            ints[i] = bytes[i];
        }
        BufferedImage bufferedImage = new BufferedImage(528, 960, BufferedImage.TYPE_INT_ARGB_PRE);


        //ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);


        try {
            BufferedImage img = new BufferedImage(528, 960, BufferedImage.TYPE_INT_RGB);
            DataBuffer dataBuffer = new DataBufferInt(ints, ints.length);
            Raster raster = Raster.createRaster(img.getSampleModel(), dataBuffer, null);
            img.setData(raster);
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            BufferedImage img = new BufferedImage(528, 960, BufferedImage.TYPE_INT_BGR);
            DataBuffer dataBuffer = new DataBufferInt(ints, ints.length);
            Raster raster = Raster.createRaster(img.getSampleModel(), dataBuffer, null);
            img.setData(raster);
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            BufferedImage img = new BufferedImage(528, 960, BufferedImage.TYPE_INT_ARGB_PRE);
            DataBuffer dataBuffer = new DataBufferInt(ints, ints.length);
            Raster raster = Raster.createRaster(img.getSampleModel(), dataBuffer, null);
            img.setData(raster);
        } catch (Exception e) {
            e.printStackTrace();
        }

        //InputStream in = byteArrayInputStream;
        //BufferedImage bufferedImage = ImageIO.read(in);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(bytes.length);
        System.out.println("First size of output: " + outputStream.size());

        final JPEGImageWriteParam param = new JPEGImageWriteParam(null);
        param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        param.setCompressionQuality(0.5f);

        try (MemoryCacheImageOutputStream mcios = new MemoryCacheImageOutputStream(outputStream)) {
            final ImageWriter writer = ImageIO.getImageWritersByFormatName("jpg").next();
            writer.setOutput(mcios);
            writer.write(null, new IIOImage(bufferedImage, null, null), param);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

        byte[] compressedBytes = outputStream.toByteArray();
        String compressedImage = new String(compressedBytes);
        System.out.println("New size of output: " + outputStream.size());
        return usertableService.putPicture(keyBase, image, bucket);

    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/getPicture/{keyBase}/{bucket}")
    public @ResponseBody Map<String, String> getProfilePicture(@PathVariable String keyBase, @PathVariable String bucket) throws IOException {
        Map<String, String> imageMap = new HashMap<>();
        String str = usertableService.getPicture(keyBase, bucket);
        imageMap.put("image", str);
        return imageMap;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/stop/{id}/{sessionId}")
    public void stop(@PathVariable Integer id, @PathVariable String sessionId) throws SQLException {
        usertableService.logout(id);
        resultService.shutdown(sessionId, id.toString());
    }


    /**
     * It took three seconds to get session requests (bad)
     * It took three seconds to get broadcast notifications
     * It took ten seconds to get the activity list (!!)
     *
     */
}
