import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query obtenerAutores {
    obtenerAutores {
        id
        nombre
        apellido
        correo
    }
  }
`;
