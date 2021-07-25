import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TableData.css";
import { deleteUser } from "../../../../Services/user";
/* 
    This component can work for users and Professional's information
    This tipe of component it is a reusable component, that means it not be necessary to create multiple
    tables. this component will receive the data (users info or professionals info)
    and it will work the same for both.
*/
const TableData = ({ data }) => {
  const [nData, setnData] = useState(data);
  //necessário usar a data que vem do parent para preencher a tabela
  //efectuar paginação da tabela
  const deleteID = (i, _id) => async (e) => {
    e.preventDefault();
    const isdeleted = window.confirm("Deseja continuar?");
    if (isdeleted) {
      await deleteUser(_id); // faz a chamada ao server para remover o utilizador da bd
      data = data.splice(i, 1);
      setnData(data);
    }
  };

  useEffect(() => {
    setnData(data);
  }, [data]);

  useEffect(() => {}, [nData]);

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
          {nData.length !== 0 ? (
            nData.map((el, index) => {
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
                      className="btn1"
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
