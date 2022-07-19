---
description: >-
  La Bonne Alternance est un service qui expose les deux composantes de
  l'alternance : la formation et l'emploi. Ce service expose également les
  entreprises sur l'ensemble du périmètre alternance.
---

# Présentation

L'objectif de ce service est de permettre à ses utilisateurs de trouver plus facilement et plus rapidement une formation en apprentissage et un contrat en alternance en offrant une information complète et centralisée.

Le service, en cours d'amélioration, est disponible ici : [https://labonnealternance.pole-emploi.fr/](https://labonnealternance.pole-emploi.fr/)

**EXPOSEZ NOS DONNÉES sur votre site grâce aux widgets et aux Apis !** 

**Les Widgets**

Ce service est également disponible sous forme de Widgets, directement exposable sur tout site. 

Les données exposées sur le widget peuvent être filtrées :

* sur un domaine \(disponible dès à présent\) ou un ensemble de domaines \(disponible prochainement\),
* et/ou sur une zone géographique donnée : localité \(disponible dès à présent\), département \(disponible prochainement\), région \(disponible prochainement\), 
* sur la donnée formation uniquement ou entreprise uniquement \(disponible dès à présent\) 

Actuellement, vous pouvez afficher le widget avec les données entreprises sur toute l'alternance, ou le widget avec les données entreprises et/ou formations sur l'apprentissage \(voir sections "Tester le widget"\).

En tant que jobboard vous pouvez choisir d'y afficher seulement les offres d'emploi en alternance et les entreprises susceptibles de recruter en alternance.

En tant qu'OPCO, vous pouvez choisir d'y afficher uniquement les formations et/ou les entreprises des domaines professionnels sur lesquels vous intervenez.

En tant que Région, vous pouvez choisir d'y afficher les formations et/ou les entreprises de votre zone géographique.

En tant que CFA, vous pourrez choisir de n'afficher que les entreprises de votre zone géographique.

Le module pour postuler aux offres de La bonne alternance recruteur ou pour envoyer une candidature spontanée à une société susceptible de recruter peut également être affiché sous forme de widget à part entière.

**Les APIs**


  
Des APIs vous permettent d'exposer tout ou partie de nos données : 

-          /api/V1/formations, permettant de rechercher des formations en apprentissage pour un métier, un ensemble de métiers, un domaine professionnel, un ensemble de domaines professionnels autour d'un point géographique

-          /api/V1/formationsParRegion, permettant de rechercher des formations en apprentissage dans un département ou dans une région ou dans la France entière pour un métier, un ensemble de métiers, un domaine professionnel ou un ensemble de domaines professionnels

-          ​/api​/V1​/jobs, pour rechercher les entreprises recrutant ou susceptibles de recruter en apprentissage référencées par les APIs de Pôle emploi, pour un métier ou un ensemble de métiers, autour d'un point géographique

-          /api/V1/jobsEtFormations, pour rechercher des formations en apprentissage et des entreprises recrutant ou susceptibles de recruter en apprentissage référencées par les APIs de Pôle emploi, pour un métier ou un ensemble de métiers, autour d'un point géographique

-          /api/V1/application, pour émettre un email de candidature auprès d'une société avec ou sans offre.

Retrouvez la documentation technique dans les sections suivantes ou sur [API.gouv.fr.](https://api.gouv.fr/les-api/api-la-bonne-alternance)

