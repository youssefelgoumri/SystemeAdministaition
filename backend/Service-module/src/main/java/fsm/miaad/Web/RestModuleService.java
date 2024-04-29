package fsm.miaad.Web;

import java.util.List;
import java.util.Map;

import fsm.miaad.Entities.Element;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fsm.miaad.Services.ElementService;
import fsm.miaad.Services.ModuleService;
import fsm.miaad.Services.ResponsableService;
import fsm.miaad.Dtos.ElementRequestDTO;
import fsm.miaad.Dtos.ElementResponseDTO;
import fsm.miaad.Dtos.ModuleRequestDTO;
import fsm.miaad.Dtos.ModuleResponseDTO;
import fsm.miaad.Dtos.ResponsableRequestDTO;
import fsm.miaad.Dtos.ResponsableResponseDTO;

@RestController
@RequestMapping("/")
public class RestModuleService{
    private final ResponsableService responsableService;
    private final ElementService elementService;
    private final ModuleService moduleService;

    public RestModuleService(ResponsableService responsableService, ElementService elementService, ModuleService moduleService){
        this.responsableService = responsableService;
        this.elementService = elementService;
        this.moduleService = moduleService;
    }

    @GetMapping("modules/{moduleId}/elements")
    public List<Element> getElementsForModule(@PathVariable Long moduleId) {
        return moduleService.getElementsForModule(moduleId);
    }

    @GetMapping("modules")
    public List<ModuleResponseDTO> modules(){
        return moduleService.allModules();
    }

    @GetMapping("modulesInfos")
    public Map<Long, String> modulesInfos(){
        return moduleService.modules();
    }

    @GetMapping("modules/{id}")
    public ModuleResponseDTO module(@PathVariable Long id){
        return moduleService.findMooduleById(id);
    }

    @GetMapping("elements")
    public List<ElementResponseDTO> elements(){
        return elementService.allElements();
    }

    @GetMapping("elements/{id}")
    public ElementResponseDTO element(@PathVariable Long id){
        return elementService.findElement(id);
    }

    @GetMapping("elements/controbution/{ids}")
    public Map<Long, Integer> controbutions(@PathVariable List<Long> ids){
        return elementService.controbutionElements(ids);
    }

    @GetMapping("responsables")
    public List<ResponsableResponseDTO> responsables(){
        return responsableService.allResponsable();
    }

    @GetMapping("responsables/{id}")
    public ResponsableResponseDTO responsable(@PathVariable Long id){
        return responsableService.findResponsable(id);
    }

    @PutMapping("modules/edit/{id}")
    public ModuleResponseDTO update(@PathVariable Long id, @RequestBody ModuleRequestDTO moduleDTO){
        return moduleService.updateModule(id, moduleDTO);
    }

    @PutMapping("elements/edit/{id}")
    public ElementResponseDTO update(@PathVariable Long id, @RequestBody ElementRequestDTO elementDTO){
        return elementService.updateElement(id, elementDTO);
    }

    @PutMapping("responsables/edit/{id}")
    public ResponsableResponseDTO update(@PathVariable Long id, @RequestBody ResponsableRequestDTO responsableDTO){
        return responsableService.updateResponsable(id, responsableDTO);
    }

    @PostMapping("modules/add")
    public ModuleResponseDTO save(@RequestBody ModuleRequestDTO moduleDTO){
        return moduleService.addModule(moduleDTO);
    }

    @PostMapping("elements/add")
    public ElementResponseDTO save(@RequestBody ElementRequestDTO elementDTO){
        return elementService.addElement(elementDTO);
    }

    @PostMapping("responsables/add")
    public ResponsableResponseDTO save(@RequestBody ResponsableRequestDTO responsableDTO){
        return responsableService.addResponsable(responsableDTO);
    }

    @DeleteMapping("modules/delete/{id}")
    public void deleteModule(@PathVariable Long id){
        List<ElementResponseDTO> elementsDTO = moduleService.findMooduleById(id).getElementsModule();
        for (ElementResponseDTO elementDTO : elementsDTO) {
            elementService.deleteElement(elementDTO.getId());
        }
        moduleService.deleteModule(id);
    }

    @DeleteMapping("elements/delete/{id}")
    public void deleteElement(@PathVariable Long id){
        elementService.deleteElement(id);
    }

    @DeleteMapping("responsables/delete/{id}")
    public void deleteResponsable(@PathVariable Long id){
        List<ModuleResponseDTO> modulesDTO = moduleService.findModuleByResponsable(id);
        for (ModuleResponseDTO moduleDTO : modulesDTO) {
            List<ElementResponseDTO> elementsDTO = moduleDTO.getElementsModule();
            for (ElementResponseDTO elementDTO : elementsDTO) {
                elementService.deleteElement(elementDTO.getId());
            }
            moduleService.deleteModule(moduleDTO.getId());
        }
        responsableService.deleteResponsable(id);
    }
}
