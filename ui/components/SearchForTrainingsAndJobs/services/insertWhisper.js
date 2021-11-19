import { random } from "lodash";

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export default function insertWhisper(document) {

  if (document.getElementsByClassName('whisper').length === 0) {
    let cards = document.getElementsByClassName('resultCard')
    if (cards.length) {
      if (cards.length > 9) {
        const card = cards[random(0, 4)];
        let node = document.createElement("div");
        let textnode = document.createTextNode("Water");
        node.appendChild(textnode);
        node.classList.add('whisper');
        node.setAttribute('data-testid', 'whisper');
        insertAfter(node, card)
        card.classList.add("red");
      } else {
        return 'not enough resultCard to show a whisper'
      }
    } else {
      return 'no resultCard found : no change'
    }
  } else {
    return 'whisper already exists : no change'
  }

}
