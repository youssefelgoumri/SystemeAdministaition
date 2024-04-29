package fsm.miaad.Mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import fsm.miaad.Dtos.ResponsableRequestDTO;
import fsm.miaad.Dtos.ResponsableResponseDTO;
import fsm.miaad.Entities.Responsable;

@Component
public class ResponsableMapper {

    public ResponsableResponseDTO fromResponsable(Responsable responsable){
        ResponsableResponseDTO responsableResponseDTO = new ResponsableResponseDTO();
        BeanUtils.copyProperties(responsable, responsableResponseDTO);
        return responsableResponseDTO;
    }

    public Responsable fromResponsableDTO(ResponsableRequestDTO responsableRequestDTO){
        return Responsable.builder()
        .nom(responsableRequestDTO.getNom())
        .prenom(responsableRequestDTO.getPrenom())
        .build();
    }

    public Responsable updateResponsableDTO(Responsable oldResponsable, ResponsableRequestDTO responsableRequestDTO){
        String nom = responsableRequestDTO.getNom();
        String prenom = responsableRequestDTO.getPrenom();
        if ((nom != null) && !(nom.equals(oldResponsable.getNom())))
            oldResponsable.setNom(responsableRequestDTO.getNom());
        if ((prenom != null) && !(prenom.equals(oldResponsable.getNom())))
            oldResponsable.setPrenom(responsableRequestDTO.getPrenom());
        return oldResponsable;
    }
}
