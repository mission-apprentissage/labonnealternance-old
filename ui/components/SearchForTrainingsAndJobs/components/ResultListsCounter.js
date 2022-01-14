import React from "react";
import { Spinner } from "reactstrap";
import FilterButton from "./FilterButton";
import purpleFilterIcon from "public/images/icons/purpleFilter.svg";

const ResultListsCounter = (props) => {

  const scopeContext = props.scopeContext
  const filterButtonClicked = props.filterButtonClicked
  const localDisplayCount = props.localDisplayCount
  const getJobCount = props.getJobCount

  if (props.allJobSearchError && props.trainingSearchError) return "";

  let count = 0;
  let jobPart = "";
  let jobLoading = "";
  let jobCount = 0;

  if (scopeContext.isJob) {
    if (props.isJobSearchLoading) {
      jobLoading = (
        <span className="jobColor">
          <div className="searchLoading">
            Recherche des entreprises en cours
            <Spinner />
          </div>
        </span>
      );
    } else if (!props.allJobSearchError) {
      jobCount = getJobCount(props.jobs);
      console.log('jobCount', jobCount);
      count += jobCount;
      jobPart = `${jobCount === 0 ? "aucune entreprise" : jobCount}`;

      if (jobCount === 1) {
        jobPart += " entreprise";
      } else if (jobCount > 1) {
        jobPart += " entreprises";
      }
    }
  }


  let trainingCount = 0;
  let trainingPart = "";
  let trainingLoading = "";

  if (scopeContext.isTraining) {
    if (props.isTrainingSearchLoading) {
      trainingLoading = (
        <span className="trainingColor">
          <div className="searchLoading">
            Recherche des formations en cours
            <Spinner />
          </div>
        </span>
      );
    } else if (!props.trainingSearchError) {
      trainingCount = props.trainings ? props.trainings.length : 0;

      count += trainingCount;

      trainingPart = `${trainingCount === 0 ? "Aucune formation" : trainingCount}`;

      if (trainingCount === 1) {
        trainingPart += " formation";
      } else if (trainingCount > 1) {
        trainingPart += " formations";
      }
    }
  }

  let correspondText = `${count === 0 ? " ne" : ""}${count <= 1 ? " correspond" : " correspondent"
    } à votre recherche`;

  return (
    <div className="pt-0">
      <div className="resultTitle mt-0 mt-md-2">
        {(scopeContext.isTraining && !trainingLoading) || (scopeContext.isJob && !jobLoading) ? (
          <div className={`c-resultlist-correspond-display-${localDisplayCount}`}>
            <span className="c-resultlist-correspond c-resultlist-correspond--bold">
              {jobPart} {trainingPart && jobPart ? " et " : ""} {trainingPart}{" "}
            </span>
            <span className="c-resultlist-correspond c-resultlist-correspond--light">{correspondText}</span>
          </div>
        ) : (
          ""
        )}
        {trainingLoading ? (
          <>
            <br />
            <br />
            {trainingLoading}
          </>
        ) : (
          ""
        )}
        {jobLoading ? (
          <>
            <br />
            <br />
            {jobLoading}
          </>
        ) : (
          ""
        )}
      </div>
      {!trainingLoading && !jobLoading && scopeContext.isJob && scopeContext.isTraining ? (
        <div className="c-filterbuttons">
          <FilterButton
            type="all"
            isActive={props.activeFilter === "all"}
            handleFilterButtonClicked={filterButtonClicked}
          />
          <FilterButton
            type="trainings"
            count={trainingCount}
            isActive={props.activeFilter === "trainings"}
            handleFilterButtonClicked={filterButtonClicked}
          />
          <FilterButton
            type="jobs"
            count={jobCount}
            isActive={props.activeFilter === "jobs"}
            handleFilterButtonClicked={filterButtonClicked}
          />
          <div className="c-resultlist-purplefilter" onClick={props.showSearchForm}>
            <img src={purpleFilterIcon} alt="Image de filtres" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );

};

export default ResultListsCounter;
