'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id:{
        primaryKey: true,
        type:Sequelize.INTEGER,
        allowNull: false,       
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id:{
        primaryKey: true,
        type:Sequelize.INTEGER,
        allowNull: false,        
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },     
    });
  },

  down: async (queryInterface, Sequelize) => {

  await queryInterface.dropTable('posts_categories');
    
  }
};
