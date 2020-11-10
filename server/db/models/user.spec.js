/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          address: 'New York and Chicago'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('User Model Sequelize part', () => {
    describe('properties', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          address: 'New York and Chicago'
        })
      })

      it('returns the correct instance', () => {
        expect(cody.email).to.be.equal('cody@puppybook.com')
        expect(cody.address).to.be.equal('New York and Chicago')
        expect(cody.imageUrl).to.be.equal(
          'https://www.learning.uclg.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg?itok=PANMBJF-'
        )
        expect(cody.isAdmin).to.be.equal(false)
      })
    })
  })
}) // end describe('User model')
