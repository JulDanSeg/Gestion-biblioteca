import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Libro from './components/Libro';
import Biblioteca from './components/Biblioteca';

function App() {
  return (
    <div className="container mt-5">
      <h1>Gestión de Libros y Bibliotecas</h1>
      <div className="row">
        <div className="col-md-6">
          <Libro />
        </div>
        <div className="col-md-6">
          <Biblioteca />
        </div>
      </div>
    </div>
  );
}

export default App;

