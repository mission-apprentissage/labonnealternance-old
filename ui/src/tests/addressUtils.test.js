import { rawPostalAddress} from '../../utils/addressUtils';

describe('addressUtils', () => {

    it('.rawPostalAddress : Removes the target if there is 2 comma+space occurences', async () => {
      expect(rawPostalAddress('Service Plus, 2 RUE TRUC, 32300 MOUCHES')).toEqual('2 RUE TRUC, 32300 MOUCHES');
    });
    it('.rawPostalAddress : Leaves the input untouched if there is no comma+space', async () => {
      expect(rawPostalAddress('2 RUE TRUC 32300 MOUCHES')).toEqual('2 RUE TRUC 32300 MOUCHES');
    });

});
