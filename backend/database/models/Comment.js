import {DataTypes} from "sequelize";
import { sequelize } from "../database.js";

export const Comment = sequelize.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}); 
