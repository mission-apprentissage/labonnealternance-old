import { random } from "lodash";
import getWhisperImage from "./getWhisperImage.js";

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export default function insertWhisper(document) {

  const whisperSize = document.getElementsByClassName('whisper').length
  const resultCards = document.getElementsByClassName('resultCard')
  const resultCardSize = resultCards.length

  if (whisperSize > 0) return 'whisper already exists : no change'
  if (resultCardSize === 0) return 'no resultCard found : no change'
  if (resultCardSize < 10) return 'not enough resultCard to show a whisper'

  const randomlyChosenResultCard = resultCards[random(3, 6)];
  let whisperNode = document.createElement("div");
  whisperNode.classList.add('whisper');
  whisperNode.setAttribute('data-testid', 'whisper');
  whisperNode.innerHTML = 
    ['<div class=\"resultCard gtmWhisper\">',
      '  <div class=\"c-media\">',
      '    <div class=\"c-media-figure\">',
            getWhisperImage(),
      '    </div>',
      '    <div class=\"c-media-body\">',
      '      <div class=\"row no-gutters\">',
      '        <div class=\"col-12 col-lg-6 text-left\">',
      '          <div class=\"whisper-title d-inline-block\">Psst, nous avons une <span class=\"whisper-title-special\">info pour vous !</span>',
      '          </div>',
      '        </div>',
      '      </div>',
      '      <div>',
      '        <div class=\"cardText pt-2\">Texte ligne 1</div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
      ''].join('\n');
  insertAfter(randomlyChosenResultCard, whisperNode)

  return 'whisper randomly inserted'

}
