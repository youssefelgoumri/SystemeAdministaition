export const environment = {
  production: true,
  ETAB_SERVICE : "ETABLISSEMENT-SERVICE/etablissements",
  GATEWAY : "http://localhost:2222/",
  MODULE_SERVICE : "SERVICE-MODULE/modules",
  FILIERE_SERVICE : "STRUCTURE-ENSEIGNEMENT-SERVICE/filieres",
  RESPO_SERVICE: "STRUCTURE-ENSEIGNEMENT-SERVICE/responsablesfilieres",

// il faut ajouter les urls de chaque microservice sauf (GATEWAY il existe deja) dans les deux fichiers (environment.ts & environment.development.ts)

};
