import {DataTypes} from "sequelize";
import { sequelize } from "../database.js";

import { Post } from "./Post.js";
import { Comment } from "./Comment.js";
import { Like } from "./Like.js";


export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true
    }
}); 

User.hasMany(Post, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Like, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});

Like.belongsTo(User, {
    foreignKey: 'user_id',
});
