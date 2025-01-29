import {DataTypes} from "sequelize";
import { sequelize } from "../database.js";

export const Like = sequelize.define('likes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
}); 



