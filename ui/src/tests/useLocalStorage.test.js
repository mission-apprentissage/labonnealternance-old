import { renderHook, act } from '@testing-library/react-hooks'
import { useLocalStorage } from '../../utils/useLocalStorage'


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

describe('useLocalStorage', () => {

  // given
  let fakeLocalStorage = null
  
  beforeEach(() => {
    fakeLocalStorage = buildFakeStorage()
  });

  it('Returns the supplied default value is nothing is stored previously', () => {
    const { result } = renderHook(() => useLocalStorage('the_key', {a: 'default_value'}, fakeLocalStorage))
    expect(result.current[0]).toEqual({ a: "default_value"});
  });
  it('Returns a JSON-parsed, stored value if matching key was found inside storage', () => {
    fakeLocalStorage.setItem('the_key', '{ "a": "predefined_value" }')
    const { result } = renderHook(() => useLocalStorage('the_key', { a: 'default_value' }, fakeLocalStorage))
    expect(result.current[0]).toEqual({ a: "predefined_value" });
  });
  it('When acting, localStorage is filled', () => {
    const { result } = renderHook(() => useLocalStorage('the_key', { a: 'default_value' }, fakeLocalStorage))
    act(() => {
      result.current[1]({ a: 'fresh_new_value' })
    })
    expect(result.current[0]).toEqual({ a: "fresh_new_value" });
  });
});
