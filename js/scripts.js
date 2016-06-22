//==============================BackEnd==================================
var apiKey = '6f1739ee3b';

function callOtherDomain(name){
  var url = 'http://www.supermarketapi.com/api.asmx/COMMERCIAL_SearchByProductName?APIKEY=6f1739ee3b&ItemName=' + name;
  var request = new XMLHttpRequest();
  if(request) {
    request.open('GET', url, false);
    request.send();
    var xml = request.responseXML;
    var prices = xml.getElementsByTagName("Pricing");
    var priceArray = [];
    for (var i = 0; i < prices.length; i ++) {
      var price = prices[i].childNodes[0].nodeValue;
      priceArray.push(price);
      // alert(price);
    }
    priceArray.sort(function(a, b) {return a-b});
    return parseFloat(priceArray[0]).toFixed(2);
  }
}

function addPopover(span){
  var ingredient = $(span).text();
  var itemName = ingredient[0].toUpperCase() + ingredient.substring(1);
  // $(span).tooltip();
  $(span).attr('data-toggle', 'popover');
  $(span).attr('data-placement', 'top');
  $(span).attr('data-content', "Price: " + '$' + callOtherDomain(itemName));
  $(span).attr('title', itemName);
  $(span).popover();
}
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
    addPopover('span.ingredient');
  });
});
