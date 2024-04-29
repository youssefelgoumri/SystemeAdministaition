package fsm.miaad.Mappers;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import fsm.miaad.Dtos.ModuleRequestDTO;
import fsm.miaad.Dtos.ModuleResponseDTO;
import fsm.miaad.Entities.Element;
import fsm.miaad.Entities.Module;
import fsm.miaad.Entities.Responsable;
import fsm.miaad.Repositories.ElementRepository;
import fsm.miaad.Repositories.ResponsableRepository;

@Component
public class ModuleMapper {
    ElementMapper elementMapper;
    ResponsableMapper responsableMapper;
    ElementRepository elementRepository;
    ResponsableRepository responsableRepository;

    public ModuleMapper(ElementMapper elementMapper, ResponsableMapper responsableMapper, ElementRepository elementRepository, ResponsableRepository responsableRepository){
        this.elementMapper = elementMapper;
        this.responsableMapper = responsableMapper;
        this.elementRepository = elementRepository;
        this.responsableRepository = responsableRepository;
    }
    
    public ModuleResponseDTO fromModule(Module module){
        ModuleResponseDTO moduleResponseDTO = new ModuleResponseDTO();
        BeanUtils.copyProperties(module, moduleResponseDTO);
        moduleResponseDTO.setResponsableModule(responsableMapper.fromResponsable(module.getResponsableModule()));
        moduleResponseDTO.setElementsModule(elementMapper.fromElements(module.getElementsModule()));
        return moduleResponseDTO;
    }

    public Module fromModuleDTO(ModuleRequestDTO moduleRequestDTO){
        Module module = Module.builder()
        .intitule(moduleRequestDTO.getIntitule())
        .responsableModule(responsableRepository.findById(moduleRequestDTO.getResponsableModule().getId()).orElse(null))
        .build();
        
        return module;
    }

    public Module updateModule(Module oldModule, ModuleRequestDTO moduleRequestDTO){
        String intitule = moduleRequestDTO.getIntitule();
        Responsable responsable = moduleRequestDTO.getResponsableModule();
        List<Element> elements = moduleRequestDTO.getElementsModule();
        if ((intitule != null) && !(intitule.equals(oldModule.getIntitule())))
            oldModule.setIntitule(moduleRequestDTO.getIntitule());
        if (responsable != null)
            oldModule.setResponsableModule(responsable);
        if (elements != null)
            oldModule.setElementsModule(elements);
        return oldModule;
    }
}
