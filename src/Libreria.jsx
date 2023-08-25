import React from "react";

const Libreria = ({ libros, alquilar }) => {
  return (
    <>
      <section>
        {libros.map((libro) => {
          return (
            <img
              src={libro.book.cover}
              width="200px"
              key={libro.book.ISBN}
              onClick={() => alquilar(libro.book.ISBN)}
            />
          );
        })}
      </section>
    </>
  );
};

export default Libreria;
