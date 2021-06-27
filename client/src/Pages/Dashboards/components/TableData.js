import React from "react";
import { Link } from "react-router-dom";
import "./TableData.css";
/* 
    This component can work for users and Professional's information
    This tipe of component it is a reusable component, that means it not be necessary to create multiple
    tables. this component will receive the data (users info or professionals info)
    and it will work the same for both.
*/
const TableData = ({ data }) => {
  //necessário usar a data que vem do parent para preencher a tabela
  //efectuar paginação da tabela
  const deleteID = (_id) => {
    //remove profissional da base de dados
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 ? (
            data.user.map((el, index) => {
              return (
                <tr key={el._id}>
                  <th scope="row">{index}</th>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>
                    <Link
                      to={"/profile/" + el._id}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={deleteID(el._id)}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">
                <p>Sem resultados</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
