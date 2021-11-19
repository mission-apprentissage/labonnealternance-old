import insertWhisper from "./insertWhisper";

describe('insertWhisper', () => {

  it('insertWhisper() : do not insert anything if whisper already here', () => {
    document.body.innerHTML =
      '<div>' +
      '  <span class="whisper">Im a whisper</span>' +
      '</div>';
    let res = insertWhisper(document)
    expect(res).toEqual('whisper already exists : no change')
  });

  it('insertWhisper() : do not insert anything if there is no resultCard', () => {
    document.body.innerHTML =
      '<div>' +
      '  Empty div, empty document' +
      '</div>';
    let res = insertWhisper(document)
    expect(res).toEqual('no resultCard found : no change')
  });

});
