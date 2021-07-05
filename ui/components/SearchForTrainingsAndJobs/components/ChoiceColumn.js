import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useScopeContext } from "context/ScopeContext";
import { useDispatch, useSelector } from "react-redux";
import distance from "@turf/distance";
import { scrollToTop, scrollToElementInContainer, getItemElement } from "utils/tools";
import ItemDetail from "components/ItemDetail/ItemDetail";
import LoadingScreen from "components/LoadingScreen";
import SearchForm from "./SearchForm";
import ResultLists from "./ResultLists";
import { setCurrentPage, setCurrentSearch, currentSearch } from "utils/currentPage.js";
import pushHistory from "utils/pushHistory";
import dosearchImage from "public/images/dosearch.svg";

import {
  setTrainings,
  setSelectedItem,
  setItemToScrollTo,
  setFormValues,
  setExtendedSearch,
  setJobs,
} from "store/actions";
import { flyToMarker, flyToLocation, closeMapPopups, setSelectedMarker } from "utils/mapTools";

const ChoiceColumn = ({
  showResultList,
  unSelectItem,
  showSearchForm,
  handleSearchSubmit,
  shouldShowWelcomeMessage,
  searchRadius,
  isTrainingSearchLoading,
  searchForTrainings,
  trainingSearchError,
  searchForJobs,
  searchForJobsWithStrictRadius,
  isJobSearchLoading,
  jobSearchError,
  allJobSearchError,
  isLoading,
  activeFilter,
  setActiveFilter,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const scopeContext = useScopeContext();

  const { trainings, jobs, selectedItem, itemToScrollTo, formValues /*, currentPage*/ } = useSelector(
    (state) => state.trainings
  );

  useEffect(() => {
    if (itemToScrollTo) {
      const itemElement = getItemElement(itemToScrollTo);

      if (itemElement) {
        scrollToElementInContainer("resultList", itemElement, 150, "auto");
        dispatch(setItemToScrollTo(null));
      }
    }
  });

  const handleSearchSubmitFunction = (values) => {
    return handleSearchSubmit({ values });
  };

  const handleSelectItem = (item) => {
    flyToMarker(item, 12);
    closeMapPopups();
    dispatch(setSelectedItem(item));

    setSelectedMarker(item);

    setCurrentPage("fiche");

    pushHistory({
      router,
      scopeContext,
      item,
      page: "fiche",
      display: "list",
      searchParameters: formValues,
      searchTimestamp: currentSearch,
    });
  };

  const handleClose = () => {
    setCurrentPage("");
    pushHistory({
      router,
      scopeContext,
      display: "list",
      searchParameters: formValues,
      searchTimestamp: currentSearch,
    });
    unSelectItem("doNotSaveToHistory");
  };

  const searchForJobsOnNewCenter = async (newCenter) => {
    searchOnNewCenter(newCenter, null, "jobs");
  };

  const searchForTrainingsOnNewCenter = async (newCenter) => {
    searchOnNewCenter(newCenter, "trainings", null);
  };

  const searchForJobsWithLooseRadius = async () => {
    dispatch(setExtendedSearch(true));
    scrollToTop("choiceColumn");

    dispatch(setJobs([]));
    const searchTimestamp = new Date().getTime();
    pushHistory({
      router,
      scopeContext,
      display: "list",
      searchParameters: formValues,
      searchTimestamp,
    });
    setCurrentSearch(searchTimestamp);
    searchForJobs({ values: formValues, searchTimestamp });
  };

  const searchOnNewCenter = async (newCenter, isTrainingSearch, isJobSearch) => {
    dispatch(setExtendedSearch(false));

    scrollToTop("choiceColumn");

    formValues.location = newCenter;

    dispatch(setFormValues(formValues));

    // mise à jour des infos de distance des formations par rapport au nouveau centre de recherche
    if (isJobSearch) {
      updateTrainingDistanceWithNewCenter(formValues.location.value.coordinates);
    }

    flyToLocation({ center: formValues.location.value.coordinates, zoom: 10 });

    const searchTimestamp = new Date().getTime();

    pushHistory({
      router,
      scopeContext,
      display: "list",
      searchParameters: formValues,
      searchTimestamp,
    });
    setCurrentSearch(searchTimestamp);

    searchForJobsWithStrictRadius({ values: formValues, searchTimestamp });

    if (isTrainingSearch) {
      searchForTrainings({ values: formValues, searchTimestamp });
    }
  };

  const updateTrainingDistanceWithNewCenter = (coordinates) => {
    for (let i = 0; i < trainings.length; ++i) {
      //const trainingCoords = [trainings[i].place.longitude, trainings[i].place.latitude];
      trainings[i].place.distance =
        Math.round(10 * distance(coordinates, [trainings[i].place.longitude, trainings[i].place.latitude])) / 10;
    }
    dispatch(setTrainings(trainings));
  };

  const getResultLists = () => {
    return (
      <ResultLists
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        selectedItem={selectedItem}
        handleSelectItem={handleSelectItem}
        showSearchForm={showSearchForm}
        isTrainingSearchLoading={isTrainingSearchLoading}
        isJobSearchLoading={isJobSearchLoading}
        searchRadius={searchRadius}
        trainings={trainings}
        handleExtendedSearch={searchForJobsWithLooseRadius}
        searchForJobsOnNewCenter={searchForJobsOnNewCenter}
        searchForTrainingsOnNewCenter={searchForTrainingsOnNewCenter}
        jobs={jobs}
        jobSearchError={jobSearchError}
        allJobSearchError={allJobSearchError}
        trainingSearchError={trainingSearchError}
        shouldShowWelcomeMessage={shouldShowWelcomeMessage}
      />
    );
  };

  const getSearchForm = () => {
    return (
      <div className="d-block d-md-none">
        <SearchForm showResultList={showResultList} handleSearchSubmit={handleSearchSubmitFunction} />
      </div>
    );
  };

  const getInitialDesktopText = () => {
    return (
      <div className={`w-75 m-auto d-none pt-5 ${shouldShowWelcomeMessage ? "d-md-block" : ""}`}>
        <img className="w-75" src={dosearchImage} alt="Faites une recherche" />
        <div className="c-staticmapframe__message pr-5 py-3">
          <table>
            <tbody>
              <tr>
                <td className="px-4 px-lg-5 c-staticmapframe__decoration"></td>
                <td>
                  <span className="c-staticmapframe__title">Faites une recherche</span>
                  <br />
                  Renseignez les champs de recherche ci-dessus pour trouver la formation et l'entreprise pour réaliser
                  votre projet d'alternance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const getSelectedItemDetail = () => {
    return (
      <ItemDetail
        selectedItem={selectedItem}
        handleClose={handleClose}
        handleSelectItem={handleSelectItem}
        activeFilter={activeFilter}
      />
    );
  };

  return (
    <div id="choiceColumn" className={`choiceCol ${shouldShowWelcomeMessage ? "c-choicecolumn__nosearch" : ""}`}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {getInitialDesktopText()}
          {getSearchForm()}
          {trainings.length === 0 && isJobSearchLoading ? <div></div> : getResultLists()}
          {getSelectedItemDetail()}
        </>
      )}
    </div>
  );
};

export default ChoiceColumn;
