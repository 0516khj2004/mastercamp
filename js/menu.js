// 문서의 로드가 완료되면 함수 실행
$(document).ready(function () {
    // 뷰포트 사이즈를 최대 999px 설정하여 변수에 해당 값을 할당
    var viewport = window.matchMedia('(max-width:999px)');
    // resize 이벤트 발생 시 새로고침 실행
    $(window).resize(function(){
      location.reload();
    });
      // if 조건문으로 viewport가 모바일인지 확인 - 최대 999px일 때
      if(viewport.matches){
        // 필요한 객체를 찾아 변수에 선언
        var nav = $('.navigation');
        var btn = $('.btn-menubar');
        var menu = $('.menu');
        var menuLists = $('.menu-list');
        var menuItems = $('.menu-item');
        var subMenus = $('.sub-menu');
        var slogan = $('.slogan-heading');
  
        // 선언된 변수에 속성 및 클래스 할당
        menuItems.attr('aria-haspopup', 'true');
        menuItems.attr('aria-expanded', 'false');
        menuItems.attr('role', 'button');
        menuItems.attr('tabindex', '0');
        menuItems.addClass('icon-plus');
        slogan.addClass('a11y-hidden');
  
        //메인메뉴 제어버튼 클릭 시 메인메뉴가 보여지도록 클래스 토글
        btn.on('click', function(e) {
          // 혹시 a 요소를 사용했을 때를 대비하여 a 요소의 기본 이벤트 취소
          e.preventDefault();
          nav.toggleClass('is-act');
          if (nav.hasClass('is-act')) {
            btn.attr('aria-label', '메인 메뉴 닫기');
          } else {
            btn.attr('aria-label', '메인 메뉴 열기');
          }
        });
  
        // 메인메뉴의 .menu-item 클릭 또는 엔터키를 눌렀을 때 실행할 함수
        menuItems.on('click keydown',function(e){
          if(e.type === 'click' || (e.type === 'keydown' && e.keyCode === 13)){
            // 형제 요소인 li의 자식 요소인 .menu-item에 icon-minus 클래스와 menu-item-act를 제거하고 icon-plus 클래스를 추가했음.
            // 형제 요소인 li의 자식 요소인 .menu-item에 aria-expanded 속성 값을 false로 설정.
            $(this).parent().siblings().find(menuItems).removeClass('icon-minus menu-item-act').addClass('icon-plus');
            $(this).parent().siblings().find(menuItems).attr('aria-expanded', 'false');
            // 이벤트가 발생한 .menu-item에 .menu-item-act이 토글 되도록 설정함.
            // 이렇게 지정할 경우 .menu-item을 한번 클릭하면 menu-item-act 클래스가 추가되고
            // 한번 더 클릭하면 menu-item-act 클래스가 제거됨.
            $(this).toggleClass('menu-item-act');
            // .menu-item 요소에 .menu-item-act 클래스를 존재하는 경우
            // aria-expanded 속성을 동적으로 변경시키고 
            // 웹폰트 아이콘도 icon-plus에서 icon-minus로 수정함. 
            if($(this).hasClass('menu-item-act')){
              $(this).attr('aria-expanded', 'true');
              $(this).removeClass('icon-plus').addClass('icon-minus');
            }else{
              $(this).attr('aria-expanded', 'false');
              $(this).removeClass('icon-minus').addClass('icon-plus');
            }
          }      
        });
  
        // 키보드 초점이 메인메뉴 영역 안에 있을 경우 .is-act를 nav 요소에 추가하고 
        // 키보드 초점이 메인메뉴 영역을 벗어날 경우 .is-act를 nav 요소에서 제거한다.
        menu.on('focusout', function(){
            nav.removeClass('is-act');
        });
        menu.on('focusin', function(){
            nav.addClass('is-act');
        });
      }
    });  
  