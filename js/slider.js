jQuery(document).ready(function(){

	var sliderWidth = 600;
	var slideWrap = $("#slide");
	var a = (- sliderWidth);
	var animationSpd = 500;
	var slidesAmount = $(".thumbs li:last").index()+1;
	var i;
	
	
	function addActiveClass (i) {
		$('ul.thumbs li.active').removeClass("active");
		$("ul.thumbs li").eq(i).addClass("active");
	}
	
	$("#bigSlideNext").click(function() { //next image
		if(!slideWrap.is(':animated')) {
			$("#slide").animate({"left":a},animationSpd,function(){
				slideWrap
					.find('.item:first')
					.appendTo(slideWrap)
					.parent()
					.css({'left': 0});
			});
		}
		
		var i = $(".item:first").data("num");
		if (i == slidesAmount){i=0;};
		$('ul.thumbs li.active').removeClass("active");
		$("ul.thumbs li").eq(i).addClass("active");
	});
	
	
	
	$("#bigSlidePrev").click(function() { //previous image
		if(!slideWrap.is(':animated')) {
			slideWrap
					.css({'left': a})
					.find('.item:last')
					.prependTo(slideWrap)
					.parent()
					.animate({left: 0}, animationSpd);
		}
		
		$('ul.thumbs li.active').removeClass("active");
		$("ul.thumbs li").eq($(".item:first").data("num")-1).addClass("active");
	});
	
	
	$('ul.thumbs').on('click', 'li', function() { //show image if thumbnail clicked
		if(!slideWrap.is(':animated')){
		
			$('ul.thumbs li.active').removeClass("active");
			$(this).addClass("active");
			
			var i = $( this ).index() + 1;
			var bigSlide = $('#slide').children('[data-num="'+i+'"]');
			var bigSlidePosition = bigSlide.position().left;
			
			slideWrap.animate({'opacity': 0.4},250);
			$("#slide").animate({"left":-bigSlidePosition},0,function(){
				for(var j = 0;j<(bigSlidePosition/sliderWidth);j++){
					slideWrap
						.find('.item:first')
						.appendTo(slideWrap)
						.parent()
						.css({'left': 0});
				}
			});
			slideWrap.animate({'opacity': 1},250);
		};
	});

	var thumbWidth = $("ul.thumbs li img").width()+parseInt($("ul.thumbs li").css("margin-left"));
	var thumbPosition = $(".thumbs").position().left;
	
	$('body').on('click', '#thumbsNext', function() { //next 5 thumbnails
		$("#thumbsPrev").css({"display":"inline"});
		
		if($(".thumbs").position().left == -($("ul.thumbs li").eq(slidesAmount-6).position().left)){
			$(this).css({"display":"none"});
		}
		
		thumbPosition = $(".thumbs").position().left;
		var leftStep = thumbPosition-thumbWidth;
		
		if(!$(".thumbs").is(':animated')) {
			$(".thumbs").animate({"left":leftStep},animationSpd-200);
		}
		
	});
	
	
	$('body').on('click', '#thumbsPrev', function() { //previous 5 thumbnails
		$("#thumbsNext").css({"display":"inline"});
		
		thumbPosition = $(".thumbs").position().left;
		var leftStep = thumbPosition+thumbWidth;
		
		if(!$(".thumbs").is(':animated')) {
			$(".thumbs").animate({"left":leftStep},animationSpd-200);
		}
		
		if(leftStep == 0){
			$(this).css({"display":"none"});
		}
	});

	 $('body').on("click", "#slide li img", function () { //show lightBox if image clicked
        if ($(this).attr("src") != "") {
			i = $(this).parent().data("num");
            $("#bigImg").attr("src", $(this).attr("src"));
            $("#lightBox").show().fadeTo(200, 1);
        }
    });

	$(document).on("click", "#closeLightBox", function () { //hide lightBox 
        $("#lightBox").stop(true).fadeTo(200, 0, function () {
            $("#lightBox").hide();
        });
    });
	
	function changeSource(i) {
		var imgSrc = $('#slide [data-num="'+i+'"] img');
		$("#bigImg").attr("src", imgSrc.attr("src"));
	}
	
	$(document).on("click", "#nextImg", function () {
		if(i != slidesAmount){
			i++;
			changeSource(i);
		}
	});
	
	$(document).on("click", "#prevImg", function () {
		if(i != 1) {
			i--;
			changeSource(i);
		}
	});
});