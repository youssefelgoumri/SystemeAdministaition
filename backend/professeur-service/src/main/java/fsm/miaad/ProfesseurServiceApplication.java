package fsm.miaad;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ProfesseurServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProfesseurServiceApplication.class, args);
		System.out.println("=============================================================================\n" +
				"Professeur Service is lanced on port 1010\n" +
				"=============================================================================");
	}
}
