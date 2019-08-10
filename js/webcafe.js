let viewport = window.matchMedia('(max-width:999px)');
$(window).resize(function(){
  location.reload();
});
if(viewport.matches){
let nav = $('.navigation');
let btn = $('.btn-menubar');
let menuItems = $('.menu-item');
let menuLists = $('.menu-list');
let menuMenus = $('.sub-menu');


//btn변수 click이벤트가 발생했을때
// nav 요소에 is-act 클래스를 추가 
btn.click(function(){
  nav.toggleClass('is-act');
  if(nav.hasClass('is-act')){
      btn.attr('aria-lable', '메뉴 닫기');
      btn.attr('title', '메뉴 닫기');
  }else{
    btn.attr('aria-lable', '메뉴 열기');
    btn.attr('title', '메뉴 열기');
  }
});
//메뉴아이템 클래스에 icon-plus 클래스 추가하기
menuItems.addClass('icon-plus');
menuItems.attr('aria-haspopup', 'true');
menuItems.attr('aria-expanded', 'false');
menuItems.attr('role', 'button');
menuItems.attr('tabindex', '0');

menuItems.on('click keyup', function(e){
  if(e.type === 'click' || e.keyCode === 13){
    menuLists.removeClass('menu-act');
    $(this).parent().addClass('menu-act');
    menuItems.removeClass('icon-minus').addClass('icon-plus');
    menuItems.attr('aria-expanded', 'false');
    $(this).removeClass('icon-plus').addClass('icon-minus');
    $(this).attr('aria-expanded', 'true');
  }
  
});

}
