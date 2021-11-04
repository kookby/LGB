
//-----------------------------모바일메뉴
$(document).ready(function(){
    if($(window).width() < 641){
        // 모바일용 아코디언 메뉴
        $(".submenu_m").hide();
        // .mSnb를 숨기고 시작
        $(".con_wrap .menu_wrap .title").click(function(){
            $(this).next().slideToggle(300);
            //this 다음 요소를 슬라이드다운
            $(".con_wrap .menu_wrap .title").not(this).next().slideUp(300);
            return false;
            // a href="#"일때 갈곳이 없으면 무조건 페이지 상단(처음)으로 이동하는데
			// 클릭한 다음 링크기능을 수행못하도록 return false;를 입력		
		});    
		$(".con_wrap.etc .menu_wrap").hide();
		$(".con_wrap.etc h2").click(function(){
            $(this).next().slideToggle(300);
            //this 다음 요소를 슬라이드다운
            $(".con_wrap .menu_wrap .title").not(this).next().slideUp(300);
			return false;
		});    			
	}
});


// 스크롤 따라 헤더 색 변경
// $(document).scroll(function(){
//     var scroll = $(window).scrollTop();
//         if (scroll > 750)
//             $( "header" ).addClass( "colorBar" );
//         else if (scroll < 750)
//         $( "header" ).removeClass( "colorBar" );
// });


// 스크롤 따라 헤더 색 변경
var section1 = $(".section1").offset().top;	
$(document).scroll(function(){
    var scroll = $(window).scrollTop();
        if (scroll < section1)
			$( "header" ).removeClass( "colorBar" );	
		else if (scroll > section1)
			$( "header" ).addClass( "colorBar" );
});

// nav 에 마우스오버 시 색깔 변경
// $("nav").mouseover(function(){
//     $( "header" ).addClass( "colorBar" );
//     $( ".menu_overay1" ).addClass( "overay" );
// });
// $("nav").mouseleave(function(){
//     $( "header" ).removeClass( "colorBar" );
// 	$( ".menu_overay1" ).removeClass( "overay" );
// });

//runa
// nav 에 마우스오버 시 헤더색깔 변경
$(document).ready(function(){	
	$("nav").mouseenter(function(){
		$( "header" ).addClass( "colorBar" );
		$( ".menu_overay1" ).addClass( "overay" );
	});
	$("nav").mouseleave(function(){
		$( "header" ).removeClass( "colorBar" );
		$( ".menu_overay1" ).removeClass( "overay" );
	});
});

// 스크롤 따라 헤더 색 변경
// $(document).scroll(function(){
// 	var scroll = $(window).scrollTop();
// 	var section1 = $(".section1").offset().top;	
// 	var navHoverScroll = ($("nav:hover")) && scroll < section1;
	
// 	if(scroll > section1){
// 		$( "header" ).addClass( "colorBar" );
// 	}
// 	else if(navHoverScroll){
// 		$( "header" ).addClass( "colorBar" );
// 	}
// 	else{
// 		$( "header" ).removeClass( "colorBar" );
// 	}
// 	if(scroll < section1 & navHoverScroll ){
// 		$( "header" ).addClass( "colorBar" );
// 	}
// });



// small_menu_all 클릭시 나타내기
$( document ).ready( function(){
	$(".small_menu").click( function(){
		$(".small_menu_all").addClass("show");
    	$( ".menu_overay2" ).addClass( "overay" );		
	});
	$(".x").click( function() {
		$(".small_menu_all").removeClass("show");
		$( ".menu_overay2" ).removeClass( "overay" );
	});
});

//-----------------------------탭메뉴(세로형)
$(document).ready(function(){
    $(".tab .imgmenu li").click(function(){
        $(".tab .imgmenu li").removeClass('on');
        $(".tab .content .conBox").removeClass('on');
        $(this).addClass('on');
		$("#"+$(this).data('id')).addClass('on');
	});
    $(".tab .imgmenu .rental").click(function(){
		$(".tab .imgmenu li").addClass('w_txt');
        $(".tab .imgmenu h1").addClass('w_txt');		
	});	
    $(".tab .imgmenu .li").click(function(){
        $(".tab .imgmenu li").removeClass('w_txt');
        $(".tab .imgmenu h1").removeClass('w_txt');
	});	
});





