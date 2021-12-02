import whispers from "./whispers";
import { queryByTestId, queryAllByTestId, queryAllByRole } from '@testing-library/dom'
import { fireEvent, waitFor } from "@testing-library/react";

import nock from "nock";

describe('insertWhisper', () => {

  function setupNock() {
    nock('https://raw.githubusercontent.com/mission-apprentissage/labonnealternance/datasets')
      .get('/ui/config/astuces.csv')
      .reply(200,
        `;ID;Thème;Message;Lien externe;Astuces vague 1;Astuces vague 2 (contextualisables ou décalage politique)
            ;FOR_COMB;Formation;Combien de personnes qui préparaient le diplôme que vous visez ont interrompu leurs études avant la fin ? La réponse ici ! ;https://www.inserjeunes.education.gouv.fr/diffusion/accueil;oui;oui `)
  }

  beforeEach(() => {
    nock.disableNetConnect();
  });

  it('insertWhisper() : do not insert anything if data are loading', async () => {
    document.body.innerHTML =
      '<div>' +
      '  <span class="whisper">Im a whisper</span>' +
      '</div>';
    let res = await whispers.insertWhisper(document, true)
    expect(res).toEqual('loading data : no change')
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
  
  it('insertWhisper() : insert a whisper if more than 9 resultCard', async () => {

    setupNock()
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
    const whisper = queryByTestId(container, 'whisper0')
    expect(whisper).not.toBeNull();
    expect(res).toEqual('whisper randomly inserted')
  });

  it('When whisper is inserted, feedback can be provided', async () => {

    // Given
    setupNock()
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
      '  <span class="resultCard">991</span>' +
      '  <span class="resultCard">992</span>' +
      '  <span class="resultCard">993</span>' +
      '  <span class="resultCard">994</span>' +
      '  <span class="resultCard">995</span>' +
      '  <span class="resultCard">996</span>' +
      '  <span class="resultCard">997</span>' +
      '  <span class="resultCard">998</span>' +
      '  <span class="resultCard">999</span>' +
      '  <span class="resultCard">9910</span>' +
      '  <span class="resultCard">21</span>' +
      '  <span class="resultCard">22</span>' +
      '</div>';

    await whispers.insertWhisper(document)
    const container = document.querySelector('#app')
    const whisper = queryByTestId(container, 'whisper0')
    expect(whisper).not.toBeNull();

    const feedbackPositive = queryAllByRole(container, "button", { name: /feedback-positive/i })[0];
    expect(feedbackPositive).not.toBeNull();
    expect(feedbackPositive).toHaveClass("gtmWhisperYes");
    expect(feedbackPositive).toHaveClass("gtmWhisperFormation");
    const feedbackNegative = queryAllByRole(container, "button", { name: /feedback-negative/i })[0];
    expect(feedbackNegative).not.toBeNull();
    expect(feedbackNegative).toHaveClass("gtmWhisperNo");
    expect(feedbackNegative).toHaveClass("gtmWhisperFormation");

    // When
    fireEvent.click(feedbackPositive);

    // Then
    await waitFor(() => {
      expect(queryAllByTestId(container, "whisper-feedback")[0]).toHaveTextContent("Merci pour votre retour !");
    });
  });


});
