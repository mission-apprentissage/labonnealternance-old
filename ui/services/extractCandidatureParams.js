
export default function extractCandidatureParams(values) {
  let res = {}
  console.log('values', values);

  // Secret is 1234 by default
  res['secret'] = '1234'
  res['company_email'] = 'alan.leruyet@free.fr'
  res['applicant_email'] = 'alan.leruyet@free.fr'
  
  return res;
}
