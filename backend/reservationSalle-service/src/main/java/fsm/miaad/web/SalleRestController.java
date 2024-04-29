package fsm.miaad.web;

import fsm.miaad.entities.Salle;
import fsm.miaad.entities.reservation;
import fsm.miaad.services.SalleServiceImp;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/ReservationSalle")
public class SalleRestController {
    private SalleServiceImp salleServiceImp;
    public SalleRestController(SalleServiceImp salleServiceImp) {
        this.salleServiceImp = salleServiceImp;
    }
    @GetMapping("")
    public List<Salle> allSalles(){
        return salleServiceImp.getAllSalles();
    }
    @GetMapping("{id}")
    public Salle Salle(@PathVariable long id){
        return salleServiceImp.getById(id);
    }
    @PostMapping("add")
    public Salle addSalle(@RequestBody Salle salle){
        return salleServiceImp.addSalle(salle);
    }
    @DeleteMapping("delete/{id}")
    public void deleteSalle(@PathVariable long id){
        salleServiceImp.deleteSalle(id);
    }
    @PutMapping("edit/{id}")
    public Salle editeSalle(@PathVariable long id,@RequestBody Salle salle){
        return salleServiceImp.editeSalle(id,salle);
    }
    @PostMapping("/{id}/reserve")
    public ResponseEntity<?> reserveSalle(
            @PathVariable long id,
            @RequestBody Map<String, Object> requestBody) throws ParseException {

        Object idProfObj = requestBody.get("idProf");
        Long idProf;
        if (idProfObj instanceof Number) {
            idProf = ((Number) idProfObj).longValue(); // If idProf is a number, parse it as a Long
        } else if (idProfObj instanceof String) {
            try {
                idProf = Long.parseLong((String) idProfObj); // If idProf is a string, attempt to parse it as a Long
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body("Invalid idProf format");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid idProf format"); // If idProf is neither a number nor a string, return an error
        }
        //Long idProf = ((Number) idProfObj).longValue();
        Date dateDebut = parseDate((String) requestBody.get("dateDebut"));
        Date dateFin = parseDate((String) requestBody.get("dateFin"));

        try {
            // Check if the salle is free for the specified time range and professor
            Salle salle = salleServiceImp.isSalleFree(id, dateDebut, dateFin);
            // If the salle is free creer une reservation
            Salle reservedSalle = salleServiceImp.reserveSalle(id, idProf, dateDebut, dateFin);
            return ResponseEntity.ok("Salle with ID " + reservedSalle.getIdSalle() + " reserved successfully.");
        } catch (IllegalStateException e) {
            // If the salle is not free, return msg salle if reserved for time range ...
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    private Date parseDate(String dateString) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.parse(dateString);
    }


    @PostMapping("/freeSalles")
    public ResponseEntity<List<Salle>> freeSalles(@RequestBody Map<String, String> dateParams) {
        try {
            String dateDebutStr = dateParams.get("dateDebut");
            String dateFinStr = dateParams.get("dateFin");
            // Parsing date strings to Date objects
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date dateDebut = dateFormat.parse(dateDebutStr);
            Date dateFin = dateFormat.parse(dateFinStr);
            // Log parsed dates
            System.out.println("Parsed dateDebut: " + dateDebut);
            System.out.println("Parsed dateFin: " + dateFin);

            // Retrieve the list of free salles based on the time range
            List<Salle> freeSalles = salleServiceImp.freeSalles(dateDebut, dateFin);

            return ResponseEntity.ok(freeSalles);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    @PostMapping("/reservedSalles")
    public ResponseEntity<List<Salle>> reservedSalles(@RequestBody Map<String, String> dateParams) {
        try {
            String dateDebutStr = dateParams.get("dateDebut");
            String dateFinStr = dateParams.get("dateFin");
            // Parsing date strings to Date objects
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date dateDebut = dateFormat.parse(dateDebutStr);
            Date dateFin = dateFormat.parse(dateFinStr);
            List<Salle> reservedSalles = salleServiceImp.reservedSalles(dateDebut, dateFin);
            return ResponseEntity.ok(reservedSalles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    //khssni nzid hna if time already exist ngolih deja reserved
    @PutMapping("/modifyReservation/{reservationId}")
    public ResponseEntity<?> modifyReservation(
            @PathVariable long reservationId,
            @RequestBody Map<String, String> dateParams) {
        try {
            String newDateDebutStr = dateParams.get("newDateDebut");
            String newDateFinStr = dateParams.get("newDateFin");
            // Validate date parameters
            if (newDateDebutStr == null || newDateFinStr == null) {
                return ResponseEntity.badRequest().body("Date parameters are missing.");
            }
            // Parsing date strings to Date objects
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date newDateDebut = dateFormat.parse(newDateDebutStr);
            Date newDateFin = dateFormat.parse(newDateFinStr);
            Salle modifiedSalle = salleServiceImp.modifyReservation(reservationId, newDateDebut, newDateFin);

            return ResponseEntity.ok(modifiedSalle);
        } catch (ParseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date format.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict occurred.");
        }
    }
    @DeleteMapping("/cancelReservation/{reservationId}")
    public ResponseEntity<String> cancelReservation(@PathVariable long reservationId) {
        try {
            salleServiceImp.cancelReservation(reservationId);
            return ResponseEntity.ok("Reservation canceled successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
    //liste des professeur qui reserve une salle :
    @GetMapping("/{salleId}/professeurs")
    public ResponseEntity<List<Map<String, Object>>> getProfessorsReservedForSalle(@PathVariable Long salleId) {
        return salleServiceImp.getProfessorsReservedForSalle(salleId);
    }

//    oumaima hadi rah zedtha bax n9der nrecuperer les salles qui sont reserve par un prof X 7it dert liha appel f microservice
//    prof bax yaffichi liya dakxi d la date .....
    @GetMapping("/{idprof}/profreserved")
    public List<reservation> getAllReservationOfProfessor(@PathVariable Long idprof) {
        return salleServiceImp.getAllReservationOfProfessor(idprof);
    }


}



