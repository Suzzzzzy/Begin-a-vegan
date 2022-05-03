import Sequelize from "sequelize";

class Postings extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        users_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        article: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        file_url: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
          allowNull: false,
        },
        is_deleted: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscore: false,
        modelName: "Postings",
        tableName: "postings",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }
  static associate(models) {
    Postings.belongsTo(models.Users, {
      foreignKey: "users_id",
      targetkey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    Postings.hasMany(models.Comments, {
      foreignKey: "id",
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    Postings.belongsToMany(models.Users, { through: "Like", as: "Likers" });
  }
}

export default Postings;
