package fsm.miaad.Services;

import java.util.List;
import java.util.Map;

import fsm.miaad.Dtos.ModuleRequestDTO;
import fsm.miaad.Dtos.ModuleResponseDTO;
import fsm.miaad.Entities.Element;

public interface ModuleService {
    List<Element> getElementsForModule(Long moduleId);
    List<ModuleResponseDTO> allModules();
    ModuleResponseDTO addModule(ModuleRequestDTO moduleRequestDTO);
    ModuleResponseDTO findMooduleById(Long id);
    List<ModuleResponseDTO> findModuleByIntitule(String intitule);
    List<ModuleResponseDTO> findModuleByResponsable(Long id);
    ModuleResponseDTO updateModule(Long id, ModuleRequestDTO moduleRequestDTO);
    void deleteModule(Long id);
    Map<Long, String> modules();
}
