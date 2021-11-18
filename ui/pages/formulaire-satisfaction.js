import React from "react";
import SatisfactionForm from "components/SatisfactionForm/SatisfactionForm";
import { NextSeo } from "next-seo";

const FormulaireSatisfaction = () => {
  return (
    <>
      <NextSeo
        title="Formulaire de satisfaction | La Bonne Alternance | Trouvez votre alternance"
        description="Formulaire de satisfaction."
      />
      <SatisfactionForm formType="avis" />
    </>
  );
 };

export default FormulaireSatisfaction;
