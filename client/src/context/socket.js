import io from "socket.io-client";

const SESSION_KEY = 'sad_session_id'
let sessionId = localStorage.getItem(SESSION_KEY)
if (!sessionId) {
  sessionId = crypto.randomUUID()
  localStorage.setItem(SESSION_KEY, sessionId)
}

const socket = io.connect(window.location.href, { auth: { sessionId } })
export default socket
