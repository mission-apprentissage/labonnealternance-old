import React from 'react'
import Navigation from '../components/navigation'
import { useSelector } from 'react-redux'

const Styleguide = () => {
  const routerState = useSelector(state => state.router)
  return (
    <div className="c-styleguide">
      <Navigation />
      <h1>Styleguide</h1>

      <div className="container mt-5">
        <h1 className="text-center">Styleguide</h1>

        <p className="lead text-center">Here are all the assets of your app</p>


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
        <div className="lead bg-primary text-white">&nbsp;primary color</div>
        <div className="lead bg-success text-white">&nbsp;success color</div>
        <div className="lead bg-danger text-white">&nbsp;danger color</div>
        <div className="lead bg-info text-white">&nbsp;info color</div>
        <div className="lead bg-warning text-white">&nbsp;warning color</div>
        <div className="lead bg-dark text-white">&nbsp;dark color</div>
        <div className="lead bg-light text-black">&nbsp;light color</div>


        <h2 className="fw-bold mt-4 pt-4">Alertes</h2>
        <hr/>
        <div className="bd-example">
          <div className="alert alert-primary" role="alert">
            A simple primary alert—check it out!
          </div>
          <div className="alert alert-secondary" role="alert">
            A simple secondary alert—check it out!
          </div>
          <div className="alert alert-success" role="alert">
            A simple success alert—check it out!
          </div>
          <div className="alert alert-danger" role="alert">
            A simple danger alert—check it out!
          </div>
          <div className="alert alert-warning" role="alert">
            A simple warning alert—check it out!
          </div>
          <div className="alert alert-info" role="alert">
            A simple info alert—check it out!
          </div>
          <div className="alert alert-light" role="alert">
            A simple light alert—check it out!
          </div>
          <div className="alert alert-dark" role="alert">
            A simple dark alert—check it out!
          </div>
        </div>

        <h2 className="fw-bold mt-4 pt-4">Tables</h2>
        <hr/>
        <div className="row">
          <div className="col-md">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">Name
          <div class="col-md">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="2">1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@TwBootstrap</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md">
           <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


    </div>
    )}

export default Styleguide
