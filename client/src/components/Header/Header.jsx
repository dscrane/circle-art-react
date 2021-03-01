import React from "react";

const formNames = ["", "Interest", "Players", "Physical", "Personal", "Financial", "Natural", "Cultural", "Visual"];

const Header = ({ currentForm }) => {
  const createFormSteps = () => {
    return formNames.map((heading, i) => {
      return i === currentForm ? (
        <span key={`${heading}-active`}>
          <span className="step__icon step__icon-active">{heading}</span>
          &#8192;
        </span>
      ) : (
        <span key={`${heading}`}>
          <span className="step__icon">{heading}</span>
          &#8192;
        </span>
      );
    });
  };

  const formHeaderOne =
    currentForm > 0 ? null : (
      <>
        Circle Generator is the artistic brainchild of Carrie Crane. Moving through the sections of the game will create
        and alter a collection of circles based on your groups common interest and a variety of personality factors. By
        the end you will have unique visual of how the members of your group are connected to the common interest that
        brought you together.
      </>
    );

  const formSteps = currentForm > 0 ? createFormSteps() : null;

  return (
    <div className="header" data-testid="component-Header">
      <h1 className="header__title">
        Spherical <br />
        Impressions
      </h1>
      <h3 className="form__heading">{formHeaderOne}</h3>
      <div className="form__steps">{formSteps}</div>
    </div>
  );
};

export default Header;
