import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('mini_instagram', 'root', 'roemLLA0450', {
    host: '127.0.0.1',
    dialect: 'mysql'   
});