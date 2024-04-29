package fsm.miaad.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fsm.miaad.Dtos.ElementRequestDTO;
import fsm.miaad.Dtos.ElementResponseDTO;
import fsm.miaad.Entities.Element;
import fsm.miaad.Entities.Module;
import fsm.miaad.Mappers.ElementMapper;
import fsm.miaad.Repositories.ElementRepository;

@Service
@Transactional
public class ElementServiceImpl implements ElementService{
    ElementRepository elementRepository;
    ElementMapper elementMapper;

    public ElementServiceImpl(ElementRepository elementRepository, ElementMapper elementMapper){
        this.elementRepository = elementRepository;
        this.elementMapper = elementMapper;
    }

    @Override
    public ElementResponseDTO findElement(Long id) {
        return elementMapper.fromElement(elementRepository.findById(id).orElseThrow(()->new RuntimeException("Cet element n'exist pas.")));
    }

    @Override
    public ElementResponseDTO addElement(ElementRequestDTO elementRequestDTO) {
        return elementMapper.fromElement(elementRepository.save(elementMapper.fromElementDTO(elementRequestDTO)));
    }

    @Override
    public ElementResponseDTO updateElement(Long id, ElementRequestDTO elementRequestDTO) {
        return elementMapper.fromElement(elementRepository.save(elementMapper.updateElement(elementRepository.findById(id).orElseThrow(()->new RuntimeException("Cet element n'exist pas.")), elementRequestDTO)));
    }

    @Override
    public void deleteElement(Long id) {
        elementRepository.deleteById(id);
    }

    @Override
    public List<ElementResponseDTO> allElements() {
        List<ElementResponseDTO> listeElementsDTO = new ArrayList<>();
        List<Element> listeElements = elementRepository.findAll();
        for (Element element : listeElements) {
            listeElementsDTO.add(elementMapper.fromElement(element));
        }
        return listeElementsDTO;
    }

    @Override
    public List<ElementResponseDTO> findElementsByModule(Long id) {
        List<ElementResponseDTO> eList = new ArrayList<>();
        List<Element> elements = elementRepository.findAll();
        for (Element element : elements) {
            Module module = element.getModule();
            if (module.getId() == id)
                eList.add(elementMapper.fromElement(element));
        }
        return eList;
    }

    @Override
    public Map<Long, Integer> controbutionElements(List<Long> ids) {
        List<Element> elementsCherches = new ArrayList<>();
        List<Element> elements = elementRepository.findAll();
        for (Element element : elements) {
            if (ids.contains(element.getId()))
                elementsCherches.add(element);
        }
        return elementsCherches.stream().collect(Collectors.toMap(Element::getId, Element::getContribution));
    }
    
}
