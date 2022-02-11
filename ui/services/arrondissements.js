
const simplifiedArrondissements = (rawItems, town) => {
  
  const result = JSON.parse(JSON.stringify(rawItems))

  const firstIsInTown = result[0]?.label?.toLowerCase()?.indexOf(town?.toLowerCase()) >= 0
  const secondIsInTown = result[1]?.label?.toLowerCase()?.indexOf(town?.toLowerCase()) >= 0
  const secondHasArrondissement = result[1]?.label?.toLowerCase()?.indexOf('arrondissement') >= 0
  if (firstIsInTown && secondIsInTown && secondHasArrondissement) {
    // Only town will be shown
    result[0].label = result[0].label.split(' ')[0]
  }
  return result
}

const simplifiedItems = (rawItems) => {
  
  const firstLabel = rawItems[0]?.label?.toLowerCase() || ''

  if (firstLabel.includes('paris')) {
    return simplifiedArrondissements(rawItems, 'Paris')
  } else if (firstLabel.includes('lyon')) {
    return simplifiedArrondissements(rawItems, 'Lyon')
  } else if (firstLabel.includes('marseille')) {    
    return simplifiedArrondissements(rawItems, 'Marseille')
  } else {
    return rawItems
  }
}

export { simplifiedArrondissements, simplifiedItems }
