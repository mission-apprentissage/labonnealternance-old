
export default function extractCompanyValues(item_h) {
  let res = {}
  let contact_h = item_h?.contact || {}
  let company_h = item_h?.company || {}
  res = { ...contact_h, ...company_h }
  return res;
}

