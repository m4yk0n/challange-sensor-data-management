// TESTE ENTRE BACKEND E FRONTEND
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query {
    usuarios {
      idUsuario
      nome
      email
    }
  }
`;

const Usuarios = () => {
  const { loading, error, data } = useQuery(GET_USUARIOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.usuarios.map(usuario => (
        <li key={usuario.idUsuario}>{usuario.nome} - {usuario.email}</li>
      ))}
    </ul>
  );
};

export default Usuarios;
