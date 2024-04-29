package fsm.miaad;


import fsm.miaad.entities.Etablissement;
// import fsm.miaad.models.Filiere;
// import fsm.miaad.models.ResponsableFiliere;
import fsm.miaad.services.EtablissementServiceImp;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

// import java.util.Arrays;

@SpringBootApplication
@EnableFeignClients
public class EtablissementServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EtablissementServiceApplication.class, args);
        System.out.println("=============================================================================\n" +
                "EtablissementService server is lanced on port 7777\n" +
                "=============================================================================");
    }

    @Bean
    CommandLineRunner start(EtablissementServiceImp service,RepositoryRestConfiguration restConfiguration){
        restConfiguration.exposeIdsFor(Etablissement.class);
        return args -> {
            Etablissement etablissement= Etablissement.builder()
                    .nom("Faculte des science de Meknes")
                    .codeName("FSM")
                    .discipline("Science")
                    .ville("Meknes")
                    .adminUsername("adminFSM")
                    .adminPassword("admin")
                    .build();
            etablissement=service.addEtablissement(etablissement);
        //     Filiere filiere= Filiere.builder()
        //             .nom("LPDSIC")
        //             .nombreAnnees(1)
        //             .nombreSemestresParAnnee(2)
        //             .responsable(ResponsableFiliere.builder()
        //                     .nom("LAHMAR")
        //                     .prenom("Mohammed")
        //                     .build())
        //             .moduleIds(Arrays.asList(1L)) // Ajoutez les IDs des modules que vous souhaitez associer
        //             .build();

//            service.addFilieresToEtablissement(etablissement.getCodeName(),filiere);//Arrays.asList(filiere));

        };
    }

}
