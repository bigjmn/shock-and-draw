(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports={gameContainer:"GameRoom_gameContainer__2amQ_",topBar:"GameRoom_topBar__3yM6h",middleBar:"GameRoom_middleBar__39s5o",roundclockContainer:"GameRoom_roundclockContainer__v7rQG",bonusclockContainer:"GameRoom_bonusclockContainer__1rDyE",wordboxContainer:"GameRoom_wordboxContainer__6BUzI",passbuttonContainer:"GameRoom_passbuttonContainer__1C8CB",scorecardContainer:"GameRoom_scorecardContainer__1uodR",messageContainer:"GameRoom_messageContainer__Hit0g",canvasContainer:"GameRoom_canvasContainer__2Z6hJ",attackZoneContainer:"GameRoom_attackZoneContainer__-cMX-",playerTagContainer:"GameRoom_playerTagContainer__2GAFt",roundContainer:"GameRoom_roundContainer__2OjBU"}},,,function(e,t,n){e.exports={nameStyle:"Message_nameStyle__1H8E1",wordStyle:"Message_wordStyle__1p8ip",redactStyle:"Message_redactStyle__1I_UA",messageHolder:"Message_messageHolder__ppxbp"}},,,,function(e,t,n){e.exports={container:"SizePanel_container__36MwJ",checkmark:"SizePanel_checkmark__2l3ow",colorShower:"SizePanel_colorShower__3my2H",sizeForm:"SizePanel_sizeForm__2FDgV"}},,,function(e,t,n){e.exports={teamListContainer:"WaitRoom_teamListContainer__20YG_",optionsContainer:"WaitRoom_optionsContainer__lt23r",teamList:"WaitRoom_teamList__XbCzx",hostZoneContainer:"WaitRoom_hostZoneContainer__1dpVF"}},function(e,t,n){e.exports={colorButton:"NewColorPanel_colorButton__1oRlW",colorRow:"NewColorPanel_colorRow__3tEls",colorDisplay:"NewColorPanel_colorDisplay__2KiDW",colorHolder:"NewColorPanel_colorHolder__13k5N"}},,,,function(e,t,n){e.exports={playerTagWrapper:"PlayerTags_playerTagWrapper__2QonG",tagListWrapper:"PlayerTags_tagListWrapper__1wb2R",tagStyle:"PlayerTags_tagStyle__2Afmt"}},,,function(e,t,n){e.exports={pointsRecapContainer:"Recap_pointsRecapContainer__-RjaS",totalpointsHolder:"Recap_totalpointsHolder__5bRf6",recapContainer:"Recap_recapContainer__3RmBS"}},function(e,t,n){e.exports={finalScoreContainer:"EndGame_finalScoreContainer__gk2CZ",scoresBar:"EndGame_scoresBar__3RlS1",scoreContainer:"EndGame_scoreContainer__UKU6t"}},,,function(e,t,n){e.exports={controlWrapper:"Controls_controlWrapper__agoTt",colorWrapper:"Controls_colorWrapper__1yLib",sizetrashWrapper:"Controls_sizetrashWrapper__3IQZP"}},function(e,t,n){e.exports={outerContainer:"WordBox_outerContainer__1ZEoo"}},function(e,t,n){e.exports={pointsContainer:"ScoreCard_pointsContainer__25BYE",teampointsContainer:"ScoreCard_teampointsContainer__1iSqu"}},,function(e,t,n){e.exports={previewContainer:"Preview_previewContainer__Otf-e",matchupContainer:"Preview_matchupContainer__1wEWt"}},function(e,t,n){e.exports={guessInput:"MessageInput_guessInput__2i8Y2",guessform:"MessageInput_guessform__3NHY1"}},function(e,t,n){e.exports={controlContainer:"Canvas_controlContainer__1LIFv"}},function(e,t,n){e.exports={boardContainer:"RecCanvas_boardContainer__mOxJ5",peepContainer:"RecCanvas_peepContainer__38pY5"}},function(e,t,n){e.exports={bonusStyle:"BonusClock_bonusStyle__3yyAw",noBonus:"BonusClock_noBonus__2Y_YO"}},function(e,t,n){e.exports={cardContainer:"AttackCard_cardContainer__1mntF",timerspot:"AttackCard_timerspot__3IY-P"}},,,,,function(e,t,n){e.exports={buttonStyle:"JoinTeam_buttonStyle__165WE"}},function(e,t,n){e.exports={messageWrapper:"MessageHolder_messageWrapper__3e2pn"}},function(e,t,n){e.exports={attackContainer:"AttackZone_attackContainer__2CmkK"}},function(e,t,n){e.exports={passContainer:"PassButton_passContainer__2XbJR"}},,,,,,function(e,t,n){},function(e,t,n){},,,,,,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),c=n(40),r=n.n(c),s=(n(53),n.p,n(54),n(2)),i=n(48).a.connect(window.location.href),l=n(44),u=n.n(l),d=n(0),j=function(e){var t=e.color,n=e.username,a="red"==t?"RED TEAM":"BLUE TEAM";return Object(d.jsx)("div",{children:Object(d.jsxs)("button",{className:u.a.buttonStyle,onClick:function(){""!=n&&i.emit("joinTeam",{color:t})},children:["Join ",a]})})},f=function(e){var t=e.playerUndecided;return Object(d.jsx)("div",{className:"hostbutton-container",children:Object(d.jsx)("button",{disabled:t,onClick:function(){i.emit("startgame")},children:"Start the game"})})},b=function(e){var t=e.setUsername,n=e.playernames,o=Object(a.useState)(""),c=Object(s.a)(o,2),r=c[0],l=c[1],u=Object(a.useState)(""),j=Object(s.a)(u,2),f=j[0],b=j[1];return Object(d.jsxs)("div",{children:[Object(d.jsx)("form",{onSubmit:function(e){var a;e.preventDefault(),""!=(a=r)&&(n.includes(a)?b("That name is taken!"):(b(""),t(a),i.emit("newUsername",{username:a}))),l("")},children:Object(d.jsx)("input",{type:"text",maxLength:12,onChange:function(e){return l(e.target.value)},value:r})}),Object(d.jsx)("p",{children:f})]})},m=n(18),O=n.n(m),h=function(e){var t=e.players,n=e.setPlayers,o=(e.setGamestage,e.setBonusTime),c=e.setRoundTime,r=e.setAttackTime,l=e.roundTime,u=e.setNumRounds,m=e.numRounds,h=e.bonusTime,p=e.attackTime,x=e.username,v=e.setUsername,g=(e.setTeamColor,Object(a.useState)(!1)),C=Object(s.a)(g,2),_=C[0],y=C[1],k=Object(a.useState)(null),S=Object(s.a)(k,2),w=S[0],N=S[1],R=Object(a.useState)(!0),T=Object(s.a)(R,2),P=T[0],D=T[1];Object(a.useEffect)((function(){i.emit("getRoomData")}),[]),Object(a.useEffect)((function(){return i.on("takeRoomData",(function(e){var t;t=e.players,n(t),B(e.players)})),i.on("takeHost",(function(){y(!0)})),i.on("takeTimerData",(function(e){r(e.attacktime),o(e.bonustime),c(e.roundtime)})),i.on("takeNumRounds",(function(e){u(e.numrounds)})),i.on("toGameroom",(function(){console.log("gettinggameroom"),i.emit("getPreview")})),i.on("takeRoomCode",(function(e){N(e.roomcode)})),function(){i.off("takeRoomData"),i.off("takeHost"),i.off("takeTimerData"),i.off("takeNumRounds"),i.off("toGameroom"),i.off("takeRoomCode")}}));var E=function(e,t){var n=e.filter((function(e){return""!=e.username})).reduce((function(e,n){return n.teamcolor==t?e+1:e}),0);return console.log(n),n},B=function(e){var t=!1;E(e,"none")>0&&(t=!0),E(e,"red")<2&&(t=!0),E(e,"blue")<2&&(t=!0),D(t)};return Object(d.jsxs)("div",{children:[Object(d.jsxs)("h2",{children:["Room Code: ",w]}),Object(d.jsxs)("div",{className:O.a.teamListContainer,children:[Object(d.jsxs)("div",{className:O.a.teamList,style:{backgroundColor:"#ff3b2d"},children:[Object(d.jsx)(j,{color:"red",username:x}),t.map((function(e){return Object(d.jsx)("div",{className:"team-players",children:"red"==e.teamcolor&&Object(d.jsx)("h2",{children:e.username})},e.id)}))]}),Object(d.jsxs)("div",{className:O.a.teamList,children:[Object(d.jsxs)("div",{className:O.a.pickNameContainer,children:[Object(d.jsx)("h3",{children:"Pick a Username"}),Object(d.jsx)(b,{setUsername:v,playernames:t.map((function(e){return e.username}))})]}),t.map((function(e){return Object(d.jsx)("div",{className:"team-players",children:"none"==e.teamcolor&&Object(d.jsx)("h2",{children:e.username})},e.id)}))]}),Object(d.jsxs)("div",{className:O.a.teamList,style:{backgroundColor:"#2df1ff"},children:[Object(d.jsx)(j,{color:"blue",username:x}),t.map((function(e){return Object(d.jsx)("div",{className:"team-players",children:"blue"==e.teamcolor&&Object(d.jsx)("h2",{children:e.username})},e.id)}))]}),Object(d.jsxs)("div",{className:O.a.hostZoneContainer,style:{backgroundColor:"#e2e2e2"},children:[Object(d.jsxs)("form",{className:O.a.optionsContainer,onSubmit:function(e){e.preventDefault(),i.emit("giveTimerData",{roundtime:l,bonustime:h,attacktime:p})},children:[Object(d.jsxs)("label",{children:["round time",Object(d.jsxs)("select",{value:l,onChange:function(e){return i.emit("changeRoundTime",{time:e.target.value})},children:[Object(d.jsx)("option",{value:90,children:"90"}),Object(d.jsx)("option",{value:180,children:"180"}),Object(d.jsx)("option",{value:300,children:"300"})]})]}),Object(d.jsxs)("label",{children:["bonus time",Object(d.jsxs)("select",{value:h,onChange:function(e){return i.emit("changeBonusTime",{time:e.target.value})},children:[Object(d.jsx)("option",{value:20,children:"20"}),Object(d.jsx)("option",{value:30,children:"30"}),Object(d.jsx)("option",{value:40,children:"40"})]})]}),Object(d.jsxs)("label",{children:["attack time",Object(d.jsxs)("select",{value:p,onChange:function(e){return i.emit("changeAttackTime",{time:e.target.value})},children:[Object(d.jsx)("option",{value:20,children:"20"}),Object(d.jsx)("option",{value:30,children:"30"}),Object(d.jsx)("option",{value:40,children:"40"})]})]}),Object(d.jsxs)("label",{children:["Number of Rounds",Object(d.jsx)("select",{value:m,onChange:function(e){return i.emit("changeNumRounds",{numrounds:e.target.value})},children:Array.from(Array(12).keys()).map((function(e){return Object(d.jsx)("option",{value:e+1,children:e+1})}))})]})]}),_&&Object(d.jsx)(f,{playerUndecided:P})]})]})]})},p=n(34),x=n.n(p),v=function(e){var t=e.round,n=e.redDrawer,o=e.blueDrawer;return Object(a.useEffect)((function(){setTimeout((function(){i.emit("getRoundData")}),3e3)}),[]),Object(d.jsxs)("div",{className:x.a.previewContainer,children:[Object(d.jsxs)("h1",{children:["Round ",t]}),Object(d.jsx)("h1",{style:{textDecorationLine:"underline"},children:"Drawers"}),Object(d.jsxs)("div",{className:x.a.matchupContainer,children:[Object(d.jsx)("h1",{style:{color:"#ff3b2d"},children:n}),Object(d.jsx)("h2",{children:"vs."}),Object(d.jsx)("h1",{style:{color:"#2df1ff"},children:o})]})]})},g=n(8),C=n.n(g),_=n(29),y=n(11),k=n.n(y),S=function(e){var t=e.message;return t.passmessage?Object(d.jsx)("div",{className:k.a.messageHolder,children:Object(d.jsxs)("p",{children:[Object(d.jsx)("span",{className:k.a.nameStyle,children:t.name}),"  passed on the word ",Object(d.jsx)("span",{className:k.a.passStyle,children:t.guess})]})}):t.correct?Object(d.jsx)("div",{className:k.a.messageHolder,children:Object(d.jsxs)("p",{children:[Object(d.jsx)("span",{className:k.a.nameStyle,children:t.name})," got it! the word was ",Object(d.jsx)("span",{className:k.a.wordStyle,children:t.guess})]})}):t.censored?Object(d.jsx)("div",{className:k.a.messageHolder,children:Object(d.jsxs)("p",{children:[Object(d.jsxs)("span",{className:k.a.nameStyle,children:[t.name,": "]}),Object(d.jsx)("span",{className:k.a.redactStyle,children:"REDACTED"})]})}):Object(d.jsx)("div",{className:k.a.messageHolder,children:Object(d.jsxs)("p",{children:[Object(d.jsxs)("span",{className:k.a.nameStyle,children:[t.name,": "]}),t.guess]})})},w=n(45),N=n.n(w),R=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],o=t[1],c=Object(a.useRef)(null);return Object(a.useEffect)((function(){!function(){var e;null===(e=c.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})}()}),[n]),Object(a.useEffect)((function(){return i.on("response",(function(e){o((function(t){return[].concat(Object(_.a)(t),[e])}))})),i.on("attackBounce",(function(){i.emit("giveAttack")})),function(){i.off("response"),i.off("attackBounce")}})),Object(d.jsxs)("div",{className:N.a.messageWrapper,children:[n.map((function(e,t){return Object(d.jsx)(S,{message:e},t)})),Object(d.jsx)("div",{ref:c})]})},T=n(35),P=n.n(T);var D=function(e){var t=e.isDrawing,n=Object(a.useState)(""),o=Object(s.a)(n,2),c=o[0],r=o[1],l=Object(a.useState)(!1),u=Object(s.a)(l,2),j=u[0],f=u[1];return Object(a.useEffect)((function(){return i.on("reverse",(function(){f(!0)})),i.on("reverseclear",(function(){f(!1)})),function(){i.off("reverse"),i.off("reverseclear")}})),Object(d.jsx)("form",{className:P.a.guessform,onSubmit:function(e){e.preventDefault();var t=j?c.split("").reverse().join(""):c;i.emit("guess",{guess:t}),r("")},children:Object(d.jsx)("input",{disabled:t,maxLength:32,className:P.a.guessInput,type:"text",value:c,onChange:function(e){return r(e.target.value)},placeholder:t?"":"Enter guess here"})})},E=n(19),B=n.n(E),W=function(e){var t=Object(a.useState)("#000000"),n=Object(s.a)(t,2),o=n[0],c=n[1],r=Object(a.useState)(!0),l=Object(s.a)(r,2),u=l[0],j=l[1],f=u?["#ffffff","#c1c1c1","#ef130b","#ff7100","#ffe400","#00cc00","#00b2ff","#231fd3","#a300ba","#d37caa","#a0522d","#592f2a","#ecbcb4"]:["#ffffff","#d8d8d8","#cfcfcf","#c6c6c6","#bdbdbd","#b4b4b4","#ababab","#a2a2a2","#999999","#909090","#878787","#7e7e7e","#757575"],b=u?["#000000","#4c4c4c","#740b07","#c23800","#e8a200","#005510","#00569e","#0e0865","#550069","#a75574","#63300d","#492f31","#d1a3a4"]:["#000000","#090909","#121212","#1b1b1b","#242424","#2d2d2d","#363636","#3f3f3f","#484848","#515151","#5a5a5a","#636363","#6c6c6c"],m=function(t){c(t.target.value),e.handleColor(t.target.value)};return Object(a.useEffect)((function(){return i.on("nocolor",(function(){c("#000000"),e.handleColor("#000000"),j(!1)})),i.on("nocolorclear",(function(){j(!0),c("#000000"),e.handleColor("#000000")})),function(){i.off("nocolor"),i.off("nocolorclear")}})),Object(d.jsxs)("div",{className:B.a.colorContainer,children:[Object(d.jsx)("div",{className:B.a.colorDisplay,style:{backgroundColor:o}}),Object(d.jsxs)("div",{className:B.a.colorHolder,children:[Object(d.jsx)("div",{className:B.a.colorRow,children:f.map((function(e,t){return Object(d.jsx)("button",{style:{backgroundColor:e},className:B.a.colorButton,value:e,onClick:m},t)}))}),Object(d.jsx)("div",{className:B.a.colorRow,children:b.map((function(e,t){return Object(d.jsx)("button",{style:{backgroundColor:e},className:B.a.colorButton,value:e,onClick:m},t)}))})]})]})},I=n(15),M=n.n(I),A=function(e){var t=Object(a.useState)(!0),n=Object(s.a)(t,2),o=n[0],c=n[1];return Object(a.useEffect)((function(){return i.on("fathands",(function(){e.handleSize(40),c(!1)})),i.on("fathandsclear",(function(){c(!0),e.handleSize(5)})),function(){i.off("fathands"),i.off("fathandsclear")}})),Object(d.jsx)("div",{className:M.a.colorHolder,children:Object(d.jsxs)("form",{onChange:function(t){return e.handleSize(t.target.value)},className:M.a.sizeForm,children:[o&&Object(d.jsxs)("label",{className:M.a.container,children:[Object(d.jsx)("input",{type:"radio",name:"coloroption",defaultChecked:!0,value:5}),Object(d.jsx)("span",{style:{width:"15px",height:"15px",top:"12px",left:"12px"},className:M.a.checkmark})]}),o&&Object(d.jsxs)("label",{className:M.a.container,children:[Object(d.jsx)("input",{type:"radio",name:"coloroption",value:18}),Object(d.jsx)("span",{style:{width:"20px",height:"20px",top:"10px",left:"10px"},className:M.a.checkmark})]}),o&&Object(d.jsxs)("label",{className:M.a.container,children:[Object(d.jsx)("input",{type:"radio",name:"coloroption",value:26}),Object(d.jsx)("span",{style:{width:"25px",height:"25px",top:"8px",left:"8px"},className:M.a.checkmark})]}),Object(d.jsxs)("label",{className:M.a.container,children:[Object(d.jsx)("input",{type:"radio",name:"coloroption",value:40}),Object(d.jsx)("span",{style:{width:"30px",height:"30px",top:"5px",left:"5px"},className:M.a.checkmark})]})]})})},G=function(){return Object(d.jsx)("div",{children:Object(d.jsx)("button",{style:{backgroundColor:"white",width:"40px",height:"40px"},onClick:function(){i.emit("clearCanvas")},children:"\ud83d\uddd1"})})},H=n(30),L=n.n(H),z=function(e){return Object(d.jsxs)("div",{className:L.a.controlWrapper,children:[Object(d.jsx)("div",{className:L.a.colorWrapper,children:Object(d.jsx)(W,{handleColor:e.handleColor})}),Object(d.jsxs)("div",{className:L.a.sizetrashWrapper,children:[Object(d.jsx)(A,{handleSize:e.handleSize}),Object(d.jsx)(G,{})]})]})},U=n(36),F=n.n(U),J=function(e){var t=e.word,n=o.a.useRef(null),c=o.a.useRef(null),r=Object(a.useState)({}),l=Object(s.a)(r,2),u=l[0],j=l[1],f=Object(a.useState)({x:0,y:0}),b=Object(s.a)(f,2),m=(b[0],b[1]),O=Object(a.useState)(!1),h=Object(s.a)(O,2),p=h[0],x=h[1],v=Object(a.useState)({x:0,y:0}),g=Object(s.a)(v,2),C=g[0],_=g[1],y=Object(a.useState)("#000000"),k=Object(s.a)(y,2),S=k[0],w=k[1],N=Object(a.useState)(5),R=Object(s.a)(N,2),T=R[0],P=R[1],D=Object(a.useState)(!1),E=Object(s.a)(D,2),B=E[0],W=(E[1],Object(a.useState)("default")),I=Object(s.a)(W,2),M=I[0],A=I[1],G=Object(a.useState)(!1),H=Object(s.a)(G,2),L=H[0],U=H[1];Object(a.useEffect)((function(){var e=n.current;e.width=c.current.offsetWidth,e.height=c.current.offsetHeight;var t=e.getContext("2d");t.lineJoin="round",t.lineCap="round",j(t);var a=e.getBoundingClientRect();m({x:parseInt(a.left),y:parseInt(a.top)})}),[u]);Object(a.useEffect)((function(){return i.on("takeClear",(function(){u.clearRect(0,0,500,500)})),i.on("hidemouse",(function(){A("none")})),i.on("hidemouseclear",(function(){A("default")})),i.on("correct",(function(){x(!1),U(!0),u.fillStyle="black",u.fillRect(90,90,320,220),u.fillStyle="white",u.fillRect(100,100,300,200),u.fillStyle="black",u.font="bold 42px serif",u.textAlign="center",u.fillText("correct!",250,140),u.fillStyle="green",u.font="bold 42px serif",u.fillText(t+" \u2714",250,260),setTimeout((function(){U(!1),i.emit("getNext")}),2e3)})),function(){i.off("takeClear"),i.off("hidemouse"),i.off("hidemouseclear"),i.off("correct")}}));var J=function(e,t){var n=0;return function(){var a=(new Date).getTime();if(!(a-n<e))return n=a,t.apply(void 0,arguments)}}(50,(function(e){var t=e.nativeEvent.offsetX,n=e.nativeEvent.offsetY;if(p){u.strokeStyle=S,u.lineWidth=T,u.beginPath(),u.moveTo(C.x,C.y),u.lineTo(t,n),u.stroke();var a={oldx:C.x,oldy:C.y,newx:t,newy:n,color:S,thickness:T};i.emit("sendPack",{payload:a})}_({x:t,y:n})}));return Object(d.jsxs)("div",{className:F.a.boardContainer,ref:c,children:[Object(d.jsx)("canvas",{ref:n,onMouseDown:function(e){if(!L){x(!0),_({x:parseInt(e.nativeEvent.offsetX),y:parseInt(e.nativeEvent.offsetY)}),console.log(C),u.fillStyle=S,u.beginPath(),u.arc(C.x,C.y,T/2,0,2*Math.PI),u.fill(),u.closePath();var t={centerx:C.x,centery:C.y,color:S,thickness:T};i.emit("sendDot",{payload:t})}},onMouseUp:function(){x(!1)},onMouseMove:J,onMouseOut:function(){x(!1)},height:"500",width:"500",style:{border:"1px solid",cursor:M}}),Object(d.jsx)("div",{className:F.a.controlContainer,children:Object(d.jsx)(z,{handleColor:function(e){w(e)},handleSize:function(e){P(e)},activeTake:B})})]})};var Y=function(){var e=o.a.useRef(null),t=o.a.useRef(null),n=Object(a.useState)({}),c=Object(s.a)(n,2),r=c[0],i=c[1],l=Object(a.useState)({x:0,y:0}),u=Object(s.a)(l,2),j=u[0],f=u[1],b=Object(a.useState)(!1),m=Object(s.a)(b,2),O=m[0],h=m[1];Object(a.useEffect)((function(){var n=e.current;n.width=t.current.offsetWidth,n.height=t.current.offsetHeight;var a=n.getContext("2d");a.fillStyle="black",i(a);var o=n.getBoundingClientRect();f({x:parseInt(o.left),y:parseInt(o.top)}),a.fillRect(0,0,500,500)}),[r]);var p=function(e){var t=e.clientX-j.x,n=e.clientY-j.y;O&&(r.fillRect(0,0,500,500),r.clearRect(t-90,n-90,180,180))};return function(e,t){var n=0}(50,p),Object(d.jsx)("div",{className:"PeepCanvas",ref:t,children:Object(d.jsx)("canvas",{ref:e,onMouseDown:function(e){h(!0);var t=e.clientX-j.x,n=e.clientY-j.y;r.clearRect(t-90,n-90,180,180)},onMouseUp:function(){h(!1),r.fillRect(0,0,500,500)},onMouseOut:function(){h(!1),r.fillRect(0,0,500,500)},onMouseMove:p,height:"500",width:"500",style:{border:"1px solid"}})})},Z=n(37),X=n.n(Z),Q=function(e){var t=e.word,n=o.a.useRef(null),c=o.a.useRef(null),r=Object(a.useState)({}),l=Object(s.a)(r,2),u=l[0],j=l[1],f=Object(a.useState)({x:0,y:0}),b=Object(s.a)(f,2),m=(b[0],b[1]),O=Object(a.useState)({x:0,y:0}),h=Object(s.a)(O,2),p=(h[0],h[1],Object(a.useState)("#000000")),x=Object(s.a)(p,2),v=(x[0],x[1],Object(a.useState)(!1)),g=Object(s.a)(v,2),C=g[0],_=g[1];return Object(a.useEffect)((function(){return i.on("takePacket",(function(e){var t;t=e.payload,u.strokeStyle=t.color,u.lineWidth=t.thickness,u.beginPath(),u.moveTo(t.oldx,t.oldy),u.lineTo(t.newx,t.newy),u.stroke()})),i.on("takeDot",(function(e){var t;t=e.payload,u.fillStyle=t.color,u.beginPath(),u.arc(t.centerx,t.centery,t.thickness/2,0,2*Math.PI),u.fill(),u.closePath()})),i.on("takeClear",(function(){u.clearRect(0,0,500,500)})),i.on("peepingtom",(function(){_(!0)})),i.on("peepingtomclear",(function(){_(!1)})),i.on("correct",(function(){u.fillStyle="black",u.fillRect(90,90,320,220),u.fillStyle="white",u.fillRect(100,100,300,200),u.fillStyle="black",u.font="bold 42px serif",u.textAlign="center",u.fillText("correct!",250,140),u.fillStyle="green",u.font="bold 42px serif",u.fillText(t+" \u2714",250,260)})),function(){i.off("takePacket"),i.off("takeDot"),i.off("takeClear"),i.off("peepingtom"),i.off("peepingtomclear"),i.off("correct")}})),Object(a.useEffect)((function(){var e=n.current;e.width=c.current.offsetWidth,e.height=c.current.offsetHeight;var t=e.getContext("2d");t.lineJoin="round",t.lineCap="round",t.lineWidth=5,j(t);var a=e.getBoundingClientRect();m({x:parseInt(a.left),y:parseInt(a.top)})}),[u]),Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:X.a.boardContainer,ref:c,children:Object(d.jsx)("canvas",{ref:n,height:"500",width:"500",style:{border:"1px solid"}})}),Object(d.jsx)("div",{className:X.a.peepContainer,children:C&&Object(d.jsx)(Y,{})})]})},K=function(e){var t=e.isDrawing,n=e.word;return Object(d.jsx)("div",{className:"bigboy",children:t?Object(d.jsx)(J,{word:n}):Object(d.jsx)(Q,{word:n})})},V=n(31),q=n.n(V),$=function(e){var t=e.word,n=e.isDrawing,a=e.showRight,o=t.replace(/[a-zA-Z]/g,"_");return a?Object(d.jsx)("div",{className:q.a.outerContainer,children:Object(d.jsx)("h1",{style:{color:"green"},children:t})}):n?Object(d.jsx)("div",{className:q.a.outerContainer,children:Object(d.jsx)("h1",{children:t})}):Object(d.jsx)("div",{className:q.a.outerContainer,children:Object(d.jsx)("h2",{children:o})})},ee=function(e){var t=e.maxTime,n=e.startTime,o=e.secSetter;return Object(a.useEffect)((function(){var e;if(0!=n)return e=setInterval((function(){o(t-Math.round((Date.now()-n)/1e3))}),1e3),function(){console.log("clearing"),clearInterval(e)}}),[n]),Object(d.jsx)("div",{})},te=(n(61),function(e){var t=e.maxTime,n=Object(a.useState)(0),o=Object(s.a)(n,2),c=o[0],r=o[1],l=Object(a.useState)(0),u=Object(s.a)(l,2),j=u[0],f=u[1];return Object(a.useEffect)((function(){return i.on("startRound",(function(e){r(e.timeStamp)})),function(){i.off("startRound")}})),Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{children:j}),Object(d.jsx)(ee,{secSetter:function(e){f(e),e<=0&&(r(0),i.emit("roundOver"))},maxTime:t,startTime:c})]})}),ne=n(38),ae=n.n(ne),oe=function(e){var t=e.maxTime,n=Object(a.useState)(0),o=Object(s.a)(n,2),c=o[0],r=o[1],l=Object(a.useState)(0),u=Object(s.a)(l,2),j=u[0],f=u[1];return Object(a.useEffect)((function(){return i.on("startBonus",(function(e){r(e.timeStamp)})),function(){i.off("startBonus")}})),Object(d.jsxs)("div",{className:ae.a.bonusStyle,children:[j>0?Object(d.jsx)("div",{style:{height:"60px",backgroundColor:"gold",width:120*j/t,float:"left"}}):Object(d.jsx)("div",{className:ae.a.noBonus}),Object(d.jsx)(ee,{secSetter:function(e){f(e),e<=0&&(r(0),i.emit("bonusOver"))},maxTime:t,startTime:c})]})},ce=n(39),re=n.n(ce),se=function(e){var t=e.type,n=e.color,o=e.timestamp,c=e.maxTime,r=e.filterOut,i=Object(a.useState)(c),l=Object(s.a)(i,2),u=l[0],j=l[1];return Object(a.useEffect)((function(){var e;return e=setInterval((function(){var e=c-Math.round((Date.now()-o)/1e3);e<=0&&(console.log(e),r(o)),j(e)}),1e3),function(){clearInterval(e)}}),[]),Object(d.jsxs)("div",{style:{backgroundColor:n},className:re.a.cardContainer,children:[Object(d.jsx)("h1",{children:t.title}),Object(d.jsx)("h2",{children:t.explainer}),Object(d.jsx)("div",{className:re.a.timerspot,children:u}),Object(d.jsx)("h3",{children:t.flavor})]})},ie=[{title:"Johnny Fat-Hands",explainer:"Drawer can only use the thickest brush",flavor:"Please, Mr. Fat-Hands is my father. Call me Johnny!"},{title:"Cursors! Foiled again!",explainer:"Drawer's cursor is hidden",flavor:"I cried because I had no shoes, until I met a man who had no mouse."},{title:"50 Shades of Gray",explainer:"Drawer can't use colors",flavor:"Starring Dakota Johnson. That movie was beneath her talents."},{title:"esreveR",explainer:"Guesses get submitted backwards.",flavor:"Who knows, the word might be 'racecar!'"},{title:"Classified",explainer:"Team members can't see the guesses",flavor:"Please, REDACTED is my father. Call me REDACTED"},{title:"Peeping Tom",explainer:"Click and drag to get a window into the canvas",flavor:"Honestly this is pretty creepy, even for you..."}],le=n(46),ue=n.n(le),de=function(e){var t=e.maxTime,n=Object(a.useState)([]),o=Object(s.a)(n,2),c=o[0],r=o[1],l=function(e){i.emit("clearAttack",{timestamp:e}),r((function(t){return t.filter((function(t){return t.timestamp!=e}))}))};return Object(a.useEffect)((function(){return i.on("takeAttack",(function(e){var t={timestamp:e.timestamp,color:e.color,type:ie[e.type]};r((function(e){return[].concat(Object(_.a)(e),[t])}))})),function(){i.off("takeAttack")}})),Object(d.jsx)("div",{className:ue.a.attackContainer,children:c.map((function(e){return Object(d.jsx)("div",{children:Object(d.jsx)(se,{type:e.type,timestamp:e.timestamp,color:e.color,maxTime:t,filterOut:l})},e.timestamp)}))})},je=n(47),fe=n.n(je),be=function(e){var t=e.isDrawing;return Object(d.jsx)("div",{className:fe.a.passContainer,children:Object(d.jsx)("button",{disabled:!t,onClick:function(){return i.emit("passWord")},children:"PASS"})})},me=n(32),Oe=n.n(me),he=function(e){return Object(a.useEffect)((function(){return i.on("takePoints",(function(t){"red"==t.color&&e.setRedPoints((function(e){return e+1})),"blue"==t.color&&e.setBluePoints((function(e){return e+1}))})),function(){i.off("takePoints")}})),Object(d.jsxs)("div",{className:Oe.a.pointsContainer,children:[Object(d.jsx)("div",{className:Oe.a.teampointsContainer,style:{backgroundColor:"#ff3b2d"},children:Object(d.jsx)("h1",{children:e.redPoints})}),Object(d.jsx)("div",{className:Oe.a.teampointsContainer,style:{backgroundColor:"#2df1ff"},children:Object(d.jsx)("h1",{children:e.bluePoints})})]})},pe=n(23),xe=n.n(pe),ve=function(e){var t=e.teamTags,n=e.oppTags,a=e.teamColor,o=e.oppColor;return Object(d.jsxs)("div",{className:xe.a.playerTagWrapper,children:[Object(d.jsxs)("div",{className:xe.a.tagListWrapper,children:[Object(d.jsx)("h3",{children:"My Team"}),t.map((function(e,t){return Object(d.jsx)("div",{className:xe.a.tagStyle,style:{backgroundColor:a},children:e},t)}))]}),Object(d.jsxs)("div",{className:xe.a.tagListWrapper,children:[Object(d.jsx)("h3",{children:"Opponents"}),n.map((function(e,t){return Object(d.jsx)("div",{className:xe.a.tagStyle,style:{backgroundColor:o},children:e},t)}))]})]})},ge=n.p+"static/media/correct.b9059219.mp3",Ce=function(){var e=function(e){var t=Object(a.useState)(new Audio(e)),n=Object(s.a)(t,1)[0],o=Object(a.useState)(!1),c=Object(s.a)(o,2),r=c[0],i=c[1];return Object(a.useEffect)((function(){r?n.play():n.pause()}),[r]),Object(a.useEffect)((function(){return n.addEventListener("ended",(function(){return i(!1)})),function(){n.removeEventListener("ended",(function(){return i(!1)}))}}),[]),[r,function(){return i(!r)}]}(ge),t=Object(s.a)(e,2),n=t[0],o=t[1];return Object(a.useEffect)((function(){return i.on("correctsound",(function(){return document.getElementById("clickplayer").click()})),function(){return i.off("correctsound")}})),Object(d.jsx)("div",{style:{display:"none"},children:Object(d.jsx)("button",{id:"clickplayer",onClick:o,children:n?"Pause":"Play"})})},_e=function(e){var t=Object(a.useState)(e.firstword),n=Object(s.a)(t,2),o=n[0],c=n[1],r=Object(a.useState)(!1),l=Object(s.a)(r,2),u=l[0],j=l[1];return Object(a.useEffect)((function(){i.emit("readyforClock")}),[]),Object(a.useEffect)((function(){return i.on("takeWord",(function(e){j(!1),c(e.word)})),i.on("thatscorrect",(function(){j(!0),setTimeout((function(){i.emit("getNext")}),1e3)})),function(){i.off("takeWord"),i.off("thatscorrect")}})),Object(d.jsxs)("div",{className:C.a.gameContainer,children:[Object(d.jsxs)("div",{className:C.a.topBar,children:[Object(d.jsx)("div",{className:C.a.roundContainer,children:Object(d.jsxs)("h2",{children:["Round ",e.round," / ",e.numRounds]})}),Object(d.jsx)("div",{className:C.a.roundclockContainer,children:Object(d.jsx)(te,{maxTime:e.roundTime})}),Object(d.jsx)("div",{className:C.a.bonusclockContainer,children:Object(d.jsx)(oe,{maxTime:e.bonusTime})}),Object(d.jsx)("div",{className:C.a.wordboxContainer,children:Object(d.jsx)($,{word:o,isDrawing:e.isDrawing,showRight:u})}),Object(d.jsx)("div",{className:C.a.passbuttonContainer,children:Object(d.jsx)(be,{isDrawing:e.isDrawing})}),Object(d.jsx)("div",{className:C.a.scorecardContainer,children:Object(d.jsx)(he,{setRedPoints:e.setRedPoints,setBluePoints:e.setBluePoints,redPoints:e.redPoints,bluePoints:e.bluePoints})})]}),Object(d.jsxs)("div",{className:C.a.middleBar,children:[Object(d.jsx)("div",{className:C.a.playerTagContainer,children:Object(d.jsx)(ve,{teamTags:e.teamTags,oppTags:e.oppTags,teamColor:e.teamColor,oppColor:e.oppColor})}),Object(d.jsxs)("div",{className:C.a.messageContainer,children:[Object(d.jsx)(R,{}),Object(d.jsx)(D,{isDrawing:e.isDrawing})]}),Object(d.jsx)("div",{className:C.a.canvasContainer,children:Object(d.jsx)(K,{isDrawing:e.isDrawing,word:o})}),Object(d.jsx)("div",{className:C.a.attackZoneContainer,children:Object(d.jsx)(de,{maxTime:e.attackTime})})]}),Object(d.jsx)(Ce,{})]})},ye=n(26),ke=n.n(ye),Se=function(e){return Object(a.useEffect)((function(){setTimeout((function(){i.emit("getPreview")}),5e3)}),[]),Object(d.jsxs)("div",{className:ke.a.recapContainer,children:[Object(d.jsxs)("h1",{children:["End of Round ",e.round]}),Object(d.jsxs)("div",{className:ke.a.pointsRecapContainer,children:[Object(d.jsxs)("div",{className:ke.a.totalpointsHolder,children:[Object(d.jsx)("h1",{style:{color:"#ff3b2d"},children:e.redDrawer}),Object(d.jsx)("h1",{style:{color:"#ff3b2d"},children:e.totalRedPoints}),Object(d.jsxs)("h1",{style:{color:"#ff3b2d"},children:["+ ",e.redPoints]}),Object(d.jsx)("h1",{style:{backgroundColor:"#ff3b2d"},children:e.redPoints+e.totalRedPoints})]}),Object(d.jsxs)("div",{className:ke.a.totalpointsHolder,children:[Object(d.jsx)("h1",{style:{color:"#2df1ff"},children:e.blueDrawer}),Object(d.jsx)("h1",{style:{color:"#2df1ff"},children:e.totalBluePoints}),Object(d.jsxs)("h1",{style:{color:"#2df1ff"},children:["+ ",e.bluePoints]}),Object(d.jsx)("h1",{style:{backgroundColor:"#2df1ff"},children:e.bluePoints+e.totalBluePoints})]})]})]})},we=n(27),Ne=n.n(we),Re=function(e){var t=e.totalRedPoints,n=e.totalBluePoints;return Object(a.useEffect)((function(){setTimeout((function(){i.emit("backtoWaitRoom")}),8e3)}),[]),Object(d.jsxs)("div",{className:Ne.a.finalScoreContainer,children:[t>n&&Object(d.jsx)("h1",{style:{color:"#ff3b2d"},children:"RED TEAM WINS!"}),n>t&&Object(d.jsx)("h1",{style:{color:"#2df1ff"},children:"BLUE TEAM WINS!"}),n==t&&Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{children:"It's TIE!"}),Object(d.jsx)("p",{children:"A tie? Seriously?"})]}),Object(d.jsxs)("div",{className:Ne.a.scoresBar,children:[Object(d.jsx)("div",{className:Ne.a.scoreContainer,style:{backgroundColor:"#ff3b2d"},children:Object(d.jsx)("h2",{children:t})}),Object(d.jsx)("div",{className:Ne.a.scoreContainer,style:{backgroundColor:"#2df1ff"},children:Object(d.jsx)("h2",{children:n})})]})]})},Te=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),r=Object(s.a)(c,2),l=r[0],u=r[1],j=Object(a.useState)(""),f=Object(s.a)(j,2),b=f[0],m=f[1],O=Object(a.useState)(0),p=Object(s.a)(O,2),x=p[0],g=p[1],C=Object(a.useState)(""),_=Object(s.a)(C,2),y=_[0],k=_[1],S=Object(a.useState)(""),w=Object(s.a)(S,2),N=w[0],R=w[1],T=Object(a.useState)(""),P=Object(s.a)(T,2),D=P[0],E=P[1],B=Object(a.useState)(""),W=Object(s.a)(B,2),I=W[0],M=W[1],A=Object(a.useState)(!1),G=Object(s.a)(A,2),H=G[0],L=G[1],z=Object(a.useState)(180),U=Object(s.a)(z,2),F=U[0],J=U[1],Y=Object(a.useState)(20),Z=Object(s.a)(Y,2),X=Z[0],Q=Z[1],K=Object(a.useState)(20),V=Object(s.a)(K,2),q=V[0],$=V[1],ee=Object(a.useState)(0),te=Object(s.a)(ee,2),ne=te[0],ae=te[1],oe=Object(a.useState)(0),ce=Object(s.a)(oe,2),re=ce[0],se=ce[1],ie=Object(a.useState)(4),le=Object(s.a)(ie,2),ue=le[0],de=le[1],je=Object(a.useState)(0),fe=Object(s.a)(je,2),be=fe[0],me=fe[1],Oe=Object(a.useState)(0),he=Object(s.a)(Oe,2),pe=he[0],xe=he[1],ve=Object(a.useState)("waiting"),ge=Object(s.a)(ve,2),Ce=ge[0],ye=ge[1],ke=Object(a.useState)(null),we=Object(s.a)(ke,2),Ne=(we[0],we[1],Object(a.useState)(null)),Te=Object(s.a)(Ne,2),Pe=Te[0],De=Te[1],Ee=Object(a.useState)(null),Be=Object(s.a)(Ee,2),We=Be[0],Ie=Be[1];return Object(a.useEffect)((function(){return i.on("previewLaunch",(function(e){ae((function(e){return e+be})),se((function(e){return e+pe})),me(0),xe(0),g(e.payload.round),u(e.payload.reddrawer),m(e.payload.bluedrawer),ye("preview")})),i.on("takeRoundData",(function(e){L(e.payload.isDrawing),k(e.payload.firstword),De(e.payload.teamtags),Ie(e.payload.opptags),E(e.payload.color),M(e.payload.oppcolor),ye("playing")})),i.on("takeRecap",(function(){ye("recap")})),i.on("endGame",(function(){ae((function(e){return e+be})),se((function(e){return e+pe})),me(0),xe(0),ye("endgame")})),i.on("toWaitRoom",(function(){ae(0),se(0),u(0),m(0),ye("waiting")})),function(){i.off("previewLaunch"),i.off("takeRoundData"),i.off("takeRecap"),i.off("endGame"),i.off("toWaitRoom")}})),"waiting"==Ce?Object(d.jsx)("div",{children:Object(d.jsx)(h,{players:n,setPlayers:o,setGamestage:ye,setRedDrawer:u,username:N,setUsername:R,roundTime:F,attackTime:X,bonusTime:q,numRounds:ue,setRoundTime:J,setAttackTime:Q,setBonusTime:$,setNumRounds:de})}):"preview"==Ce?Object(d.jsx)(v,{round:x,redDrawer:l,blueDrawer:b}):"playing"==Ce?Object(d.jsx)(_e,{isDrawing:H,roundTime:F,attackTime:X,bonusTime:q,redPoints:be,bluePoints:pe,setRedPoints:me,setBluePoints:xe,teamTags:Pe,oppTags:We,teamColor:D,oppColor:I,firstword:y,round:x,numRounds:ue}):"recap"==Ce?Object(d.jsx)(Se,{totalRedPoints:ne,totalBluePoints:re,redPoints:be,bluePoints:pe,redDrawer:l,blueDrawer:b,round:x}):"endgame"==Ce?Object(d.jsx)(Re,{totalRedPoints:ne,totalBluePoints:re}):Object(d.jsx)("div",{})};var Pe=function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)(Te,{})})},De=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,63)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),a(e),o(e),c(e),r(e)}))};r.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(Pe,{})}),document.getElementById("root")),De()}],[[62,1,2]]]);
//# sourceMappingURL=main.f093fe78.chunk.js.map