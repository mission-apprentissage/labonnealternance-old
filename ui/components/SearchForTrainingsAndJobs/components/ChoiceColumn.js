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
import { currentPage, setCurrentPage } from "utils/currentPage.js";

import {
  setTrainings,
  setSelectedItem,
  setItemToScrollTo,
  setFormValues,
  setExtendedSearch,
  setJobs,
  /*setCurrentPage,*/
} from "store/actions";
import { flyToMarker, flyToLocation, closeMapPopups } from "utils/mapTools";

const ChoiceColumn = ({
  showResultList,
  unSelectItem,
  showSearchForm,
  handleSubmit,
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
        scrollToElementInContainer("choiceColumn", itemElement, 200, "auto");
        dispatch(setItemToScrollTo(null));
      }
    }
  });

  const handleSelectItem = (item, type) => {
    flyToMarker(item, 12);
    closeMapPopups();
    dispatch(setSelectedItem(item));
    setCurrentPage("fiche");

    let itemId = item.id;
    if (type === "peJob") {
      itemId = item.job.id;
    } else if (type !== "training") {
      itemId = item.company.siret;
    }

    router.push(`${scopeContext.path}?page=fiche&display=list&type=${type}&itemId=${itemId}`, undefined, {
      shallow: true,
    });
  };

  const handleClose = () => {
    setCurrentPage("");
    router.push(`${scopeContext.path}`, undefined, { shallow: true });
    unSelectItem();
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
    searchForJobs(formValues, null);
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

    searchForJobsWithStrictRadius(formValues);

    if (isTrainingSearch) {
      searchForTrainings(formValues);
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
      />
    );
  };

  const getSearchForm = () => {
    return (
      <div className="d-block d-md-none">
        <SearchForm showResultList={showResultList} handleSubmit={handleSubmit} />
      </div>
    );
  };

  const getInitialDesktopText = () => {
    return (
      <div className={`d-none pt-3 ${shouldShowWelcomeMessage ? "d-md-block" : ""}`}>
        Texte visible seulement si pas de recherche et sur Desktop
      </div>
    );
  };

  const getSelectedItemDetail = (displayNavbar) => {
    return <ItemDetail selectedItem={selectedItem} handleClose={handleClose} displayNavbar={displayNavbar} />;
  };

  const [displayNavbar, setDisplayNavbar] = useState(false);

  const handleScroll = () => {
    setDisplayNavbar(document.querySelector("#choiceColumn").scrollTop > 30);
  };

  return (
    <div
      id="choiceColumn"
      className={`choiceCol ${shouldShowWelcomeMessage ? "c-choicecolumn__nosearch" : ""}`}
      onScroll={handleScroll}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {getInitialDesktopText()}
          {getSearchForm()}
          {getResultLists()}
          {getSelectedItemDetail(displayNavbar)}
        </>
      )}
    </div>
  );
};

export default ChoiceColumn;
