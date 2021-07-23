import {getStaticMetiers} from '../../utils/getStaticData.js';

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

});

