package fsm.miaad.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fsm.miaad.Dtos.ResponsableRequestDTO;
import fsm.miaad.Dtos.ResponsableResponseDTO;
import fsm.miaad.Entities.Responsable;
import fsm.miaad.Mappers.ResponsableMapper;
import fsm.miaad.Repositories.ResponsableRepository;

@Service
@Transactional
public class ResponsableServiceImpl implements ResponsableService{
    private final ResponsableRepository responsableRepository;
    private final ResponsableMapper responsableMapper;

    public ResponsableServiceImpl(ResponsableRepository responsableRepository, ResponsableMapper responsableMapper) {
        this.responsableRepository = responsableRepository;
        this.responsableMapper = responsableMapper;
    }

    @Override
    public ResponsableResponseDTO findResponsable(Long id) {
        return responsableMapper.fromResponsable(responsableRepository.findById(id).orElseThrow(()->new RuntimeException("Ce responsable n'exist pas.")));
    }

    @Override
    public ResponsableResponseDTO addResponsable(ResponsableRequestDTO responsableRequestDTO) {
        return responsableMapper.fromResponsable(responsableRepository.save(responsableMapper.fromResponsableDTO(responsableRequestDTO)));
    }

    @Override
    public ResponsableResponseDTO updateResponsable(Long id, ResponsableRequestDTO responsableRequestDTO) {
        return responsableMapper.fromResponsable(responsableRepository.save(responsableMapper.updateResponsableDTO(responsableRepository.findById(id).orElseThrow(()->new RuntimeException("Ce responsable n'exist pas.")), responsableRequestDTO)));
    }

    @Override
    public void deleteResponsable(Long id) {
        responsableRepository.deleteById(id);
    }

    @Override
    public List<ResponsableResponseDTO> allResponsable() {
        List<ResponsableResponseDTO> listeResponsablesDTO = new ArrayList<>();
        List<Responsable> listeResponsables = responsableRepository.findAll();
        for (Responsable responsable : listeResponsables) {
            listeResponsablesDTO.add(responsableMapper.fromResponsable(responsable));
        }
        return listeResponsablesDTO;
    }
    
}
