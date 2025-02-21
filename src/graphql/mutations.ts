import { gql } from "@apollo/client";

export const ADD_AUTHOR = gql`
  mutation crearAutor($nombre: String!,$apellido:String!, $correo: String!) {
    crearAutor(nombre: $nombre, apellido:$apellido, correo: $correo) {
      nombre
      apellido
      correo
    }
  }
`;
