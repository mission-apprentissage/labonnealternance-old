export default function extractCompanyValues(item_h) {
  let res = {};
  let contact_h = item_h?.contact || {};
  let company_h = item_h?.company || {};
  company_h.naf = item_h?.nafs && item_h.nafs.length ? item_h.nafs[0].label : null;
  company_h.address = item_h?.place?.fullAddress || {};

  res = { ...contact_h, ...company_h };
  return res;
}
