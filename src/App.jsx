import Formulario from './components/Formulario';
import Header from './components/Header';
import ListadoPacientes from './components/ListadoPacientes';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [pacientes, setPacientes] = useState(
    // FORMA NUEVA DE HACERLO
    JSON.parse(localStorage.getItem('pacientes')) ?? [] // si no hay pacientes en el local storage, se setea un array vacio
  );
  const [paciente, setPaciente] = useState({});

  // FORMA ANTIGUA DE HACERLO
  // leemos los pacientes del local storage y los seteamos en el state de pacientes para que se muestren en la vista al recargar la pagina o al iniciar la app
  // useEffect(() => {
  //   const obtenerLS = () => {
  //     const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []; // si no hay pacientes en el local storage, se setea un array vacio

  //     setPacientes(pacientesLS);
  //   };
  //   obtenerLS();
  // }, []);

  // guardamos en el local storage los pacientes que se van creando y se van guardando en el state de pacientes
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  const eliminarPaciente = (id) => {
    // traemos los pacientes que no son iguales al id que se le dio click en el boton eliminar
    const pacientesActualizados = pacientes.filter(
      (paciente) => paciente.id !== id
    );

    // seteamos los pacientes actualizados en el state de pacientes para que se actualice la vista y no se muestre el paciente eliminado
    setPacientes(pacientesActualizados);
  };

  return (
    <div className='container mx-auto mt-20'>
      <Header />
      <div className='mt-12 sm:flex'>
        <Formulario
          setPacientes={setPacientes}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
