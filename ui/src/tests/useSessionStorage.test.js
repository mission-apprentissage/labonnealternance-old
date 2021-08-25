import { renderHook, act } from '@testing-library/react-hooks'
import {useSessionStorage} from '../../utils/useSessionStorage'


describe('useSessionStorage', () => {

  it('nominal case', () => {
    expect(2 + 2).toEqual(4);
  });
});
