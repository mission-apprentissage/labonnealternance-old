
const diplomaMap = {
  "3 (CAP...)": "CAP",
  "4 (Bac...)": "BAC",
  "5 (BTS, DUT...)": "BTS",
  "6 (Licence...)": "Licence / Bac +3",
  "7 (Master, titre ingénieur...)": "Master / Bac +5",
};

export default function buildDiplomas() {
  return (
    <>
      <option value="">Indifférent</option>
      {Object.keys(diplomaMap).map((key) => {
        return (
          <option key={key} value={key}>
            {diplomaMap[key]}
          </option>
        );
        })
      }
    </>
  );
}
