
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

  if (!values.location || !values.location.label) {
    errors.location = "Veuillez sélectionner un lieu proposé";
  }
  return errors;
}
