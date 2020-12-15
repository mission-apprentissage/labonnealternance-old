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

  if (realItem.ideaType === "peJob") id = `peJob${realItem.job.id}`;
  else if (realItem.ideaType === "formation") id = `id${realItem.id}`;
  else id = `${realItem.ideaType}${realItem.company.siret}`;

  let res = document.getElementById(id);

  return res;
};

const logError = (title, error) => {
  let err = error instanceof Error ? error : new Error(error);
  err.name = title;
  Sentry.captureException(err);
};

export { getValueFromPath, scrollToTop, scrollToElementInContainer, getItemElement, logError };
