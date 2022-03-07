import React, { useState } from "react";
import { ErrorMessage } from "../../../components";
import { filterLayers } from "../../../utils/mapTools";
import { useSelector } from "react-redux";
import ExtendedSearchButton from "./ExtendedSearchButton";
import ResultListsCounter from "./ResultListsCounter";
import NoJobResult from "./NoJobResult";
import { useScopeContext } from "../../../context/ScopeContext";
import { mergeJobs, mergeOpportunities } from "../../../utils/itemListUtils";
import { renderJob, renderTraining, renderLbb } from "../services/renderOneResult";

const ResultLists = (props) => {
  const scopeContext = useScopeContext();

  let [extendedSearch, hasSearch, isFormVisible] = [false, false, false];
  if (props.isTestMode) {
    [extendedSearch, hasSearch, isFormVisible] = [
      props.stubbedExtendedSearch,
      props.stubbedHasSearch,
      props.stubbedIsFormVisible,
    ];
  } else {
    ({ extendedSearch, hasSearch, isFormVisible } = useSelector((state) => state.trainings));
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
            return renderTraining(
              props.isTestMode,
              idx,
              training,
              props.handleSelectItem,
              props.searchForJobsOnNewCenter
            );
          })}
        </>
      );
    } else if (props.isTrainingSearchLoading) {
      return "Nous recherchons les formations, merci de patienter...";
    } else {
      return <div className="bold bg-white">Aucune formation trouvée pour votre recherche</div>;
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

  const [displayCount, setDisplayCount] = useState(false);
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
