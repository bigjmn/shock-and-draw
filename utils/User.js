var fs = require('fs')
class User{
  constructor(socket){
    this.username = ''
    this.id = socket.id
    this.teamcolor = 'none'
    this.team = null
    this.drawing = false
    this.host = false
    this.correct = 0

  }
  get tagname(){
    var tag = this.username
    if (this.drawing){
      tag += ' ✏️'
    }
    return tag
  }
}
// function randomUsername(){
//   const readFileLines = filename =>
//  fs.readFileSync(filename)
//  .toString('UTF8')
//  .split('\n');
//
//  var arr = readFileLines('utils/namelist.txt');
//
//  let newname = arr[Math.floor(Math.random()*arr.length)];
//  return newname
// }
module.exports = function userify(socket){
  var sockuser = new User(socket)
  // sockuser.username = randomUsername()
  // if (sockuser.username == ''){
  //   sockuser.username = 'Joe Cool'
  // }
  socket.user = sockuser
}
