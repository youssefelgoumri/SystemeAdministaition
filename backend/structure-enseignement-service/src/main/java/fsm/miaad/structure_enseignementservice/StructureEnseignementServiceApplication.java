package fsm.miaad.structure_enseignementservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class StructureEnseignementServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(StructureEnseignementServiceApplication.class, args);
		System.out.println("=============================================================================\n" +
				"StructureEnseignementService server is lanced on port 5555\n" +
				"=============================================================================");

	}
}

