const express = require('express')
const layouts = require('express-ejs-layouts')
const publicRouter = require('../routes/public-route')
const { join } = require("path");
const methodOverride = require('method-override')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', join(__dirname, '../views'))
app.use(layouts)
app.use(express.static(join(__dirname, '../resource')))
app.use(publicRouter)

module.exports = app