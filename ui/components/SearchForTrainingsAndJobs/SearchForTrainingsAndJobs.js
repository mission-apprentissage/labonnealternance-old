import React from "react";

import { Row, Col } from "reactstrap";

import { MapListSwitchButton, ChoiceColumn } from "./components";
import {
  setSelectedItem,
  setItemToScrollTo,
  setIsFormVisible,
  setVisiblePane,
  setShouldMapBeVisible,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { resizeMap, isMapInitialized } from "../../utils/mapTools";
import Map from "../../components/Map";

const SearchForTrainingsAndJobs = () => {
  const dispatch = useDispatch();

  const { selectedItem, visiblePane } = useSelector((state) => state.trainings);

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
      <Row>
        <Col
          className={`leftShadow ${visiblePane === "resultList" ? "activeXSPane" : "inactiveXSPane"}`}
          xs="12"
          md="5"
        >
          <ChoiceColumn showResultList={showResultList} showSearchForm={showSearchForm} unSelectItem={unSelectItem} />
        </Col>
        <Col className={visiblePane === "resultMap" ? "activeXSPane" : "inactiveXSPane"} xs="12" md="7">
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
