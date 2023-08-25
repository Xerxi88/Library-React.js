import React from "react";

const Lista = ({ lista, devolver }) => {
  return (
    <section style={{textAlign:"center"}}>
      <h1>Lista de lectura</h1>
      {lista.map((libro) => {
        return (
          <img
            src={libro.book.cover}
            key={libro.book.ISBN}
            onClick={() => devolver(libro.book.ISBN)}
          />
        );
      })}
    </section>
  );
};

export default Lista;
