const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const config = require('../../config')

const { getUserId } = require('../utils')

const Query = {
  Query: {
    profile: async (parent, args, ctx) => {
      try {
        getUserId(ctx)
        const _id = getUserId(ctx)
        const user = await User.findOne({ _id })
        return user
      } catch (error) {
        return
      }
    },

    userAllQuery: async () => User.find(),

    isUserLoggedIn: async (parent, args, ctx) => {
      try {
        getUserId(ctx)
        return true
      } catch (error) {
        return false
      }
    }
  }
}

const Mutation = {
  Mutation: {
    signup: async (_, args, ctx) => {
      let user = new User()
      user.email = args.email
      user.password = args.password
      user.picture = user.gravatar()

      const existingUser = await User.findOne({ email: args.email })

      if (existingUser) {
        throw new Error('Account with that email is already exist')
      } else {
        user.save()

        const token = jwt.sign(
          {
            userId: user._id
          },
          config.secret,
          {
            expiresIn: '7d'
          }
        )

        ctx.res.cookie('userToken', token, {
          domain: 'next-ant.herokuapp.com',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        })

        return user
      }
    },

    login: async (_, args, ctx) => {
      const user = await User.findOne({ email: args.email })

      if (!user) {
        throw new Error('No such user found')
      }

      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }

      const token = jwt.sign(
        {
          userId: user._id
        },
        config.secret,
        {
          expiresIn: '7d'
        }
      )

      ctx.res.cookie('userToken', token, {
        domain: 'next-ant.herokuapp.com',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      })

      return user
    },

    logout: async (_, args, ctx) => {
      ctx.res.clearCookie('userToken')
      return {
        token: 'null'
      }
    },

    userDelete: async (_, { _id }) => {
      await User.findOneAndRemove({ _id })
      return { _id }
    }
  }
}

module.exports = { Query, Mutation }
