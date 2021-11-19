import insertWhisper from "./insertWhisper";

describe('insertWhisper', () => {

  it('insertWhisper() : do not insert anything if whisper already here', () => {
    document.body.innerHTML =
      '<div>' +
      '  <span class="whisper">Im a whisper</span>' +
      '</div>';
    let res = insertWhisper(document)
    expect(res).toEqual('no change made to the document')
  });

});
