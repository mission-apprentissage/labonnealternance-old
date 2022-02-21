const config = {
  local: {
    env: "local",
    urls: [/^"localhost"$/g],
    baseUrl: "http://localhost:5000",
  },
  dev: {
    env: "recette",
    urls: [/^labonnealternance-recette.apprentissage.beta.gouv.fr$/g,/^labonnealternance.beta.pole-emploi.fr$/g],
    baseUrl: "https://labonnealternance-recette.apprentissage.beta.gouv.fr",
  },

  prod: {
    env: "production",
    urls: [/^labonnealternance.apprentissage.beta.gouv.fr$/g,/^labonnealternance.pole-emploi.fr$/g],
    baseUrl: "https://labonnealternance.apprentissage.beta.gouv.fr",
  },

  prodnew: {
    env: "production",
    urls: [/^labonnealternance-new.apprentissage.beta.gouv.fr$/g],
    baseUrl: "https://labonnealternance-new.apprentissage.beta.gouv.fr",
  },
};

export const getEnvName = () => {
  let hostname = "";
  if (typeof window !== "undefined") {
    hostname = window.location.hostname;
  }

  if (config.dev.urls.some((regexp) => regexp.test(hostname))) {
    return "dev";
  } else if (config.prod.urls.some((regexp) => regexp.test(hostname))) {
    return "prod";
  } else if (config.prodnew.urls.some((regexp) => regexp.test(hostname))) {
    return "prodnew";
  }

  return "local";
};

export const getConfig = (envName) => {
  switch (envName) {
    case "prod":
      return config.prod;
    case "prodnew":
      return config.prodnew;
    case "dev":
      return config.dev;
    default:
      return config.local;
  }
};

export default getConfig(getEnvName());
