package fsm.miaad.abscenceservice.services;
import fsm.miaad.abscenceservice.entities.Absence;
import fsm.miaad.abscenceservice.exception.EtudiantNotFoundException;
import fsm.miaad.abscenceservice.exception.ProfesseurNotFoundException;
import fsm.miaad.abscenceservice.feigns.EtudiantClient;
import fsm.miaad.abscenceservice.feigns.ModuleClient;
import fsm.miaad.abscenceservice.feigns.ProfesseurClient;
import fsm.miaad.abscenceservice.models.Etudiant;
import fsm.miaad.abscenceservice.models.Module;
import fsm.miaad.abscenceservice.models.Professeur;
import fsm.miaad.abscenceservice.repositories.AbsenceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import java.util.logging.Logger;

import java.io.File;
import java.util.List;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import java.io.ByteArrayOutputStream;


import java.awt.Color;
@Service
public class AbsenceService {
    private static final Logger logger = Logger.getLogger(AbsenceService.class.getName());

    @Autowired
    private AbsenceRepository absenceRepository;
    @Autowired
    private ProfesseurClient professeurClient;
    @Autowired
    private ModuleClient moduleClient;
    @Autowired
    private EtudiantClient etudiantClient;

    // Méthode pour ajouter une absence
    public Absence addAbsence(Absence absence) throws ProfesseurNotFoundException, EtudiantNotFoundException {

        // Vérifier si le professeur existe
        Professeur professeur = professeurClient.getProfesseurById(absence.getProfesseurId());
        if (professeur == null) {
            throw new ProfesseurNotFoundException("Le professeur avec l'ID " + absence.getProfesseurId() + " n'existe pas");
        }

        // Vérifier si l'étudiant existe
        Etudiant etudiant = etudiantClient.etudiant(absence.getEtudiantId());
        if (etudiant == null) {
            throw new EtudiantNotFoundException("L'étudiant avec l'ID " + absence.getEtudiantId() + " n'existe pas");
        }

        // Si les vérifications réussissent, ajouter l'absence à la base de données
        return absenceRepository.save(absence);
    }


    // Méthode pour récupérer toutes les absences
    public List<Absence> getAllAbsences() {
        return absenceRepository.findAll();
    }

    // Méthode pour récupérer une absence par son ID
    public Absence getAbsenceById(Long absenceId) {
        return absenceRepository.findById(String.valueOf(absenceId))
                .orElseThrow(() -> new EntityNotFoundException("Absence not found with id: " + absenceId));
    }

    // Méthode pour mettre à jour une absence
    public Absence updateAbsence(Long absenceId, Absence updatedAbsence) {
        // Implémentez la logique de vérification et de mise à jour si nécessaire
        Absence existingAbsence = getAbsenceById(absenceId);
        existingAbsence.setEtudiantId(updatedAbsence.getEtudiantId());
        existingAbsence.setMatiereId(updatedAbsence.getMatiereId());
        existingAbsence.setProfesseurId(updatedAbsence.getProfesseurId());
        existingAbsence.setDateAbsence(updatedAbsence.getDateAbsence());
        existingAbsence.setCreneauHoraire(updatedAbsence.getCreneauHoraire());
        existingAbsence.setPresenceProfesseur(updatedAbsence.isPresenceProfesseur());
        existingAbsence.setJustification(updatedAbsence.getJustification());
        return absenceRepository.save(existingAbsence);
    }

    // Méthode pour supprimer une absence
    public void deleteAbsence(Long absenceId) {
        // Implémentez la logique de suppression si nécessaire
        absenceRepository.deleteById(String.valueOf(absenceId));
    }

