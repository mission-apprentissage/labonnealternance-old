import { renderHook, act } from '@testing-library/react-hooks'
import { useSessionStorage } from '../../utils/useSessionStorage'
import { noop } from 'lodash'


function buildFakeStorage() {
  let storage = {};

  return {
    setItem: function (key, value) {
      storage[key] = value || '';
    },
    getItem: function (key) {
      return key in storage ? storage[key] : null;
    }
  };
}

describe('useSessionStorage', () => {

  // given
  let fakeSessionStorage = null
  
  beforeEach(() => {
    fakeSessionStorage = buildFakeStorage()
  });

  it('Returns the supplied default value is nothing is stored previously', () => {
    const { result } = renderHook(() => useSessionStorage('the_key', {a: 'default_value'}, fakeSessionStorage))
    expect(result.current[0]).toEqual({ a: "default_value"});
  });
  it('Returns the stored value if matching key was found inside storage', () => {
    fakeSessionStorage.setItem('the_key', '{ "a": "predefined_value" }')
    const { result } = renderHook(() => useSessionStorage('the_key', { a: 'default_value' }, fakeSessionStorage))
    expect(result.current[0]).toEqual({ a: "predefined_value" });
  });
});
