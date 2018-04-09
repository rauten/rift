package io.rift.service;


import com.google.common.base.CaseFormat;
import io.rift.config.FuturePayments;
import io.rift.config.PollingConfig;
import io.rift.feature.StripeService;
import io.rift.model.Notification;
import io.rift.model.RifterSession;
import io.rift.model.SessionRequest;
import io.rift.model.Usertable;
import io.rift.repository.RiftRepository;
import org.apache.bcel.classfile.ClassParser;
import org.apache.bcel.classfile.Field;
import org.apache.bcel.classfile.JavaClass;
import org.postgresql.util.PGInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class SessionRequestService {


    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired UsertableService usertableService;

    @Autowired
    private SessionRequestService sessionRequestService;

    @Autowired
    public PollingConfig pollingConfig;

    @Autowired
    private FuturePayments futurePayments;

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private StripeService stripeService;

    private final Integer POPULATESIZE = 7;

    public static Usertable customerUsertable = new Usertable();

    private final String getSessionRequestBySessionAndRifteeId = "getSessionRequestBySessionAndRifteeId";
    private final String createSessionRequest = "createSessionRequest";
    private final String getSessionRequestByRiftTag = "getSessionRequestByRiftTag";
    private final String getRequestStatus = "getRequestStatus";
    private final String deleteSessionRequest = "deleteSessionRequest";

    private final String getGameRequestsAndGameInfoByUserId = "getGameRequestsAndGameInfoByUserId";
    private final String getGameRequestsAndGameInfoByUserIdAndAccepted = "getGameRequestsAndGameInfoByUserIdAndAccepted";
    private final String getGameRequestsAndHostInfoByUserId = "getGameRequestsAndHostInfoByUserId";
    private final String getGameRequestsAndHostInfoByUserIdAndAccepted = "getGameRequestsAndHostInfoByUserIdAndAccepted";
    private final String getGameRequestsAndGameInfoAndHostInfoByUserId = "getGameRequestsAndGameInfoAndHostInfoByUserId";
    private final String getGameRequestsAndHostInfoAndSessionInfoByUserIdAndAccepted = "getGameRequestsAndHostInfoAndSessionInfoByUserIdAndAccepted";
    private final String getGetGameRequestBySessionAndRifteeId = "getGetGameRequestBySessionAndRifteeId";
    private final String getRequestsByUser = "getRequestsByUser";
    private final String getGameRequestsByUserIdAndAccepted = "getGameRequestsByUserIdAndAccepted";

    private final String getRifterGameById = "getRifterGameById";
    private final String getUserById = "getUserById";

    private final String updateSessionRequestStart = "UPDATE gameRequest SET (";
    private final String updateSessionRequestPath = "/io/rift/model/SessionRequest.class";
    private final String sessionRequestClass = "SessionRequest.class";
    private final String updateSessionRequestEnd = " WHERE riftee_id = ? AND session_id = ?";

    private final String booleanStr = "Boolean";
    private final String stringStr = "String";
    private final String intStr = "Integer";
    private final String doubleStr = "Double";


    /************************************ POPULATES **************************************/
    /*************************************************************************************/

    public SessionRequest populateSessionRequest(ResultSet resultSet, int startPoint) throws SQLException {
        SessionRequest sessionRequest = new SessionRequest();
        sessionRequest.setRifteeId(resultSet.getInt(startPoint));
        sessionRequest.setSessionId(resultSet.getInt(startPoint + 1));
        sessionRequest.setHostId(resultSet.getInt(startPoint + 2));
        sessionRequest.setAccepted(resultSet.getShort(startPoint + 3));
        sessionRequest.setRifteeGameAccount(resultSet.getInt(startPoint + 4));
        sessionRequest.setChargeId(resultSet.getString(startPoint + 5));
        sessionRequest.setTransferId(resultSet.getString(startPoint + 6));
        return sessionRequest;
    }

    public List<SessionRequest> populateSessionRequests(ResultSet resultSet) throws SQLException {
        List<SessionRequest> rifteeSessions = new ArrayList<>();
        while (resultSet.next()) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setRifteeId(resultSet.getInt(1));
            sessionRequest.setSessionId(resultSet.getInt(2));
            sessionRequest.setHostId(resultSet.getInt(3));
            sessionRequest.setAccepted(resultSet.getShort(4));
            sessionRequest.setRifteeGameAccount(resultSet.getInt(5));
            sessionRequest.setChargeId(resultSet.getString(6));
            sessionRequest.setTransferId(resultSet.getString(7));
            rifteeSessions.add(sessionRequest);
        }
        return rifteeSessions;
    }

    public List<SessionRequest> populateSessionRequestsWithInfo(ResultSet resultSet, String[] info) throws SQLException {
        List<SessionRequest> rifteeSessions = new ArrayList<>();
        while (resultSet.next()) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setRifteeId(resultSet.getInt(1));
            sessionRequest.setSessionId(resultSet.getInt(2));
            sessionRequest.setHostId(resultSet.getInt(3));
            sessionRequest.setAccepted(resultSet.getShort(4));
            sessionRequest.setRifteeGameAccount(resultSet.getInt(5));
            sessionRequest.setChargeId(resultSet.getString(6));
            sessionRequest.setTransferId(resultSet.getString(7));
            int startPoint = POPULATESIZE + 1;
            for (String str : info) {
                if (str.equals("hostInfo")) {
                    Usertable usertable = usertableService.populateUsertable(resultSet, startPoint, "");
                    sessionRequest.setHostUsertable(usertable);
                    startPoint += usertableService.POPULATESIZE;
                } else if (str.equals("sessionInfo")) {
                    RifterSession rifterSession = rifterSessionService.populateRifterSession(resultSet, startPoint, "");
                    sessionRequest.setRifterSession(rifterSession);
                    startPoint += rifterSessionService.POPULATESIZE;
                }
            }
            rifteeSessions.add(sessionRequest);
        }
        return rifteeSessions;
    }




    /************************************ GETTERS **************************************/
    /***********************************************************************************/

    public int getRequestStatus(Integer sessionId, Integer rifteeId) throws SQLException {
        Object[] args = new Object[2];
        args[0] = sessionId;
        args[1] = rifteeId;
        ResultSet resultSet = riftRepository.doQuery(getRequestStatus, args);
        if (resultSet.next()) {
            int res = resultSet.getInt(1);
            resultSet.close();
            return res;
        }
        resultSet.close();
        return -1;
    }

    public List<SessionRequest> getSessionRequestByRiftTag(String riftTag) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftTag;
        ResultSet resultSet = riftRepository.doQuery(getSessionRequestByRiftTag, args);
        List<SessionRequest> sessionRequests = new ArrayList<>(resultSet.getFetchSize());
        while(resultSet.next()) {
            SessionRequest sessionRequest = populateSessionRequest(resultSet, 1);
            sessionRequests.add(sessionRequest);
        }
        resultSet.close();
        return sessionRequests;
    }



    public List<SessionRequest> getSessionRequestsAndInfoByUserId(Integer id, String info, Optional<String> filter, Optional<Short> value) throws SQLException {
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
            List<SessionRequest> sessionRequests = sessionRequestService.populateSessionRequestsWithInfo(resultSet, new String[] {"sessionInfo"});
            resultSet.close();
            return sessionRequests;
        } else if (info.equals("hostInfo")) {
            if (!filter.isPresent()) {
                resultSet = riftRepository.doQuery(getGameRequestsAndHostInfoByUserId, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                resultSet = riftRepository.doQuery(getGameRequestsAndHostInfoByUserIdAndAccepted, new Object[] {id, value.get()});
            } else {
                return null;
            }
            List<SessionRequest> sessionRequests = sessionRequestService.populateSessionRequestsWithInfo(resultSet, new String[] {"hostInfo"});
            resultSet.close();
            return sessionRequests;
        } else if (info.equals("hostInfo&sessionInfo")) {
            if (!filter.isPresent()) {
                resultSet = riftRepository.doQuery(getGameRequestsAndGameInfoAndHostInfoByUserId, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                resultSet = riftRepository.doQuery(getGameRequestsAndHostInfoAndSessionInfoByUserIdAndAccepted, new Object[] {id, value.get()});
            } else {
                return null;
            }
            List<SessionRequest> sessionRequests = sessionRequestService.populateSessionRequestsWithInfo(resultSet, new String[] {"hostInfo", "sessionInfo"});
            resultSet.close();
            return sessionRequests;
        } else {
            if (!filter.isPresent()) {
                resultSet = riftRepository.doQuery(getRequestsByUser, new Object[] {id});
            } else if (filter.get().equals("accepted")) {
                resultSet = riftRepository.doQuery(getGameRequestsByUserIdAndAccepted, new Object[] {id, value.get()});
            } else {
                return null;
            }
            List<SessionRequest> sessionRequests = sessionRequestService.populateSessionRequestsWithInfo(resultSet, new String[] {});
            resultSet.close();
            return sessionRequests;
        }
    }




    /********************************** CREATE *****************************************/
    /***********************************************************************************/

    public Boolean createSessionRequest(SessionRequest sessionRequest) throws SQLException {

        boolean success = false;
        if (!riftRepository.doQuery(getSessionRequestBySessionAndRifteeId, new Object[] {sessionRequest.getRifteeId(),
                sessionRequest.getSessionId()}).next()) {

            success = riftRepository.doInsert(createSessionRequest, new Object[] {sessionRequest.getRifteeId(),
                    sessionRequest.getSessionId(), sessionRequest.getAccepted(), sessionRequest.getHostId(), sessionRequest.getRifteeGameAccount()});

            return success;

        }
        return false;
    }

    public String updateSessionRequest(SessionRequest sessionRequest) throws SQLException, IOException, IntrospectionException, IllegalAccessException, InvocationTargetException {

        Object[] args1 = new Object[1];
        args1[0] = sessionRequest.getSessionId();
        ResultSet resultSet = riftRepository.doQuery(getRifterGameById, args1);
        RifterSession rifterSession = new RifterSession();
        if (resultSet.next()) {
            rifterSession = rifterSessionService.populateRifterSession(resultSet, 1, "");
        }

        if (sessionRequest.getAccepted() == 2) {
            String result = stripeService.setFuturePayment(sessionRequest.getSessionId(), sessionRequest.getRifteeId(), sessionRequest.getHostId(), 1);
            if (!result.equals("Success")) {
                return result;
            }
        }

        // If the session is within an hour of starting, the rifter can no longer accept new riftees or kick existing ones.
        // We can always change this

        /*
        if ((rifterSession.getSessionTime().getTime() < System.currentTimeMillis() + 3600000) && sessionRequest.getAccepted() != 0) {
            return false;
        }
        */

        int rifteeId = sessionRequest.getRifteeId();
        int sessionId = sessionRequest.getSessionId();
        String str = updateSessionRequestStart;
        StringBuilder query = new StringBuilder(str);
        StringBuilder values = new StringBuilder("(");
        ClassParser parser = new ClassParser(UsertableService.class.getResourceAsStream(updateSessionRequestPath), sessionRequestClass);
        JavaClass javaClass = parser.parse();
        Field[] fields = javaClass.getFields();
        List<Object> args = new ArrayList<>();
        boolean didAdd = false;
        boolean success = false;
        for (int i = 0; i < POPULATESIZE; i++) {
            String[] properties = fields[i].toString().split(" ");
            String attribute = properties[2];
            PropertyDescriptor pd = new PropertyDescriptor(attribute, SessionRequest.class);
            Method getter = pd.getReadMethod();
            Object f = getter.invoke(sessionRequest);
            if (f != null && !(f.toString()).equals("")) {
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
            query.append(updateSessionRequestEnd);
            args.add(rifteeId);
            args.add(sessionId);
            success = riftRepository.doUpdate(query, args);
        }

        return "Success";
    }

    public Integer deleteSessionRequest(Integer rifteeId, Integer sessionId, Integer hostId) throws SQLException {
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        Object[] args = new Object[2];
        args[0] = rifteeId;
        args[1] = sessionId;
        int sessionRequestStatus = getRequestStatus(sessionId, rifteeId);
        if (sessionRequestStatus != -1) {
            if (sessionRequestStatus == 1) {
                riftRepository.doDelete(deleteSessionRequest, args);
                // No charge, rifter hasn't accepted
                return 3;
            } else if (sessionRequestStatus == 2) {
                boolean success = riftRepository.doDelete(deleteSessionRequest, args);
                if (success) {
                    Object[] args2 = new Object[1];
                    args2[0] = sessionId;
                    RifterSession rifterSession = rifterSessionService.getRifterSessionBySessionId(sessionId);
                    Timestamp timestamp = rifterSession.getSessionTime();
                    long seconds = (long)Math.ceil((timestamp.getTime() - currentTime.getTime())/1000.0);
                    if (seconds >= 172800) {
                        stripeService.cancelFuturePayment(sessionId, rifteeId, true);
                        /*
                        Double futurePaymentVal = getFuturePaymentVal(sessionId, rifteeId);
                        Future<?> future = futurePayments.futurePaymentMap().get(futurePaymentVal);
                        future.cancel(true);
                        futurePayments.futurePaymentMap().remove(futurePaymentVal);
                        */
                        return 2;
                    } else if (seconds >= 43200) {
                        stripeService.cancelFuturePayment(sessionId, rifteeId, true);

                        // Charge the customer 50%
                        stripeService.setFuturePayment(sessionId, rifteeId, hostId, .5);
                        return 1;
                    } else {
                        // 0% refund, will still charge after the session. If session gets cancelled, the customer
                        // is in luck, won't get charged
                        return 0;
                    }
                }
            } else if (sessionRequestStatus == 0) {
                // Rifter has already rejected your request, no need to do anything
                return -1;
            }
        }
        // No session request found
        return -2;
    }

    public Double getFuturePaymentVal(Integer rifterSessionId, Integer customerId) {
        return rifterSessionId >= customerId ?
                ((double)rifterSessionId * (double)rifterSessionId) + rifterSessionId + customerId :
                rifterSessionId + ((double)customerId * (double)customerId);
    }
}
