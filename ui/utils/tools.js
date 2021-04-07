import * as Sentry from "@sentry/react";

const getValueFromPath = (key) => {
  const url = new URL(window.location);

  // WARNING: URLSearchParams not supported by IE
  const searchParams = new URLSearchParams(url.search);

  let res = searchParams.get(key);

  return res;
};

const scrollToTop = (elementId) => {
  if (elementId) {
    document.getElementById(elementId).scrollTo({
      top: 0,
      left: 0,
    });
  } else {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }
};

const scrollToElementInContainer = (containerId, el, yOffsett, behavior) => {
  document.getElementById(containerId).scrollTo({
    top: el.offsetTop - yOffsett,
    left: 0,
    behavior,
  });
};

const getItemElement = (item) => {
  let id = "";

  let realItem = item.items ? item.items[0] : item;

  switch (realItem.ideaType) {
    case "peJob": {
      id = `peJob${realItem.job.id}`;
      break;
    }
    case "formation": {
      id = `id${realItem.id}`;
      break;
    }
    case "matcha": {
      id = `matcha${realItem.id}`;
      break;
    }
    default: {
      //aka. lbb et lba
      id = `${realItem.ideaType}${realItem.company.siret}`;
      break;
    }
  }

  let res = document.getElementById(id);

  return res;
};

const logError = (title, error) => {
  let err = error instanceof Error ? error : new Error(error);
  err.name = title;
  Sentry.captureException(err);
  console.log(`Error ${title} sent to Sentry`);
};

export { getValueFromPath, scrollToTop, scrollToElementInContainer, getItemElement, logError };
