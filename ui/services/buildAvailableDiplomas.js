
const diplomaMap = {
  "3 (CAP...)": "CAP",
  "4 (Bac...)": "BAC",
  "5 (BTS, DUT...)": "BTS",
  "6 (Licence...)": "Licence / Bac +3",
  "7 (Master, titre ingénieur...)": "Master / Bac +5",
};

export default function buildAvailableDiplomas (diplomas) {
  return (
    <>
      <option value="">Indifférent</option>
      {diplomas.length
        ? diplomas.sort().map((diploma) => {
          return (
            <option key={diploma} value={diploma}>
              {diplomaMap[diploma]}
            </option>
          );
        })
        : Object.keys(diplomaMap).map((key) => {
          return (
            <option key={key} value={key}>
              {diplomaMap[key]}
            </option>
          );
        })}
    </>
  );
};
