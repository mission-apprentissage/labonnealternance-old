---
description: >-
  La Bonne Alternance est un service qui expose les deux composantes de
  l'apprentissage : la formation et l'emploi. Ce service expose également les
  entreprises sur l'ensemble du périmètre Alternance.
---

# Présentation

L'objectif de ce service est de permettre à ses utilisateurs de trouver plus facilement et plus rapidement une formation en apprentissage et un contrat en alternance en offrant une information complète et centralisée.

Le service, en cours d'amélioration, est disponible ici : [https://labonnealternance.pole-emploi.fr/](https://labonnealternance.pole-emploi.fr/)

**EXPOSEZ NOS DONNÉES sur votre site grâce au widget et aux Apis !** 

**Le Widget**

Ce service est également disponible sous forme de Widget, directement exposable sur tout site. Les données exposées sur le widget peuvent être filtrées :

* sur un domaine \(disponible dès à présent\) ou un ensemble de domaines \(disponible prochainement\),
* et/ou sur une zone géographique donnée : localité \(disponible dès à présent\), département \(disponible prochainement\), région \(disponible prochainement\), 
* sur la donnée formation uniquement \(disponible dès à présent\) ou entreprise uniquement \(disponible prochainement pour l'apprentissage et disponible dès à présent pour l'alternance dans son ensemble\).

Actuellement, vous pouvez afficher le widget avec les données entreprises sur toute l'alternance, ou le widget avec les données entreprises et/ou formations sur l'apprentissage \(voir sections "Tester le widget"\).

Nous travaillons à la décorrélation des différents composants, ainsi, prochainement :

En tant que jobboard vous pourrez choisir d'y afficher seulement les offres d'emploi en apprentissage et les entreprises susceptibles de recruter en alternance.

En tant qu'OPCO, vous pourrez choisir d'y afficher uniquement les formations et/ou les entreprises des domaines professionnels sur lesquels vous intervenez.

En tant que Région, vous pourrez choisir d'y afficher les formations et/ou les entreprises de votre zone géographique.

En tant que CFA, vous pourrez choisir de n'afficher que les entreprises de votre zone géographique.

**Les APIs**

  
4 APIs vous permettent d'exposer tout ou partie de nos données : 

-          /api/V1/formations, permettant de rechercher des formations en apprentissage pour un métier, un ensemble de métiers, un domaine professionnel, un ensemble de domaines professionnels autour d'un point géographique

-          /api/V1/formationsParRegion, permettant de rechercher des formations en apprentissage dans un département ou dans une région ou dans la France entière pour un métier, un ensemble de métiers, un domaine professionnel ou un ensemble de domaines professionnels

-          ​/api​/V1​/jobs, pour rechercher les entreprises recrutant ou susceptibles de recruter en apprentissage référencées par les APIs de Pôle emploi, pour un métier ou un ensemble de métiers, autour d'un point géographique

-          /api/V1/jobsEtFormations, pour rechercher des formations en apprentissage et des entreprises recrutant ou susceptibles de recruter en apprentissage référencées par les APIs de Pôle emploi, pour un métier ou un ensemble de métiers, autour d'un point géographique

