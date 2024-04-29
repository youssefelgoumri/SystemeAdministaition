package com.example.deliberationsessionordinaireservice.feign;

import com.example.deliberationsessionordinaireservice.models.ValidationParam;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("VALIDATION-PARAM-SERVICE")
public interface ValParaServiceClient {
    @GetMapping("ValidationParams/{id}")
    ValidationParam getValidationParam(@PathVariable Long id);
}
