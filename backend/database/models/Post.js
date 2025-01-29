import {DataTypes} from "sequelize";
import { sequelize } from "../database.js";

import { Like } from "./Like.js";
import { Comment } from "./Comment.js";

export const Post = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}); 

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    sourceKey: 'id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

Post.hasMany(Like, {
    foreignKey: 'post_id',
    sourceKey: 'id'
});

Like.belongsTo(Post, {
    foreignKey: 'post_id',
});

