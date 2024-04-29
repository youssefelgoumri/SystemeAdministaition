export const environment = {
  PROFESSEUR_SERVICE : "PROFESSEUR-SERVICE/professeurs",
  DELIB_ORDINAIRE_SERVICE : "DELIBERATION-SESSION-ORDINAIRE-SERVICE/delibration/ordinaire",
  RESERVATIONSALLE_SERVICE : "RESERVATIONSALLE-SERVICE/ReservationSalle/",
  GATEWAY : "http://localhost:2222/",
  ETAB_SERVICE : "ETABLISSEMENT-SERVICE/etablissements",
  DELEB_RATT_SERVICE:"DELIBERATION-SESSION-RATTRAPAGE-SERVICE/delibration/rattrapages",
  DELEB_OR_SERVICE:"DELIBERATION-SESSION-ORDINAIRE-SERVICE/delibration/ordinaire",
  MODULE_SERVICE :"SERVICE-MODULE/modules",
  FILIERE_SERVICE :"STRUCTURE-ENSEIGNEMENT-SERVICE/filieres",
  ANNEE_UNIV :"ANNEE-UNIVERSITAIRE-SERVICE/annee-universitaire"


// il faut ajouter les urls de chaque microservice sauf (GATEWAY il existe deja) dans les deux fichiers (environment.ts & environment.development.ts)

};
