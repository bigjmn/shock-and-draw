export function reversify(w){
  return w.split('').reverse().join('')
}
export function hideword(w){

  var regex = /[a-zA-Z]/g
  var newword = w.replace(regex, '_')
  return newword
}
