package fsm.miaad.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import fsm.miaad.Entities.Element;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fsm.miaad.Dtos.ModuleRequestDTO;
import fsm.miaad.Dtos.ModuleResponseDTO;
import fsm.miaad.Entities.Module;
import fsm.miaad.Entities.Responsable;
import fsm.miaad.Mappers.ModuleMapper;
import fsm.miaad.Repositories.ModuleRepository;
import fsm.miaad.Repositories.ResponsableRepository;

@Service
@Transactional
public class ModuleServiceImpl implements ModuleService{
    private final ModuleRepository moduleRepository;
    private final ModuleMapper moduleMapper;
    private final ResponsableRepository responsableRepository;

    public ModuleServiceImpl(ModuleRepository moduleRepository, ModuleMapper moduleMapper, ResponsableRepository responsableRepository){
        this.moduleRepository = moduleRepository;
        this.moduleMapper = moduleMapper;
        this.responsableRepository = responsableRepository;
    }

    public List<Element> getElementsForModule(Long moduleId) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new NoSuchElementException("Module not found with ID: " + moduleId));

        return module.getElementsModule(); // Assuming you have a method to get elements from Module entity
    }

    @Override
    public List<ModuleResponseDTO> allModules() {
        List<ModuleResponseDTO> listeModulesDTO = new ArrayList<>();
        List<Module> listeModules = moduleRepository.findAll();
        for (Module module : listeModules) {
            listeModulesDTO.add(moduleMapper.fromModule(module));
        }
        return listeModulesDTO;
    }

    @Override
    public ModuleResponseDTO addModule(ModuleRequestDTO moduleRequestDTO) {
        return moduleMapper.fromModule(moduleRepository.save(moduleMapper.fromModuleDTO(moduleRequestDTO)));
    }

    @Override
    public ModuleResponseDTO findMooduleById(Long id) {
        return moduleMapper.fromModule(moduleRepository.findById(id).orElseThrow(()->new RuntimeException("Ce module n'exist pas.")));
    }

    @Override
    public List<ModuleResponseDTO> findModuleByIntitule(String intitule) {
        List<ModuleResponseDTO> modulesByIntitule = new ArrayList<>();
        List<Module> listeModules = moduleRepository.findAll();
        for (Module module : listeModules) {
            if (module.getIntitule().toUpperCase().contains(intitule.toUpperCase()))
                modulesByIntitule.add(moduleMapper.fromModule(module));
        }
        return modulesByIntitule;
    }

    @Override
    public List<ModuleResponseDTO> findModuleByResponsable(Long id) {
        List<ModuleResponseDTO> modulesByResponsable = new ArrayList<>();
        List<Module> listeModules = moduleRepository.findAll();
        Responsable responsableModules = responsableRepository.findById(id).orElseThrow(()->new RuntimeException("Responsable inexistant."));
        for (Module module : listeModules) {
            if ((module.getResponsableModule().getNom() == responsableModules.getNom()) & (module.getResponsableModule().getPrenom() == responsableModules.getPrenom()))
                modulesByResponsable.add(moduleMapper.fromModule(module));
        }
        return modulesByResponsable;
    }

    @Override
    public ModuleResponseDTO updateModule(Long id, ModuleRequestDTO moduleRequestDTO) {
        return moduleMapper.fromModule(moduleRepository.save(moduleMapper.updateModule(moduleRepository.findById(id).orElseThrow(()->new RuntimeException("Ce module n'exist pas.")), moduleRequestDTO)));
    }

    @Override
    public void deleteModule(Long id) {
        moduleRepository.deleteById(id);
    }

    @Override
    public Map<Long, String> modules() {
        List<Module> allModules = moduleRepository.findAll();
        return allModules.stream().collect(Collectors.toMap(Module::getId, Module::getIntitule));
    }
}
