//==============================BackEnd==================================
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
};

function addPopover(span){
  $(span).each(function() {
    var ingredient = $(this).text();
    var itemName = ingredient[0].toUpperCase() + ingredient.substring(1);
    var price = callOtherDomain(itemName)
    if (isNaN(price) || price === '0.00') {
      $(this).attr('class', 'noData');
    }
    else {
      $(this).attr('data-toggle', 'popover');
      $(this).attr('data-trigger', 'hover');
      $(this).attr('data-placement', 'top');
      $(this).attr('data-content', "Price: " + '$' + price);
      $(this).attr('title', itemName);
      $(this).popover();
    }
  });
};

function Favorite(name, type) {
  this.name = name;
  this.type = type;
};

Favorite.prototype.addFavorite = function () {
  var html = this.name.toLowerCase().split(' ').join('-');
  $(".favorites ul").append("<li><a href=" + html + ".html target='_blank'>" + this.name + "(" + this.type + ")"+ "</a></li>");
};
//==============================FrontEnd=================================
$(function() {
  var myFavorite = new Favorite();
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
    $('.recipeBanner').attr('id', (cuisine + 'Background')).toggle();
    $('#recipeCards').toggle();
    $('#landingPage').toggle();
    $('.col-md-4:not(.' + cuisine + '.' + temperature + ')').toggle();
    $('.ad').toggle();
    addPopover(('.' + cuisine + '.' + temperature) + ' span.ingredient');
  });

  $('button.fav').click(function () {
    var name = $(this).parent().parent().parent().siblings('.title').find('h4').text();
    var type = $(this).parent().parent().parent().siblings('.title').find('h6').text();
    var recipe = new Favorite(name, type);
    recipe.addFavorite();
  });

  $('img.logo-rec-page').click(function () {
    var cuisine = $("#cuisine").val().toLowerCase();
    var temperature = $("#temperature").val().toLowerCase();
    $('.recipeBanner').toggle();
    $('#recipeCards').toggle();
    $('#landingPage').toggle();
    $('.col-md-4:not(.' + cuisine + '.' + temperature + ')').toggle();
    $('.ad').toggle();
    $('form').trigger('reset');
  });
});

// $('img#home').click(function () {
//   $('.recipeBanner').hide();
//   $('#recipeCards').hide();
//   $('#landingPage').show();
// });
