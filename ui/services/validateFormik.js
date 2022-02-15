export default function validateFormik(values, widgetParameters) {
  const errors = {};

  if (
    !(
      widgetParameters?.parameters?.jobName &&
      widgetParameters?.parameters?.romes &&
      widgetParameters?.parameters?.frozenJob
    ) &&
    (!values.job || !values.job.label || !values.job.romes || !values.job.romes.length > 0)
  ) {
    errors.job = "Veuillez sélectionner un métier proposé";
  }

  /*
  - ne pas passer de searchCenter si pas de center
  - pouvoir reset la valeur du form quand le input est vide
    


  if (!values.location || !values.location.label) {
    errors.location = "Veuillez sélectionner un lieu proposé";
  }*/

  return errors;
}
