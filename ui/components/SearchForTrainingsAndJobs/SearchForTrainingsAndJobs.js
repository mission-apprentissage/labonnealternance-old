import React, { useState, useEffect, useRef } from "react";

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

const SearchForTrainingsAndJobs = ({ isMobile, changedSize }) => {
  const dispatch = useDispatch();

  const { selectedItem, visiblePane } = useSelector((state) => state.trainings);
  
  // useEffect(() => {
  //   return () => {
  //     // your code to be run on update only.
  //     console.log('visiblePane', visiblePane);
  //     if (!isMobile && visiblePane !== "resultList") {
  //       console.log('fire...')
  //       showResultList()
  //     }
  //   }
  // });


  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) {
      console.log('I run only if isMobile changes.');
      if (!isMobile) {
        showResultList()
      }
    } else {
      didMount.current = true;
    }
  }, [isMobile]);


  // const isInitialMount = useRef(true);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     // Your useEffect code here to be run on update
  //     if (!isMobile) {
  //       console.log('fire...')
  //       showResultList()
  //     }
  //   }
  // });

  // useEffect(() => {
  //   if (!isMobile) {
  //     console.log('fire...')
  //     showResultList()
  //   }
  // }, []);

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
          <ChoiceColumn showResultList={showResultList} showSearchForm={showSearchForm} unSelectItem={unSelectItem} isMobile={isMobile}/>
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