//----------------------------- section2. Business 슬라이드배너
$(document).ready(function(){
	//슬라이드배너을 감싸고 있는 오브젝트의 이름, 이 오브젝트의 넓이가 슬라이드배너의 넓이가 됨.
	var obj_wrap=$(".section2 .slideBanner");
	//움직일 오브젝트의 이름
	var obj_name = $(".section2 .slideBanner ul");
	//보여질 실제 슬라이드배너을 감싸고 있는 영역
	var obj_child = $(".section2 .slideBanner ul li");
	//현재 보여지는 슬라이드배너에 주어질 클래스명
	var obj_child_active = "active";

	//슬라이드배너 드래그 이동, 사용여부 (true, false)
	var mouse_draging = false;//컴퓨터 마우스 드래그 인식
	var touch_draging = true;//스마트폰 터치 인식

	//슬라이드배너 컨트롤버튼
	var ctrl_btn = true;//사용여부 (true, false)
	var ctrl_next = $(".section2 .next");
	var ctrl_prev = $(".section2 .prev");
	var ctrl_stop = $(".section2 .stop");
	var ctrl_play = $(".section2 .play");

	//현재슬라이드배너 번호 / 전체 슬라이드배너번호
	var numbering = true;//사용여부 (true, false)
	var curr_num = $(".section2 .slideBanner .curr_num");
	var total_num = $(".section2 .slideBanner .total_num");

	//슬라이드배너 리스트
	var paging = true;//사용여부 (true, false)
	var paging_obj = $(".section2 .slideBanner .paging button");
	var paging_curr_class = "active";//현재 선택된 슬라이드배너을 표시할 class명
	var paging_index;

	//자동플레이 여부(true, false)
	var auto_play = true;
	var auto_time = 7000;
	var auto_status;

	//이 아래 변수는 수정 금지
	var obj_position_reset;
	var refreshInvervalId;
	var obj_drag = false;
	var obj_index = 1;
	//슬라이드배너의 갯수 계산
	var obj_length = obj_child.length;
	if(obj_length <= 1){mouse_draging = false; touch_draging = false;}
	//슬라이드배너의 넓이 계산
	var obj_width = obj_child.width();
	var obj_default_width = obj_width;
	if(obj_wrap.width() < obj_width){
		obj_width = obj_wrap.width();
		obj_child.parent().children().width(obj_width);
	}
	var obj_left = (obj_wrap.width() - obj_width)/2;
	var startX = null;
	var prevX = null;
	var currX = null;
	var moveX = null;
	var afterX = null;
	var e = null;

	if(touch_draging == true){
		//모바일에서 터치를 인식
		obj_name.on("touchstart", function(a){
			obj_drag = true;
			e = a.originalEvent;
			currX = e.touches[0].pageX
			startX = e.touches[0].pageX;
			obj_name.on("touchmove", function(b){
				if(obj_drag ==  true){
					e = b.originalEvent;
					prevX = currX;
					currX = e.touches[0].pageX;
					moveX = prevX - currX;
					drag_move(moveX);
				}
			});
		});
		$(document).on("touchend", function(){
			if((obj_drag == true) && (Math.abs(startX) != (Math.abs(currX)))){
				drag_end();
			}
			obj_drag = false;
			obj_name.off("touchmove");
		});
	}
	if(mouse_draging == true){
		//마우스 드래그를 인식
		obj_name.on("mousedown", function(a){
			obj_drag = true;
			currX = a.pageX;
			startX = a.pageX;
			obj_name.on("mousemove", function(b){
				if(obj_drag ==  true){
					prevX = currX;
					currX = b.pageX;
					moveX = prevX - currX;
					drag_move(moveX);
				}
			});
		});
		$(document).on("mouseup", function(){
			if((obj_drag == true) && (Math.abs(startX) != (Math.abs(currX)))){
				drag_end();
			}
			obj_drag = false;
			obj_name.off("mousemove");
		});
	}

	//drag 혹은 touch 시 오브젝트를 움직이는 함수
	function drag_move(moveX){
		$(obj_name).offset({
			left : $(obj_name).offset().left - moveX
		});
		obj_index = parseInt(-($(obj_name).position().left - obj_left) / obj_width);
		index_change(obj_index);
	}

	///drag 혹은 touch가 종료되었을때 실행하는 함수
	function drag_end(){
		if(($(obj_name).position().left) > 0){
			afterX = 0;
		}else if(($(obj_name).position().left) < -((obj_length+1) * obj_width)){
			afterX = (obj_length) * obj_width;
		}else{
			if(moveX > 0){
				afterX = (obj_index+1) * obj_width;
			}else{
				afterX = (obj_index) * obj_width;
			}
		}
		$(obj_name).animate({
			left : -afterX + obj_left
		}, 500, function(){
			obj_index = parseInt(-($(obj_name).position().left - obj_left) / obj_width);
			if(obj_index <= 0){
				obj_index = obj_length;
				$(obj_name).css("left", -(obj_length*obj_width) + obj_left);
			}else if(obj_index > obj_length){
				obj_index = 1;
				$(obj_name).css("left", -obj_width + obj_left);
			}
			index_change(obj_index);
			time_reset();
		});
	}

	//animate로 오브젝트를 움직이는 함수
	function animate_move(go_index){
		if(go_index < 1){
			obj_index = obj_length;
			obj_position_reset = -(obj_width*obj_length);
		}else if(go_index > obj_length){
			obj_index = 1;
			obj_position_reset = -obj_width;
		}else{
			obj_position_reset = "";
			obj_index = go_index;
		}
		
		$(obj_name).animate({
			left : -((go_index) * obj_width) + obj_left
		}, 500, function(){
			if(obj_position_reset != ""){
				$(obj_name).css("left", obj_position_reset + obj_left);
			}
		});

		index_change(obj_index);
	}

	//auto play로 다음 슬라이드배너로 이동하는 함수
	function auto_next(){
		obj_index++;
		animate_move(obj_index);
	}

	//index 변경 시 변경해야 할 것들 (paging, numbering)
	function index_change(index){
		if(numbering == true){
			curr_num.html(index);
		}
		if(paging == true){
			paging_obj.removeClass(paging_curr_class);
			paging_obj.eq(index-1).addClass(paging_curr_class);
		}
		obj_child.removeClass(obj_child_active);
		obj_child.eq(obj_index-1).addClass(obj_child_active);
	}

	function time_reset(){
		if(auto_status == "play"){
			clearInterval(refreshInvervalId);
			refreshInvervalId = setInterval(auto_next, auto_time);
		}
	}
	
	if(ctrl_btn == true){
		ctrl_prev.on("click", function(){
			obj_index--;
			animate_move(obj_index);
			time_reset();
		});
		ctrl_next.on("click", function(){
			auto_next();
			time_reset();
		});
		ctrl_stop.on("click", function(){
			auto_status = "stop";
			clearInterval(refreshInvervalId);
		});
		ctrl_play.on("click", function(){
			auto_status = "play";
			refreshInvervalId = setInterval(auto_next, auto_time);
		});
	}

	//자동실행을 설정하였을 경우
	if(auto_play == true){
		//슬라이드배너의 수가 1개이하면 실행하지 않음
		if(obj_length > 1){
			obj_child.eq(0).clone().appendTo(obj_name);
			obj_child.eq(obj_length-1).clone().prependTo(obj_name);
			refreshInvervalId = setInterval(auto_next, auto_time);
			obj_name.css("left", -obj_width + obj_left);
		}else{
			obj_name.css("left", obj_left);
		}
		obj_child.eq(obj_index-1).addClass(obj_child_active);
		obj_name.width((obj_length+4)*obj_width);
		auto_status = "play";
	}

	//페이지번호를 사용할 경우
	if(numbering == true){
		curr_num.html(obj_index);
		total_num.html(obj_length);
	}

	//paging을 사용할 경우
	if(paging == true){
		paging_obj.removeClass(paging_curr_class);
		paging_obj.eq(obj_index-1).addClass(paging_curr_class);
		paging_obj.on("click", function(){
			//클릭한 paging의 번호 (1번째 paging은 값이 0)
			paging_index = $(this).index();
			//console.log(paging_index);
			//해당 번호 슬라이드배너로 이동..
			animate_move(paging_index+1);
			time_reset();
		});
	}

	//윈도우가 리사이즈되면 슬라이드배너 사이즈 다시 계산
	$(window).resize(function(){
		if(obj_wrap.width() < obj_default_width){
			obj_width = obj_wrap.width();
			obj_child.parent().children().width(obj_width);
		}else{
			obj_width = obj_default_width;
			obj_child.parent().children().width(obj_width);
		}
		obj_left = (obj_wrap.width() - obj_width)/2;
		obj_name.css("left", -(obj_width * obj_index) + obj_left);
		obj_wrap.height(obj_child.height());
		obj_name.width((obj_length+4)*obj_width);
	});
	$(window).load(function(){
		obj_wrap.height(obj_child.height());
	});
});









