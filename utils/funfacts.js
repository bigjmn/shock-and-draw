const funfacts = ['The "Did You KNOW" catchphrase is public domain, probably.',
'Johnny Fat-Hands was once suspected of arson',
'The machine code for Shock and Draw consists entirely of ones!',
'The "Peeping Tom" attack was super annoying to code.',
'Shock and Draw\'s original name (Mario Galaxy 2) was changed for legal reasons',
]
module.exports = function(){
  let fact = funfacts[Math.floor(Math.random()*funfacts.length)]
  return fact
}
