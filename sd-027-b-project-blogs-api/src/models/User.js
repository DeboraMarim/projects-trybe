module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      displayName: {        
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,        
      },
    },
    {
      underscored: true,
      timestamps: false,
      tableName: "users",
    }
  );

  User.associate=(models) => {
    User.hasMany(models.BlogPost,{
        foreignKey: 'user_id', as: 'blogPosts'            
    })
}
  return User;
};
