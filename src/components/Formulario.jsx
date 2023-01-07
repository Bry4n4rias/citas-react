import React, { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ setPacientes, pacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  // revisamos si hay un cambio en paciente, osea se dio a editar y seteamos los datos en el formulario
  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return;
    }
    setError(false);

    // objeto paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    // edicion de pacientes
    if (paciente.id) {
      // editando registro y le seteamos el id q ya viene por paciente
      objetoPaciente.id = paciente.id;
      // iteramos el arreglo para buscar el paciente a editar y lo reemplazamos
      const pacientesEditados = pacientes.map((pacienteStateAnterior) =>
        // si el id del paciente q estamos editando es igual al id del paciente q viene por props, entonces reemplazamos el paciente por el objetoPaciente
        // en caso contrario, si no es el mismo id, entonces regresamos el pacienteStateAnterior
        pacienteStateAnterior.id === paciente.id
          ? objetoPaciente
          : pacienteStateAnterior
      );
      setPacientes(pacientesEditados);

      // volvemos a poner el estado de paciente editado a vacio para que no se quede en el formulario y se pueda agregar otro paciente nuevo sin problemas
      setPaciente({});
    } else {
      // nuevo registro y le seteamos el id
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    // reiniciar el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  };

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>
        Seguimiento de pacientes
      </h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Ingresa pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
      >
        {error && <Error mensaje='Todos los campos son obligatorios' />}
        <div className='mb-5'>
          <label
            htmlFor='mascota'
            className='block text-gray-700 uppercase font-bold'
          >
            Nombre de mascota
          </label>
          <input
            id='mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='text'
            placeholder='Nombre de la mascota'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='propietario'
            className='block text-gray-700 uppercase font-bold'
          >
            Nombre del propietario
          </label>
          <input
            id='propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='text'
            placeholder='Nombre del propietario'
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block text-gray-700 uppercase font-bold'
          >
            Email
          </label>
          <input
            id='email'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='alta'
            className='block text-gray-700 uppercase font-bold'
          >
            Fecha de salida
          </label>
          <input
            id='alta'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='date'
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='sintomas'
            className='block text-gray-700 uppercase font-bold'
          >
            Sintomas
          </label>
          <textarea
            id='sintomas'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Describe los sintomas'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>
        </div>

        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercaseq font-bold hover:bg-indigo-700 cursor-pointer transition-all'
          value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}
        />
      </form>
    </div>
  );
};

export default Formulario;
