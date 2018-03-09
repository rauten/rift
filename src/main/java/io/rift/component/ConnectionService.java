package io.rift.component;


import io.rift.config.SwaggerConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.annotation.PostConstruct;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

@Service
public class ConnectionService {

    @Autowired
    private SwaggerConfig swaggerConfig;
    public Connection connection;
    private final String filename = "BOOT-INF/classes/sql.xml";
    public HashMap<String, PreparedStatement> queryDict;

    @PostConstruct
    public void init() throws SQLException {
        try {
            System.out.println("**********\nConnecting to database");

            connection = swaggerConfig.dataSource().getConnection();

        } catch (SQLException e) {
            System.out.println("SQLException io.swagger.DAOs.AndrewDAO.java line 32:\n " + e.getMessage());
        }
        Document doc = null;
        try {
            System.out.println("Parsing sql.xml");

            InputStream f = Thread.currentThread().getContextClassLoader().getResourceAsStream(filename);
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            doc = dBuilder.parse(f);

            doc.getDocumentElement().normalize();
        } catch (Exception e) {
            System.out.println("XML parsing error: " + e.getMessage());
        }
        //populating query hashmap for efficiency
        try {
            System.out.println("Preparing Statements");
            queryDict = new HashMap<String, PreparedStatement>();
            NodeList nl = doc.getElementsByTagName("*");
            for (int i = 0; i < nl.getLength(); i++) {
                Node n = nl.item(i);
                System.out.println("Query: " + n.getNodeName());
                queryDict.put(n.getNodeName(), connection.prepareStatement(n.getTextContent()));
            }
        } catch (SQLException e) {
            System.out.println("SQLException: " + e.getMessage());
        }
        System.out.println("**********");



    }

}
