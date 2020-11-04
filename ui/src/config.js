const config = {
  local: {
    urls: [/^"localhost"$/g],
    baseUrl: "http://localhost:5000",    
  },
  dev: {
    urls: [/^idea-recette.apprentissage.beta.gouv.fr$/g],
    baseUrl: "https://idea-recette.apprentissage.beta.gouv.fr",
  },
  prod: {
    urls: [/^idea.apprentissage.beta.gouv.fr$/g],
    baseUrl: "https://idea.apprentissage.beta.gouv.fr",
  },
};

export const getEnvName = () => {
  let hostname = window.location.hostname;

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
