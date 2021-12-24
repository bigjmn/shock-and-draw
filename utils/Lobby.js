module.exports = function Lobby(roomid, urlpath, nsp){
  return{

    roomid:roomid,
    urlpath:urlpath,
    nsp:nsp,
    hostid:null,
    teams:null,
    round:0,
    attackmemo:{},

    get socketlist(){


      var sockmap = Array.from(nsp.sockets.values())
      return sockmap
    },

    get users(){
      var userlist = this.socketlist.map((player) => player.user)
      return userlist
    },



    get host(){
      return this.users[0].id
    },







    midgame:false,
    readyusers:0,

    bonusTime: 20,
    roundTime: 180,
    attackTime:20,
    numRounds:4,
    purgeteams: function(){
      this.users.forEach(user => delete user.team)
      this.teams = null;
    }


  }



}
