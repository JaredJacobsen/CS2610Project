$(document).ready(function(){
  $('.submit').click(function(e){
    e.preventDefault();
    e.stopPropagation();

    var searchQuery = $('.infoName').val();

    /*Is verifying the Name field on the Profile Page*/
    if(searchQuery === ''){
      $('.infoName').addClass('error');
    }else if(!isNaN(searchQuery)){ /*Checks to make sure its not a number*/
      $('.infoName').addClass('error');
    }else{
      $('.infoName').removeClass('error');
    }

  });

});
