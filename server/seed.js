// require('dotenv').config()
// const {CONNECTION_STRING} = process.env
// const Sequelize = require('sequelize')

// const sequelize = new Sequelize(CONNECTION_STRING, {
//     dialect: 'postgres', 
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// })

// module.exports = {
//     seed: (req, res) => {
//         sequelize.query(`
//             drop table if exists allPoses;
//             drop table if exists allCats;
//             drop table if exists allFavs;
            
//             create table allPoses (

//             )

//             create table allCats (

//             )

//             create table allFavs (

//             )

//             insert into allPoses (

//             )

//             insert into allCats (

//             )
//         `
        

//         ).then(() => {
//             console.log('DB seeded!')
//             res.sendStatus(200)
//         }).catch(err => console.log('error seeding DB', err))
//     }
// }