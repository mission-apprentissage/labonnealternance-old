import React from "react";
const diplomaMap = {
  "3 (CAP...)": "Cap, autres formations niveau 3",
  "4 (BAC...)": "Bac, autres formations niveau 4",
  "5 (BTS, DEUST...)": "BTS, DEUST, autres formations niveaux 5 (Bac+2)",
  "6 (Licence, BUT...)": "Licence, autres formations niveaux 6 (bac+3)",
  "7 (Master, titre ingénieur...)": "Master, titre ingénieur, autres formations niveaux 7 ou 8 (bac+5)",
};

function copyDeep(element) {
  return JSON.parse(JSON.stringify(element))
}

function sortObject(obj) {
  return Object.keys(obj).sort().reduce(function (result, key) {
    result[key] = obj[key];
    return result;
  }, {});
}

export function buildAvailableDiplomasOptions(diplomas) {
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
}

export function buildAvailableDiplomasButtons(diploma, diplomas, onClickCallback) {
  let allDiplomas = diplomas?.length ? copyDeep(diplomas) : copyDeep(diplomaMap)
  allDiplomas[""] = "Indifférent"
  return (
    <>
      {
        Object.keys(sortObject(allDiplomas)).map(function (key, indx) {
            return (
              <div key={indx} 
                    value={key} 
                    className={`c-diplomas-button ${diploma?.toString() === key ? 'is-selected' : ''}`}
                    onClick={(evt) => { evt.currentTarget.value = key; onClickCallback(evt, key) }}>
                {allDiplomas[key]}
              </div>
            );
        })
      }
    </>
  );
}
