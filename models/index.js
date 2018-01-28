const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack2', { logging: false });

let Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW()
    }
}, {
    getterMethods: {
        route: () => '/wiki/' + this.title
    }
});

let User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            unique: true
        }
    }
});

module.exports = {
    User: User,
    Page: Page,
    db: db
}