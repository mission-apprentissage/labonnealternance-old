/**
 * Mets à jour les états de l'interface en fonction de la navigation dans l'historique de l'utilisateur
 * sans qu'il y ait de changement de page
 */

export const updateUiFromHistory = ({
  url,
  jobs,
  trainings,
  currentPage,
  unSelectItem,
  selectedItem,
  selectItemFromHistory,
  setCurrentPage,
  visiblePane,
  isFormVisible,
  showResultMap,
  showResultList,
  showSearchForm,
}) => {
  // récupération des query parameters donnant des indications sur l'état de l'interface
  let urlParams;
  if (url.indexOf("?") >= 0) {
    urlParams = new URLSearchParams(url.substring(url.indexOf("?")));
  }

  const pageFromUrl = urlParams ? urlParams.get("page") : "";
  const display = urlParams ? urlParams.get("display") : "";
  const itemId = urlParams ? urlParams.get("itemId") : "";

  // réconciliation entre le store et l'état attendu indiqué par les query parameters pour les éléments sélectionnés
  if (currentPage !== pageFromUrl) {
    switch (currentPage) {
      case "fiche": {
        if (!pageFromUrl) {
          // désélection  de l'éventuel item sélectionné
          unSelectItem("doNotSaveToHistory");
        }
        break;
      }

      default: {
        if (pageFromUrl === "fiche") {
          // sélection de l'item correspondant à la fiche dans l'historique
          selectItemFromHistory(itemId, urlParams.get("type"));
        }
        break;
      }
    }

    setCurrentPage(pageFromUrl ? pageFromUrl : "");
  } else {
    if (currentPage === "fiche" && (!selectedItem || itemId != selectedItem.id)) {
      // sélection de l'item correspondant à la fiche dans l'historique
      selectItemFromHistory(itemId, urlParams.get("type"));
    }
  }

  // réconciliation entre le store et l'état attendu pour les panneaux d'affichage responsive
  if (display) {
    switch (display) {
      case "map": {
        if (visiblePane !== "resultMap") {
          // réaffichage de la map
          showResultMap(null, "doNotSaveToHistory");
        }
        break;
      }
      case "list": {
        if (visiblePane !== "resultList" || isFormVisible) {
          // réaffichage de la liste de résultats
          showResultList(null, "doNotSaveToHistory");
        }
        break;
      }
      default: /*case "form"*/ {
        if (visiblePane !== "resultList" || !isFormVisible) {
          // réaffichage du formulaire
          showSearchForm(null, "doNotSaveToHistory");
        }
        break;
      }
    }
  }
};

export default updateUiFromHistory;
