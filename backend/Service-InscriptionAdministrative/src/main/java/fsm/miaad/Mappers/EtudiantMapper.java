package fsm.miaad.Mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import fsm.miaad.Entities.Etudiant;
import fsm.miaad.Models.EtudiantInscriptionEnLigne;

@Component
public class EtudiantMapper {
    public Etudiant fromEtudiantInscriptionEnLigne(EtudiantInscriptionEnLigne etudiantInscriptionEnligne){
        Etudiant etudiant = new Etudiant();
        BeanUtils.copyProperties(etudiantInscriptionEnligne, etudiant);
        return etudiant;
    }
}
