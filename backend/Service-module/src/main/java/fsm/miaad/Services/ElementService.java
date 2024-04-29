package fsm.miaad.Services;

import java.util.List;
import java.util.Map;

import fsm.miaad.Dtos.ElementRequestDTO;
import fsm.miaad.Dtos.ElementResponseDTO;

public interface ElementService {
    ElementResponseDTO findElement(Long id);
    List<ElementResponseDTO> findElementsByModule(Long id);
    ElementResponseDTO addElement(ElementRequestDTO elementRequestDTO);
    ElementResponseDTO updateElement(Long id, ElementRequestDTO elementRequestDTO);
    void deleteElement(Long id);
    List<ElementResponseDTO> allElements();
    Map<Long, Integer> controbutionElements(List<Long> ids);
}