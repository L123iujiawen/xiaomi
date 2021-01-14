$(function(){
    $('.er-ji>li').mouseover(function(){
        $(this)
        .toggleClass('active')
        .siblings()
        .removeClass('active')
        $(this)
        .find('ol')
        .slideToggle()
        .parent()
        .siblings()
        .removeClass('active')
        .find('ol')
        .slideUp()
    })
    })


   
  