import React from "react";
import { Link } from "react-router-dom";

/* 
    This component can work for users and Professional's information
    This tipe of component it is a reusable component, that means it not be necessary to create multiple
    tables. this component will receive the data (users info or professionals info)
    and it will work the same for both.
*/
const TableData = (data) => {
  //necessário usar a data que vem do parent para preencher a tabela

  //efectuar paginação da tabela

  const deleteID = (_id) => {
    //remove profissional da base de dados
  };

  return (
    <div className="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, index) => {
            return el.type === "client" ? (
              <tr>
                <th scope="row">{index}</th>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.contact}</td>
                <td>
                  <Link
                    to={"/client/" + el._id}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                  >
                    <i class="fas fa-edit"></i>
                  </Link>
                  <button
                    onClick={deleteID(el._id)}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <th scope="row">{index}</th>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.specialty}</td>
                <td>
                  <Link
                    to={"/professional" + el._id}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                  >
                    <i class="fas fa-edit"></i>
                  </Link>
                  <button
                    onClick={deleteID(el._id)}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
