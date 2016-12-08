$('document').ready(function () {

var menu_tabs = $('ul.tabs')

var header_is_expend = true;
var scroll_is_bottom = false;
var header_is_hide = false;
var expend_pos = 10
var expend_pos_out = 100
var expend_pos_footer = 10
var hide_pos_header = 125
var bottomVelocityValue = 25

var toUp = false
var toBottom = false
var toBottomVelocity = 0

var $window = $('#main');
var $header = $('#header')
var $footer = $('#footer')



var lastScrollTop = $window.scrollTop();
var lastTop = $window.scrollTop();
var scrHeight = $window[0].scrollHeight;
var cliHeight = $window[0].clientHeight;



var search = $('#menu_search')
var searchField = search.children()
var searchInput = $("#search")


var sidebar_btn = $('#hamburger');
var isClosed ;
var body = $('body')




/*  ---------------------------------------------   *\
				SEARCH
\*  ----------------------------------------------   */

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


/*  ---------------------------------------------   *\
				TABS
\*  ----------------------------------------------   */


menu_tabs.tabs()



/*  ---------------------------------------------   *\
				SCROLL
\*  ----------------------------------------------   */
	function checkDirection () {

		toUp = false
		toBottom = false
		if(lastTop > lastScrollTop){
				toUp = true
		}else if(lastTop < lastScrollTop){
				toBottom = true
				toBottomVelocity = lastScrollTop - lastTop
		}


	}
	var scroll = function () {
	
	    if (toBottom && header_is_expend && lastScrollTop > expend_pos) 
	    {
	        $header.removeClass('expend')
	        header_is_expend = false;
	        

	    }
	    if (toUp && !header_is_expend && lastScrollTop < expend_pos_out) 
	    {
	       $header.addClass('expend')
	        header_is_expend = true;
	    }

	    if ( (scrHeight - lastScrollTop < cliHeight + expend_pos_footer ) || 
	    	(scrHeight  <= cliHeight + expend_pos_footer) )
	    {
	        addBottom()
	       

	    }else if(scrHeight - lastScrollTop > cliHeight + expend_pos_footer && scroll_is_bottom)
	    {
	        removeBottom()
	    }
	    if (toBottom && toBottomVelocity > bottomVelocityValue && !header_is_hide && lastScrollTop > hide_pos_header) 
	    {
	        $header.addClass('hide')
	        header_is_hide = true;
	    }
	    if (toUp && header_is_hide) 
	    {
	        $header.removeClass('hide')
	        header_is_hide = false;
	    }


	   


	};
	var raf = window.requestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.msRequestAnimationFrame ||
	    window.oRequestAnimationFrame;


	if (raf) {
	    loop();
	}
	loop()


	
	function loop() {
	    var scrollTop = $window.scrollTop();
	    if (lastScrollTop === scrollTop) {
	        raf(loop);
	        return;
	    } else {
	    	lastTop = lastScrollTop;
	        lastScrollTop = scrollTop;
	        checkDirection()
	        scroll();
	        raf(loop);
	    }
	}

	function addExpend () {
	    $header.addClass('expend')
	    header_is_expend = true;
	}
	function removeExpend () {
	    $header.removeClass('expend')
	    header_is_expend = false;
	}

	function addBottom () {
	    $footer.addClass('footer_expend')
	    scroll_is_bottom = true;
	}
	function removeBottom () {
	    $footer.removeClass('footer_expend')
	    scroll_is_bottom = false;
	}




/*  ---------------------------------------------   *\
			SIDEBAR BURGLAR
\*  ----------------------------------------------   */

	function checkHome () {
	  //ajoute une class sur body pour signaler la page home est agrandir le header
	  if( (window.location.href.indexOf("blog") > -1) || 
	      (window.location.href.indexOf("catalogue") > -1) ||
	      (window.location.href.indexOf("contact") > -1) ){
	    
	  }else{
	     body.addClass('is_at_home')
	  }
	}
	checkHome()

	sidebar_btn.click(function () {
	  burgerSide();
	});

	function burgerSide() {
	  if (isClosed == true) {
	    closeSidebar()
	  } else {
	    openSidebar()
	  }
	}

	function closeSidebar () {

	   body.removeClass('sidebar_is_open')
	    sidebar_btn.removeClass('is-open');
	    sidebar_btn.addClass('is-closed');
	    isClosed = false;
	}
	function openSidebar () {
	  body.addClass('sidebar_is_open')
	    sidebar_btn.removeClass('is-closed');
	    sidebar_btn.addClass('is-open');
	    isClosed = true;
	}

	$('#sidebar_menu').on('click', 'a', function(e) {
	  var ref = e.currentTarget.href

	  $('li.tab a').each(function(index , el) {
	    if(el.href === ref){

	      $(el).trigger('click')
	      sidebar_btn.trigger('click')


	    }
	  });
	  e.preventDefault() 

	});

	var style = false
	var head_color = $('#head-color')
	$('#theme-switcher').on('click', function(e) {
	  body.css("opacity", "0");
	  $('link[rel=stylesheet]').remove();
	  if(style){
	    head_color.attr({content: '#5EB5B2'});
	    $('head').append('<link rel="stylesheet" href="css/app.css">');
	  }else{
	    head_color.attr({content: "teal"});
	    $('head').append('<link rel="stylesheet" href="css/app-theme.css">');
	  }
	  style = !style
	  setTimeout(function  () {
	    body.css("opacity", "1");
	  },50)
	  
	});



	var hammer = new Hammer(document.body);
	hammer.on('swiperight',  openSidebar);
	hammer.on('swipeleft',  closeSidebar);

/*  ---------------------------------------------   *\
				ON CHANGE
\*  ----------------------------------------------   */
	function updateScroll() {
		scrHeight = $window.prop("scrollHeight");
		//lastScrollTop = $window.scrollTop();
		//lastTop = $window.scrollTop();
		cliHeight = $window[0].clientHeight;

	    scroll()
	}

	$( window ).resize(function() {
		updateScroll()

	})

	menu_tabs.on('click', 'a', function() {
		updateScroll()
		
	})
	
	updateScroll()
	
	



/*  ---------------------------------------------   *\

\*  ----------------------------------------------   */




/*  ---------------------------------------------   *\

\*  ----------------------------------------------   */




/*  ---------------------------------------------   *\

\*  ----------------------------------------------   */



});