import { random } from "lodash";
import axios from "axios";

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export default async function insertWhisper(document) {

  const whisperSize = document.getElementsByClassName('whisper').length
  const resultCards = document.getElementsByClassName('resultCard')
  const resultCardSize = resultCards.length

  if (whisperSize > 0) return 'whisper already exists : no change'
  if (resultCardSize === 0) return 'no resultCard found : no change'
  if (resultCardSize < 10) return 'not enough resultCard to show a whisper'

  const response = await axios.get('https://raw.githubusercontent.com/mission-apprentissage/labonnealternance/main/ui/config/villes.txt');
  console.log('response', response);


  const randomlyChosenResultCard = resultCards[random(3, 6)];
  let whisperNode = document.createElement("div");
  whisperNode.classList.add('whisper');
  whisperNode.setAttribute('data-testid', 'whisper');
  whisperNode.innerHTML = 
    ['<div class="resultCard gtmWhisper">',
      '  <div class="c-media">',
      '    <div class="c-media-figure">',
            '<img className="c-whisper-img" src="/images/whisper.svg" alt="Someone" />',
      '    </div>',
      '    <div class="c-media-body">',
      '      <div class="row no-gutters">',
      '        <div class="col-12 text-left">',
      '          <div class="whisper-title d-inline-block">Psst, nous avons une <span class="whisper-title-special">info pour vous !</span>',
      '          </div>',
      '        </div>',
      '      </div>',
      '      <div>',
      '        <div class="cardText pt-2 whisper-text">La bonne idée avant de se lancer dans une filière : regarder si elle recrute ou si le secteur est bouché ! Vous pouvez visualiser ces infos sur cette carte</div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
      ''].join('\n');
  insertAfter(randomlyChosenResultCard, whisperNode)

  return 'whisper randomly inserted'

}
