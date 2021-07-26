import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { deleteUser } from "../../../Services/user";
import "./TableData.css";
/* 
    This component can work for users and Professional's information
    This tipe of component it is a reusable component, that means it not be necessary to create multiple
    tables. this component will receive the data (users info or professionals info)
    and it will work the same for both.
*/
const TableData = ({ data }) => {
  const [nData, setnData] = useState(data.user);
  //necessário usar a data que vem do parent para preencher a tabela
  //efectuar paginação da tabela
  const deleteID = (i, _id) => (e) => {
    e.preventDefault();
    const isdeleted = window.confirm("Deseja continuar?");

    if (isdeleted) {
      deleteUser(_id); // faz a chamada ao server para remover o utilizador da bd
      data = data.user.splice(i, 1);
      setnData(data);
    }

    //remove profissional da base de dados
  };

  useEffect(() => {
    console.log(data);
  }, []);

  //when data or nData change it will reload the table
  useEffect(() => {
    console.log(data);
  }, [data, nData]);

  return (
    <div className="container">
      <Suspense fallback={<div className="spinner-border" role="status" />}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Consulta</th>
              <th scope="col">Data</th>
              <th scope="col">Hora</th>
            </tr>
          </thead>
          <tbody>
            {data.length !== 0 ? (
              data.user.map((el, index) => {
                return (
                  <tr key={el._id}>
                    <td>{el.text}</td>
                    <td>{el.start}</td>
                    <td>{el.resource}</td>
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
      </Suspense>
    </div>
  );
};

export default TableData;
