const { User } = require('../models');

const userData = [
    {
        username: "Lynette",
        twitter: "",
        github: "",
        email: "Lynette@gmail.com",
        password: "p@ssword1"
    },
    {
        username: "George",
        twitter: "",
        github: "",
        email: "george@gmail.com",
        password: "p@ssword2"
    },
    {
        username: "janine",
        twitter: "",
        github: "",
        email: "janine@gmail.com",
        password: "p@ssword3"
    },
    {
        username: "stanislas",
        twitter: "",
        github: "",
        email: "stanislas@gmail.com",
        password: "p@ssword4"
    },
    {
        username: "alexandre",
        twitter: "",
        github: "",
        email: "alexandre@gmail.com",
        password: "p@ssword5"
    },
    {
        username: "Yves",
        twitter: "",
        github: "",
        email: "yves@gmail.com",
        password: "p@ssword6"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;