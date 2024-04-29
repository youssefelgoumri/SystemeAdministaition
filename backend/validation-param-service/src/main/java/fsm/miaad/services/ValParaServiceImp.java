package fsm.miaad.services;

import fsm.miaad.entities.ValidationParam;
import fsm.miaad.repositories.ValParaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ValParaServiceImp implements ValParaService{

    ValParaRepository valParaRepository;

    @Override
    public ValidationParam addValidationParam(ValidationParam validationParam) {

        validationParam=valParaRepository.save(validationParam);
        return validationParam;

    }

    @Override
    public List<ValidationParam> allValidationParams() {
        return valParaRepository.findAll();
    }

    @Override
    public ValidationParam getValidationParam(Long iD) {
        return valParaRepository.findById(iD).orElse(null);
    }

    @Override
    public ValidationParam editValidationParam(Long iD,ValidationParam validationParam) {
        ValidationParam param=getValidationParam(iD);
        if(param!=null){
            if(validationParam.getZ()!=null)
                param.setZ(validationParam.getZ());
            if(validationParam.getX()!=null)
                param.setX(validationParam.getX());
            if(validationParam.getY()!=null)
                param.setY(validationParam.getY());
            param=valParaRepository.save(param);
        }
        return param;
    }

    @Override
    public void deleteValidationParam(Long iDs) {
        valParaRepository.deleteById(iDs);

    }

}
