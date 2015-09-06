//addLoadEvent function
function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload !== 'function') {
		window.onload = func;
	}else {
		window.onload = function() {
			oldonload();
			func();
		};
	};
}



//menu checked
// ;(function itemChecked(){
// 	var oUl = document.getElementById('asidemenu');
// 	var oLi = oUl.getElementsByTagName('li');
	
// 	for(var i = 0, len = oLi.length; i < len; i ++){
// 		oLi[i].index = i;
// 		oLi[i].onclick = function() {
// 			for(var n = 0, m = oLi.length; n < m; n ++) {
// 				oLi[n].className = '';
// 			};
// 			oLi[this.index].className = 'active';
// 		}
		
// 	}
// })()


function asideHeight(){
	var aSideMenu = document.getElementsByClassName('asidemenu')[0];
	aSideMenu.style.height = document.documentElement.clientHeight - 120 + "px";
}
function mainHeight() {
	var oMain = document.getElementsByClassName('main')[0];
	oMain.style.height = document.documentElement.clientHeight - 160 + "px";
}
addLoadEvent(asideHeight)
addLoadEvent(mainHeight)

//折叠菜单

$(document).ready(function() {
	$("#asidemenu .menu_body:eq(0)").show();
	$("#asidemenu p.menu_head").click(function() {
		$(this).addClass("current")
		.next("section.menu_body")
		.slideToggle(300)
		.siblings("section.menu_body")
		.slideUp("slow");
		$(this).siblings().removeClass("current");
	});
	$("#asidemenu section.menu_body>a").click(function() {
		$(this).addClass("acurrent");
		$(this).siblings().removeClass("acurrent");
	});
})

function ShowElement(element) {
	var oldhtml = element.innerHTML;
	var newobj = document.createElement('input');
	newobj.type = 'text';
	newobj.style.width= 70;
	newobj.onblur = function() {
		element.innerHTML = this.value ? this.value : oldhtml;
	};
	element.innerHTML = '';
	newobj.focus();
};







