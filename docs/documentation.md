---
description: >-
  Sur cette page, vous trouverez la documentation pour intégrer le widget LBA
  sur votre site, permettant de requêter et afficher les formations et les
  entreprises pour entrer en apprentissage.
---

# Widget : tester et consulter la documentation

### **Tester le widget Labonnealternance**

Pour voir comment le widget peut s'intégrer sur votre site, testez dès à présent les différentes versions possibles : [https://labonnealternance.apprentissage.beta.gouv.fr/test-widget](https://labonnealternance.apprentissage.beta.gouv.fr/test-widget)

### **Notice d’intégration du widget Labonnealternance**

Vous devez intégrer Labonnealternance dans une Iframe :   
**&lt;iframe src="https://labonnealternance.apprentissage.beta.gouv.fr/&lt;chemin&gt;&lt;parametres&gt;" /&gt;**  


Ex de valeur pour le paramètre src :   
**https://labonnealternance.apprentissage.beta.gouv.fr/recherche-apprentissage?radius=60&romes=F1702,F1705,F1701&scope=all&lat=47&lon=2.2&caller=contact%40mail.com%20ID\_service\_appelant\_labonnealternance&return\_uri=/&return\_logo\_url=https://url/image.png**  


**A / Chemins :**

**/recherche-apprentissage :** pour rechercher en même temps des formations et des emplois en apprentissage

**/recherche-emploi :** pour rechercher uniquement des emplois en apprentissage

**/recherche-apprentissage-formation :** pour rechercher uniquement des formations



#### **B / Liste des paramètres :** 

**radius :** Optionnel . Valeur numérique. Valeurs autorisées : 10 \| 30 \| 60 \| 100. Le rayon de recherche autour du lieu en km. Valeur par défaut 30.

**romes :** Optionnel. Une liste de codes romes séparés par des virgules. Ex : A1021 \| F1065,F1066,F1067 . Maximum 3 romes. Valeur par défaut null.

**lat :** Optionnel. Coordonnée géographique en degrés décimaux \(float\). Valeur par défaut null. La partie lattitude des coordonnées gps.

**lon :** Optionnel. Coordonnée géographique en degrés décimaux \(float\). Valeur par défaut null. La partie longitude des coordonnées gps.

**caller :** Obligatoire. L'identification du site appelant. A fixer lors de la mise en place avec l’équipe de Labonnealternance. Idéalement de la forme "**adresse\_contact@domaine id\_organisme\_appelant"** afin de nous permettre de vous contacter en cas d'annonce importante relative au fonctionnement de l'API

**return\_uri :** Optionnel. Valeur par défaut / . L'uri de retour qui sera notifiée au site appelant. ****

**return\_logo\_url :** Optionnel. Valeur par défaut : logo du site Labonnealternance.pole-emploi.fr . L'url du logo du site vers lequel l'utilisateur revient en cliquant sur le bouton de retour dans Labonnealternance. ****

**scope :**  déprécié. Ce paramètre n'est plus utilisé.

**frozen\_job** : si ce paramètre est renseigné alors il n'est pas possible de modifier le métier sur le formulaire de recherche.

**job\_name** : un nom pour le métier recherché

**Si caller, lat, lon et romes sont correctement renseignés une recherche sera lancée automatiquement en utilisant ces critères. Si radius est correctement renseigné il sera utilisé comme critère de la recherche.**

#### **Si romes, frozen\_job et job\_name sont renseignés le formulaire de recherche ne permettra pas de modifier le métier de recherche et rappellera le nom dudit métier.** 

#### \*\*\*\*

#### **C /  Bouton de retour** 

Cliquer sur le logo en haut du formulaire ou d’une liste de résultat permet de signaler à la page appelante une instruction de changement de page.

**Si vous ne codez rien cette fonctionnalité n’a pas d’effet.**

Pour bénéficier du bouton de retour vous devez ajouter un listener pour l'API postMessage de javascript et coder l’action de navigation :

**`window.addEventListener('message',function(e){`** 

**`/*Remplacer par votre code pour gérer la navigation vers la page de votre site correspondante aux paramètres transmis par Labonnealternance dans le message*/`**

  
**`console.log("Type du message goToPage ", e.data.type);`**

**`console.log("URI de la page de redirection ", e.data.page);`**

**`});`**

