import { useFormik } from "formik";
import * as Yup from "yup";
import { getItemType } from "../../../../utils/getItemId";
import submitCandidature from "./submitCandidature";

export default function getFormik(item, setSendingState) {

  const kind = getItemType(item)

  if (kind !== 'matcha') {
    return useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        fileName: "",
        fileContent: null,
        message: "",
        terms: false,
      },
      validationSchema: Yup.object({
        fileName: Yup.string().nullable().required("⚠ La pièce jointe est obligatoire"),
        firstName: Yup.string().max(15, "⚠ Doit avoir 15 caractères ou moins").required("⚠ Le prénom est obligatoire."),
        lastName: Yup.string().max(20, "⚠ Doit avoir 20 caractères ou moins").required("⚠ Le nom est obligatoire."),
        email: Yup.string().email("⚠ Adresse e-mail invalide.").required("⚠ L'adresse e-mail est obligatoire."),
        phone: Yup.string()
          .matches(/^[0-9]{10}$/, "⚠ Le numéro de téléphone doit avoir exactement 10 chiffres")
          .required("⚠ Le téléphone est obligatoire"),
      }),
      onSubmit: async (applicantValues) => {
        await submitCandidature(applicantValues, setSendingState, item);
      },
    });
  }

}
