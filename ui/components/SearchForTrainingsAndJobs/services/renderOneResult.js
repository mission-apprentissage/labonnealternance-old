import Training from "../../../components/ItemDetail/Training";
import Job from "../../../components/ItemDetail/Job";
import LbbCompany from "../../../components/ItemDetail/LbbCompany";

export const renderJob = (isTestMode, idx, job, handleSelectItem, searchForJobsOnNewCenter) => {
  if (isTestMode) {
    return (
      <div key={idx} data-testid={`job-${job?.id}`}></div>
    )
  } else {
    return (
      <Job
        key={idx}
        job={job}
        handleSelectItem={handleSelectItem}
        searchForTrainingsOnNewCenter={searchForJobsOnNewCenter}
      />
    );
  }
}
export const renderTraining = (isTestMode, idx, training, handleSelectItem, searchForJobsOnNewCenter) => {
  if (isTestMode) {
    return (
      <div key={idx} data-testid={`training-${training?.id}`}></div>
    )
  } else {
    return (
      <Training
        key={idx}
        training={training}
        handleSelectItem={handleSelectItem}
        searchForJobsOnNewCenter={searchForJobsOnNewCenter}
      />
    );
  }
}
export const renderLbb = (isTestMode, idx, company, handleSelectItem, searchForTrainingsOnNewCenter) => {
  if (isTestMode) {
    return (
      <div key={idx} data-testid={`lbb-${company?.id}`}></div>
    )
  } else {
    return (
      <LbbCompany
        key={idx}
        company={company}
        handleSelectItem={handleSelectItem}
        searchForTrainingsOnNewCenter={searchForTrainingsOnNewCenter}
      />
    );
  }
}
