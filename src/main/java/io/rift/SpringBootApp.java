package io.rift;

import io.rift.service.UsertableService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class SpringBootApp {

    public static void main(String[] args) throws Exception {
        new SpringApplication(SpringBootApp.class).run(args);



    }


}
