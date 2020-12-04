import React from 'react'
import Navigation from '../components/navigation'
import { useSelector } from 'react-redux'

const Styleguide = () => {
  const routerState = useSelector(state => state.router)
  return (
    <div className="c-styleguide">
      <Navigation />

      <div className="container mt-5">
        <h1 className="text-center">Styleguide</h1>

        <p className="lead text-center">Here are all the assets</p>

        <h2 className="fw-bold mt-4 pt-4">Palette</h2>
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

        <h2 className="fw-bold mt-4 pt-4">Grayscale</h2>
        <hr/>
        <div className="col-md-4">
          <div className="p-3 swatch-100">100</div>
          <div className="p-3 swatch-200">200</div>
          <div className="p-3 swatch-300">300</div>
          <div className="p-3 swatch-400">400</div>
          <div className="p-3 swatch-500">500</div>
          <div className="p-3 swatch-600">600</div>
          <div className="p-3 swatch-700">700</div>
          <div className="p-3 swatch-750">750</div>
          <div className="p-3 swatch-800">800</div>
          <div className="p-3 swatch-900">900</div>
        </div>

        <h2 className="fw-bold mt-4 pt-4">Spacing</h2>
        <hr/>
        <div className="d-flex">
          <div className=""><div className="border bg-light">First box</div></div>
          <div className="ml-1"><div className="border bg-light">2nd box, margin-left-1</div></div>
        </div>
        <div className="d-flex">
          <div className=""><div className="border bg-light">First box</div></div>
          <div className="ml-2"><div className="border bg-light">2nd box, margin-left-2</div></div>
        </div>
        <div className="d-flex">
          <div className=""><div className="border bg-light">First box</div></div>
          <div className="ml-3"><div className="border bg-light">2nd box, margin-left-3</div></div>
        </div>
        <div className="d-flex">
          <div className=""><div className="border bg-light">First box</div></div>
          <div className="ml-4"><div className="border bg-light">2nd box, margin-left-4</div></div>
        </div>
        <div className="d-flex">
          <div className=""><div className="border bg-light">First box</div></div>
          <div className="ml-5"><div className="border bg-light">2nd box, margin-left-5</div></div>
        </div>

        <h2 className="fw-bold mt-4 pt-4">Typography</h2>
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


        <h2 className="fw-bold mt-4 pt-4">Displays</h2>
        <hr/>
        <div className="display-1">This is display 1</div>
        <div className="display-2">This is display 2</div>
        <div className="display-3">This is display 3</div>
        <div className="display-4">This is display 4</div>


        <h2 className="fw-bold mt-4 pt-4">Buttons</h2>
        <hr/>
        <p>
          <button type="button" className="btn btn-primary btn-lg ml-1">Primary</button>
          <button type="button" className="btn btn-secondary btn-lg ml-1">Secondary</button>
          <button type="button" className="btn btn-success btn-lg ml-1">Success</button>
          <button type="button" className="btn btn-danger btn-lg ml-1">Danger</button>
          <button type="button" className="btn btn-warning btn-lg ml-1">Warning</button>
          <button type="button" className="btn btn-info btn-lg ml-1">Info</button>
          <button type="button" className="btn btn-light btn-lg ml-1">Light</button>
          <button type="button" className="btn btn-dark btn-lg ml-1">Dark</button>
        </p>
        <p>
          <button type="button" className="btn btn-primary ml-1">Primary</button>
          <button type="button" className="btn btn-secondary ml-1">Secondary</button>
          <button type="button" className="btn btn-success ml-1">Success</button>
          <button type="button" className="btn btn-danger ml-1">Danger</button>
          <button type="button" className="btn btn-warning ml-1">Warning</button>
          <button type="button" className="btn btn-info ml-1">Info</button>
          <button type="button" className="btn btn-light ml-1">Light</button>
          <button type="button" className="btn btn-dark ml-1">Dark</button>
        </p>
        <p>
          <button type="button" className="btn btn-primary btn-sm ml-1">Primary</button>
          <button type="button" className="btn btn-secondary btn-sm ml-1">Secondary</button>
          <button type="button" className="btn btn-success btn-sm ml-1">Success</button>
          <button type="button" className="btn btn-danger btn-sm ml-1">Danger</button>
          <button type="button" className="btn btn-warning btn-sm ml-1">Warning</button>
          <button type="button" className="btn btn-info btn-sm ml-1">Info</button>
          <button type="button" className="btn btn-light btn-sm ml-1">Light</button>
          <button type="button" className="btn btn-dark btn-sm ml-1">Dark</button>
        </p>
        <p>
          <button type="button" className="btn btn-outline-primary ml-1">Primary</button>
          <button type="button" className="btn btn-outline-secondary ml-1">Secondary</button>
          <button type="button" className="btn btn-outline-success ml-1">Success</button>
          <button type="button" className="btn btn-outline-danger ml-1">Danger</button>
          <button type="button" className="btn btn-outline-warning ml-1">Warning</button>
          <button type="button" className="btn btn-outline-info ml-1">Info</button>
          <button type="button" className="btn btn-outline-light ml-1">Light</button>
          <button type="button" className="btn btn-outline-dark ml-1">Dark</button>
        </p>


        <h2 className="fw-bold mt-4 pt-4">Background Colors</h2>
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
            <div className="p-3 mb-3 bg-danger text-white">Danger</div>
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


    </div>


    </div>
    )}

export default Styleguide
