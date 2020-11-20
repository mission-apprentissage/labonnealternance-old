const config = {
  local: {
    urls: [/^"localhost"$/g],
    baseUrl: "http://localhost:5000",    
  },
  dev: {
    urls: [/^labonnealternance-recette.apprentissage.beta.gouv.fr$/g],
    baseUrl: "https://labonnealternance-recette.apprentissage.beta.gouv.fr",
  },
  prod: {
    urls: [/^labonnealternance.apprentissage.beta.gouv.fr$/g],
    baseUrl: "https://labonnealternance.apprentissage.beta.gouv.fr",
  },
};

export const getEnvName = () => {
  let hostname = ''
  if (typeof window !== 'undefined') {
    hostname = window.location.hostname;
  }

  if (config.dev.urls.some((regexp) => regexp.test(hostname))) {
    return "dev";
  } else if (config.prod.urls.some((regexp) => regexp.test(hostname))) {
    return "prod";
  }

  return "local";
};

export const getConfig = (envName) => {
  switch (envName) {
    case "prod":
    return config.prod;
    case "dev":
    return config.dev;
    default:
    return config.local;
  }
};

export default getConfig(getEnvName());
