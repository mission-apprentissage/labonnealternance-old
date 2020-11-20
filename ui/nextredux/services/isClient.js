export default async function isClient() {
  // res = false
  // try {
  //   if (_window && _window.document && _window.document.createElement) {
  //     res = true;
  //   }
  // } catch (err) {}

  // return res;

  return (typeof window !== 'undefined')

}
