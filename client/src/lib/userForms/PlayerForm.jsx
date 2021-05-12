import React, { useEffect, useState } from "react";
import { Field, FormSection } from "redux-form";
import { required, maxLength, number, maxValue, minValue } from "../../utils/validators";

// Create the inputs for each player field
const renderField = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => {
  const toggleInvalidInput = touched && (warning || error) ? "form__control-invalid" : "";

  return (
    <>
      <div className="form__item">
        <label className="item__label">{label}</label>
        <input
          className={`form__control form__control-input ${toggleInvalidInput}`}
          {...input}
          type={type}
          placeholder={placeholder || label + "..."}
        />
        {touched &&
          ((error && <div className="form__message-error">{error}</div>) || (warning && <div>{warning}</div>))}
      </div>
    </>
  );
};

// Create the player form fields
const createPlayerFormField = (index, removeField) => {
  return (
    <div key={index} className="form__row">
      <div className="form__item">
        <div className="item__name">Player #{index + 1}</div>
        <button className="item__removeCTA" type="button" title="Remove Player" onClick={() => removeField(index)}>
          Remove
        </button>
      </div>
      <Field
        name={"name"}
        type="text"
        component={renderField}
        label="Name"
        validate={[required, maxLength]}
        warn={maxLength}
      />
      <Field
        name={"association"}
        type="text"
        component={renderField}
        label={"Association"}
        validate={[required, number, maxValue, minValue]}
        warn={[number, maxValue, minValue]}
      />
    </div>
  );
};

export const PlayerForm = () => {
  const [formFields, setFormFields] = useState(null);
  const [formFieldsDisplayed, setFormFieldsDisplayed] = useState(1);
  // Display initial player sections
  useEffect(() => {
    let responseAreas = [];
    for (let i = 0; i < 6; i++) {
      responseAreas.push(
        <FormSection key={i} name={`${i}`}>
          {createPlayerFormField(i, removeField)}
        </FormSection>
      );
    }
    setFormFields(responseAreas.slice(0, formFieldsDisplayed));
  }, [formFieldsDisplayed]);

  // Remove the current player field from display
  function removeField(index) {
    const newFormFieldArray = formFields.filter((field) => Number(field.key) !== index);
    setFormFieldsDisplayed(formFieldsDisplayed - 1);
    setFormFields(newFormFieldArray);
  }

  // Add an additional player field to display
  const addField = () => {
    setFormFieldsDisplayed(formFieldsDisplayed + 1);
  };

  const addFieldCTA =
    formFields && formFields.length !== 5 ? (
      <div className="form__row">
        <div className="form__item form__item-addCTA">
          <button className="item__addCTA" type="button" onClick={() => addField()}>
            Add Player
          </button>
        </div>
      </div>
    ) : null;

  return (
    <>
      <div className="form__row">
        <div className="form__item form__item-interest">
          <label className="item__label item__label-interest">Common Interest</label>
          <Field
            className={`form__control form__control-input`}
            id="commonInterest"
            name="interest"
            component="input"
            type="text"
            placeholder="Common interest..."
            validate={required}
          />
        </div>
      </div>
      {formFields}
      {addFieldCTA}
    </>
  );
};