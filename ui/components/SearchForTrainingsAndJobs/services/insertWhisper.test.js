import insertWhisper from "./insertWhisper";

describe('insertWhisper', () => {

  it('insertWhisper() : do not insert anything if whisper already here', () => {
    let res = insertWhisper()
    expect(res).toEqual('no change made to the document')
  });

});
