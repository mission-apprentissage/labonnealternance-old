import React, { useEffect } from "react";

import { fetchAddressFromCoordinates } from "services/baseAdresse";

import { setWidgetParameters, setItemParameters } from "store/actions";

import { logError } from "utils/tools";

import { useDispatch, useSelector } from "react-redux";

const InitWidgetSearchParameters = ({ setIsLoading, handleSearchSubmit, handleItemLoad }) => {
  const dispatch = useDispatch();

  const { widgetParameters, itemParameters, shouldExecuteSearch, formValues, opcoFilter } = useSelector(
    (state) => state.trainings
  );

  useEffect(() => {
    // initialisation par les query params
    if (
      widgetParameters &&
      widgetParameters.applyWidgetParameters &&
      itemParameters &&
      itemParameters.applyItemParameters
    ) {
      // launchWidget AND item
      launchWidgetSearch({ selectItem: true });
      dispatch(setWidgetParameters({ ...widgetParameters, applyWidgetParameters: false })); // action one shot
      dispatch(setItemParameters({ ...itemParameters, applyItemParameters: false })); // action one shot
    } else if (widgetParameters && widgetParameters.applyWidgetParameters) {
      // launchWidget only
      launchWidgetSearch({ selectItem: false });
      dispatch(setWidgetParameters({ ...widgetParameters, applyWidgetParameters: false })); // action one shot
    } else if (itemParameters && itemParameters.applyItemParameters) {
      // launchItem only
      launchItemFetch();
      dispatch(setItemParameters({ ...itemParameters, applyItemParameters: false })); // action one shot
    } else {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (shouldExecuteSearch) {
      // provient du submit formulaire de la homepage
      executeSearch(formValues);
    }
  }, []);

  const executeSearch = (values) => {
    setIsLoading(true);
    try {
      handleSearchSubmit({ values });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      logError("Search error", err);
    }
  };

  const launchWidgetSearch = async ({ selectItem = false }) => {
    setIsLoading(true);
    const p = widgetParameters.parameters;
    try {
      if (widgetParameters.applyFormValues) {
        handleSearchSubmit({ values: widgetParameters.formValues, followUpItem: selectItem ? itemParameters : null });
      } else {
        let values = {
          job: {
            romes: p.romes.split(","),
          },
          radius: p.radius || 30,
          opco: opcoFilter,
        };

        if (p.lon || p.lat) {
          // récupération du code insee depuis la base d'adresse
          let addresses;

          addresses = await fetchAddressFromCoordinates([p.lon, p.lat]);

          if (addresses.length) {
            values = {
              ...values,
              location: {
                value: {
                  type: "Point",
                  coordinates: [p.lon, p.lat],
                },
                insee: addresses[0].insee,
              },
              ...addresses[0],
            };
          }
        }

        handleSearchSubmit({ values, followUpItem: selectItem ? itemParameters : null });
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
