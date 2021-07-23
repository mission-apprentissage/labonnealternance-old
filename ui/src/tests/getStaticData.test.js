import { getStaticMetiers, getStaticVilles } from '../../utils/getStaticData.js';

describe('getStaticData', () => {

  it('getStaticMetiers : retrieve relevant data from lines', async () => {
    const stubbedExtractionFunction = () => {
     return  [
       'Soins aux animaux [A1501,A1502,A1502,A1407,A1501]',
       'Cinéma, Télévision, spectacle [L1201]',
       'Elevage d\'animaux de ferme[A1301, A1403]'
     ] 
    }
    expect(getStaticMetiers(null, null, null, stubbedExtractionFunction)).toEqual([
      { "name": "Soins aux animaux", "romes": ["A1501", "A1502", "A1407"], "slug": "soins-aux-animaux" }, 
      { "name": "Cinéma, Télévision, spectacle", "romes": ["L1201"], "slug": "cinema-television-spectacle" }, 
      { "name": "Elevage d'animaux de ferme", "romes": ["A1301", " A1403"], "slug": "elevage-danimaux-de-ferme" }
    ]);
  });

  it('getStaticVilles : retrieve relevant data from lines', async () => {
    const stubbedExtractionFunction = () => {
     return  [
       'Bondy / 93140 / 93010 / 53300 / 2.46667 / 48.9',
       'Nîmes / 30000 - 30900 / 30189 / 140300 / 4.35 / 43.8333',
       'Poitiers/86000/86194/89300/0.333333/46.5833',
     ] 
    }
    expect(getStaticVilles(null, null, null, stubbedExtractionFunction)).toEqual([
      { "insee": "93010", "lat": "48.9", "lon": "2.46667", "name": "Bondy", "slug": "bondy", "zip": "93140" }, 
      { "insee": "30189", "lat": "43.8333", "lon": "4.35", "name": "Nîmes", "slug": "nimes", "zip": "30000" }, 
      { "insee": "86194", "lat": "46.5833", "lon": "0.333333", "name": "Poitiers", "slug": "poitiers", "zip": "86000" }
    ]);
  });

});

