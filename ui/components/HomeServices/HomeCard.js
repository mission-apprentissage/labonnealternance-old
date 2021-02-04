import React from "react";

const HomeCard = (props) => {
  return (
    <div className="card c-home-services__card mb-4">
      <div className="card-body c-home-services__card-body">
        <div className="c-home-services__circle mx-auto mt-3">
          <img
            aria-hidden="true"
            className={"c-home-services__img--" + props.kind}
            src={props.logo}
            alt={"Logo " + props.kind}
          />
        </div>
        <h3 className={"c-home-services__title c-home-services__title--" + props.kind}>{props.title}</h3>
        <p className="c-home-services__text mb-4">{props.text}</p>
      </div>
      <footer className="card-footer c-home-services__footer">
        <a
          href={props.url}
          rel="noopener noreferrer"
          target="_blank"
          className="c-home-services__btn btn btn-block btn-primary mb-2 mx-auto"
        >
          Découvrir
        </a>
      </footer>
    </div>
  );
};

export default HomeCard;
