package fsm.miaad;

import fsm.miaad.services.ResultatModuleService;
import fsm.miaad.services.ResultatSemestreService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class DeliberationSemestreServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliberationSemestreServiceApplication.class, args);
		System.out.println("=============================================================================\n" +
				"Deliberation Semestre Service is lanced on port 1212\n" +
				"=============================================================================");
	}

}
