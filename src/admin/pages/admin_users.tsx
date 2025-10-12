import { useEffect, useState } from "react";
import Header from "../../common/header";
import AdminSubheader from "../components/admin_subheader";
import UserCard from "../components/users/user_card";
import UserForm from "../components/users/user_form";
import type UserEntity from "../../entities/user_entity";
import { getUsers, createUser } from "../../services/users_service";
import { MdAdd } from "react-icons/md";

export default function AdminUsers() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Cargar todos los usuarios al montar el componente
  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  // Manejar la creación de usuario
  const handleCreateUser = async (user: UserEntity) => {
    await createUser(user);
    const updated = await getUsers();
    setUsers(updated);
    setShowModal(false);
  };

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
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
          >
                <MdAdd size={28} />
          </button>
        </div>

        {/* Grid de usuarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard key={user.id_usuario} user={user} />
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

            <UserForm onSubmit={handleCreateUser} />
          </div>
        </div>
      )}
    </div>
  );
}
