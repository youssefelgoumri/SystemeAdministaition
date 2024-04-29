package fsm.miaad;

import fsm.miaad.entities.Salle;
import fsm.miaad.entities.TypeSalle;
import fsm.miaad.repositories.SalleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@SpringBootApplication
@EnableFeignClients
public class ReservationSalleServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(ReservationSalleServiceApplication.class, args);
		System.out.println("=============================================================================\n" +
				"ReservationSalleService server is lanced on port 10001\n" +
				"=============================================================================");
	}

	@Bean
	CommandLineRunner initData(SalleRepository salleRepository/*, professorRepository professorRepository*/) {
		return args -> {
			// Add informations
			Salle salle1 = Salle.builder()
					.nom("Salle A")
					.typeSalle(TypeSalle.LANGUE_ALLEMANDE)
					.description("salle pour langue ")
					.build();

			Salle salle2 = Salle.builder()
					.nom("Salle B")
					.typeSalle(TypeSalle.COUR)
					.description("salle COUR BLANCHE")
					.build();
			Salle salle3 = Salle.builder()
					.nom("Salle C")
					.typeSalle(TypeSalle.LANGUE_ALLEMANDE)
					.description("salle pour langue contient du materials")
					.build();

			Salle salle4 = Salle.builder()
					.nom("Salle D")
					.typeSalle(TypeSalle.COUR)
					.description("salle COUR")
					.build();

			Salle salle5 = Salle.builder()
					.nom("Salle E")
					.typeSalle(TypeSalle.TP)
					.description("salle  TP")
					.build();

			// Save the Salle instances to the repository
			salleRepository.save(salle1);
			salleRepository.save(salle2);
			salleRepository.save(salle3);
			salleRepository.save(salle4);
			salleRepository.save(salle5);

			System.out.println("Saved Salle instances:");
			System.out.println(salle1);
			System.out.println(salle2);
			System.out.println(salle3);
			System.out.println(salle4);
			System.out.println(salle5);
			//////////////////////
			/*Professor prof1=Professor.builder()
					.id_prof("benhlima")
					.build();
			Professor prof2=Professor.builder()
					.id_prof("bekri")
					.build();
			Professor prof3=Professor.builder()
					.id_prof("oubelkacem")
					.build();
			professorRepository.save(prof1);
			professorRepository.save(prof2);
			professorRepository.save(prof3);
			System.out.println(prof1);
			System.out.println(prof2);
			System.out.println(prof2);
			*/

			////////////////////////////////
			LocalDateTime currentDateTime = LocalDateTime.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			String formattedDateTime = currentDateTime.format(formatter);

			System.out.println("Current Time: " + formattedDateTime);

		/*	System.out.println("**********HELLO TEST RESERVATION************");
			// Add reservation informations
			LocalDateTime debut1 = LocalDateTime.of(2024, 1, 18, 8, 30); // Replace with your desired date and time
			LocalDateTime fin1 = LocalDateTime.of(2024, 1, 18, 12, 45); // Replace with your desired date and time
			Date d1 = java.sql.Timestamp.valueOf(debut1);
			Date f1 = java.sql.Timestamp.valueOf(fin1);
			reservation reservation1 = new reservation("prof1", salle1.getId(), d1,f1);
			reservationRepository.save(reservation1);

			LocalDateTime debut2 = LocalDateTime.of(2024, 1, 18, 12, 30); // Replace with your desired date and time
			LocalDateTime fin2 = LocalDateTime.of(2024, 1, 18, 22, 50); // Replace with your desired date and time
			Date d2 = java.sql.Timestamp.valueOf(debut2);
			Date f2 = java.sql.Timestamp.valueOf(fin2);
			reservation reservation2 = new reservation("prof2", salle2.getId(), d2, f2);
			reservationRepository.save(reservation2);

			LocalDateTime debut3 = LocalDateTime.of(2024, 1, 18, 19, 30); // Replace with your desired date and time
			LocalDateTime fin3 = LocalDateTime.of(2024, 1, 18, 23, 30); // Replace with your desired date and time
			Date d3 = java.sql.Timestamp.valueOf(debut3);
			Date f3 = java.sql.Timestamp.valueOf(fin3);
			reservation reservation3 = new reservation("prof3", salle3.getId(), d3, f3);
			reservationRepository.save(reservation3);


			LocalDateTime debut4 = LocalDateTime.of(2024, 1, 18, 14, 30); // Replace with your desired date and time
			LocalDateTime fin4 = LocalDateTime.of(2024, 1, 18, 17, 30); // Replace with your desired date and time
			Date d4 = java.sql.Timestamp.valueOf(debut4);
			Date f4 = java.sql.Timestamp.valueOf(fin4);
			reservation reservation4 = new reservation("prof4", salle4.getId(), d4, f4);
			reservationRepository.save(reservation4);

			System.out.println("Saved Reservation instances:");
			System.out.println(reservation1);
			System.out.println(reservation2);
			System.out.println(reservation3);*/
		};

	}
}
