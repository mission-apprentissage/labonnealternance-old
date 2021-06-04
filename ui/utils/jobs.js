import React from "react";

const getJobAddress = (job) => {
  if (job.ideaType === "peJob")
    return (
      <>
        {job.company && job.company.name ? job.company.name : ""}
        {job.place.fullAddress}
      </>
    );
  else return job.place.fullAddress;
};

export { getJobAddress };
