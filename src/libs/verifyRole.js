import Role from '../models/Roles.js'; 
import User from '../models/User.js'; 

export const hasRole = async (userId, roleName) => {
  try {
    // Obtener el ID del rol
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      throw new Error(`Rol ${roleName} no encontrado`);
    }

    // Verificar si el usuario tiene el rol
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user.roles.some(roleId => roleId.equals(role._id));
  } catch (error) {
    console.error('Error al verificar el rol del usuario:', error);
    return false;
  }
};

export const returnRole = async (roleId) => {
  const role = await Role.findById(roleId);
  return role ? role.name : null;
};