
const rayonMap = {
  "10": "10km",
  "30": "30km",
  "60": "60km",
  "100": "100km",
};

export function buildRayonsOptions() {
  return (
    <>
      {Object.keys(rayonMap).map((key) => {
        return (
          <option key={key} value={key}>
            {rayonMap[key]}
          </option>
        );
        })
      }
    </>
  );
}

export function buildRayonsButtons() {
  return (
    <>
      {Object.keys(rayonMap).map((key) => {
        return (
          <option key={key} value={key}>
            {rayonMap[key]}
          </option>
        );
        })
      }
    </>
  );
}
