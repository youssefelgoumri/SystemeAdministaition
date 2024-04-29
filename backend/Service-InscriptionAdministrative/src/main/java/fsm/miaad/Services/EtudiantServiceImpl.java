package fsm.miaad.Services;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fsm.miaad.Entities.Diplome;
import fsm.miaad.Entities.Etudiant;
import fsm.miaad.Feign.AnneUniversitaireRestClient;
import fsm.miaad.Feign.InscriptionRestClient;
import fsm.miaad.Mappers.EtudiantMapper;
import fsm.miaad.Models.EtudiantInscriptionEnLigne;
import fsm.miaad.Repositories.EtudiantRepository;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class EtudiantServiceImpl implements EtudiantService{
    EtudiantRepository etudiantRepository;
    AnneUniversitaireRestClient anneUniversitaireRestClient;
    InscriptionRestClient inscriptionRestClient;
    EtudiantMapper etudiantMapper;
    DiplomeService diplomeService;

    @Override
    public Etudiant findEtudiantById(String id) {
        return etudiantRepository.findById(id).orElseThrow(()->new RuntimeException("Cet etudiant n'existe pas"));
    }

    @Override
    public List<Etudiant> findEtudiantByName(String firstName, String lastName) {
        List<Etudiant> etudiantsAyantMemeNom = new ArrayList<>();
        List<Etudiant> allEtudiants = allEtudiants();
        for (Etudiant etudiant : allEtudiants) {
            if (firstName != null && lastName != null) {
                if (!(firstName.isEmpty() && lastName.isEmpty())){
                    if (etudiant.getNomEnArabe().equalsIgnoreCase(lastName) || etudiant.getNomEnFrançais().equalsIgnoreCase(lastName)){
                        if (etudiant.getPrenomEnArabe().equalsIgnoreCase(firstName) || etudiant.getPrenomEnFrançais().equalsIgnoreCase(firstName)){
                            etudiantsAyantMemeNom.add(etudiant);
                            continue;
                        }
                    }
                }
            }
            
            if (firstName != null && !firstName.isEmpty())
                if (etudiant.getPrenomEnArabe().equalsIgnoreCase(firstName) || etudiant.getPrenomEnFrançais().equalsIgnoreCase(firstName))
                    etudiantsAyantMemeNom.add(etudiant);
            
            if (lastName != null && !lastName.isEmpty())
                if (etudiant.getNomEnArabe().equalsIgnoreCase(lastName) || etudiant.getNomEnFrançais().equalsIgnoreCase(lastName))
                    etudiantsAyantMemeNom.add(etudiant);
        }

        return etudiantsAyantMemeNom;
    }

    @Override
    public List<Etudiant> findEtudiantByFilliere(Long idFilliere) {
        List<Etudiant> etudiantsDansMemeFilliere = new ArrayList<>();
        List<Etudiant> allEtudiants = allEtudiants();
        for (Etudiant etudiant : allEtudiants) {
            if (etudiant.getIdFillieres().contains(idFilliere))
                etudiantsDansMemeFilliere.add(etudiant);
        }

        return etudiantsDansMemeFilliere;
    }

    @Override
    public Etudiant addEtudiant(String massar) {
        EtudiantInscriptionEnLigne etudiantInscriptionEnligne = inscriptionRestClient.etudiant(massar);
        Etudiant etudiant = etudiantMapper.fromEtudiantInscriptionEnLigne(etudiantInscriptionEnligne);
        // etudiant.setAnneeUniversitaire(anneUniversitaireRestClient.anneeCourante());
        Calendar cal = Calendar.getInstance();
        DateFormat dateFormat = new SimpleDateFormat("YYYY-MM-dd");
        String formattedDate = dateFormat.format(cal.getTime());
        etudiant.setDateInscription(formattedDate);
        return etudiantRepository.save(etudiant);
    }

    @Override
    public Etudiant updateEtudiant(String id, Etudiant newEtudiant) {
        Etudiant oldEtudiant = findEtudiantById(id);
        if (newEtudiant != null){
            if (newEtudiant.getAcademie() != null && !newEtudiant.getAcademie().equalsIgnoreCase(oldEtudiant.getAcademie()))
                oldEtudiant.setAcademie(newEtudiant.getAcademie());
            if (newEtudiant.getAnneeBac() != null && !newEtudiant.getAnneeBac().equals(oldEtudiant.getAnneeBac()))
                oldEtudiant.setAnneeBac(newEtudiant.getAnneeBac());
            if (newEtudiant.getCIN() != null && !newEtudiant.getCIN().equalsIgnoreCase(oldEtudiant.getCIN()))
                oldEtudiant.setCIN(newEtudiant.getCIN());
            if (newEtudiant.getDateNaissance() != null && !newEtudiant.getDateNaissance().equals(oldEtudiant.getDateNaissance()))
                oldEtudiant.setDateNaissance(newEtudiant.getDateNaissance());
            if (newEtudiant.getEtablissement() != null && !newEtudiant.getEtablissement().equalsIgnoreCase(oldEtudiant.getEtablissement()))
                oldEtudiant.setEtablissement(newEtudiant.getEtablissement());
            if (newEtudiant.getFillieres() != null && newEtudiant.getFillieres() != oldEtudiant.getFillieres())
                oldEtudiant.setFillieres(newEtudiant.getFillieres());

            if (newEtudiant.getIdEtablissement() != null && !newEtudiant.getIdEtablissement().equalsIgnoreCase(oldEtudiant.getIdEtablissement()))
                oldEtudiant.setIdEtablissement(newEtudiant.getIdEtablissement());

            if (newEtudiant.getIdFillieres() != null && newEtudiant.getIdFillieres() != oldEtudiant.getIdFillieres())
                oldEtudiant.setIdFillieres(newEtudiant.getIdFillieres());

            if (newEtudiant.getLieuNaissanceEnArabe() != null && !newEtudiant.getLieuNaissanceEnArabe().equalsIgnoreCase(oldEtudiant.getLieuNaissanceEnArabe()))
                oldEtudiant.setLieuNaissanceEnArabe(newEtudiant.getLieuNaissanceEnArabe());
            if (newEtudiant.getLieuNaissanceEnFrançais() != null && !newEtudiant.getLieuNaissanceEnFrançais().equalsIgnoreCase(oldEtudiant.getLieuNaissanceEnFrançais()))
                oldEtudiant.setLieuNaissanceEnFrançais(newEtudiant.getLieuNaissanceEnFrançais());
            if (newEtudiant.getLieuObtentionBac() != null && !newEtudiant.getLieuObtentionBac().equalsIgnoreCase(oldEtudiant.getLieuObtentionBac()))
                oldEtudiant.setLieuObtentionBac(newEtudiant.getLieuObtentionBac());
            if (newEtudiant.getLycee() != null && !newEtudiant.getLycee().equalsIgnoreCase(oldEtudiant.getLycee()))
                oldEtudiant.setLycee(newEtudiant.getLycee());
            if (newEtudiant.getMentionBac() != null && !newEtudiant.getMentionBac().equalsIgnoreCase(oldEtudiant.getMentionBac()))
                oldEtudiant.setMentionBac(newEtudiant.getMentionBac());
            if (newEtudiant.getNationalite() != null && !newEtudiant.getNationalite().equalsIgnoreCase(oldEtudiant.getNationalite()))
                oldEtudiant.setNationalite(newEtudiant.getNationalite());
            if (newEtudiant.getNomEnArabe() != null && !newEtudiant.getNomEnArabe().equalsIgnoreCase(oldEtudiant.getNomEnArabe()))
                oldEtudiant.setNomEnArabe(newEtudiant.getNomEnArabe());
            if (newEtudiant.getNomEnFrançais() != null && !newEtudiant.getNomEnFrançais().equalsIgnoreCase(oldEtudiant.getNomEnFrançais()))
                oldEtudiant.setNomEnFrançais(newEtudiant.getNomEnFrançais());
            if (newEtudiant.getPrenomEnArabe() != null && !newEtudiant.getPrenomEnArabe().equalsIgnoreCase(oldEtudiant.getPrenomEnArabe()))
                oldEtudiant.setPrenomEnArabe(newEtudiant.getPrenomEnArabe());
            if (newEtudiant.getPrenomEnFrançais() != null && !newEtudiant.getPrenomEnFrançais().equalsIgnoreCase(oldEtudiant.getPrenomEnFrançais()))
                oldEtudiant.setPrenomEnFrançais(newEtudiant.getPrenomEnFrançais());
            if (newEtudiant.getProvince() != null && !newEtudiant.getProvince().equalsIgnoreCase(oldEtudiant.getProvince()))
                oldEtudiant.setProvince(newEtudiant.getProvince());
            if (newEtudiant.getSerieBac() != null && !newEtudiant.getSerieBac().equalsIgnoreCase(oldEtudiant.getSerieBac()))
                oldEtudiant.setSerieBac(newEtudiant.getSerieBac());
            if (newEtudiant.getSexe() != null && !newEtudiant.getSexe().equalsIgnoreCase(oldEtudiant.getSexe()))
                oldEtudiant.setSexe(newEtudiant.getSexe());
            if (newEtudiant.getVille() != null && !newEtudiant.getVille().equalsIgnoreCase(oldEtudiant.getVille()))
                oldEtudiant.setVille(newEtudiant.getVille());
            if (newEtudiant.getEtape() != null && !newEtudiant.getEtape().equalsIgnoreCase(oldEtudiant.getEtape()))
                oldEtudiant.setEtape(newEtudiant.getEtape());
            if (newEtudiant.getBourse() != null && newEtudiant.getBourse() != oldEtudiant.getBourse())
                oldEtudiant.setBourse(newEtudiant.getBourse());
            if (newEtudiant.getAdresseParents() != null && !newEtudiant.getAdresseParents().equalsIgnoreCase(oldEtudiant.getAdresseParents()))
                oldEtudiant.setAdresseParents(newEtudiant.getAdresseParents());
            if (newEtudiant.getAdressePersonnelle() != null && !newEtudiant.getAdressePersonnelle().equalsIgnoreCase(oldEtudiant.getAdressePersonnelle()))
                oldEtudiant.setAdressePersonnelle(newEtudiant.getAdressePersonnelle());
            if (newEtudiant.getTelephone() != null && !newEtudiant.getTelephone().equalsIgnoreCase(oldEtudiant.getTelephone()))
                oldEtudiant.setTelephone(newEtudiant.getTelephone());
            if (newEtudiant.getMail() != null && !newEtudiant.getMail().equalsIgnoreCase(oldEtudiant.getMail()))
                oldEtudiant.setMail(newEtudiant.getMail());
            if (newEtudiant.getDiplomes() != null)
                oldEtudiant.setDiplomes(newEtudiant.getDiplomes());
        }
        
        // oldEtudiant.setAnneeUniversitaire(anneUniversitaireRestClient.anneeCourante());
        return etudiantRepository.save(oldEtudiant);
    }

    @Override
    public void deleteEtudiant(String id) {
        List<Diplome> sesDiplomes = findEtudiantById(id).getDiplomes();
        for (Diplome diplome : sesDiplomes) {
            diplomeService.deleteDiplome(diplome.getId());
        }
        etudiantRepository.deleteById(id);
    }

    @Override
    public List<Etudiant> allEtudiants() {
        return etudiantRepository.findAll();
    }

    @Override
    public List<Etudiant> findEtudiantByEtablissement(String idEtablissement) {
        List<Etudiant> etudiantsDansMemeEtablissement = new ArrayList<>();
        List<Etudiant> allEtudiants = allEtudiants();
        for (Etudiant etudiant : allEtudiants) {
            if (etudiant.getIdEtablissement().equalsIgnoreCase(idEtablissement))
                etudiantsDansMemeEtablissement.add(etudiant);
        }

        return etudiantsDansMemeEtablissement;
    }
    
}
