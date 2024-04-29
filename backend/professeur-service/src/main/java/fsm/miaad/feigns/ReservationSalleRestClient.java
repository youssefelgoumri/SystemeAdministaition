package fsm.miaad.feigns;

import fsm.miaad.models.reservation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name ="RESERVATIONSALLE-SERVICE")
public interface ReservationSalleRestClient {

    @GetMapping("ReservationSalle/{idprof}/profreserved")
    List<reservation> getAllReservationOfProfessor(@PathVariable Long idprof);
}