//-----------------------------section4. News 다중 이미지 캐러셀
$(document).ready(function(){
    //배너 이미지가 모두 로딩된 후에 높이를 계산해야 하므로 $(window).load로 한다.
	
	var window_w = $(window).width();
	var obj_wrap = $(".section4 .banner_wrap"); //높이 제어
	var obj_name = $(".section4 .banner_wrap ul"); // 실제 움직일놈
	var obj_child = $(".section4 .banner_wrap ul li");// 하나의 배너

	//배너 컨트롤버튼
	var ctrl_btn = true;//사용여부 (true, false)
	var ctrl_next = $(".section4 .next");
	var ctrl_prev = $(".section4 .prev");
	var ctrl_stop = $(".section4 .stop");
	var ctrl_play = $(".section4 .play");

	var mobile_size = 640;
	var obj_width = obj_wrap.width();
	var obj_move;//li 하나의 넓이값(margin포함넓이)
	var mobile_view = 1;//스마트폰에서 터치로 넘길경우 반드시 모바일은 1개이어야 함.(여러개해도 하나씩 넘어감)
	var pc_view = 5;
	var obj_oneview;
	var obj_length = obj_child.length;
	var obj_index = 1;
	var obj_moveX;
	var obj_left;//기본 왼쪽으로 이동해야하는 값
	var copy_count;

	//자동플레이 여부(true, false)
	var refreshInvervalId;
	var auto_play = true;
	var auto_time = 6000;
	var obj_drag = false;

	//배너 드래그 이동, 사용여부 (true, false)
	var touch_draging = true;//스마트폰 터치 인식

	
	if(touch_draging == true){
		//모바일에서 터치를 인식
		obj_name.on("touchstart", function(a){
			obj_drag = true;
			e = a.originalEvent;
			currX = e.touches[0].pageX
			startX = e.touches[0].pageX;
			obj_name.on("touchmove", function(b){
				if(obj_drag ==  true){
					e = b.originalEvent;
					prevX = currX;
					currX = e.touches[0].pageX;
					moveX = prevX - currX;
					drag_move(moveX);
				}
			});
		});
		$(document).on("touchend", function(){
			if((obj_drag == true) && (Math.abs(startX) != (Math.abs(currX)))){
				drag_end();
			}
			obj_drag = false;
			obj_name.off("touchmove");
		});
	}
	//drag 혹은 touch 시 오브젝트를 움직이는 함수
	function drag_move(moveX){
		obj_name.offset({
			left : obj_name.offset().left - moveX
		});
	}

	///drag 혹은 touch가 종료되었을때 실행하는 함수
	function drag_end(){
		
		if(moveX > 0){//next
			obj_index++;
		}else{//prev
			obj_index--;
		}

		if(obj_index > obj_length){
			obj_index = obj_length;
		}else if(obj_index<1){
			obj_index = 1;
		}

		obj_moveX = (-(obj_index-1)*obj_move)-obj_left;
		//obj_index로 위치값을 계속 다시 계산하는 이유는 한번 잘못 이동하더라도 다음에 제대로 이동하기 위해서 
		obj_name.animate({
			left : obj_moveX
		}, 300)

	}

	//앞에서 li를 복사해서 뒤로 붙여넣기
	if(pc_view > mobile_view){
		copy_count = pc_view;
	}else{
		copy_count = mobile_view;
	}
	for(var i=0; i<copy_count; i++){
		obj_child.eq(i).clone().appendTo(obj_name);
		obj_child.eq(obj_length-(i+1)).clone().prependTo(obj_name);
	}

	view_count();

	if(ctrl_btn == true){
		ctrl_next.click(function(){
			auto_next();
			time_reset();
		});
		
		ctrl_prev.click(function(){
			obj_index = --obj_index;
			if(obj_index < 0){
				obj_index = (obj_length-1);
				obj_name.css("left", -obj_left-((obj_length-1)*obj_move));
			}
			obj_moveX = (-(obj_index-1)*obj_move)-obj_left;
			obj_name.animate({
				left : obj_moveX
			}, 300);
			time_reset();
		});
		ctrl_stop.click(function(){
			auto_status = "stop";
			clearInterval(refreshInvervalId);
		});
		ctrl_play.click(function(){
			auto_status = "play";
			refreshInvervalId = setInterval(auto_next, auto_time);
		});
	}

	//자동실행을 설정하였을 경우
	if(auto_play == true){
		//배너의 수가 1개이하면 실행하지 않음
		if(obj_length > 1){
			refreshInvervalId = setInterval(auto_next, auto_time);
		}
	}
	
	//윈도우가 리사이즈되면 배너 사이즈 다시 계산
	$(window).resize(function(){
		window_w = $(window).width();
		obj_width = obj_wrap.width();
		view_count();
	});

	$(window).load(function(){
		obj_wrap.height(obj_child.height());
	});
	
	
	function view_count(){
		if(window_w > mobile_size){//pc
			obj_oneview = pc_view;
		}else{//mobile
			obj_oneview = mobile_view;
		}

		obj_child.parent().children().width(obj_width/obj_oneview); //복제가 된 li도 넓이를 제어하기 위해서 이렇게 씀
		obj_move = obj_width/obj_oneview;
		obj_left = obj_move*copy_count;
		obj_wrap.height(obj_child.height()); // 배너의 높이값도 제어 (모바일에서 넓이가 줄면 높이도 줄이기 위해서)
		obj_name.width(((obj_oneview*2)*obj_length)*obj_move+100);//ul의 넓이 제어 (li가 아래로 안떨어지게)
		obj_name.css("left", (-(obj_index-1)*obj_move)-obj_left);
	}

	function auto_next(){
		obj_index = ++obj_index;
		//console.log(obj_index);
		if(obj_index > obj_length){ //더이상 복제한 배너이 없을때 
			obj_index = 1;
			obj_name.css("left", -obj_left+obj_move);
		}
		
		obj_moveX = (-(obj_index-1)*obj_move)-obj_left;
		//obj_index로 위치값을 계속 다시 계산하는 이유는 한번 잘못 이동하더라도 다음에 제대로 이동하기 위해서 
		obj_name.animate({
			left : obj_moveX
		}, 300);
	}

	function time_reset(){
		if(auto_status == "play"){
			clearInterval(refreshInvervalId);
			refreshInvervalId = setInterval(auto_next, auto_time);
		}
	}
});

