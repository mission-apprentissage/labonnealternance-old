import React from "react";

const CandidatureSpontaneeMandataireKnowMoreCheckbox = ({ formik, item }) => {
  return item?.company?.mandataire ? (
    <div className="c-candidature-terms mt-3">
      <table className="c-candidature-terms--knowmore">
        <tbody>
          <tr>
            <td className="align-top pr-2">
              <input
                name="interetOffresMandataire"
                type="checkbox"
                id="CandidatureSpontaneeMandataireKnowMoreCheckbox"
                className="form-check-input"
                value="yes"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.interetOffresMandataire ? true : false}
              />
            </td>
            <td>
              <label htmlFor="CandidatureSpontaneeMandataireKnowMoreCheckbox">
                Je souhaite en savoir plus sur les opportunités de formations de cet établissement.
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    ""
  );
};

export default CandidatureSpontaneeMandataireKnowMoreCheckbox;
