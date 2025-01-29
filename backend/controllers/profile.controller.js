import { User } from "../database/models/User.js";

export const getProfile = async (req, res) => {
    const user_id = req.userId;

    try {
        const user = await User.findByPk(user_id, {
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateProfile = async (req, res) => {
    const user_id = req.userId;
    const { nickname, name } = req.body;

    try {
        await User.update({ nickname, name }, { where: { id: user_id } });
        const updatedUser = await User.findByPk(user_id, {
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};