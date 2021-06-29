export const storeTrainingsInSession = ({ trainings, searchTimestamp }) => {
  let search = JSON.parse(sessionStorage.getItem(searchTimestamp));
  sessionStorage.setItem(searchTimestamp, JSON.stringify({ trainings, ...search }));
};

export const storeJobsInSession = ({ jobs, searchTimestamp }) => {
  let search = JSON.parse(sessionStorage.getItem(searchTimestamp));
  sessionStorage.setItem(searchTimestamp, JSON.stringify({ jobs, ...search }));
};

export const restoreSearchFromSession = ({ searchTimestamp, dispatch, setTrainings, setJobs }) => {
  let search = JSON.parse(sessionStorage.getItem(searchTimestamp));

  if (search?.jobs) {
    dispatch(setJobs(search.jobs));
  }

  if (search?.trainings) {
    dispatch(setTrainings(search.trainings));
  }
};
