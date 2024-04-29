package fsm.miaad.repositories;

import feign.Param;
import fsm.miaad.entities.Etablissement;
import fsm.miaad.models.EtablissementIdName;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface EtablissementRepository extends JpaRepository<Etablissement,String> {

    @Query("SELECT new fsm.miaad.models.EtablissementIdName(e.codeName,e.nom) FROM Etablissement e")
    List<EtablissementIdName> getAllIdName();

    @Query("SELECT e FROM Etablissement e JOIN e.filiereIds f WHERE e.codeName = :codename AND f = :filiereId")
    Etablissement findByCodenameAndFiliereId(@Param("codename") String codename, @Param("filiereId") Long filiereId);

    @Modifying
    @Transactional
    @Query("UPDATE Etablissement e SET e.filiereIds = :newFiliereIds WHERE e.codeName = :codename")
    void deleteFiliereFromEtabById(@Param("codename") String codename, @Param("newFiliereIds") List<Long> newFiliereIds);


    Etablissement findByCodeName(String codeName);
    Etablissement findByAdminUsername(String adminUsername);
}


