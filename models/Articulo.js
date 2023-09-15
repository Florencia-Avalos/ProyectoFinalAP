import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';



export const articulo = sequelize.define(
  'articulo',

  
  {

    cod_art: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },

    nom_art: { type: DataTypes.STRING },
    img_art: { type: DataTypes.STRING },
    desc_art: { type: DataTypes.STRING},
  },
  {
    timestamps: false,
    tableName: 'Articulo',
  }
);
