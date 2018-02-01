package io.rift;

import io.rift.service.UsertableService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EnableJpaRepositories(basePackages = "io.rift.repository")
public class SpringBootApp {


    public static void main(String[] args) throws Exception {
        new SpringApplication(SpringBootApp.class).run(args);



    }


}
