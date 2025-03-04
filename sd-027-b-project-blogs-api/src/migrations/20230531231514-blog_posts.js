'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id:{
        primaryKey: true,
        autoIncrement: true,
        type:Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {         
          model: 'users',          
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE
      },
      });
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.dropTable('blog_posts');
  
  }
};
