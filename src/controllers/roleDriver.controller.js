import User from "../models/User";
import Roles from "../models/Roles";

export const changeRoleDriver = async (req, res) => {

    const { id} = req.params;

    try {      
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const role = await Roles.findOne({ name: "driver" });
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        if (!user.roles.includes(role._id)) {
            user.roles.push(role._id);
            await user.save();
            res.status(200).json({user, message: "Se ha actualizado correctamente a Conductor"});
        } else {
        res.status(400).json({user, error: "NO se ha actualizado."});
        }
        
    } catch (error) {
        throw new Error(`Error al asignar el usuario como donductor: ${error}`);
    }

};