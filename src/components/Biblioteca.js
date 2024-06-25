import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';

const Biblioteca = () => {
  const [bibliotecas, setBibliotecas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [editingLibrary, setEditingLibrary] = useState(null);

  const agregarBiblioteca = () => {
    if (editingLibrary) {
      const updatedLibraries = bibliotecas.map((biblioteca) =>
        biblioteca.id === editingLibrary.id ? { ...biblioteca, nombre, direccion } : biblioteca
      );
      setBibliotecas(updatedLibraries);
      setEditingLibrary(null);
    } else {
      const nuevaBiblioteca = {
        id: uuidv4(),
        nombre,
        direccion,
      };
      setBibliotecas([...bibliotecas, nuevaBiblioteca]);
    }
    limpiarCampos();
  };

  const limpiarCampos = () => {
    setNombre('');
    setDireccion('');
  };

  const handleEdit = (biblioteca) => {
    setNombre(biblioteca.nombre);
    setDireccion(biblioteca.direccion);
    setEditingLibrary(biblioteca);
  };

  const handleDelete = (id) => {
    setBibliotecas(bibliotecas.filter((biblioteca) => biblioteca.id !== id));
  };

  return (
    <div>
      <h2>Gestión de Bibliotecas</h2>
      <form>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={agregarBiblioteca}>
          {editingLibrary ? 'Modificar Biblioteca' : 'Agregar Biblioteca'}
        </Button>
      </form>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bibliotecas.map((biblioteca) => (
              <TableRow key={biblioteca.id} className="table-row">
                <TableCell>{biblioteca.id}</TableCell>
                <TableCell>{biblioteca.nombre}</TableCell>
                <TableCell>{biblioteca.direccion}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(biblioteca)}>
                    Editar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(biblioteca.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Biblioteca;

