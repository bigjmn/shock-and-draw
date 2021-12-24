var currentPage;

$('#toggleSlide').on('click', () => {
  $('.optionContainer').hide()
  $('#slideandback').show()
  currentPage = 0
  toPage(currentPage)
})
$('#rightbutton').on('click', () => {
  currentPage++
  toPage(currentPage)
})
$('#leftbutton').on('click', () => {
  currentPage--
  toPage(currentPage)
})
$('.backtomain').on('click', () => {
  $('#slideandback').hide()
  $('.optionContainer').show()
  currentPage = 0
})


const toPage = (n) => {
  if (n < 0 || n > 4){
    return;
  }
  $('.slide').hide()
  $('#slide'+n.toString()).show()
  $('.navbutton').show()
  if (n == 0){
    $('#leftbutton').hide()
  }
  if (n == 3){
    $('#rightbutton').hide()
  }
}
