package fsm.miaad;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServiceModuleApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceModuleApplication.class, args);
		System.out.println("=============================================================================\n" +
				"Service Module is lanced on port 4444\n" +
				"=============================================================================");
	}
	
}
