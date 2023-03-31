import Sequelize from 'sequelize'

const createStore = () => {

    const db = new Sequelize('poll', 'root', 'password', {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    })

    const Poll = db.define('Poll', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        prompt: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
            freezeTableName: true
    })
    
    const Response = db.define('Response', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        poll_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Poll',
                key: 'id'
            }
        },
        pos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        response: {
            type: Sequelize.STRING,
            allowNull: false
        },
        votes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true
    })

    return {db, Poll, Response}
}

export default createStore;