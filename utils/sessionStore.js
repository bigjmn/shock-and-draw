module.exports = function createSessionStore() {
  const bySession = new Map()  // sessionId → record
  const bySocket = new Map()   // socketId → sessionId

  return {
    set(sessionId, record) {
      bySession.set(sessionId, record)
      bySocket.set(record.socketId, sessionId)
    },
    get(sessionId) {
      return bySession.get(sessionId)
    },
    getBySocketId(socketId) {
      const sid = bySocket.get(socketId)
      return sid ? bySession.get(sid) : undefined
    },
    updateSocketId(sessionId, newSocketId) {
      const record = bySession.get(sessionId)
      if (!record) return
      bySocket.delete(record.socketId)
      record.socketId = newSocketId
      bySocket.set(newSocketId, sessionId)
    },
    delete(sessionId) {
      const record = bySession.get(sessionId)
      if (record) bySocket.delete(record.socketId)
      bySession.delete(sessionId)
    },
    all() {
      return Array.from(bySession.values())
    }
  }
}
