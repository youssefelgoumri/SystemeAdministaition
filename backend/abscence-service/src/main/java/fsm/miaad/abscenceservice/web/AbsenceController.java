package fsm.miaad.abscenceservice.web;
import fsm.miaad.abscenceservice.entities.Absence;
import fsm.miaad.abscenceservice.exception.EtudiantNotFoundException;
import fsm.miaad.abscenceservice.exception.ProfesseurNotFoundException;
import fsm.miaad.abscenceservice.services.AbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/absences")
public class AbsenceController {

    @Autowired
    private AbsenceService absenceService;

    @PostMapping("/")
    public ResponseEntity<Object> addAbsence(@RequestBody Absence absence) {
        try {
            Absence addedAbsence = absenceService.addAbsence(absence);
            return ResponseEntity.ok().body(addedAbsence);
        } catch (ProfesseurNotFoundException e) {
            return ResponseEntity.badRequest().body("Le professeur spécifié n'existe pas.");
        } catch (EtudiantNotFoundException e) {
            return ResponseEntity.badRequest().body("L'étudiant spécifié n'existe pas.");
        }
    }
    // Endpoint pour récupérer toutes les absences
    @GetMapping("/")
    public List<Absence> getAllAbsences() {
        return absenceService.getAllAbsences();
    }

    // Endpoint pour récupérer une absence par son ID
    @GetMapping("/{absenceId}")
    public Absence getAbsenceById(@PathVariable Long absenceId) {
        return absenceService.getAbsenceById(absenceId);
    }

    // Endpoint pour mettre à jour une absence
    @PutMapping("/{absenceId}")
    public Absence updateAbsence(@PathVariable Long absenceId, @RequestBody Absence updatedAbsence) {
        return absenceService.updateAbsence(absenceId, updatedAbsence);
    }

    // Endpoint pour supprimer une absence
    @DeleteMapping("/{absenceId}")
    public void deleteAbsence(@PathVariable Long absenceId) {
        absenceService.deleteAbsence(absenceId);
    }




    @GetMapping("/rapport/{etudiantId}")
    public ResponseEntity<Resource> downloadAbsenceReportForEtudiant(@PathVariable String etudiantId) {
            String rapport = absenceService.generateRapport(etudiantId);
            ByteArrayResource resource = new ByteArrayResource(rapport.getBytes());
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=rapport_absences_etudiant_" + etudiantId + ".txt");
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        }
    @GetMapping("/rapportpdf/{etudiantId}")
    public ResponseEntity<byte[]> generateRapportPDF(@PathVariable String etudiantId) {
        try {
            byte[] pdfContent = absenceService.generateRapportpdf(etudiantId);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "rapport_absences_" + etudiantId + ".pdf");
            headers.setContentLength(pdfContent.length);
            return new ResponseEntity<>(pdfContent, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}



