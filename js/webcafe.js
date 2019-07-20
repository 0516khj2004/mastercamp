// 문서의 로드가 완료되면 함수 실행
$(document).ready(function () {
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      $('.container')
        .toggleClass('container-act');
      $('.grid')
        .toggleClass('grid-act')
    }
  });
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
      menuItems.on('click keydown', function(e) {
        if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 13)) {
          // 모든 .menu-list 요소에 menu-act 클래스 제거
          menuLists.removeClass('menu-act');
          // 모든 .menu-item 요소에 aria-expanded 속성 값으로 false 값
          menuItems.attr('aria-expanded', 'false');
          // 모든 .menu-item 요소에 icon-plus 클래스 추가
          menuItems.addClass('icon-plus');
          // 이벤트가 발생한 .menu-item 요소의 부모인 .menu-list 요소에 menu-act 클래스 추가
          $(this).parent().addClass('menu-act');
          // 이벤트가 발생한 .menu-item 요소의 부모인 .menu-list 요소가 .menu-act 클래스를 가졌을 경우
          if ($(this).parent().hasClass('menu-act')) {
            // 이벤트가 발생한 .menu-item 요소에 aria-expanded 속성 값을 true로 할당
            $(this).attr('aria-expanded', 'true');
            // 이벤트가 발생한 .menu-item 요소에 icon-minus 클래스 추가 후 icon-plus 클래스 제거
            $(this).addClass('icon-minus').removeClass('icon-plus');
          }
        }
      });

      // 키보드 초점이 메인메뉴 영역 안에 있을 경우 .is-act를 nav 요소에 추가 
      menu.on('focusin', function(){
        nav.addClass('is-act');
      });
      // 키보드 초점이 메인메뉴 영역을 벗어날 경우 .is-act를 nav 요소에서 제거
      menu.on('focusout', function(){
          nav.removeClass('is-act');
      });
    }
  });  
