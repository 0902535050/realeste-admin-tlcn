import socketIOClient from 'socket.io-client'
import { Host } from '../_services/host'

export default function () {
  const socket = socketIOClient(Host)

  function registerHandler(onCommentReceived) {
    socket.on('commentaction', onCommentReceived)
  }

  function unregisterHandler() {
    socket.off('commentaction')
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  function register(email, cb) {
    socket.emit('register', email, cb)
  }

  function join(projectid, cb) {
    socket.emit('join', projectid, cb)
  }

  function leave(projectid, cb) {
    socket.emit('leave', projectid, cb)
  }

  function comment(projectid, comment, cb) {
    socket.emit('comment', { projectid, message: comment }, cb)
  }

  function getProjects(cb) {
    socket.emit('projects', null, cb)
  }

  function getAvailableUsers(cb) {
    socket.emit('availableClient', null, cb)
  }

  return {
    register,
    join,
    leave,
    comment,
    getProjects,
    getAvailableUsers,
    registerHandler,
    unregisterHandler,
  }
}

