import React, { useState, useEffect, useRef } from "react";

import { Row, Col } from "reactstrap";

import { MapListSwitchButton, ChoiceColumn } from "./components";
import {
  setSelectedItem,
  setItemToScrollTo,
  setIsFormVisible,
  setVisiblePane,
  setShouldMapBeVisible,
} from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { resizeMap, isMapInitialized } from "utils/mapTools";
import WidgetHeader from "components/WidgetHeader/WidgetHeader";
import Map from "components/Map";

const SearchForTrainingsAndJobs = () => {
  const dispatch = useDispatch();

  const { selectedItem, visiblePane } = useSelector((state) => state.trainings);

  const [shouldShowWelcomeMessage, setShouldShowWelcomeMessage] = useState(true);

  // See https://www.robinwieruch.de/react-useeffect-only-on-update
  /*const didMount = React.useRef(false);
  React.useEffect(() => {
    if (didMount.current) {
      if (!isMobile) {
        // will only run if "isMobile" change !
        showResultList()
      }
    } else {
      didMount.current = true;
    }
  }, [isMobile]);*/

  const handleSubmit = async (values) => {
    // centrage de la carte sur le lieu de recherche
    const searchCenter = [values.location.value.coordinates[0], values.location.value.coordinates[1]];

    setShouldShowWelcomeMessage(false);

    dispatch(setHasSearch(false));
    setSearchRadius(values.radius || 30);
    dispatch(setExtendedSearch(false));

    flyToLocation({ center: searchCenter, zoom: 10 });

    dispatch(setFormValues({ ...values }));

    if (scopeContext.isTraining) {
      searchForTrainings(values);
    }

    if (scopeContext.isJob) {
      searchForJobsWithStrictRadius(values);
    }
    dispatch(setIsFormVisible(false));
  };

  const showSearchForm = (e) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(setVisiblePane("resultList")); // affichage de la colonne resultList / searchForm
    dispatch(setIsFormVisible(true));
    unSelectItem();
  };

  const showResultMap = (e) => {
    if (e) {
      e.stopPropagation();
    }

    if (!isMapInitialized) {
      dispatch(setShouldMapBeVisible(true));
    }
    dispatch(setVisiblePane("resultMap"));

    // hack : force le redimensionnement de la carte qui peut n'occuper qu'une fraction de l'écran en mode mobile
    setTimeout(() => {
      resizeMap();
    }, 50);
  };

  const showResultList = (e) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(setVisiblePane("resultList"));
    dispatch(setIsFormVisible(false));
  };

  const unSelectItem = () => {
    if (selectedItem) {
      dispatch(setSelectedItem(null));
      dispatch(setItemToScrollTo(selectedItem));
    }
  };

  return (
    <div className="page demoPage">
      <WidgetHeader handleSubmit={handleSubmit} />
      <Row>
        <Col
          className={`leftShadow ${visiblePane === "resultList" ? "activeXSPane" : "inactiveXSPane"}`}
          xs="12"
          md="5"
        >
          <ChoiceColumn
            shouldShowWelcomeMessage={shouldShowWelcomeMessage}
            handleSubmit={handleSubmit}
            showResultList={showResultList}
            showSearchForm={showSearchForm}
            unSelectItem={unSelectItem}
          />
        </Col>
        <Col className={`vh-100 ${visiblePane === "resultMap" ? "activeXSPane" : "inactiveXSPane"}`} xs="12" md="7">
          <Map showResultList={showResultList} />
        </Col>
      </Row>
      <MapListSwitchButton
        showSearchForm={showSearchForm}
        showResultMap={showResultMap}
        showResultList={showResultList}
      />
    </div>
  );
};

export default SearchForTrainingsAndJobs;
