import { useEffect, useRef, useState } from "react";
import "./App.css";
import Libreria from "./Libreria";
import Lista from "./Lista";

function App() {
  const [libreria, setLibreria] = useState([]);
  const [lista, setLista] = useState([]);
  const [filtro, setFiltro] = useState("");
  const originalLibreria = useRef(null);

  useEffect(() => {
    const storedLibreria = localStorage.getItem("libreria");
    if (storedLibreria) {
      setLibreria(JSON.parse(storedLibreria));
      originalLibreria.current = JSON.parse(storedLibreria);
    } else {
      fetch("./books.json")
        .then((res) => res.json())
        .then((res) => {
          setLibreria(res.library);
          originalLibreria.current = res.library;
        });
    }

    const storedLista = localStorage.getItem("lista");
    if (storedLista) {
      setLista(JSON.parse(storedLista));
    }
  }, []);

   useEffect(() => {
     localStorage.setItem("libreria", JSON.stringify(libreria));
      localStorage.setItem("lista", JSON.stringify(lista));
   }, [lista]);


  const alquilar = (ISBN) => {
    setLibreria(libreria.filter((libro) => libro.book.ISBN !== ISBN));
    setLista([...lista, libreria.find((libro) => libro.book.ISBN === ISBN)]);
  };

  const devolver = (ISBN) => {
    setLibreria([...libreria, lista.find((libro) => libro.book.ISBN === ISBN)]);
    setLista(lista.filter((libro) => libro.book.ISBN !== ISBN));
  };

  const handleFilterChange = (e) => {
    const selectedGenre = e.target.value;
    if (selectedGenre === "Todas") {
      setFiltro("");
    } else {
      setFiltro(selectedGenre);
    }
  };

  const filterByPages = (pages) => {
    const filtered = originalLibreria.current.filter(
      (libro) => libro.book.pages >= pages && !lista.some((lib) => lib.book.ISBN === libro.book.ISBN)
    );
    setLibreria(filtered);
  };

  const filteredBooks =
    filtro !== ""
      ? [...libreria].filter((libro) => libro.book.genre === filtro)
      : libreria;

  return (
    <>
      <header>
        <h1>{libreria.length} libros disponibles</h1>
        <h3>{lista.length} en la lista de lectura</h3>
      </header>
      <main>
        <div className="filtros">
          <span>Filtrar por páginas: </span>
            <input
              style={{width:"300px"}}
              type="range"
              min={0}
              max={1250}
              onChange={(e) => {
                filterByPages(e.target.value);
              }}
            />
          <span>Filtrar por género:</span>
          <select name="generos" id="generos" onChange={handleFilterChange}>
            <option value="Todas">Todas</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Zombies">Zombies</option>
            <option value="Ciencia ficción">Ciencia ficción</option>
            <option value="Terror">Terror</option>
          </select>
        </div>
        <div className="tienda">
          <Libreria libros={filteredBooks} alquilar={alquilar} />
          {lista.length > 0 && <Lista lista={lista} devolver={devolver} />}
        </div>
      </main>
    </>
  );
}

export default App;
