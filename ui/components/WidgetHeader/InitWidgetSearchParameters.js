import React, { useEffect } from "react";

import { fetchAddressFromCoordinates } from "services/baseAdresse";

import { setWidgetParameters, setItemParameters } from "store/actions";

import { logError } from "utils/tools";

import { useDispatch, useSelector } from "react-redux";

const InitWidgetSearchParameters = ({ setIsLoading, handleSearchSubmit, handleItemLoad }) => {
  const dispatch = useDispatch();

  const { widgetParameters, itemParameters, shouldExecuteSearch, formValues } = useSelector((state) => state.trainings);

  useEffect(() => {
    if (widgetParameters && widgetParameters.applyWidgetParameters) {
      launchWidgetSearch(widgetParameters);
      dispatch(setWidgetParameters({ ...widgetParameters, applyWidgetParameters: false })); // action one shot
    } else if (itemParameters && itemParameters.applyItemParameters) {
      launchItemFetch(itemParameters);
      dispatch(setItemParameters({ ...itemParameters, applyItemParameters: false })); // action one shot
    } else {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (shouldExecuteSearch) {
      executeSearch(formValues);
    }
  }, []);

  const executeSearch = (values) => {
    setIsLoading(true);
    try {
      handleSearchSubmit(values);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      logError("Search error", err);
    }
  };

  const launchWidgetSearch = async () => {
    setIsLoading(true);
    const p = widgetParameters.parameters;
    try {
      // récupération du code insee depuis la base d'adresse
      const addresses = await fetchAddressFromCoordinates([p.lon, p.lat]);

      if (addresses.length) {
        let values = {
          location: {
            value: {
              type: "Point",
              coordinates: [p.lon, p.lat],
            },
            insee: addresses[0].insee,
          },
          job: {
            romes: p.romes.split(","),
          },
          radius: p.radius || 30,
          ...addresses[0],
        };

        handleSearchSubmit(values);
      } else {
        console.log("aucun lieu trouvé");
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      logError("WidgetSearch error", err);
    }
  };

  const launchItemFetch = async () => {
    setIsLoading(true);
    const p = itemParameters.parameters;
    try {
      await handleItemLoad(p);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      logError("WidgetSearch error", err);
    }
  };

  return "";
};

export default InitWidgetSearchParameters;
