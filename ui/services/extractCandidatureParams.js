export default function extractCandidatureParams(applicant_h, company_h) {
  let res = {};

  // 8 mandatory fields
  res["company_email"] = company_h?.email || "alan.leruyet@free.fr";
  res["applicant_first_name"] = applicant_h?.firstName || null;
  res["applicant_last_name"] = applicant_h?.lastName || null;
  res["applicant_phone"] = applicant_h?.phone || null;
  res["message"] = applicant_h?.message || null;
  res["applicant_email"] = applicant_h?.email || "alan.leruyet@free.fr";
  res["applicant_file_name"] =  applicant_h?.fileName || "dummy.pdf";
  res["applicant_file_content"] = applicant_h?.fileContent || null;

  // Optional fields
  res["company_siret"] = company_h?.siret || null;
  res["company_name"] = company_h?.name || null;
  res["company_address"] = company_h?.address || null;
  res["company_naf"] = company_h?.naf || null;

  return res;
}