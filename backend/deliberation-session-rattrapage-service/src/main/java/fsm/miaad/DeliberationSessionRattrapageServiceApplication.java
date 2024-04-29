package fsm.miaad;

import fsm.miaad.services.RattService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableFeignClients
@EnableScheduling
public class DeliberationSessionRattrapageServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliberationSessionRattrapageServiceApplication.class, args);
		System.out.println("=============================================================================\n" +
				"Deliberation Session Rattrapage Service is lanced on port 9999\n" +
				"=============================================================================");

	}

}