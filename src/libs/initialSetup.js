import Role from '../models/Roles.js';

export const createRoles = async () => {
    try {
      // Count Documents
      const count = await Role.estimatedDocumentCount();
  
      // check for existing roles
      if (count > 0) return;
  
      // Create default Roles
      const values = await Promise.all([
        new Role({ name: "passenger" }).save(),
        new Role({ name: "driver" }).save(),
        new Role({ name: "admin" }).save(),
        new Role({ name: "moderator" }).save(),
      ]);
  
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  createRoles();