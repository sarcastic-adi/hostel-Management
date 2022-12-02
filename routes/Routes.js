module.exports = (app) => {
    app.use('/user', require('./UserRoutes'));
    app.use('/complaint', require('./ComplaintRoutes'));
}