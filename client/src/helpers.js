export function reversify(w){
  return w.split('').reverse().join('')
}
export function hideword(w){

  var regex = /[a-zA-Z]/g
  var newword = w.replace(regex, '_')
  return newword
}

export function debounce(func, delay){
      let timer;
      return function () {     //anonymous function
        const context = this;
	const args = arguments;
	clearTimeout(timer);
	timer = setTimeout(()=> {
	    func.apply(context, args)
	},delay);
       }
}
