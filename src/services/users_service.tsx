import type UserEntity from "../entities/user_entity";

const API_URL = import.meta.env.VITE_API_URL + "users/";

export async function getUsers(): Promise<UserEntity[]> {
  const res = await fetch(`${API_URL}all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    //body: JSON.stringify({}), // si tu backend requiere datos en el body
  });

  if (!res.ok) throw new Error("Error al obtener usuarios");
  return await res.json();
}

export async function createUser(user: UserEntity): Promise<UserEntity> {
  
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Error al crear usuario");
  return await res.json();
}

export async function updateUser(user: UserEntity): Promise<UserEntity> {
  const res = await fetch(`${API_URL}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Error al actualizar usuario");
  return await res.json();
}

export async function deleteUser(id_usuario: number): Promise<void> {
  const res = await fetch(`${API_URL}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_usuario }),
  });

  if (!res.ok) throw new Error("Error al eliminar usuario");
}
