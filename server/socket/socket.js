const socketio = require('socket.io')
const dbSync = require('./dbSync')

function s(server) {
  const io = socketio(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  })

  const dbSyncInstance = dbSync(io)

  io.on('connection', (socket) => {
    console.log('user is connected')
    socket.on('join', (roomId) => {
      console.log(`join room ${roomId}`)
      socket.join(roomId)
      // TODO: improve notify mechanism for specific user instead of emit data globally
      dbSyncInstance.checkNotification('notification')
    })
    socket.on('leave', (roomId) => {
      socket.leave(roomId)
    })
    socket.on('broadcast', (msg) => {
      socket.broadcast.emit('broadcast', `This is broadcast message = ${msg}`)
    })
    socket.on('postchannel', (data, callback) => { // data = {channel, eventname, msg}
      const { channel, eventname, msg } = data
      if (!channel || !eventname || !msg) {
        callback({ code: 500, msg: 'Error input is invalid' })
      } else {
        socket.to(channel).emit(eventname, msg)
        callback({ code: 200, msg: `message ${msg} post ${eventname} to ${channel} successfully` })
      }
    })
    socket.on('disconnect', () => {
      console.log('user is disconnected')
    })
  })
  return io
}

module.exports = s
