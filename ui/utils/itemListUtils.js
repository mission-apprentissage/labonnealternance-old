// fusionne les offres pe et matcha et les trie par ordre croissant de distance
export const mergeJobs = (jobs) => {
  let mergedArray = [];

  if (jobs) {
    mergedArray = concatSources([jobs.peJobs, jobs.matchas]);
    mergedArray = sortMergedSources(mergedArray);
  }

  return mergedArray;
};

// fusionne les résultats lbb et lba et les trie par ordre croissant de distance, optionnellement intègre aussi les offres PE et matchas
export const mergeOpportunities = (jobs, onlyLbbLbaCompanies) => {
  let mergedArray = [];
  if (jobs) {
    let sources = [jobs.lbbCompanies, jobs.lbaCompanies];
    if (!onlyLbbLbaCompanies) {
      sources.push(jobs.peJobs);
      sources.push(jobs.matchas);
    }

    mergedArray = concatSources(sources);
    mergedArray = sortMergedSources(mergedArray);
  }

  return mergedArray;
};

const concatSources = (sources) => {
  let resultArray = [];

  sources.map((source) => {
    if (source && source.length) {
      resultArray = resultArray.concat(source);
    }
  });

  return resultArray;
};

const sortMergedSources = (mergedArray) => {
  mergedArray.sort((a, b) => {
    let dA = a.place.distance;
    let dB = b.place.distance;

    if (dA > dB) return 1;
    if (dA < dB) return -1;
    return 0;
  });

  return mergedArray;
};
