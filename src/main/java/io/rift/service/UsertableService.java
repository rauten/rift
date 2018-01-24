package io.rift.service;


import io.rift.config.SwaggerConfig;
import io.rift.model.GameRequest;
import io.rift.model.Usertable;
import io.rift.repository.UsertableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

@Service
public class UsertableService {

    @Autowired
    private UsertableRepository usertableRepository;

    /*
    @Autowired
    private SwaggerConfig swaggerConfig;

    @Autowired
    private ConnectionService connectionService;
    */

    public Usertable getUserById(Integer id) {
        return usertableRepository.findById(id);
    }

    public Usertable getUserByFirstName(String name) { return usertableRepository.findByFirstName(name); }


}
