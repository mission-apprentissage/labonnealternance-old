import { simplifiedArrondissements } from './arrondissements';

describe('arrondissements', () => {

  
  it('.simplifiedArrondissements : Simplifies the first item', async () => {
    let parisItems = getTownItems('Paris')
    let res = simplifiedArrondissements(parisItems, 'Paris')
    expect(parisItems).toEqual(parisItems);
    expect(res[0].label).toEqual('Paris');
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
