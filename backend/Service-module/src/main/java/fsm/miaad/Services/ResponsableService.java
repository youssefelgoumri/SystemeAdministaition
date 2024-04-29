package fsm.miaad.Services;

import java.util.List;

import fsm.miaad.Dtos.ResponsableRequestDTO;
import fsm.miaad.Dtos.ResponsableResponseDTO;

public interface ResponsableService {
    ResponsableResponseDTO findResponsable(Long id);
    ResponsableResponseDTO addResponsable(ResponsableRequestDTO responsableRequestDTO);
    ResponsableResponseDTO updateResponsable(Long id, ResponsableRequestDTO responsableRequestDTO);
    void deleteResponsable(Long id);
    List<ResponsableResponseDTO> allResponsable();
}
