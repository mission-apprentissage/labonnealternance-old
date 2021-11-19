import { random } from "lodash";

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export default function insertWhisper(document) {

  if (document.getElementsByClassName('whisper').length === 0) {
    let cards = document.getElementsByClassName('resultCard')
    const card = cards[random(0, 4)];
    let node = document.createElement("div");
    let textnode = document.createTextNode("Water");
    node.appendChild(textnode);
    node.classList.add('whisper');
    if (card) {
      insertAfter(node, card)
      card.classList.add("red");
    }
  } else {
    return 'no change made to the document'
  }

}
