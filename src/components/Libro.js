import React, { useState } from 'react';
import { TextField, Button, TextareaAutosize, MenuItem, Select, InputLabel, FormControl, Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';

const Libro = () => {
  const [libros, setLibros] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [genero, setGenero] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  const agregarLibro = () => {
    if (editingBook) {
      const updatedBooks = libros.map((libro) =>
        libro.id === editingBook.id ? { ...libro, nombre, descripcion, fechaIngreso, genero } : libro
      );
      setLibros(updatedBooks);
      setEditingBook(null);
    } else {
      const nuevoLibro = {
        id: uuidv4(),
        nombre,
        descripcion,
        fechaIngreso,
        genero,
      };
      setLibros([...libros, nuevoLibro]);
    }
    limpiarCampos();
  };

  const limpiarCampos = () => {
    setNombre('');
    setDescripcion('');
    setFechaIngreso('');
    setGenero('');
  };

  const handleEdit = (libro) => {
    setNombre(libro.nombre);
    setDescripcion(libro.descripcion);
    setFechaIngreso(libro.fechaIngreso);
    setGenero(libro.genero);
    setEditingBook(libro);
  };

  const handleDelete = (id) => {
    setLibros(libros.filter((libro) => libro.id !== id));
  };

  return (
    <div>
      <h2>Gestión de Libros</h2>
      <form>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextareaAutosize
          minRows={3}
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ width: '100%', marginTop: '16px', marginBottom: '16px', padding: '10px', fontFamily: 'Roboto', fontSize: '16px' }}
        />
        <TextField
          label="Fecha de Ingreso"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Género</InputLabel>
          <Select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <MenuItem value="Terror">Terror</MenuItem>
            <MenuItem value="Fantasía">Fantasía</MenuItem>
            <MenuItem value="Comedia">Comedia</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={agregarLibro}>
          {editingBook ? 'Modificar Libro' : 'Agregar Libro'}
        </Button>
      </form>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Ingreso</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {libros.map((libro) => (
              <TableRow key={libro.id} className="table-row">
                <TableCell>{libro.id}</TableCell>
                <TableCell>{libro.nombre}</TableCell>
                <TableCell>{libro.descripcion}</TableCell>
                <TableCell>{libro.fechaIngreso}</TableCell>
                <TableCell>{libro.genero}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(libro)}>
                    Editar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(libro.id)}>
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

export default Libro;

