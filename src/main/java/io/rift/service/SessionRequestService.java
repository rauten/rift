package io.rift.service;


import com.google.common.base.CaseFormat;
import io.rift.config.PollingConfig;
import io.rift.model.Notification;
import io.rift.model.RifterSession;
import io.rift.model.SessionRequest;
import io.rift.model.Usertable;
import io.rift.repository.RiftRepository;
import org.apache.bcel.classfile.ClassParser;
import org.apache.bcel.classfile.Field;
import org.apache.bcel.classfile.JavaClass;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SessionRequestService {


    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired UsertableService usertableService;

    @Autowired
    public PollingConfig pollingConfig;

    @Autowired
    private RiftRepository riftRepository;

    private final Integer POPULATESIZE = 4;

    private final String getGameRequestBySessionAndRifteeId = "getGameRequestBySessionAndRifteeId";
    private final String createSessionRequest = "createSessionRequest";
    private final String getSessionRequestByRiftTag = "getSessionRequestByRiftTag";
    private final String getRequestStatus = "getRequestStatus";
    private final String deleteSessionRequest = "deleteSessionRequest";

    private final String updateSessionRequestStart = "UPDATE gameRequest SET (";
    private final String updateSessionRequestPath = "/io/rift/model/SessionRequest.class";
    private final String sessionRequestClass = "SessionRequest.class";
    private final String updateSessionRequestEnd = " WHERE riftee_id = ? AND session_id = ?";

    private final String booleanStr = "Boolean";
    private final String stringStr = "String";
    private final String intStr = "Integer";
    private final String doubleStr = "Double";

    public SessionRequest populateGameRequest(ResultSet resultSet, int startPoint) throws SQLException {
        SessionRequest sessionRequest = new SessionRequest();
        sessionRequest.setRifteeId(resultSet.getInt(startPoint));
        sessionRequest.setSessionId(resultSet.getInt(startPoint + 1));
        sessionRequest.setHostId(resultSet.getInt(startPoint + 2));
        sessionRequest.setAccepted(resultSet.getShort(startPoint + 3));
        return sessionRequest;
    }

    public List<SessionRequest> populateGameRequests(ResultSet resultSet) throws SQLException {
        List<SessionRequest> rifteeSessions = new ArrayList<>();
        while (resultSet.next()) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setRifteeId(resultSet.getInt(1));
            sessionRequest.setSessionId(resultSet.getInt(2));
            sessionRequest.setHostId(resultSet.getInt(3));
            sessionRequest.setAccepted(resultSet.getShort(4));
            rifteeSessions.add(sessionRequest);
        }
        return rifteeSessions;
    }

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

    public List<SessionRequest> populateGameRequestsWithInfo(ResultSet resultSet, String[] info) throws SQLException {
        List<SessionRequest> rifteeSessions = new ArrayList<>();
        while (resultSet.next()) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setRifteeId(resultSet.getInt(1));
            sessionRequest.setSessionId(resultSet.getInt(2));
            sessionRequest.setHostId(resultSet.getInt(3));
            sessionRequest.setAccepted(resultSet.getShort(4));
            int startPoint = 5;
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

    public Boolean createSessionRequest(SessionRequest sessionRequest) throws SQLException {

        boolean success = false;
        if (!riftRepository.doQuery(getGameRequestBySessionAndRifteeId, new Object[] {sessionRequest.getRifteeId(),
                sessionRequest.getSessionId()}).next()) {

            success = riftRepository.doInsert(createSessionRequest, new Object[] {sessionRequest.getRifteeId(),
                    sessionRequest.getSessionId(), sessionRequest.getAccepted(), sessionRequest.getHostId()});
        }
        return false;
    }

    public Boolean updateSessionRequest(SessionRequest sessionRequest) throws SQLException, IOException, IntrospectionException, IllegalAccessException, InvocationTargetException {
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
        return true;
    }

    public Integer deleteSessionRequest(Integer rifteeId, Integer sessionId) throws SQLException {
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
                        // Flat rate charge
                        return 2;
                    } else if (seconds >= 43200) {
                        // 50% refund, automatically charge card 50%
                        return 1;
                    } else {
                        // 0% refund, automatically charge card full amount
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

    public List<SessionRequest> getSessionRequestByRiftTag(String riftTag) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftTag;
        ResultSet resultSet = riftRepository.doQuery(getSessionRequestByRiftTag, args);
        List<SessionRequest> sessionRequests = new ArrayList<>(resultSet.getFetchSize());
        while(resultSet.next()) {
            SessionRequest sessionRequest = populateGameRequest(resultSet, 1);
            sessionRequests.add(sessionRequest);
        }
        resultSet.close();
        return sessionRequests;
    }



}
