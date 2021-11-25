import whispers from "./whispers";
import { queryByTestId, queryByRole } from '@testing-library/dom'
import { fireEvent, waitFor } from "@testing-library/react";

import nock from "nock";

describe('insertWhisper', () => {

  function buildFakeStorage() {
    let storage = {};

    return {
      setItem: function (key, value) {
        storage[key] = value || '';
      },
      getItem: function (key) {
        console.log('getItem', storage);
        return key in storage ? storage[key] : null;
      }
    };
  }

  let fakeSessionStorage = null

  beforeEach(() => {
    nock.disableNetConnect();
    fakeSessionStorage = buildFakeStorage()
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

    nock('https://raw.githubusercontent.com/mission-apprentissage/labonnealternance/datasets')
      .get('/ui/config/astuces.csv')
      .reply(200, 
            `;Thème;Message;Lien externe ;Astuces vague 1;Astuces vague 2 (contextualisables ou décalage politique)
             ;Formation;Combien de personnes qui préparaient le diplôme que vous visez ont interrompu leurs études avant la fin ? La réponse ici ! ;https://www.inserjeunes.education.gouv.fr/diffusion/accueil;oui;oui `)

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

  it('When whisper is inserted, feedback is provided', async () => {

    // Given
    nock('https://raw.githubusercontent.com/mission-apprentissage/labonnealternance/datasets')
      .get('/ui/config/astuces.csv')
      .reply(200, 
            `;Thème;Message;Lien externe ;Astuces vague 1;Astuces vague 2 (contextualisables ou décalage politique)
             ;Formation;Combien de personnes qui préparaient le diplôme que vous visez ont interrompu leurs études avant la fin ? La réponse ici ! ;https://www.inserjeunes.education.gouv.fr/diffusion/accueil;oui;oui `)

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

    await whispers.insertWhisper(document, 'anyFilter', fakeSessionStorage)
    const container = document.querySelector('#app')
    const whisper = queryByTestId(container, 'whisper')
    expect(whisper).not.toBeNull();

    const feedbackPositive = queryByRole(container, "button", { name: /feedback-positive/i });
    expect(feedbackPositive).not.toBeNull();
    expect(feedbackPositive).toHaveClass("gtmWhisperYes");
    expect(feedbackPositive).toHaveClass("gtmWhisperFormation");
    const feedbackNegative = queryByRole(container, "button", { name: /feedback-negative/i });
    expect(feedbackNegative).not.toBeNull();
    expect(feedbackNegative).toHaveClass("gtmWhisperNo");
    expect(feedbackNegative).toHaveClass("gtmWhisperFormation");

    // When
    fireEvent.click(feedbackPositive);

    // Then
    await waitFor(() => {
      expect(queryByTestId(container, "whisper-feedback")).toHaveTextContent("Merci pour votre retour !");
      expect(fakeSessionStorage.getItem('anyFilterhttp://localhost/')).toEqual('exists');
    });
  });


});
