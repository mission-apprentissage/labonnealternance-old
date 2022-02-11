
export const simplifiedArrondissements = (rawItems, town) => {
  
  const result = JSON.parse(JSON.stringify(rawItems))

  const allAreInTheTown = _.every(result, (e) => e?.label?.indexOf(town) === 0)
  const allButFirstHaveArrondissement = _.every(_.tail(result), (e) => e?.label?.indexOf('Arrondissement') > 0)

  if (allAreInTheTown && allButFirstHaveArrondissement) {
    // Only town will be shown
    result[0].label = result[0].label.split(' ')[0]
  }
  return result
}
