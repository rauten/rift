package io.rift.service;


import io.rift.model.GameAccount;
import io.rift.model.Usertable;
import io.rift.repository.RiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class GameAccountService {

    @Autowired
    private RiftRepository riftRepository;

    @Autowired
    private GameService gameService;

    @Autowired
    private UsertableService usertableService;

    public final Integer POPULATESIZE = 5;

    private final String getGameAccountById = "getGameAccountById";
    private final String getGameAccountAndGameById = "getGameAccountAndGameById";
    private final String getGameAccountsByUsertableId = "getGameAccountsByUsertableId";
    private final String getGameAccountByAttributes = "getGameAccountByAttributes";
    private final String getGameAccountAndGameByAttributes = "getGameAccountAndGameByAttributes";
    private final String getGameAccountAndGameByUsertableId = "getGameAccountAndGameByUsertableId";
    private final String getGameAccountByGameId = "getGameAccountByGameId";
    private final String getGameAccountAndGameByGameId = "getGameAccountAndGameByGameId";
    private final String getGameAccountByIgn = "getGameAccountByIgn";
    private final String getGameAccountAndGameByIgn = "getGameAccountAndGameByIgn";

    private final String getGameAccountAndGameByUsertableIdAndGameId = "getGameAccountAndGameByUsertableIdAndGameId";
    private final String getGameAccountByUsertableIdAndGameId = "getGameAccountByUsertableIdAndGameId";

    private final String createGameAccount = "createGameAccount";

    private final String deleteAccountById = "deleteAccountById";

    private final String foreignKeyError = "ERROR: update or delete on table \"gameaccount\" violates foreign key constraint \"riftergame_usertable_id_game_account_id_game_id_fkey\"";

    public GameAccount populateGameAccount(ResultSet resultSet, Integer startPoint, String info) throws SQLException {
        GameAccount gameAccount = new GameAccount();
        gameAccount.setUsertableId(resultSet.getInt(startPoint));
        gameAccount.setGameId(resultSet.getInt(startPoint + 1));
        gameAccount.setIgn(resultSet.getString(startPoint + 2));
        gameAccount.setId(resultSet.getInt(startPoint + 3));
        gameAccount.setVerified(resultSet.getBoolean(startPoint + 4));
        if (info.equals("game")) {
            gameAccount.setGame(gameService.populateGame(resultSet, POPULATESIZE + 1, ""));
        }
        return gameAccount;
    }

    public List<GameAccount> populateGameAccounts(ResultSet resultSet, Integer startPoint, String info) throws SQLException {
        List<GameAccount> gameAccounts = new ArrayList<>();
        try {
            while (resultSet.next()) {
                GameAccount gameAccount = new GameAccount();
                gameAccount.setUsertableId(resultSet.getInt(startPoint));
                gameAccount.setGameId(resultSet.getInt(startPoint + 1));
                gameAccount.setIgn(resultSet.getString(startPoint + 2));
                gameAccount.setId(resultSet.getInt(startPoint + 3));
                gameAccount.setVerified(resultSet.getBoolean(startPoint + 4));
                if (info.equals("game")) {
                    gameAccount.setGame(gameService.populateGame(resultSet, POPULATESIZE + 1, ""));
                }
                gameAccounts.add(gameAccount);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return gameAccounts;
    }

    private ResultSet doQueryByInfo(String info, Object[] args) {
        ResultSet resultSet;
        if (info.equals("game")) {
            resultSet = riftRepository.doQuery(getGameAccountAndGameById, args);
        } else {
            resultSet = riftRepository.doQuery(getGameAccountById, args);
        }
        return resultSet;
    }

    public GameAccount getGameAccountById(Integer id, String info) throws SQLException {
        Object[] args = new Object[1];
        args[0] = id;
        ResultSet resultSet = doQueryByInfo(info, args);
        GameAccount gameAccount;
        if (resultSet.next()) {
            gameAccount = populateGameAccount(resultSet, 1, info);
            resultSet.close();
            return gameAccount;
        }
        resultSet.close();
        return null;
    }

    public GameAccount getGameAccountByAttributes(Integer usertableId, Integer gameId, String ign, String info) throws SQLException {
        Object[] args = new Object[3];
        args[0] = usertableId;
        args[1] = gameId;
        args[2] = ign;
        ResultSet resultSet;
        if (info.equals("game")) {
            resultSet = riftRepository.doQuery(getGameAccountAndGameByAttributes, args);
        } else {
            resultSet = riftRepository.doQuery(getGameAccountByAttributes, args);
        }
        doQueryByInfo(info, args);
        GameAccount gameAccount;
        if (resultSet.next()) {
            gameAccount = populateGameAccount(resultSet, 1, info);
            resultSet.close();
            return gameAccount;
        }
        resultSet.close();
        return null;
    }

    public List<GameAccount> getGameAccountsByUsertableIdAndGameId(Integer usertableId, Integer gameId, String info) throws SQLException {
        Object[] args = new Object[2];
        args[0] = usertableId;
        args[1] = gameId;
        ResultSet resultSet;
        if (info.equals("game")) {
            resultSet = riftRepository.doQuery(getGameAccountAndGameByUsertableIdAndGameId, args);
        } else {
            resultSet = riftRepository.doQuery(getGameAccountByUsertableIdAndGameId, args);
        }
        try {
            List<GameAccount> gameAccounts = populateGameAccounts(resultSet, 1, info);
            resultSet.close();
            return gameAccounts;
        } catch (Exception e) {
            e.printStackTrace();
        }
        resultSet.close();
        return null;
    }

    public List<GameAccount> getGameAccountsByUsertableId(Integer usertableId, String info) throws SQLException {
        Object[] args = new Object[1];
        args[0] = usertableId;
        ResultSet resultSet;
        if (info.equals("game")) {
            resultSet = riftRepository.doQuery(getGameAccountAndGameByUsertableId, args);
        } else {
            resultSet = riftRepository.doQuery(getGameAccountsByUsertableId, args);
        }
        return populateGameAccounts(resultSet, 1, info);
    }

    public List<GameAccount> getGameAccountsByGameId(Integer gameId, String info) throws SQLException {
        Object[] args = new Object[1];
        args[0] = gameId;
        ResultSet resultSet;
        if (info.equals("game")) {
            resultSet = riftRepository.doQuery(getGameAccountAndGameByGameId, args);
        } else {
            resultSet = riftRepository.doQuery(getGameAccountByGameId, args);
        }
        return populateGameAccounts(resultSet, 1, info);
    }

    public List<GameAccount> getGameAccountsByIgn(String ign, String info) throws SQLException {

        Object[] args = new Object[1];
        args[0] = ign;
        ResultSet resultSet;
        if (info.equals("game")) {
            resultSet = riftRepository.doQuery(getGameAccountAndGameByIgn, args);
        } else {
            resultSet = riftRepository.doQuery(getGameAccountByIgn, args);
        }
        return populateGameAccounts(resultSet, 1, info);

    }

    public boolean createGameAccount(GameAccount gameAccount) {
        return riftRepository.doInsert(createGameAccount, new Object[] {gameAccount.getUsertableId(), gameAccount.getGameId(), gameAccount.getIgn()});
    }

    public boolean updateGameAccountById(GameAccount gameAccount) {
        List<Object> objects = new ArrayList<>();
        objects.add(gameAccount.getIgn());
        objects.add(gameAccount.getId());
        return riftRepository.doUpdate(new StringBuilder("UPDATE gameaccount SET ign = ? WHERE id = ?"), objects);
    }

    public boolean deleteAccountById(Integer id) {
        Object[] args = new Object[] {id};
        String message = riftRepository.doDeleteWithMessage(deleteAccountById, args);
        if (message.equals("Success")) {
            return true;
        } else if (message.startsWith("ERROR: update or delete on table \"gameaccount\" violates foreign key constraint \"riftergame_usertable_id_game_account_id_game_id_fkey\"")) {
            return false;
        }
        System.out.println("Message: " + message);
        return false;

        /*
        if (result.startsWith(foreignKeyError)) {
            return "sessionsExist";
        }
        if (result.equals("success")) {
            return "success";
        }
        return result;
        */
    }

}
