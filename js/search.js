(function ($) {

  var search = $('.menu_search');
  var searchField = $('.search');
  var searchInput = $("input[type='search']");
  


  var checkSearch = function(){
      var contents = searchInput.val();
      if(contents.length !== 0){
         searchField.addClass('full');
      } else {
         searchField.removeClass('full');
      }
  };

  $("input[type='search']").focus(function(){
      searchField.addClass('isActive');
      search.addClass('is_active');
    }).blur(function(){
    	searchField.removeClass('isActive');
      search.removeClass('is_active');
      checkSearch();
  });



}( jQuery ));