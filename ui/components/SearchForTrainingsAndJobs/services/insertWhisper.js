import { random } from "lodash";

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export default function insertWhisper(document) {

  const whisperSize = document.getElementsByClassName('whisper').length
  const resultCards = document.getElementsByClassName('resultCard')
  const resultCardSize = resultCards.length

  if (whisperSize > 0) return 'whisper already exists : no change'
  if (resultCardSize === 0) return 'no resultCard found : no change'
  if (resultCardSize < 10) return 'not enough resultCard to show a whisper'

  const card = resultCards[random(0, 4)];
  let node = document.createElement("div");
  let textnode = document.createTextNode("Water");
  node.appendChild(textnode);
  node.classList.add('whisper');
  node.setAttribute('data-testid', 'whisper');
  insertAfter(node, card)
  card.classList.add("red");

  return 'whisper randomly inserted'

}
