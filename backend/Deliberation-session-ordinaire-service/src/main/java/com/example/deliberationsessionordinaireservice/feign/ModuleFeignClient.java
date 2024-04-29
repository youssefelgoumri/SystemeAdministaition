package com.example.deliberationsessionordinaireservice.feign;

import com.example.deliberationsessionordinaireservice.models.Module;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.deliberationsessionordinaireservice.models.Element;
import java.util.List;
import java.util.Map;

@FeignClient(name = "SERVICE-MODULE")
public interface ModuleFeignClient {

    @GetMapping("/modules/{id}")
    Module module(@PathVariable Long id);

    @GetMapping("/modules/{id}/elements")
    List<Element> getElementsForModule(@PathVariable Long id);

    @GetMapping("/modules")
    List<Module> modules();

    @GetMapping("/elements/controbution/{ids}")
    Map<Long, Integer> controbutions(@PathVariable List<Long> ids);
}
