'use strict';
const fs= require('fs');
const { hash } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let data = fs.readFileSync('./data/user.json', 'utf-8')
   data = JSON.parse(data)
   data.map(el=>{
    el.createdAt= new Date()
    el.updatedAt= new Date()
    el.password = hash(el.password)
    return el
 })
    await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
