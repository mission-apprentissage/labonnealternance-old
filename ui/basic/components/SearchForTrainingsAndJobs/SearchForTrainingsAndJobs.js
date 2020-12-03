import React, { useState } from "react";
import { Row, Col } from "reactstrap";

import dynamic from 'next/dynamic'

import { MapListSwitchButton, RightColumn } from "./components";
import { setSelectedItem, setItemToScrollTo, setIsFormVisible, setVisiblePane } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { map } from "../../utils/mapTools";
import Map from "../../components/Map";


const SearchForTrainingsAndJobs = ({ isTrainingOnly }) => {
  const dispatch = useDispatch();

  const { selectedItem, trainings, visiblePane, isFormVisible } = useSelector((state) => state.trainings);

  console.log("VISIBLEPANE ",visiblePane, isFormVisible, trainings);

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

    dispatch(setVisiblePane("resultMap"));

    // hack : force le redimensionnement de la carte qui peut n'occuper qu'une fraction de l'écran en mode mobile
    setTimeout(() => {
      map.resize();
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
        <Col className={visiblePane === "resultMap" ? "activeXSPane" : "inactiveXSPane"} xs="12" md="8">
          <Map showResultList={showResultList} />
        </Col>
        <Col
          className={`leftShadow ${visiblePane === "resultList" ? "activeXSPane" : "inactiveXSPane"}`}
          xs="12"
          md="4"
        >
          <RightColumn
            showResultList={showResultList}
            showSearchForm={showSearchForm}
            unSelectItem={unSelectItem}
            isTrainingOnly={isTrainingOnly}
          />
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
