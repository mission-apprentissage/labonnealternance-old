
export default function extractCandidatureParams(applicant_h, company_h) {
  let res = {}
  console.log('applicant_h', applicant_h);
  console.log('company_h', company_h);

  // Secret is 1234 by default
  res['secret'] = '1234'
  res['company_email'] = 'alan.leruyet@free.fr'
  res['applicant_email'] = 'alan.leruyet@free.fr'

  return res;
}

