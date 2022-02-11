import { every, tail } from 'lodash';

const simplifiedArrondissements = (rawItems, town) => {
  
  const result = JSON.parse(JSON.stringify(rawItems))

  const allAreInTheTown = every(result, (e) => e?.label?.indexOf(town) === 0)
  const allButFirstHaveArrondissement = every(tail(result), (e) => e?.label?.indexOf('Arrondissement') > 0)

  if (allAreInTheTown && allButFirstHaveArrondissement) {
    // Only town will be shown
    result[0].label = result[0].label.split(' ')[0]
  }
  return result
}

const simplifiedItems = (rawItems) => {
  
  if (rawItems[0]?.label?.toLowerCase()?.includes('paris')) {
    return simplifiedArrondissements(rawItems, 'Paris')
  }
  else if (rawItems[0]?.label?.toLowerCase()?.includes('lyon')) {
    return simplifiedArrondissements(rawItems, 'Lyon')
  }
  else if (rawItems[0]?.label?.toLowerCase()?.includes('marseille')) {    
    return simplifiedArrondissements(rawItems, 'Marseille')
  } else {
    return rawItems
  }
}

export { simplifiedArrondissements, simplifiedItems }
