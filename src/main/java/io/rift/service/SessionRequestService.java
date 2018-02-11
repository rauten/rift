package io.rift.service;


import com.google.common.base.CaseFormat;
import com.sun.org.apache.xpath.internal.operations.Bool;
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
import java.util.ArrayList;
import java.util.List;

@Service
public class SessionRequestService {


    @Autowired
    private RifterSessionService rifterSessionService;

    @Autowired UsertableService usertableService;

    @Autowired
    private RiftRepository riftRepository;

    private final Integer POPULATESIZE = 4;

    private final String getGameRequestBySessionAndRifteeId = "getGameRequestBySessionAndRifteeId";
    private final String createSessionRequest = "createSessionRequest";

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
        sessionRequest.setAccepted(resultSet.getBoolean(startPoint + 2));
        resultSet.close();
        return sessionRequest;
    }

    public List<SessionRequest> populateGameRequests(ResultSet resultSet) throws SQLException {
        List<SessionRequest> rifteeSessions = new ArrayList<>();
        while (resultSet.next()) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setRifteeId(resultSet.getInt(1));
            sessionRequest.setSessionId(resultSet.getInt(2));
            sessionRequest.setAccepted(resultSet.getBoolean(3));
            rifteeSessions.add(sessionRequest);
        }
        resultSet.close();
        return rifteeSessions;
    }

    public List<SessionRequest> populateGameRequestsWithInfo(ResultSet resultSet, String[] info) throws SQLException {
        List<SessionRequest> rifteeSessions = new ArrayList<>();
        while (resultSet.next()) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setRifteeId(resultSet.getInt(1));
            sessionRequest.setSessionId(resultSet.getInt(2));
            sessionRequest.setAccepted(resultSet.getBoolean(3));
            sessionRequest.setHostId(resultSet.getInt(4));
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
        resultSet.close();
        return rifteeSessions;
    }

    public Boolean createSessionRequest(SessionRequest sessionRequest) throws SQLException {

        if (!riftRepository.doQuery(getGameRequestBySessionAndRifteeId, new Object[] {sessionRequest.getRifteeId(),
                sessionRequest.getSessionId()}).next()) {

            return riftRepository.doInsert(createSessionRequest, new Object[] {sessionRequest.getRifteeId(),
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
            return riftRepository.doUpdate(query, args);
        }
        return true;

    }



}
