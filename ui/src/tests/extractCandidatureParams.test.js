import extractCandidatureParams from "../../services/extractCandidatureParams";

describe("extractCandidatureParams", () => {
  it("By default it fills mandatory fields", () => {
    expect(extractCandidatureParams()).toEqual({
      applicant_email: "dummy@beta.gouv.fr",
      applicant_file_content: null,
      applicant_file_name: "dummy.pdf",
      applicant_first_name: null,
      applicant_last_name: null,
      applicant_phone: null,
      company_email: "dummy@beta.gouv.fr",
      company_name: null,
      company_type: null,
      iv: "1f77e84c5735d50f8e326ed8af85452e",
      job_id: null,
      job_title: null,
      company_siret: null,
      message: null,
      company_address: null,
      company_naf: null,
    });
  });

  it("Maps values correctly", () => {
    const applicant_h = {
      email: "jane@doe.com",
      firstName: "Jane",
      lastName: "Doe",
      message: "sth important",
      phone: "0607080910",
      terms: true,
      fileName: "cv.pdf",
      fileContent: "data:aaaaaa",
    };
    const company_h = {
      email: "company@example.com",
      name: "CLEOP",
      phone: "",
      siret: "75223710700020",
      size: "3 à 5 salariés",
      socialNetwork: "",
      type: "lba",
      iv: "aaaa",
      job_title: "jobtitle",
      job_id: "jobid",
    };
    const res = extractCandidatureParams(applicant_h, company_h);
    expect(res).toEqual({
      company_email: "company@example.com",
      iv: "aaaa",
      applicant_file_name: "cv.pdf",
      applicant_file_content: "data:aaaaaa",
      applicant_email: "jane@doe.com",
      applicant_first_name: "Jane",
      applicant_last_name: "Doe",
      applicant_phone: "0607080910",
      company_type: "lba",
      message: "sth important",
      company_siret: "75223710700020",
      company_name: "CLEOP",
      company_address: null,
      company_naf: null,
      job_id: "jobid",
      job_title: "jobtitle",
    });
  });
});
