package io.rift.service;

import com.google.common.base.CaseFormat;
import io.rift.model.RifterSession;
import io.rift.model.SessionRequest;
import io.rift.model.Usertable;
import io.rift.repository.RiftRepository;
import org.apache.bcel.classfile.ClassParser;
import org.apache.bcel.classfile.JavaClass;
import org.postgresql.util.PGInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import org.apache.bcel.classfile.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class RifterSessionService {

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private UsertableService usertableService;

    public final int POPULATESIZE = 15;

    private final String getRifterGameById = "getRifterGameById";
    private final String getRifterGameAndHostByGameId = "getRifterGameAndHostByGameId";
    private final String getGamePlayersByGameId = "getGamePlayersByGameId";
    private final String createGame = "createGame";
    private final String createNotification = "createNotification";
    private final String getRifterSessionByHostIdAndSessionTime = "getRifterSessionByHostIdAndSessionTime";
    private final String getRifteeSessionsAndRequestByRiftTag = "getRifteeSessionsAndRequestByRiftTag";

    private final String updateRifterSessionStart = "UPDATE riftergame SET(";
    private final String updateRifterSessionPath = "/io/rift/model/RifterSession.class";
    private final String rifterSessionClass = "RifterSession.class";
    private final String updateRifterSessionEnd = " WHERE id = ?";

    private final String booleanStr = "Boolean";
    private final String stringStr = "String";
    private final String intStr = "Integer";
    private final String doubleStr = "Double";


    private final String sessionCreatedType = "New Game";


    public RifterSession getRifterGameById(Integer id) throws SQLException {

        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getRifterGameById, args);
        if (resultSet.next()) {
            RifterSession rifterSession = populateRifterSession(resultSet, 1, "");
            resultSet.close();
            return rifterSession;
        }
        resultSet.close();
        return null;
    }

    public RifterSession getRifterGameAndHostByGameId(Integer id) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getRifterGameAndHostByGameId, args);
        if (resultSet.next()) {
            RifterSession rifterSession = populateRifterSession(resultSet, 1, "");
            if (rifterSession.getId() != null) {
                Usertable usertable = usertableService.populateUsertable(resultSet, POPULATESIZE + 1, "");
                rifterSession.setUsertable(usertable);
            }
            resultSet.close();
            return rifterSession;
        }
        resultSet.close();
        return null;
    }

    public List<Usertable> getGamePlayersByGameId(Integer id) throws SQLException {

        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = riftRepository.doQuery(getGamePlayersByGameId, args);
        List<Usertable> players = new ArrayList<>();
        while (resultSet.next()) {
            Usertable usertable = usertableService.populateUsertable(resultSet, 1, "");
            players.add(usertable);
        }
        resultSet.close();
        return players;
    }

    public RifterSession getRifterSessionByHostIdAndSessionTime(Integer hostId, Timestamp sessionTime) throws SQLException {

        Object[] args = new Object[2];
        args[0] = hostId;
        args[1] = sessionTime;
        ResultSet resultSet = riftRepository.doQuery(getRifterSessionByHostIdAndSessionTime, args);
        if (resultSet.next()) {
            RifterSession rifterSession = populateRifterSession(resultSet, 1, "");
            resultSet.close();
            return rifterSession;
        }
        resultSet.close();
        return null;
    }

    public List<RifterSession> getRifteeSessionsAndRequestByRiftTag(String riftTag) throws SQLException {
        Object[] args = new Object[1];
        args[0] = riftTag;
        ResultSet resultSet = riftRepository.doQuery(getRifteeSessionsAndRequestByRiftTag, args);
        List<RifterSession> rifterSessions = new ArrayList<>(resultSet.getFetchSize());
        while (resultSet.next()) {
            RifterSession rifterSession = populateRifterSession(resultSet, 1, "request");
            rifterSessions.add(rifterSession);
        }
        return rifterSessions;
    }

    public RifterSession populateRifterSession(ResultSet resultSet, int startPoint, String info) throws SQLException {
        RifterSession rifterSession = new RifterSession();
        rifterSession.setId(resultSet.getInt(startPoint));
        rifterSession.setHostId(resultSet.getInt(startPoint + 1));
        rifterSession.setNumSlots(resultSet.getInt(startPoint + 2));
        rifterSession.setExpirationTime(resultSet.getTimestamp(startPoint + 3));
        rifterSession.setSessionCost(resultSet.getDouble(startPoint + 4));
        rifterSession.setMethodOfContact(resultSet.getString(startPoint + 5));
        rifterSession.setSessionType(resultSet.getString(startPoint + 6));
        rifterSession.setTitle(resultSet.getString(startPoint + 7));
        rifterSession.setHits(resultSet.getInt(startPoint + 8));
        rifterSession.setSessionDuration((PGInterval)resultSet.getObject(startPoint + 9));
        rifterSession.setSessionTime(resultSet.getTimestamp(startPoint + 10));
        rifterSession.setGame(resultSet.getString(startPoint + 11));
        rifterSession.setConsole(resultSet.getString(startPoint + 12));
        rifterSession.setSlotsRemaining(resultSet.getInt(startPoint + 13));
        rifterSession.setCreatedTime(resultSet.getTimestamp(startPoint + 14));
        if (info.equals("levenshteinSearch")) {
            rifterSession.setGameLevenshtein(resultSet.getDouble(startPoint + 15));
            rifterSession.setGameFirstWordLevenshtein(resultSet.getDouble(startPoint + 16));
            rifterSession.setRiftTagLevenshtein(resultSet.getDouble(startPoint + 17));
            rifterSession.setUsertable(usertableService.populateUsertable(resultSet, startPoint + 18, ""));
        } else if (info.equals("request")) {
            SessionRequest sessionRequest = new SessionRequest();
            sessionRequest.setAccepted(resultSet.getShort(startPoint + 15));
            List<SessionRequest> sessionRequests = new ArrayList<>();
            sessionRequests.add(sessionRequest);
            rifterSession.setSessionRequests(sessionRequests);
        }
        return rifterSession;
    }

    public boolean createGame(RifterSession rifterSession) throws SQLException {
        boolean success2 = false;
        boolean success = riftRepository.doInsert(createGame,
                new Object[] {rifterSession.getHostId(), rifterSession.getNumSlots(), rifterSession.getSessionCost(), rifterSession.getTitle(), rifterSession.getSessionDuration(),
                        rifterSession.getSessionTime(), rifterSession.getGame(), rifterSession.getConsole(), rifterSession.getNumSlots(), rifterSession.getCreatedTime()});

        if (success) {
            String notificationContent = rifterSession.getHostId() + " has created a new session slot for " + rifterSession.getGame() + " on " + rifterSession.getConsole() + "!";

            RifterSession newRifterSession = getRifterSessionByHostIdAndSessionTime(rifterSession.getHostId(), rifterSession.getSessionTime());

            success2 = riftRepository.doInsert(createNotification,
                    new Object[]{null, sessionCreatedType, notificationContent, newRifterSession.getId(), rifterSession.getHostId()});
        }

        return success2;
    }

    public Boolean updateRifterSession(RifterSession rifterSession) throws SQLException, IOException, IntrospectionException, IllegalAccessException, InvocationTargetException {
        int rifterSessionId = rifterSession.getId();
        String str = updateRifterSessionStart;
        StringBuilder query = new StringBuilder(str);
        StringBuilder values = new StringBuilder("(");
        ClassParser parser = new ClassParser(RifterSessionService.class.getResourceAsStream(updateRifterSessionPath), rifterSessionClass);
        JavaClass javaClass = parser.parse();
        Field[] fields = javaClass.getFields();
        List<Object> args = new ArrayList<>();
        boolean didAdd = false;
        for (int i = 0; i < POPULATESIZE; i++) {
            String[] properties = fields[i].toString().split(" ");
            String attribute = properties[2];
            PropertyDescriptor pd = new PropertyDescriptor(attribute, RifterSession.class);
            Method getter = pd.getReadMethod();
            Object f = getter.invoke(rifterSession);
            if (f != null && !f.toString().equals("")) {
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
            query.append(updateRifterSessionEnd);
            args.add(rifterSessionId);
            return riftRepository.doUpdate(query, args);
        }
        return true;
    }



    /*
    public RifterSession getRifterGameById(Integer id) {
        return rifterGameRepository.getRifterGameById(id);
    }
    */

}
