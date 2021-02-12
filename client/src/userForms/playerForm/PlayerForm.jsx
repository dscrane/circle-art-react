import React from "react";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";

export const PlayerForm = ({ responses, setResponses }) => {
  const handlePlayer = (event) => {
    event.preventDefault();
    setResponses({ ...responses, [event.target.name]: event.target.value });
  };

  const handleAssociation = (event) => {
    event.preventDefault();
    setResponses({
      ...responses,
      [event.target.name]: parseInt(event.target.value),
    });
  };

  return (
    <FormGroup id="form2">
      <FormLabel className="form__label">Player</FormLabel>
      <FormControl
        className="form__control"
        name="name"
        onChange={handlePlayer}
        value={responses.name || ""}
        placeholder="Enter name..."
      />

      <FormLabel className="form__label">Association</FormLabel>
      <FormControl
        className="form__control"
        name="association"
        onChange={handleAssociation}
        value={responses.association || ""}
        placeholder="Enter time associated..."
      />
      <small id="interestHelp" className="form-text text-muted">
        Please only enter the number of years <br />
        ie 5 years enter 5
      </small>
    </FormGroup>
  );
};