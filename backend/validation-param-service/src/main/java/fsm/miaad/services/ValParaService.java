package fsm.miaad.services;

import fsm.miaad.entities.ValidationParam;

import java.util.List;

public interface ValParaService {
    ValidationParam addValidationParam(ValidationParam validationParam);
    List<ValidationParam> allValidationParams();
    ValidationParam getValidationParam(Long iD);
    ValidationParam editValidationParam(Long iD,ValidationParam validationParam);
    void deleteValidationParam(Long iDs);
    // ValidationParam getTheFirstByFiliere_idAndSemestre_id(Long filiereId);
}
