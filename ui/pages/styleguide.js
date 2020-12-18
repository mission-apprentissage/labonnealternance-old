import React from 'react'
import Navigation from '../components/navigation'
import { useSelector } from 'react-redux'
import microAjax from "utils/microAjax";
import baseUrl from "utils/baseUrl";

const Styleguide = () => {
  const routerState = useSelector(state => state.router)
  if (typeof window !== 'undefined') {
    microAjax({ 
      url: baseUrl + '/api/version', 
      success: (res) => console.log(`version : ${JSON.parse(res).version}`)
    });    
  }
  return (
    <div className="c-styleguide">
      <Navigation />

      <div className="container mt-5">
        <h1 className="text-center">Styleguide</h1>

        <p className="lead text-center">Ensemble des styles utilisés dans l'application</p>

        <h2 className="fw-bold mt-4 pt-4">Couleurs illustratives</h2>
        <hr/>
        <div className="row">
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-bluesoft500">Bluesoft500</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-bluedark500">Bluedark500</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-pinksoft500">Pinksoft500</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-pinkdark500">Pinkdark500</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-pinklight500">Pinklight500</div>
          </div>
        </div>

        <h2 className="fw-bold mt-4 pt-4">Couleurs fonctionnelles</h2>
        <hr/>

        <div className="row">
          <div className="col-md-4">
            <div className="p-3 mb-3 bg-primary text-white">Primary</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 bg-secondary text-white">Secondary</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 bg-success text-white">Success</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 bg-danger text-white">Danger (=Error)</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 bg-warning text-dark">Warning</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 bg-info text-white">Info</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 bg-light text-dark">Light</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 bg-dark text-white">Dark</div>
          </div>
        </div>

        <h2 className="fw-bold mt-4 pt-4">Les fonds</h2>
        <hr/>

        <div className="row">
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-100">gray-100</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-200">gray-200</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-300">gray-300</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-400">gray-400</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-500">gray-500</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-600">gray-600</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-700">gray-700</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-750">gray-750</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-800">gray-800</div>
          </div>
          <div className="col-md-4">
            <div className="p-3 mb-3 swatch-900">gray-900</div>
          </div>
        </div>

        <h2 className="fw-bold mt-4 pt-4">Boutons</h2>
        <hr/>
        <p>
          <button type="button" className="btn btn-primary ml-1">Primary</button>
          <button type="button" className="btn btn-primary hover ml-1">Primary (Hover)</button>
        </p>
        <p>
          <button type="button" className="btn btn-outline-primary ml-1">Primary Outline</button>
          <button type="button" className="btn btn-outline-primary hover ml-1">Primary Outline (Hover)</button>
        </p>
        <p>
          <button type="button" className="btn btn-dark ml-1">Dark</button>
          <button type="button" className="btn btn-dark hover ml-1">Dark (Hover)</button>
        </p>

        <h2 className="fw-bold mt-4 pt-4">Grille, espacements</h2>
        <hr/>
        <div className="d-flex">
          <div className=""><div className="border bg-light">Référence</div></div>
          <div className="ml-1"><div className="border bg-light">ml-1 = margin-left-1 = espacement de 4px</div></div>
        </div>
        <div className="d-flex">
          <div className=""><div className="border bg-light">Référence</div></div>
          <div className="ml-2"><div className="border bg-light">ml-2 = margin-left-2 = espacement de 8px</div></div>
        </div>
        <div className="d-flex">
          <div className=""><div className="border bg-light">Référence</div></div>
          <div className="ml-3"><div className="border bg-light">ml-3 = margin-left-3 = espacement de 16px</div></div>
        </div>
        <div className="d-flex">
          <div className=""><div className="border bg-light">Référence</div></div>
          <div className="ml-4"><div className="border bg-light">ml-4 = margin-left-4 = espacement de 24px</div></div>
        </div>
        <div className="d-flex">
          <div className=""><div className="border bg-light">Référence</div></div>
          <div className="ml-5"><div className="border bg-light">ml-5 = margin-left-5 = espacement de 48px</div></div>
        </div>

        <h2 className="fw-bold mt-4 pt-4">Typographie</h2>
        <hr/>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>

        <p>Un simple paragraphe avec du texte. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius iure sapiente, ab ea aliquid minima animi maxime incidunt accusantium, sunt cupiditate soluta perferendis deleniti vitae commodi ratione fugiat ut quidem.</p>
        
        <p>Et voici  <a href="#">un lien</a> qui ne pointe vers aucune page, mais est suffisant pour la demo.</p>
        <p className="lead">Ceci est un paragraphe avec de l'emphase (classe "lead" appliquée).</p>

        <p>You can use the mark tag to <mark>highlight</mark> text.</p>
        <p><del>This line of text is meant to be treated as deleted text.</del></p>
        <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
        <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
        <p><u>This line of text will render as underlined</u></p>
        <p><small>This line of text is meant to be treated as fine print.</small></p>
        <p><strong>This line rendered as bold text.</strong></p>
        <p><em>This line rendered as italicized text.</em></p>
        <p>This is an abbreviation : <abbr title="attribute">attr</abbr></p>
        <blockquote className="blockquote">
          <p className="mb-0">Ceci est une citation. Rendons hommage à celui qui l'a formulée.</p>
          <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
        </blockquote>

    </div>


    </div>
    )}

export default Styleguide
