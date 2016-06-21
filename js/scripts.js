//==============================BackEnd==================================






//==============================FrontEnd=================================

$(function() {
  var $item = $('.carousel .carousel-item');
  var $wHeight = $(window).height();

  $item.height($wHeight);
  $item.addClass('full-screen');

  $('.carousel img').each(function() {
    var $src = $(this).attr('src');
    var $color = $(this).attr('data-color');
    $(this).parent().css({
      'background-image' : 'url(' + $src + ')',
      'background-color' : $color
    });
    $(this).remove();
  });

  $(window).on('resize', function (){
    $wHeight = $(window).height();
    $item.height($wHeight);
  });

  $('.carousel').carousel({
    interval: 300 * 10
  });

  $('button#surveySubmit').click(function () {
    var cuisine = $("#cuisine").val();
    var temperature = $("#temperature").val();
    $('li#selectionOne').text(cuisine);
    $('li#selectionTwo').text(temperature);
  });

  $('button#showRecipes').click(function () {
    var cuisine = $("#cuisine").val().toLowerCase();
    var temperature = $("#temperature").val().toLowerCase();
    $('.recipeBanner').attr('id', (cuisine + 'Background')).show();
    $('#recipeCards').show();
    $('#landingPage').hide();
    $('.col-md-4:not(.' + cuisine + '.' + temperature + ')').hide();
    $('.ad').show();
  });

});
