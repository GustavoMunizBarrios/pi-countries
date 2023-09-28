import React from 'react';
import style from "./Paginated.module.css"

const Paginado = ({ currentPage, totalPages, onChangePage }) => {
 //Los siguientes handlers sirven para determinar cual es la pagina que sigue a continuacion, y la pagina previa a la que estamos viendo en el momento, 
 //con esto los botones sabran que es lo que hay antes y despues.
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };
  return (
    <div className={style.paginatedDetail}>
      <button className={style.paginatedDetail_button} onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
      <span className={style.paginatedDetail_text}>Page {currentPage} of {totalPages}</span>
      <button className={style.paginatedDetail_button} onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default Paginado;