import fathandsicon from '../../attackicons/fathandsicon.png'
import cursorsicon from '../../attackicons/cursorsicon.png'
import fiftyshadesicon from '../../attackicons/fiftyshadesicon.png'
import reverseicon from '../../attackicons/reverseicon.png'
import classifiedicon from '../../attackicons/classifiedicon.png'
import peepingtomicon from '../../attackicons/peepingtomicon.png'
import fadinfrankicon from '../../attackicons/fadinfrankicon.png'

var fatcard = {
  title: "Johnny Fat-Hands",
  explainer: "Drawer can only use the thickest brush",
  flavor: "Please, Mr. Fat-Hands is my father. Call me Johnny!",
  icon: fathandsicon
}
var hidecard = {
  title: "Cursors! Foiled again!",
  explainer: "Drawer's cursor is hidden",
  flavor: "I cried because I had no shoes, until I met a man who had no mouse.",
  icon: cursorsicon
}
var nocolorcard = {
  title: '50 Shades of Gray',
  explainer: "Drawer can't use colors",
  flavor: "Starring Dakota Johnson. That movie was beneath her talents.",
  icon: fiftyshadesicon
}
var reversecard = {
  title: 'esreveR',
  explainer: 'Guesses get submitted backwards.',
  flavor: "Who knows, the word might be 'racecar!'",
  icon: reverseicon
}
var classifiedcard = {
  title: 'Classified',
  explainer: "Team members can't see the guesses",
  flavor: "Please, REDACTED is my father. Call me REDACTED",
  icon: classifiedicon
}
var peepcard = {
  title: 'Peeping Tom',
  explainer: 'Click and drag to get a window into the canvas',
  flavor: 'Honestly this is pretty creepy, even for you...',
  icon: peepingtomicon
}
var canfade = {
  title: "Fadin' Frank",
  explainer: "Drawing slowly fades",
  flavor: "Faders gonna fade",
  icon: fadinfrankicon
}

const attacklist = [fatcard, hidecard, nocolorcard, reversecard, classifiedcard, peepcard, canfade]
export default attacklist
