import React from "react";
import { FormOne, FormTwo, FormThree, FormFour, FormFive, FormSix, PlayerForm } from "../../lib/userForms";

const FormSwitch = ({ form, values, formProps }) => {
  switch (form) {
    case 1:
      return (
        <PlayerForm values={values} formProps={formProps}/>
      )
    case 2:
      return (
          <FormOne values={values} formProps={formProps} />
      );
    case 3:
      return (
          <FormTwo values={values} formProps={formProps} />
      );
    case 4:
      return (
          <FormThree values={values} formProps={formProps} />
      );
    case 5:
      return (
          <FormFour values={values} formProps={formProps} />
      );
    case 6:
      return (
          <FormFive values={values} formProps={formProps} />
      );
    case 7:
      return (
          <FormSix values={values} formProps={formProps} />
      );
    case 8:
      return <>hi</>;
    default:
      console.log("FormDisplay switch has failed");
  }
};

export default FormSwitch;
