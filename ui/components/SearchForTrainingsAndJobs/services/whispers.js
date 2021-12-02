import { random, chunk, forEach, filter, reject } from "lodash";
import axios from "axios";
import csvToArray from "../../../utils/csvToArray.js"
import { randomWithin } from "../../../utils/arrayutils";


// async function randomMessage() {
//   const response = await axios.get('https://raw.githubusercontent.com/mission-apprentissage/labonnealternance/datasets/ui/config/astuces.csv');
//   const csv = csvToArray(response.data)
//   const cleanedCsv = csv
//                       .filter((e) => e.Message)
//                       .map((e) => {
//                         delete e['']
//                         e.link = e["Lien externe"].split(' ')[0]
//                         delete e["Lien externe"]
//                         return e
//                       })
//   let randomIndex = random(0, cleanedCsv.length - 1)
//   return cleanedCsv[randomIndex]
// }

function anyMessageAmongst(messages, alreadyShownMessages = []) {
  if (alreadyShownMessages.length > 0 && alreadyShownMessages.length <= messages.length) {
    const filteredMessages = filter(messages, (m) => {
      return reject(alreadyShownMessages, m.Message)
    })
    return randomWithin(filteredMessages)
  } else {
    return randomWithin(messages)
  }
}

async function getAllMessages() {
  const response = await axios.get('https://raw.githubusercontent.com/mission-apprentissage/labonnealternance/datasets/ui/config/astuces.csv');
  const csv = csvToArray(response.data)
  const cleanedCsv = csv
                      .filter((e) => e.Message)
                      .map((e) => {
                        delete e['']
                        e.link = e["Lien externe"].split(' ')[0]
                        delete e["Lien externe"]
                        return e
                      })
  return cleanedCsv;
}

async function insertWhisper(document, isLoadingData) {
  
  if (isLoadingData) return 'loading data : no change'

  const whisperSize = document.getElementsByClassName('whisper').length
  const resultCards = document.getElementsByClassName('resultCard')
  const resultCardSize = resultCards.length

  if (whisperSize > 0) return 'whisper already exists : no change'
  if (resultCardSize === 0) return 'no resultCard found : no change'

  const allMessages = await getAllMessages();

  if (resultCardSize <= 10) {
    const msg = anyMessageAmongst(allMessages)
    const randomlyChosenResultCard = randomWithin(resultCards)
    domInsertion(document, randomlyChosenResultCard, msg)
  } else if (resultCardSize > 10 && resultCardSize <= 20 ) {
    const msg = anyMessageAmongst(allMessages)
    const randomlyChosenResultCard = resultCards[random(2, 9)];
    domInsertion(document, randomlyChosenResultCard, msg)
  } else if (resultCardSize > 20) {
    const resultCardsBlocks = chunk(resultCards, 20);
    let alreadyShownMessages = []
    forEach(resultCardsBlocks, async (resultCardsBlock) => {
      const msg = anyMessageAmongst(allMessages, alreadyShownMessages)
      alreadyShownMessages.push(msg)
      const randomlyChosenResultCard = randomWithin(resultCardsBlock);
      domInsertion(document, randomlyChosenResultCard, msg)
    })
  }
  
  return 'whisper randomly inserted'
}

function domInsertion(document, randomlyChosenResultCard, msg) {
  let whisperNode = document.createElement("div");
  whisperNode.classList.add('whisper');
  whisperNode.setAttribute('data-testid', 'whisper');
  whisperNode.innerHTML = getHTML(msg.Message, msg.link, msg['Thème']);
  insertAfter(randomlyChosenResultCard, whisperNode)
}

function getHTML(text, link, theme) {
  return `<div class="resultCard gtmWhisper">
            <div class="c-media">
              <div class="c-media-figure">
                <img className="c-whisper-img" src="/images/whisper.svg" alt="Someone" />
              </div>
              <div class="c-media-body">
                <div class="row no-gutters">
                  <div class="col-12 text-left">
                    <div class="whisper-title d-inline-block">Psst, nous avons une <span class="whisper-title-special">info pour vous !</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="cardText pt-2 whisper-text">
                    ${text}
                    <span class="d-block mt-2">${!!link ? getHTMLLink(link) : ''}</span>
                  </div>
                  <div class="d-flex-center mt-4 whisper-feedback p-3" data-testid="whisper-feedback">
                    <span class="whisper-useful d-block">Avez-vous trouvé cette information utile ?</span>
                    <button class="gtmWhisperYes gtmWhisper${theme} d-block whisper-useful-btn mx-2" onclick="document.getElementsByClassName('whisper-feedback')[0].innerHTML = '<div>Merci pour votre retour !</div>'" aria-label="feedback-positive">👍 Oui</button>
                    <button class="gtmWhisperNo gtmWhisper${theme} d-block whisper-useful-btn" onclick="document.getElementsByClassName('whisper-feedback')[0].innerHTML = '<div>Merci pour votre retour.</div>'" aria-label="feedback-negative">👎 Non</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`
}

function getHTMLLink(link) {
  return `<a href="${link}" target="_blank" className="" rel="noopener noreferrer">
                  <img className="mt-n1" src="/images/square_link.svg" alt="Lien externe" />
                  <span className="ml-1">${link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}</span>
                </a>`
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const exportFunctions = {
  insertWhisper,
  getAllMessages
};


export default exportFunctions;
