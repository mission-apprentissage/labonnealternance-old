export const GTMPageView = (url) => {
  const pageEvent = {
    event: "pageview",
    page: url,
  };

  window && window.dataLayer && window.dataLayer.push(pageEvent);

  return pageEvent;
};

export const SendTrackEvent = (event) => {
  window?.dataLayer?.push(event);
  return event;
};

export const SendPlausibleEvent = (name, props) => {
  console.log("ici ", name, props);
  //window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
  if (window?.plausible) {
    console.log("ah ! ", name, props);
    window.plausible(name, { props });
  } else console.log("oh ! ", name, props);
};
