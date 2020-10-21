const express = require('express');
const posts = require('../routes/post')
const genres = require('../routes/genre')
const customers = require('../routes/customer')
const authors = require('../routes/author')
const courses = require('../routes/course')
const movies = require('../routes/movie')
const auth = require('../routes/auth')
const rentals = require('../routes/rental');

const error = require('../middleware/error')


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/posts', posts)
    app.use('/api/genres', genres)
    app.use('/api/customers', customers)
    app.use('/api/authors', authors)
    app.use('/api/courses', courses)
    app.use('/api/movies', movies)
    app.use('/api/rentals', rentals)
    app.use('/api/', auth)
    app.use(error);

}