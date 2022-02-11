import { simplifiedArrondissements } from './arrondissements';

describe('arrondissements', () => {

  it('.simplifiedArrondissements : Simplifies the first item', async () => {
    let parisItems = [
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
        "label": "Paris 75001"
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
        "label": "Paris 15e Arrondissement 75015"
      }
    ]
    let res = simplifiedArrondissements(parisItems, 'Paris')
    expect(parisItems).toEqual(parisItems);
    expect(res[0].label).toEqual('Paris');
  });

});
