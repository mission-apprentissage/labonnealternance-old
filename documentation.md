---
description: >-
  Sur cette page, vous trouverez la documentation pour intégrer le widget LBA
  sur votre site, permettant de requêter et afficher les formations et les
  entreprises pour entrer en apprentissage.
---

# Documentation Apprentissage : formations & entreprises

### **Notice d’intégration du widget Idea**

Vous devez intégrer Idea dans une Iframe :   
**&lt;iframe src="https://idea-mna.netlify.app&lt;parametres&gt;" /&gt;**  


Ex de paramètres :   
**?radius=60&romes=F1702,F1705,F1701&scope=all&lat=47&lon=2.2&caller=ID\_service\_appelant\_idea&return\_uri=/&return\_logo\_url=https://url/image.png**  


#### **A / Liste des paramètres :** 

**radius :** Optionnel . Valeur numérique. Valeurs autorisées : 10 \| 30 \| 60 \| 100. Le rayon de recherche autour du lieu en km. Valeur par défaut 30.

**romes :** Optionnel. Une liste de codes romes séparés par des virgules. Ex : A1021 \| F1065,F1066,F1067 . Maximum 3 romes. Valeur par défaut null.

**scope :** Optionnel. Valeurs autorisées all \| training . Valeur par défaut all. Si absent ou la valeur est all la recherche portera sur les formations et les offres. Si training la recherche portera sur formations seulement

**lat :** Optionnel. Coordonnée géographique en degrés décimaux \(float\). Valeur par défaut null. La partie lattitude des coordonnées gps.

**lon :** Optionnel. Coordonnée géographique en degrés décimaux \(float\). Valeur par défaut null. La partie longitude des coordonnées gps.

**caller :** Obligatoire. L'identification du site appelant. A fixer lors de la mise en place avec l’équipe d’IDEA.

**return\_uri :** Optionnel. Valeur par défaut / . L'uri de retour qui sera notifiée au site appelant. ****

**return\_logo\_url :** Optionnel. Valeur par défaut : logo du site Labonnealternance.pole-emploi.fr . L'url du logo du site vers lequel l'utilisateur revient en cliquant sur le bouton de retour dans Idea. ****

**Si lat, lon et romes sont correctement renseignés une recherche sera lancée automatiquement en utilisant ces critères. Si radius est correctement renseigné il sera utilisé comme critère de la recherche.**  


#### **B /  Bouton de retour** 

Cliquer sur le logo en haut du formulaire ou d’une liste de résultat permet de signaler à la page appelante une instruction de changement de page.

**Si vous ne codez rien cette fonctionnalité n’a pas d’effet.**

Pour bénéficier du bouton de retour vous devez ajouter un listener pour l'API postMessage de javascript et coder l’action de navigation :

**`window.addEventListener('message',function(e){`** 

**`/*Remplacer par votre code pour gérer la navigation vers la page de votre site correspondante aux paramètres transmis par Idea dans le message*/`**

  
**`console.log("Type du message goToPage ", e.data.type);`**

**`console.log("URI de la page de redirection ", e.data.page);`**

**`});`**

