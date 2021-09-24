
export default function extractCandidatureParams(applicant_h, company_h) {
  let res = {}
  console.log('applicant_h', applicant_h);
  console.log('company_h', company_h);

  // Secret is 1234 by default
  // 3 mandatory fields
  res['secret'] = '1234'
  res['company_email'] = company_h.email || 'alan.leruyet@free.fr'
  res['applicant_email'] = applicant_h.email || 'alan.leruyet@free.fr'
  
  // Optional fields
  res['applicant_first_name'] = applicant_h.firstName
  res['applicant_last_name'] = applicant_h.lastName
  res['applicant_phone'] = applicant_h.phone
  res['message'] = applicant_h.message
  res['company_siret'] = company_h.siret
  res['company_name'] = company_h.name

  console.log('sending following params...', res);
  return res;
}

