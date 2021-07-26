import React from "react";

const Payment = () => {
  const pay = () => {};

  return (
    <div className="container pt-5">
      <div className=" col-4 mx-auto">
        <h1>5€/mensal</h1>
      </div>
      <form className="col-4 mx-auto" onSubmit={pay()}>
        <div class="form-group">
          <label for="exampleInputEmail1">Cartão de Crédito</label>
          <input
            type="number"
            class="form-control"
            id="creditCard"
            placeholder="0000 0000 0000 0000"
            maxLength="15"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">validade</label>
          <input
            type="number"
            class="form-control"
            id="validation"
            placeholder="mm/aa"
          />
        </div>
        <div class="form-group">
          <label for="ccv">CCV</label>
          <input
            type="number"
            class="form-control"
            id="ccv"
            placeholder="ccv"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Pagar
        </button>
      </form>
    </div>
  );
};

export default Payment;
