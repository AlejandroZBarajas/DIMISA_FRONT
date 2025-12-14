import type UserEntity from "../../../entities/user_entity";

interface Props {
  user: UserEntity;
  onEdit?: (user: UserEntity) => void;
  onDelete?: (id: number) => void;
}

export default function UserCard({ user, onEdit, onDelete }: Props) {

  const getRolName = (id_rol: number): string => {
    switch (id_rol) {
      case 2:
        return "Administrador";
      case 3:
          return "Jefe";
      case 4:
            return "Admisión";
      case 5:
          return "Enfermería";
      case 6:
          return "Unidosis";
        default:
          return "Desconocido";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 border hover:shadow-lg transition-all">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {user.nombres} {user.apellido1} {user.apellido2}
        </h3>
        <span className="text-sm text-gray-500">
          #{user.id_usuario ?? "Nuevo"}
        </span>
      </div>

      <p className="text-gray-700">
        <span className="font-medium">Usuario:</span> {user.username}
      </p>

      <p className="text-gray-700">
        <span className="font-medium">Rol:</span> {getRolName(user.id_rol)}
      </p>

      {/* Campos dinámicos */}
      {user.id_area && (
        <p className="text-gray-700">
          <span className="font-medium">Área:</span> {user.id_area}
        </p>
      )}

      {user.id_cendis && (
        <p className="text-gray-700">
          <span className="font-medium">Cendis:</span> {user.id_cendis}
        </p>
      )}

     {/*  {user.id_turno && (
        <p className="text-gray-700">
          <span className="font-medium">Turno:</span> {user.id_turno}
        </p>
      )}
 */}
      {(onEdit || onDelete) && (
        <div className="flex gap-3 mt-3">
          {onEdit && (
            <button
              onClick={() => onEdit(user)}
              className="bg-azul3 hover:bg-azul4 text-white px-3 py-1 rounded-lg text-sm font-medium"
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(user.id_usuario!)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium"
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
