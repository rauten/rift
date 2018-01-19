package io.rift.repository;


import io.rift.config.SwaggerConfig;
import io.rift.model.Usertable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.annotation.PostConstruct;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Result;
import java.io.InputStream;
import java.io.Reader;
import java.math.BigDecimal;
import java.net.URL;
import java.sql.*;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;


@Repository
public interface UsertableRepository extends CrudRepository<Usertable, Integer> {

    Usertable findById(Integer id);

}
