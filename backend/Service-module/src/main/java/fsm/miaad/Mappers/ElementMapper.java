package fsm.miaad.Mappers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import fsm.miaad.Dtos.ElementRequestDTO;
import fsm.miaad.Dtos.ElementResponseDTO;
import fsm.miaad.Entities.Element;

@Component
public class ElementMapper {
    public ElementResponseDTO fromElement(Element element){
        ElementResponseDTO elementResponseDTO = new ElementResponseDTO();
        BeanUtils.copyProperties(element, elementResponseDTO);
        return elementResponseDTO;
    }

    public Element fromElementDTO(ElementRequestDTO elementRequestDTO){
        return Element.builder()
        .coefficientCours(elementRequestDTO.getCoefficientCours())
        .coefficientTPs(elementRequestDTO.getCoefficientTPs())
        .partieCours(elementRequestDTO.getPartieCours())
        .partieTPs(elementRequestDTO.getPartieTPs())
        .contribution(elementRequestDTO.getContribution())
        .module(elementRequestDTO.getModule())
        .build();
    }

    public List<ElementResponseDTO> fromElements(List<Element> elements){
        List<ElementResponseDTO> elementDTOS = new ArrayList<>();
        if (elements != null)
            for (Element element:elements) {
                elementDTOS.add(ElementResponseDTO.builder()
                        .id(element.getId())
                        .partieCours(element.getPartieCours())
                        .partieTPs(element.getPartieTPs())
                        .coefficientCours(element.getCoefficientCours())
                        .coefficientTPs(element.getCoefficientTPs())
                        .build());
            }
        return elementDTOS;
    }

    public Element updateElement(Element oldElement, ElementRequestDTO elementRequestDTO){
        String partieCours = elementRequestDTO.getPartieCours();
        String partieTPs = elementRequestDTO.getPartieTPs();
        Integer coefficientCours = elementRequestDTO.getCoefficientCours();
        Integer coefficientTPs = elementRequestDTO.getCoefficientTPs();
        Integer controbution = elementRequestDTO.getContribution();
        if ((partieCours != null) && !(partieCours.equals(oldElement.getPartieCours())))
            oldElement.setPartieCours(partieCours);
        if ((partieTPs != null) && !(partieTPs.equals(oldElement.getPartieTPs())))
            oldElement.setPartieTPs(partieTPs);
        if ((coefficientCours != null) && (coefficientCours.equals(oldElement.getCoefficientCours())))
            oldElement.setCoefficientCours(coefficientCours);
        if ((coefficientTPs != null) && (coefficientTPs.equals(oldElement.getCoefficientTPs())))
            oldElement.setCoefficientTPs(coefficientTPs);
        if ((controbution != null) && (controbution.equals(oldElement.getContribution())))
            oldElement.setContribution(controbution);
        return oldElement;
    }

    public List<Element> updateElements(List<Element> oldElements, List<ElementRequestDTO> elementsRequestDTO) {
        oldElements = new ArrayList<>();
        for (ElementRequestDTO elementDTO : elementsRequestDTO)
            oldElements.add(fromElementDTO(elementDTO));
        return oldElements;
    }
}
