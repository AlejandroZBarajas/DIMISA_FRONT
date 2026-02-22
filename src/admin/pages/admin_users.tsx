import { useEffect, useState } from "react";
import Header from "../../common/header";
import AdminSubheader from "../components/admin_subheader";
import UserCard from "../components/users/user_card";
import UserForm from "../components/users/user_form";
import type UserEntity from "../../entities/user_entity";
import { getUsers, createUser, deleteUser, updateUser } from "../../services/users_service";
import { MdAdd } from "react-icons/md";

export default function AdminUsers() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserEntity | null>(null);


  useEffect(() => {
    getUsers().then(setUsers);
  }, []);
  
    const handleDeleteUser = async (id_usuario: number) => {
      const confirmar = window.confirm("¿Seguro que deseas eliminar este usuario?");
      if (!confirmar) return;
  
      try {
        await deleteUser(id_usuario);
        await getUsers();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Hubo un error al eliminar el usuario.");
      }
    };

  const handleEditUser = async (user: UserEntity) => {
    setEditingUser(user); // Selecciona el usuario a editar
    setShowModal(true); 
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AdminSubheader />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Gestión de Usuarios
          </h2>
          <button
            onClick={() => {
              setEditingUser(null); // limpiar cualquier edición anterior
              setShowModal(true);
            }}

            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
          >
                <MdAdd size={28} />
          </button>
        </div>

        {/* Grid de usuarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard 
            key={user.id_usuario} 
            user={user} 
            onDelete={handleDeleteUser}
            onEdit={handleEditUser}
            />
          ))}
        </div>
      </div>

      {/* Modal del formulario */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>

      <UserForm
        initialData={editingUser || undefined}
        onSubmit={async (user) => {
          try {
            if (editingUser) {
              await updateUser(user);
              setEditingUser(null); 
            } else {
              await createUser(user);
            }

            // Refrescar la lista de usuarios
            const updated = await getUsers();
            setUsers(updated);
            setShowModal(false);
          } catch (error) {
            console.error("Error al guardar usuario:", error);
            alert("Hubo un error al guardar el usuario.");
          }
        }}
      />

          </div>
        </div>
      )}
    </div>
  );
}
