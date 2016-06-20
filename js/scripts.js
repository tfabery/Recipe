$('form').submit(function(event){
  event.preventDefault();

  var nameInput = $("input#name").val();
  var q1 = parseInt($("#cost").val());
  var q2 = parseInt($("#safety").val());
  var q3 = parseInt($("#food").val());
  var q4 = parseInt($("#activities").val());
  var q5 = $("input:radio[name=passport]:checked").val();
  var result = q1 + q2 + q3 + q4;

  if (result >= -8 && result <= -4){
    $("img").hide();
    $(".destination").text("Brazil");
    $(".name").text(nameInput);
    $("#results").fadeIn();
    $(".location").text("Brazil!");
    $("#brazil").fadeIn();
  } else if (result > -4 && result < 0){
    $("img").hide();
    $(".destination").text("Austria");
    $(".name").text(nameInput);
    $("#results").fadeIn();
    $(".location").text("Austria!");
    $("#austria").fadeIn();
  } else if (result === 0){
    $("img").hide();
    $(".destination").text("Paris");
    $(".name").text(nameInput);
    $("#results").fadeIn();
    $(".location").text("Paris!");
    $("#paris").fadeIn();
  } else if (result >0 && result <= 4){
    $("img").hide();
    $(".destination").text("Barcelona");
    $(".name").text(nameInput);
    $("#results").fadeIn();
    $(".location").text("Barcelona!");
    $("#barcelona").fadeIn();
  } else if (result >4 && result <= 8) {
    $("img").hide();
    $(".destination").text("Tokyo");
    $(".name").text(nameInput);
    $("#results").fadeIn();
    $(".location").text("Tokyo!");
    $("#tokyo").fadeIn();
  } else {};
  $('#myModal6').modal('hide');
      return false;
});
