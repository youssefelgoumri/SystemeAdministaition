package fsm.miaad;

import fsm.miaad.entities.AnneeUniv;
import fsm.miaad.entities.Semestre;
import fsm.miaad.entities.Session;
import fsm.miaad.enums.NomSession;
import fsm.miaad.enums.TypeSession;
import fsm.miaad.repositories.AnneeUnivRepository;
import fsm.miaad.repositories.SemestreRepository;
import fsm.miaad.repositories.SessionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class AnneeUniversitaireServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnneeUniversitaireServiceApplication.class, args);
        System.out.println("=============================================================================\n" +
                "Annee Universitaire Service Service is lanced on port 3333\n" +
                "=============================================================================");

    }
}