    public String generateRapport(String etudiantId) {
        // Récupérez les absences de l'étudiant depuis votre service ou repository
        List<Absence> absences = absenceRepository.findByEtudiantId(etudiantId);

        // Construisez le rapport en incluant les détails de chaque absence
        StringBuilder rapportBuilder = new StringBuilder();
        // Récupérer le nom de l'étudiant
        Etudiant etudiant = etudiantClient.etudiant(etudiantId);
        String nomEtudiant = etudiant != null ? etudiant.getNomEnFrançais() + " " + etudiant.getPrenomEnFrançais() : "Inconnu";

        rapportBuilder.append("Rapport des absences pour l'étudiant ").append(etudiantId).append("\n");
        rapportBuilder.append("l'étudiant ").append(nomEtudiant).append("\n");

        for (Absence absence : absences) {

            // Récupérer le nom du professeur
            Professeur professeur = professeurClient.getProfesseurById(absence.getProfesseurId());
            String nomProfesseur = professeur != null ? professeur.getNom() + " " + professeur.getPrenom() : "Inconnu";

            // Récupérer le nom du module
            Module matiere = moduleClient.module(absence.getMatiereId());
            String nomMatiere = matiere != null ? matiere.getIntitule() : "Inconnu";

            rapportBuilder.append("Date d'absence : ").append(absence.getDateAbsence()).append("\n");
            rapportBuilder.append("Module : ").append(nomMatiere).append("\n");
            rapportBuilder.append("Créneau horaire : ").append(absence.getCreneauHoraire()).append("\n");
            rapportBuilder.append("Présence du professeur : ").append(nomProfesseur).append("\n");
            rapportBuilder.append("Justification : ").append(absence.getJustification()).append("\n\n");
        }

        return rapportBuilder.toString();
    }
    public byte[] generateRapportpdf(String etudiantId) throws IOException {
        List<Absence> absences = absenceRepository.findByEtudiantId(etudiantId);
        Etudiant etudiant = etudiantClient.etudiant(etudiantId);
        String nomEtudiant = etudiant != null ? etudiant.getNomEnFrançais() + " " + etudiant.getPrenomEnFrançais() : "Inconnu";

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
             PDDocument document = new PDDocument()) {

            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);
                contentStream.beginText();
                contentStream.newLineAtOffset(100, 750);
                contentStream.newLine();
                contentStream.showText("Rapport des absences pour l'étudiant " + nomEtudiant);
                contentStream.endText();
                // Assurez-vous que le chemin d'accès à l'image est correct
                String imagePath = "static/logo.png";

                // Vérifiez si le fichier image existe
                File imageFile = new File(imagePath);
                if (!imageFile.exists()) {
                    logger.severe("Le fichier image n'existe pas : " + imagePath);
                    // Gérez l'erreur ou lancez une exception si nécessaire
                } else {
                    // Charger l'image du logo
                    PDImageXObject logoImage = PDImageXObject.createFromFile(imagePath, document);

                    // Dessiner l'image du logo sur la page PDF
                    contentStream.drawImage(logoImage, 50, 700, logoImage.getWidth() / 4, logoImage.getHeight() / 4);
                }
                float y = 700; // Initial Y coordinate for the content
                for (Absence absence : absences) {
                    contentStream.setLineWidth(1.5f);
                    contentStream.setStrokingColor(Color.BLACK);
                    contentStream.moveTo(50, y + 20);
                    contentStream.lineTo(550, y + 20);
                    contentStream.stroke();

                    y -= 40; // Move Y coordinate up for the next absence

                    Professeur professeur = professeurClient.getProfesseurById(absence.getProfesseurId());
                    String nomProfesseur = professeur != null ? professeur.getNom() + " " + professeur.getPrenom() : "Inconnu";
                    Module matiere = moduleClient.module(absence.getMatiereId());
                    String nomMatiere = matiere != null ? matiere.getIntitule() : "Inconnu";

                    contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(60, y);
                    contentStream.showText("Date d'absence : ");
                    contentStream.endText();

                    contentStream.setFont(PDType1Font.HELVETICA, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(200, y);
                    contentStream.showText(String.valueOf(absence.getDateAbsence()));
                    contentStream.endText();

                    // Ajoutez un espacement vertical entre les sections d'absence
                    y -= 20;

                    contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(60, y);
                    contentStream.showText("Module : ");
                    contentStream.endText();

                    contentStream.setFont(PDType1Font.HELVETICA, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(200, y);
                    contentStream.showText(nomMatiere);
                    contentStream.endText();

                    // Ajoutez un autre espacement vertical
                    y -= 20;

                    contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(60, y);
                    contentStream.showText("Créneau horaire : ");
                    contentStream.endText();

                    contentStream.setFont(PDType1Font.HELVETICA, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(200, y);
                    contentStream.showText(absence.getCreneauHoraire());
                    contentStream.endText();

                    // Ajoutez un autre espacement vertical
                    y -= 20;

                    contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(60, y);
                    contentStream.showText("Présence du professeur : ");
                    contentStream.endText();

                    contentStream.setFont(PDType1Font.HELVETICA, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(200, y);
                    contentStream.showText(nomProfesseur);
                    contentStream.endText();

                    // Ajoutez un autre espacement vertical
                    y -= 20;

                    contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(60, y);
                    contentStream.showText("Justification : ");
                    contentStream.endText();

                    contentStream.setFont(PDType1Font.HELVETICA, 12);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(200, y);
                    contentStream.showText(absence.getJustification());
                    contentStream.endText();

                    // Ajoutez un autre espacement vertical pour la prochaine absence
                    y -= 40;
                }
            }

            // Enregistrez le document dans le ByteArrayOutputStream
            document.save(outputStream);

            // Retournez le contenu du ByteArrayOutputStream sous forme de tableau de bytes
            return outputStream.toByteArray();
        }
    }



}