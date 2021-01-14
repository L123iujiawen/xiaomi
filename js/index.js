
$(function () {

    const nickname = getCookie('nickname')
  
    if (nickname) {
      $('.off').addClass('active')
      $('.on').text(`欢迎您 : ${ nickname }`).removeClass('active')
    } else {
      $('.off').removeClass('active')
      $('.on').addClass('active')
    }
  
  })