import { string_wrapper as with_str } from "../../utils/wrapper_utils";

describe('string_wrapper', () => {

    it('.amongst : is string amongst values', async () => {
      expect(with_str('a').amongst(['a', 'b', 'c'])).toEqual(true);
      expect(with_str('a').amongst(['b', 'a', 'c', 'd'])).toEqual(true);
    });
    it('.amongst : is string NOT amongst values', async () => {
      expect(with_str('a').amongst(['z', 'b', 'c'])).toEqual(false);
      expect(with_str('a').amongst([])).toEqual(false);
    });
    it('.contains : is string containing another', async () => {
      expect(with_str('hello').contains('ll')).toEqual(true);
      expect(with_str('ll').contains('hello')).toEqual(false);
    });
    it('.in : is string contained inside another', async () => {
      expect(with_str('ll').in('hello')).toEqual(true);
      expect(with_str('hello').in('ll')).toEqual(false);
    });
});
