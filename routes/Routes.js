module.exports = (app) => {
    app.use('/user', require('./UserRoutes'));
    app.use('/complaint', require('./ComplaintRoutes'));
    app.use('/room', require('./RoomRoutes'));
    app.use('/admin', require('./AdminRoutes'));
    app.use('/notice', require('./NoticeRoutes'));
}