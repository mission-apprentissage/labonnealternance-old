/*import { map, isMapInitialized, getZoomLevelForDistance, waitForMapReadiness } from "../../../utils/mapTools";

const setJobMarkers = async (jobList) => {
  if (isMapInitialized) {
    await waitForMapReadiness();

    let features = [];
    jobList.map((job, idx) => {
      job.ideaType = "job";
      features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: job.coords,
        },
        properties: {
          id: idx,
          job,
        },
      });
    });

    let results = { type: "FeatureCollection", features };

    map.getSource("job-points").setData(results);
  }
};

const setTrainingMarkers = async (trainingList) => {
  if (isMapInitialized) {
    await waitForMapReadiness();

    if (trainingList) {
      // centrage sur formation la plus proche
      //const centerCoords = trainingList[0].coords.split(",");

      let newZoom = getZoomLevelForDistance(trainingList[0].items[0].place.distance);

      map.flyTo({ center: trainingList[0].coords, zoom: newZoom });

      let features = [];

      trainingList.map((training, idx) => {
        //const coords = training.coords.split(",");

        training.ideaType = "formation";
        features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: training.coords,
          },
          properties: {
            id: idx,
            training,
          },
        });
      });

      let results = { type: "FeatureCollection", features };

      map.getSource("training-points").setData(results);
    } else {
      map.getSource("training-points").setData({ type: "FeatureCollection", features: [] });
    }
  }
};

export { setTrainingMarkers, setJobMarkers };
*/