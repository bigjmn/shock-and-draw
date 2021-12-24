var _ = require('lodash')
var fs = require('fs')

class Team{
  constructor(name, users, index, color){
    this.name = name
    this.users = users
    this.index = index
    this.color = color
    this.points = 0
    this.drawer = null
    this.word = null

    this.attackbonus = true;
    this.room = name+'room'

    this.hitwith = []
    this.opponent = null;

  }

  get newattack(){
    var possibleAttacks = Array.from(Array(6).keys()).filter(x=>(this.hitwith.includes(x)==false))
    var randAttack = possibleAttacks[Math.floor(Math.random()*possibleAttacks.length)]
    this.hitwith.push(randAttack)
    return randAttack
  }
  get teamtags(){
    return this.users.map((user) => user.tagname)
  }
  removeUser(playerid){
    this.users = this.users.filter((user) => user.id != playerid)
  }

  refreshword(){
    const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\n');

   var arr = readFileLines('utils/wordlist.txt');

   var myword = arr[Math.floor(Math.random()*arr.length)];
   //this shouldn't happen, but just in case 
   if (myword == ''){
     myword = 'pineapple'
   }
   this.word = myword
  }
  prepRound(round){
    this.hitwith = []
    this.refreshword()
    for (let i = 0; i < this.users.length; i++){
      this.users[i].correct = 0
      this.users[i].drawing = false
      if (i == round%this.users.length){
        this.users[i].drawing = true
        this.drawer = this.users[i]

      }

    }



  }


}

module.exports = function teamify(lobby){
  var userlist = lobby.users
  var redplayers = userlist.filter(user => user.teamcolor == 'red')
  var blueplayers = userlist.filter(user => user.teamcolor == 'blue')

  var redteam = new Team('red', redplayers, 0, "#ff3b2d")
  var blueteam = new Team('blue', blueplayers, 1, "#2df1ff")
  redteam.opponent = blueteam

  blueteam.opponent = redteam


  lobby.teams = [redteam, blueteam]



  lobby.socketlist.forEach((player) => {
    if (player.user.teamcolor == 'red'){
      player.user.team = redteam
      player.join(redteam.room)


    }
    if (player.user.teamcolor == 'blue'){
      player.user.team = blueteam
      player.join(blueteam.room)

    }
  })

}
