import { random } from "lodash";
import axios from "axios";
import csvToArray from "../../../utils/csvToArray.js"


async function randomMessage() {
  const response = await axios.get('https://raw.githubusercontent.com/mission-apprentissage/labonnealternance/datasets/ui/config/astuces.csv');
  const csv = csvToArray(response.data)
  const cleanedCsv = csv
                      .filter((e) => e.Message)
                      .map((e) => {
                        delete e['']
                        e.link = e["Lien externe "].split(' ')[0]
                        delete e["Lien externe "]
                        return e
                      })
  console.log('cleanedCsv', cleanedCsv);
  let randomIndex = random(0, cleanedCsv.length - 1)
  return cleanedCsv[randomIndex]
}

async function insertWhisper(document) {

  const whisperSize = document.getElementsByClassName('whisper').length
  const resultCards = document.getElementsByClassName('resultCard')
  const resultCardSize = resultCards.length

  if (whisperSize > 0) return 'whisper already exists : no change'
  if (resultCardSize === 0) return 'no resultCard found : no change'
  if (resultCardSize < 10) return 'not enough resultCard to show a whisper'

  const msg = await randomMessage()

  const randomlyChosenResultCard = resultCards[random(3, 6)];

  let whisperNode = document.createElement("div");
  whisperNode.classList.add('whisper');
  whisperNode.setAttribute('data-testid', 'whisper');
  whisperNode.innerHTML = getHTML(msg.Message, msg.link);
  insertAfter(randomlyChosenResultCard, whisperNode)

  return 'whisper randomly inserted'

}


function getHTML(text, link) {
  console.log('link', link);
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
                    <span>${!!link ? 'image here <img src="/images/square_link.svg" alt="Lien externe" />' : 'no image'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>`
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export { insertWhisper, randomMessage };
