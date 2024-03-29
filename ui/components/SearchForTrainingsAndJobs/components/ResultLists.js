import React, { useState, useContext } from "react";
import { ErrorMessage } from "../../../components";
import { filterLayers } from "../../../utils/mapTools";
import ExtendedSearchButton from "./ExtendedSearchButton";
import ResultListsCounter from "./ResultListsCounter";
import NoJobResult from "./NoJobResult";
import { ScopeContext } from "../../../context/ScopeContext";
import { SearchResultContext } from "../../../context/SearchResultContextProvider";
import { DisplayContext } from "../../../context/DisplayContextProvider";
import { mergeJobs, mergeOpportunities } from "../../../utils/itemListUtils";
import { isCfaEntreprise } from "../../../services/cfaEntreprise";

import { renderJob, renderTraining, renderLbb } from "../services/renderOneResult";
import hasAlsoEmploi from "../../ItemDetail/ItemDetailServices/hasAlsoEmploi";

const ResultLists = (props) => {
  const scopeContext = useContext(ScopeContext);

  let [extendedSearch, hasSearch, isFormVisible] = [false, false, false];
  if (props.isTestMode) {
    [extendedSearch, hasSearch, isFormVisible] = [
      props.stubbedExtendedSearch,
      props.stubbedHasSearch,
      props.stubbedIsFormVisible,
    ];
  } else {
    ({ isFormVisible } = useContext(DisplayContext));
    ({ extendedSearch, hasSearch } = useContext(SearchResultContext));
  }

  const filterButtonClicked = (filterButton) => {
    props.setActiveFilter(filterButton);
    filterLayers(filterButton);
  };

  const getTrainingResult = () => {
    if (hasSearch && scopeContext.isTraining && (props.activeFilter === "all" || props.activeFilter === "trainings")) {
      return (
        <>
          <div id="trainingResult" className="trainingResult">
            {getTrainingList()}
          </div>
        </>
      );
    } else {
      return "";
    }
  };

  const getTrainingList = () => {
    if (props.trainings.length) {
      return (
        <>
          {props.searchRadius < props.trainings[0].place.distance ? (
            <div className="bold px-3 py-3">
              Aucune formation ne correspondait à votre zone de recherche, nous avons trouvé les plus proches
            </div>
          ) : (
            ""
          )}
          {props.trainings.map((training, idx) => {
            const isCfa = isCfaEntreprise(training?.company?.siret, training?.company?.headquarter?.siret);
            const hasAlsoJob = hasAlsoEmploi({
              isCfa,
              searchedMatchaJobs: props.jobs?.matchas,
              company: training?.company,
            });

            return renderTraining(
              props.isTestMode,
              idx,
              training,
              props.handleSelectItem,
              props.searchForJobsOnNewCenter,
              hasAlsoJob,
              isCfa
            );
          })}
        </>
      );
    } else if (!props.isTrainingSearchLoading) {
      return <ErrorMessage message="Problème momentané d'accès aux offres de formation" />;
    }
  };

  const getJobResult = () => {
    if (hasSearch && !props.isJobSearchLoading && (props.activeFilter === "all" || props.activeFilter === "jobs")) {
      if (props.allJobSearchError) return "";

      const jobCount = getJobCount(props.jobs);

      if (jobCount) {
        if (extendedSearch) {
          const mergedJobList = getMergedJobList();
          return <div className="jobResult">{mergedJobList ? <>{mergedJobList}</> : ""}</div>;
        } else {
          const jobList = getJobList();
          const lbbCompanyList = getLbbCompanyList();
          return (
            <div className="jobResult">
              {jobList || lbbCompanyList ? (
                <>
                  {jobList}
                  {lbbCompanyList}
                  {jobCount < 100 ? (
                    <ExtendedSearchButton
                      title="Voir plus de résultats"
                      handleExtendedSearch={props.handleExtendedSearch}
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <NoJobResult />
                  <ExtendedSearchButton
                    title="Étendre la sélection"
                    hasJob="true"
                    handleExtendedSearch={props.handleExtendedSearch}
                  />
                </>
              )}
            </div>
          );
        }
      } else {
        if (extendedSearch) return <NoJobResult />;
        else
          return (
            <>
              <NoJobResult />
              <ExtendedSearchButton
                title="Étendre la sélection"
                hasJob="false"
                handleExtendedSearch={props.handleExtendedSearch}
              />
            </>
          );
      }
    } else {
      return "";
    }
  };

  const getJobCount = (jobs) => {
    let jobCount = 0;

    if (jobs) {
      if (jobs.peJobs) jobCount += jobs.peJobs.length;
      if (jobs.matchas) jobCount += jobs.matchas.length;
      if (jobs.lbbCompanies) jobCount += jobs.lbbCompanies.length;
      if (jobs.lbaCompanies) jobCount += jobs.lbaCompanies.length;
    }

    return jobCount;
  };

  const getJobList = () => {
    const mergedJobs = mergeJobs(props.jobs);
    if (mergedJobs.length) {
      return (
        <>
          {mergedJobs.map((job, idx) => {
            return renderJob(props.isTestMode, idx, job, props.handleSelectItem, props.searchForTrainingsOnNewCenter);
          })}
        </>
      );
    } else return "";
  };

  const getLbbCompanyList = () => {
    const mergedLbaLbbCompanies = mergeOpportunities(props.jobs, "onlyLbbLba");
    if (mergedLbaLbbCompanies.length) {
      return (
        <>
          {mergedLbaLbbCompanies.map((company, idx) => {
            return renderLbb(
              props.isTestMode,
              idx,
              company,
              props.handleSelectItem,
              props.searchForTrainingsOnNewCenter
            );
          })}
        </>
      );
    } else return "";
  };

  // retourne le bloc construit des items lbb, lba, matcha et pe triés par ordre de distance
  const getMergedJobList = () => {
    const mergedOpportunities = mergeOpportunities(props.jobs);

    if (mergedOpportunities.length) {
      return (
        <>
          {mergedOpportunities.map((opportunity, idx) => {
            if (opportunity.ideaType === "peJob" || opportunity.ideaType === "matcha") {
              return renderJob(
                props.isTestMode,
                idx,
                opportunity,
                props.handleSelectItem,
                props.searchForTrainingsOnNewCenter
              );
            } else {
              return renderLbb(
                props.isTestMode,
                idx,
                opportunity,
                props.handleSelectItem,
                props.searchForTrainingsOnNewCenter
              );
            }
          })}
        </>
      );
    } else {
      return "";
    }
  };

  // construit le bloc formaté avec les erreurs remontées
  const getErrorMessages = () => {
    return props.trainingSearchError && props.allJobSearchError ? (
      <ErrorMessage message="Erreur technique momentanée" type="column" />
    ) : (
      <>
        {props.trainingSearchError ? <ErrorMessage message={props.trainingSearchError} /> : ""}
        {props.jobSearchError ? <ErrorMessage message={props.jobSearchError} /> : ""}
      </>
    );
  };

  const [displayCount, setDisplayCount] = useState(true);
  const handleScroll = () => {
    setDisplayCount(document.querySelector(".c-result-list__text").scrollTop < 30);
  };

  return (
    <div
      className={`c-result-list d-md-flex ${isFormVisible ? "hiddenResultList" : ""} ${
        props.selectedItem ? "c-result-list--item" : ""
      }`}
    >
      <div className={`c-result-list__header ${props.shouldShowWelcomeMessage || props.selectedItem ? "d-none" : ""}`}>
        <ResultListsCounter
          scopeContext={scopeContext}
          filterButtonClicked={filterButtonClicked}
          allJobSearchError={props.allJobSearchError}
          trainingSearchError={props.trainingSearchError}
          isJobSearchLoading={props.isJobSearchLoading}
          isTrainingSearchLoading={props.isTrainingSearchLoading}
          displayCount={displayCount}
          getJobCount={getJobCount}
          jobs={props.jobs}
          trainings={props.trainings}
          activeFilter={props.activeFilter}
          showSearchForm={props.showSearchForm}
        />
        {getErrorMessages()}
      </div>
      <div
        onScroll={handleScroll}
        id="resultList"
        className={`c-result-list__text ${props.shouldShowWelcomeMessage || props.selectedItem ? "d-none" : ""}`}
      >
        {getTrainingResult()}
        {getJobResult()}
      </div>
    </div>
  );
};

export default ResultLists;
