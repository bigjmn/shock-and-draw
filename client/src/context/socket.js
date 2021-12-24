import io from "socket.io-client";




const socket = io.connect(window.location.href);
export default socket
