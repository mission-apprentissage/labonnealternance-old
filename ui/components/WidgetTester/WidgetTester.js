import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { AutoCompleteField, RadioButton } from "components";
import { fetchAddresses } from "services/baseAdresse";
import fetchRomes from "services/fetchRomes";

const WidgetTester = () => {
  const [locationRadius, setLocationRadius] = useState(0);
  const [scope, setScope] = useState("");
  const [frozenJob, setFrozenJob] = useState("");
  const [widgetParams, setWidgetParams] = useState(null);
  const [shownRomes, setShownRomes] = useState(null);
  const [shownSearchCenter, setShownSearchCenter] = useState(null);

  const getRadioButton = (inputName, value, label, selectedValue, setFieldValue, handleChange) => {
    return (
      <Col xs="4" className="radioButton">
        <RadioButton
          inputName={inputName}
          handleChange={handleChange}
          value={value}
          label={label}
          selectedValue={selectedValue}
          setFieldValue={setFieldValue}
        />
      </Col>
    );
  };

  const handleRadiusChange = (radius, setFieldValue) => {
    setLocationRadius(radius);

    setTimeout(() => {
      setFieldValue("radius", radius);
    }, 0);
  };

  const handleScopeChange = (scope, setFieldValue) => {
    setScope(scope);

    setTimeout(() => {
      setFieldValue("scope", scope);
    }, 0);
  };

  const handleFrozenChange = (frozenJob, setFieldValue) => {
    setFrozenJob(frozenJob);

    setTimeout(() => {
      setFieldValue("frozen_job", frozenJob);
    }, 0);
  };

  // indique l'attribut de l'objet contenant le texte de l'item sélectionné à afficher
  const autoCompleteToStringFunction = (item) => {
    return item ? item.label : "";
  };

  // Permet de sélectionner un élément dans la liste d'items correspondant à un texte entré au clavier
  const compareAutoCompleteValues = (items, value) => {
    return items.findIndex((element) => element.label.toLowerCase() === value.toLowerCase());
  };

  // Mets à jours les valeurs de champs du formulaire Formik à partir de l'item sélectionné dans l'AutoCompleteField
  const updateValuesFromJobAutoComplete = (item, setFieldValue) => {
    //setTimeout perme d'éviter un conflit de setState
    setTimeout(() => {
      setFieldValue("job", item);
      setShownRomes(item);
    }, 0);
  };

  // Mets à jours les valeurs de champs du formulaire Formik à partir de l'item sélectionné dans l'AutoCompleteField
  const updateValuesFromPlaceAutoComplete = (item, setFieldValue) => {
    //setTimeout perme d'éviter un conflit de setState
    setTimeout(() => {
      setFieldValue("location", item);
      setShownSearchCenter(item);
    }, 0);
  };

  const showSearchCenter = () => {
    return shownSearchCenter && shownSearchCenter.value && shownSearchCenter.value.coordinates ? (
      <div className="shownValue">{`Lat : ${shownSearchCenter.value.coordinates[1]} - Lon : ${shownSearchCenter.value.coordinates[0]}`}</div>
    ) : (
      ""
    );
  };

  const showSelectedRomes = () => {
    return shownRomes && shownRomes.romes ? (
      <div className="shownValue">{`Romes : ${shownRomes.romes.join()}`}</div>
    ) : (
      ""
    );
  };

  const handleSubmit = async (values) => {
    let res = {};

    res.romes = values.job && values.job.romes ? values.job.romes.join() : null;
    res.location = values.location && values.location.value ? values.location.value.coordinates : null;
    res.radius = values.radius || null;
    res.scope = values.scope || null;
    res.caller = values.caller || null;
    res.returnURI = values.returnURI || null;
    res.returnLogoURL = values.returnLogoURL || null;
    res.jobName = values.jobName || null;
    res.frozenJob = values.frozen_job || null;

    setWidgetParams(res);
  };

  const getIdeaUrlWithParams = () => {
    let ideaUrl =
      typeof window !== "undefined" ? window.location.origin : "https://labonnealternance.apprentissage.beta.gouv.fr";

    let path = "recherche-apprentissage";

    if (widgetParams) {
      if (widgetParams.scope === "job") path = "recherche-emploi";
      else if (widgetParams.scope === "training") path = "recherche-apprentissage-formation";

      ideaUrl = `${ideaUrl}/${path}`;

      //console.log("widgetParams  : ",widgetParams);
      ideaUrl += "?";
      ideaUrl += widgetParams.caller ? `&caller=${encodeURIComponent(widgetParams.caller)}` : "";
      ideaUrl += widgetParams.romes ? `&romes=${widgetParams.romes}` : "";
      ideaUrl += widgetParams.location ? `&lon=${widgetParams.location[0]}&lat=${widgetParams.location[1]}` : "";
      ideaUrl += widgetParams.radius ? `&radius=${widgetParams.radius}` : "";
      ideaUrl += widgetParams.returnURI ? `&return_uri=${encodeURIComponent(widgetParams.returnURI)}` : "";
      ideaUrl += widgetParams.returnLogoURL ? `&return_logo_url=${encodeURIComponent(widgetParams.returnLogoURL)}` : "";
      ideaUrl += widgetParams.jobName ? `&job_name=${encodeURIComponent(widgetParams.jobName)}` : "";
      ideaUrl += widgetParams.frozenJob ? "&frozen_job=1" : "";
    } else ideaUrl = `${ideaUrl}/${path}`;

    return ideaUrl;
  };

  const getWidget = (params) => {
    let ideaUrl = getIdeaUrlWithParams(widgetParams);

    return (
      <iframe
        title={params.title}
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          height: `${params.height}px`,
          width: params.width ? `${params.width}px` : "100%",
        }}
        src={ideaUrl}
      />
    );
  };

  const getForm = () => {
    return (
      <Formik
        initialValues={{
          job: {},
          location: {},
          radius: 0,
          scope: "",
          caller: "adresse_contact@mail.com identifiant_appelant",
          returnURI: "/",
          returnLogoURL: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Row>
              <Col xs="12">
                <div className="formGroup">
                  <label htmlFor="jobField">
                    Métier (pour renseigner le champ <strong>romes</strong>)
                  </label>
                  <div className="fieldContainer">
                    <AutoCompleteField
                      items={[]}
                      itemToStringFunction={autoCompleteToStringFunction}
                      onSelectedItemChangeFunction={updateValuesFromJobAutoComplete}
                      compareItemFunction={compareAutoCompleteValues}
                      onInputValueChangeFunction={fetchRomes}
                      name="jobField"
                      placeholder="ex: plomberie"
                    />
                  </div>
                  {showSelectedRomes()}
                  <ErrorMessage name="job" className="errorField" component="div" />
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label htmlFor="placeField">
                    Localité (pour renseigner <strong>lat</strong> et <strong>lon</strong>)
                  </label>
                  <div className="fieldContainer">
                    <AutoCompleteField
                      items={[]}
                      itemToStringFunction={autoCompleteToStringFunction}
                      onSelectedItemChangeFunction={updateValuesFromPlaceAutoComplete}
                      compareItemFunction={compareAutoCompleteValues}
                      onInputValueChangeFunction={fetchAddresses}
                      scrollParentId="choiceColumn"
                      name="placeField"
                      placeholder="Adresse ou ville ou code postal"
                    />
                  </div>
                  {showSearchCenter()}
                  <ErrorMessage name="location" className="errorField" component="div" />
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label>
                    Rayon de recherche (<strong>radius</strong>)
                  </label>
                  <Field type="hidden" value={locationRadius} name="locationRadius" />
                  <div className="buttons">
                    <Container>
                      <Row>
                        {getRadioButton(
                          "locationRadius",
                          0,
                          "Non défini",
                          locationRadius,
                          setFieldValue,
                          handleRadiusChange
                        )}
                        {getRadioButton(
                          "locationRadius",
                          10,
                          "10km",
                          locationRadius,
                          setFieldValue,
                          handleRadiusChange
                        )}
                        {getRadioButton(
                          "locationRadius",
                          30,
                          "30km",
                          locationRadius,
                          setFieldValue,
                          handleRadiusChange
                        )}
                        {getRadioButton(
                          "locationRadius",
                          60,
                          "60km",
                          locationRadius,
                          setFieldValue,
                          handleRadiusChange
                        )}
                        {getRadioButton(
                          "locationRadius",
                          100,
                          "100km",
                          locationRadius,
                          setFieldValue,
                          handleRadiusChange
                        )}
                      </Row>
                    </Container>
                  </div>
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label>
                    Périmètre (<strong>scope</strong>)
                  </label>
                  <Field type="hidden" value={scope} name="scope" />
                  <div className="buttons">
                    <Container>
                      <Row>
                        {getRadioButton("scope", "", "Tout", scope, setFieldValue, handleScopeChange)}
                        {getRadioButton(
                          "scope",
                          "training",
                          "Formations uniquement",
                          scope,
                          setFieldValue,
                          handleScopeChange
                        )}
                        {getRadioButton("scope", "job", "Emplois uniquement", scope, setFieldValue, handleScopeChange)}
                      </Row>
                    </Container>
                  </div>
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label>
                    Identifiant appelant (<strong>caller</strong>)
                  </label>
                  <Field type="text" className="widgetTestPage--textInput" name="caller" />
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label>
                    URI au click du bouton de retour (<strong>return_uri</strong>)
                  </label>
                  <Field type="text" className="widgetTestPage--textInput" name="returnURI" />
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label>
                    URL de l'image du bouton de retour (<strong>return_logo_url</strong>)
                  </label>
                  <Field type="text" className="widgetTestPage--textInput" name="returnLogoURL" />
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label>
                    Nom du métier si métier figé (<strong>job_name</strong>)
                  </label>
                  <Field type="text" className="widgetTestPage--textInput" name="jobName" />
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label>
                    Le métier est il figé ? (<strong>frozen_job</strong>)
                  </label>
                  <Field type="hidden" value={scope} name="scope" />
                  <div className="buttons">
                    <Container>
                      <Row>
                        {getRadioButton("frozen_job", "", "Non", frozenJob, setFieldValue, handleFrozenChange)}
                        {getRadioButton("frozen_job", "1", "Oui", frozenJob, setFieldValue, handleFrozenChange)}
                      </Row>
                    </Container>
                  </div>
                </div>
              </Col>

            </Row>

            <Button className="submitButton" type="submit" disabled={isSubmitting}>
              Mettre à jour les widgets
            </Button>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <div className="page demoPage widgetTestPage">
      <Container>
        <Row>
          <Col xs="12">
            <h1>Test du Widget La Bonne Alternance</h1>
            <div>
              La documentation est ici :{" "}
              <a href="https://mission-apprentissage.gitbook.io/la-bonne-alternance/documentation" target="docIdea">
              https://mission-apprentissage.gitbook.io/la-bonne-alternance/documentation
              </a>
            </div>
            {getForm()}
          </Col>

          <Col xs="12">
            URL associés à l'attribut <strong>src</strong> de l'iframe : {getIdeaUrlWithParams()}
          </Col>
        </Row>
        <Row className="widgetList">
          <Col xs="12">
            <hr />
            <h3>Largeur 317 px - hauteur 640 px</h3>
            {getWidget({
              title: "narrow",
              height: 640,
              width: 317,
            })}
          </Col>
          <Col xs="12">
            <hr />
            <h3>Largeur 360 px - hauteur 640 px</h3>
            {getWidget({
              title: "mobile",
              height: 640,
              width: 360,
            })}
          </Col>
          <Col xs="12">
            <hr />
            <h3>Largeur 768 px - hauteur 800 px</h3>
            {getWidget({
              title: "tablet",
              height: 800,
              width: 768,
            })}
          </Col>
          <Col xs="12">
            <hr />
            <h3>Largeur 100% - hauteur 800 px</h3>
            {getWidget({
              title: "desktop",
              height: 800,
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WidgetTester;
