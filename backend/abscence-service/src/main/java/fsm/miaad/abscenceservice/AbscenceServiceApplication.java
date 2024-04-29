package fsm.miaad.abscenceservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AbscenceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AbscenceServiceApplication.class, args);
        System.out.println("=============================================================================\n" +
                "Abscence Service is lanced on port 2020\n" +
                "=============================================================================");
    }
}
