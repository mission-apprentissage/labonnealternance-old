import whispers from "./whispers";
import { queryByTestId } from '@testing-library/dom'
import nock from "nock";

describe('insertWhisper', () => {

  beforeEach(() => {
    nock.disableNetConnect();
  });

  it('insertWhisper() : do not insert anything if whisper already here', async () => {
    document.body.innerHTML =
      '<div>' +
      '  <span class="whisper">Im a whisper</span>' +
      '</div>';
    let res = await whispers.insertWhisper(document)
    expect(res).toEqual('whisper already exists : no change')
  });

  it('insertWhisper() : do not insert anything if there is no resultCard', async () => {
    document.body.innerHTML =
      '<div>' +
      '  Empty div, empty document' +
      '</div>';
    let res = await whispers.insertWhisper(document)
    expect(res).toEqual('no resultCard found : no change')
  });

  it('insertWhisper() : do not insert anything if there is not enough resultCard', async () => {
    document.body.innerHTML =
      '<div>' +
      '  <span class="resultCard">Im a resultCard</span>' +
      '</div>';
    let res = await whispers.insertWhisper(document)
    expect(res).toEqual('not enough resultCard to show a whisper')
  });
  
  it('insertWhisper() : insert a whisper if more than 9 resultCard', async () => {
    document.body.innerHTML =
    '<div id="app">' +
    '  <span class="resultCard">1</span>' +
    '  <span class="resultCard">2</span>' +
    '  <span class="resultCard">3</span>' +
    '  <span class="resultCard">4</span>' +
    '  <span class="resultCard">5</span>' +
    '  <span class="resultCard">6</span>' +
    '  <span class="resultCard">7</span>' +
    '  <span class="resultCard">8</span>' +
    '  <span class="resultCard">9</span>' +
    '  <span class="resultCard">10</span>' +
    '</div>';
    let res = await whispers.insertWhisper(document)
    const container = document.querySelector('#app')
    const whisper = queryByTestId(container, 'whisper')
    expect(whisper).not.toBeNull();
    expect(res).toEqual('whisper randomly inserted')
  });


});
