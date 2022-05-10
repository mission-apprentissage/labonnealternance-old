import React from "react";

const CandidatureSpontaneeMandataireKnowMoreCheckbox = ({ formik, item }) => {
  return item?.company?.mandataire ? (
    <div className="c-candidature-terms mt-3">
      <table className="c-candidature-terms--knowmore">
        <tr>
          <td className="align-top pr-2">
            <input type="checkbox" id="CandidatureSpontaneeMandataireKnowMoreCheckbox" class="form-check-input" />
          </td>
          <td>
            <label for="CandidatureSpontaneeMandataireKnowMoreCheckbox">
              Je souhaite en savoir plus sur les opportunités de formations de cet établissement.
            </label>
          </td>
        </tr>
      </table>
    </div>
  ) : (
    ""
  );
};

export default CandidatureSpontaneeMandataireKnowMoreCheckbox;
