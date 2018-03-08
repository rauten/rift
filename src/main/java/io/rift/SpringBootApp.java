package io.rift;

import io.rift.controller.EmailController;
import io.rift.service.UsertableService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class SpringBootApp {

    public static void main(String[] args) throws Exception {
        new SpringApplication(SpringBootApp.class).run(args);
    }


}
