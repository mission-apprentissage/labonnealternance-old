
export default function extractCandidatureParams(applicant_h, company_h) {
  let res = {}

  // Secret is 1234 by default
  // 3 mandatory fields
  res['secret'] = '1234'
  res['company_email'] = company_h?.email || 'alan.leruyet@free.fr'
  res['applicant_email'] = applicant_h?.email || 'alan.leruyet@free.fr'
  
  // Optional fields
  res['applicant_first_name'] = applicant_h?.firstName || null
  res['applicant_last_name'] = applicant_h?.lastName || null
  res['applicant_phone'] = applicant_h?.phone || null
  res['message'] = applicant_h?.message || null
  res['company_siret'] = company_h?.siret || null
  res['company_name'] = company_h?.name || null

  return res;
}

