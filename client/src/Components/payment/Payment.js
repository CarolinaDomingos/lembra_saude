import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { pay } from "../../Services/payments";
import { getUserId } from "../../Utils/localStorage";

const Payment = () => {
  const history = useHistory();
  //redirecting...
  const goTo = useCallback((path) => history.push("/client"), [history]);
  // This is a state where I'm going to save the email and password from the inputs
  const [formData, setFormData] = useState({
    cardNumber: "",
    validation: "",
    ccv: "",
    userId: JSON.parse(getUserId())._id.toString(),
  });

  const pays = () => async (event) => {
    event.preventDefault();
    const res = await pay(formData);
    if (res) {
      goTo();
    }
  };

  // add all the info in the formData object received from the inputs
  const handleData = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value.replace(/\s\s+/g, " "),
    });
  };

  return (
    <div className="container pt-5">
      <div className=" col-4 mx-auto">
        <h1>5€/mensal</h1>
      </div>
      <form className="col-4 mx-auto" onSubmit={pays(formData)}>
        <div className="form-group">
          <label for="creditCard">Cartão de Crédito</label>
          <input
            type="text"
            className="form-control"
            id="creditCard"
            placeholder="0000 0000 0000 0000"
            maxLength="16"
            onChange={handleData("cardNumber")}
            value={formData.cardNumber}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">validade</label>
          <input
            type="text"
            className="form-control"
            id="validation"
            placeholder="mm/aa"
            maxLength="5"
            onChange={handleData("validation")}
            value={formData.validation}
          />
        </div>
        <div className="form-group">
          <label for="ccv">CCV</label>
          <input
            type="number"
            className="form-control"
            id="ccv"
            placeholder="ccv"
            maxLength="3"
            onChange={handleData("ccv")}
            value={formData.ccv}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Pagar
        </button>
        <button type="submit" className="btn" onClick={() => goTo()}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default Payment;
