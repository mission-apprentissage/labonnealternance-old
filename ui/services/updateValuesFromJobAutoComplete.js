import formikUpdateValue from "services/formikUpdateValue";
import updateDiplomaSelectionFromJobChange from "services/updateDiplomaSelectionFromJobChange";

// Mets à jours les valeurs de champs du formulaire Formik à partir de l'item sélectionné dans l'AutoCompleteField
export default function updateValuesFromJobAutoComplete(item, setFieldValue, setDiplomaError, setDiplomas) {
  console.log("item ",item, "setFieldV",setFieldValue,"job");
  formikUpdateValue(item, setFieldValue, "job");
  updateDiplomaSelectionFromJobChange(item, setDiplomaError, setDiplomas);
}
