const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        // allowNull: false,
      },
      release_date: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
        defaultValue: 0,
      },
      // platforms: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      image: {
        type: DataTypes.STRING,
      },
      createdAtDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
