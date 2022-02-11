import { simplifiedArrondissements, simplifiedItems } from './arrondissements';

describe('arrondissements', () => {

  it('.simplifiedArrondissements : Simplifies the first item', async () => {
    let nantesItems = getTownItems('nantes')
    expect(nantesItems[0].label).not.toEqual('nantes');
    let res = simplifiedArrondissements(nantesItems, 'nantes')
    expect(nantesItems).toEqual(nantesItems);
    expect(res[0].label).toEqual('nantes');
  });
  
  it('.simplifiedItems : Do not change anything outsite Paris, Lyon, Marseille', async () => {
    let nantesItems = getTownItems('nantes')
    expect(nantesItems[0].label).not.toEqual('nantes');
    let res = simplifiedItems(nantesItems, 'nantes')
    expect(nantesItems).toEqual(nantesItems);
    expect(res).toEqual(nantesItems);
  });
  
  it('.simplifiedItems : Change first item for Paris', async () => {
    let parisItems = getTownItems('Paris')
    expect(parisItems[0].label).not.toEqual('Paris');
    let res = simplifiedItems(parisItems, 'Paris')
    expect(parisItems).toEqual(parisItems);
    expect(res[0].label).toEqual('Paris');
  });

  it('.simplifiedItems : Change first item for Lyon', async () => {
    let parisItems = getTownItems('Lyon')
    expect(parisItems[0].label).not.toEqual('Lyon');
    let res = simplifiedItems(parisItems, 'Lyon')
    expect(parisItems).toEqual(parisItems);
    expect(res[0].label).toEqual('Lyon');
  });

  it('.simplifiedItems : Change first item for Marseille', async () => {
    let parisItems = getTownItems('Marseille')
    expect(parisItems[0].label).not.toEqual('Marseille');
    let res = simplifiedItems(parisItems, 'Marseille')
    expect(parisItems).toEqual(parisItems);
    expect(res[0].label).toEqual('Marseille');
  });

  let getTownItems = function (townName) {
    return [
      {
        "value": {
          "type": "Point",
          "coordinates": [
            2.347,
            48.859
          ]
        },
        "insee": "75056",
        "zipcode": "75001",
        "label": `${townName} 75001`
      },
      {
        "value": {
          "type": "Point",
          "coordinates": [
            2.295289,
            48.841959
          ]
        },
        "insee": "75115",
        "zipcode": "75015",
        "label": `${townName} 15e Arrondissement 75015`
      }
    ]
  }

});
