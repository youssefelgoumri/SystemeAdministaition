package fsm.miaad;

import fsm.miaad.entities.ValidationParam;
import fsm.miaad.services.ValParaService;

import org.hibernate.mapping.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ValidationParamServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ValidationParamServiceApplication.class, args);
		System.out.println("=============================================================================\n" +
				"Validation Param Service is lanced on port 1313\n" +
				"=============================================================================");
	}
	@Bean
	CommandLineRunner initData(ValParaService valParaService) {
		return args -> {
			for(int i=1;i<=7;i++) {
				ValidationParam validationParam = ValidationParam.builder()
						.filiereID((long)i)
						.X(10f)
						.Z(5f)
						.Y(10f)
						.build();
				validationParam=valParaService.addValidationParam(validationParam);

			}

		};
	}
}



