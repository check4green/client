// rotate on settings
function showSettingsColapse(a){
    a.classList.toggle("rotate");
  }

  // show text headerHome and rotate arrow
    function nowHeaderFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "header-container") {
            x.className += " responsive";
        } else {
            x.className = "header-container";
        }
    }

// scroll button
window.onscroll = function() { buttonScrollFunction()};

function buttonScrollFunction() {

    var element = document.getElementById("myTopnav");
    var logo = document.getElementById("logoC4Gheader");

    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60 & screen.width > 900 ) {
        element.classList.add("header-home-add"),  //header
        logo.classList.add("logo-header-home-add");  //header
    } else {
        element.classList.remove("header-home-add"),  //header
        logo.classList.remove("logo-header-home-add");  //header
    }
}
function buttonFunction() {
    document.body.scrollTop = 0;
}


// function functionColorRound(){
//     document.getElementById("sliderRound").style.background.color = "#23b39f";
// }

function functionColorRound() {
    // Get the checkbox
    var checkBox = document.getElementById("chartChecked");
    // Get the output text
    var text = document.getElementById("sliderRound");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      text.style.background.color = "#23b39f";
    } else {
      text.style.background.color = "#fffff";
    }
  }
// show text HomeHeader
// open/close menu
function openNav() {
    document.getElementById("mySidenav").style.width = "215px";
    document.getElementById("main").style.marginLeft = "215px";
    document.getElementById("bg-gray").style.display = "block";
    document.getElementById("close-menu").style.display = "block";
    document.getElementById("close-menu").style.marginLeft = "214px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("bg-gray").style.display = "none";
    document.getElementById("close-menu").style.display = "none";
    document.getElementById("close-menu").style.marginLeft= "0";
}

// focus input register/settings
function borderInput(){
    document.getElementById("inputPhone").style.border = "2px solid #4e9a06";
    document.getElementById("inputPhone").style.borderRight = "0px";
  }
function borderInputOut(){
    document.getElementById("inputPhone").style.border = "1px solid #a8a7a7";
    document.getElementById("inputPhone").style.borderRight = "0px";
  }

// Menu account
function toggle_visibility_div(id){
    var cs = document.getElementById(id);
    
    if(cs.style.display == 'initial')
    cs.style.display = 'none';
    else
       e.style.display = 'initial';
}
// /Menu account

//gallery
function show_gallery_content_1(){
    document.getElementById("1Img").style.display = "none";
    document.getElementById("2Img").style.display = "initial";
    document.getElementById("3Img").style.display = "none";
    document.getElementById("4Img").style.display = "none";
    document.getElementById("circleG1").style.opacity = "0.6";
    document.getElementById("circleG2").style.opacity = "1.0";
    document.getElementById("circleG3").style.opacity = "0.6";
    document.getElementById("circleG4").style.opacity = "0.6";
}
function show_gallery_content_2(){
    document.getElementById("1Img").style.display = "none";
    document.getElementById("2Img").style.display = "none";
    document.getElementById("3Img").style.display = "initial";
    document.getElementById("4Img").style.display = "none";
    document.getElementById("circleG1").style.opacity = "0.6";
    document.getElementById("circleG2").style.opacity = "0.6";
    document.getElementById("circleG3").style.opacity = "1.0";
    document.getElementById("circleG4").style.opacity = "0.6";
}
function show_gallery_content_3(){
    document.getElementById("1Img").style.display = "none";
    document.getElementById("2Img").style.display = "none";
    document.getElementById("3Img").style.display = "none";
    document.getElementById("4Img").style.display = "initial";
    document.getElementById("circleG1").style.opacity = "0.6";
    document.getElementById("circleG2").style.opacity = "0.6";
    document.getElementById("circleG3").style.opacity = "0.6";
    document.getElementById("circleG4").style.opacity = "1.0";
}
function show_gallery_content_4(){
    document.getElementById("1Img").style.display = "initial";
    document.getElementById("2Img").style.display = "none";
    document.getElementById("3Img").style.display = "none";
    document.getElementById("4Img").style.display = "none";
    document.getElementById("circleG1").style.opacity = "1.0";
    document.getElementById("circleG2").style.opacity = "0.6";
    document.getElementById("circleG3").style.opacity = "0.6";
    document.getElementById("circleG4").style.opacity = "0.6";
}
//circle gallery -->
function show_gallery_content_5(){
    document.getElementById("1Img").style.display = "initial";
    document.getElementById("2Img").style.display = "none";
    document.getElementById("3Img").style.display = "none";
    document.getElementById("4Img").style.display = "none";
    document.getElementById("circleG1").style.opacity = "1.0";
    document.getElementById("circleG2").style.opacity = "0.6";
    document.getElementById("circleG3").style.opacity = "0.6";
    document.getElementById("circleG4").style.opacity = "0.6";
}
function show_gallery_content_6(){
    document.getElementById("1Img").style.display = "none";
    document.getElementById("2Img").style.display = "initial";
    document.getElementById("3Img").style.display = "none";
    document.getElementById("4Img").style.display = "none";
    document.getElementById("circleG1").style.opacity = "0.6";
    document.getElementById("circleG2").style.opacity = "1.0";
    document.getElementById("circleG3").style.opacity = "0.6";
    document.getElementById("circleG4").style.opacity = "0.6";
}
function show_gallery_content_7(){
    document.getElementById("1Img").style.display = "none";
    document.getElementById("2Img").style.display = "none";
    document.getElementById("3Img").style.display = "initial";
    document.getElementById("4Img").style.display = "none";
    document.getElementById("circleG1").style.opacity = "0.6";
    document.getElementById("circleG2").style.opacity = "0.6";
    document.getElementById("circleG3").style.opacity = "1.0";
    document.getElementById("circleG4").style.opacity = "0.6";
}
function show_gallery_content_8(){
    document.getElementById("1Img").style.display = "none";
    document.getElementById("2Img").style.display = "none";
    document.getElementById("3Img").style.display = "none";
    document.getElementById("4Img").style.display = "initial";
    document.getElementById("circleG1").style.opacity = "0.6";
    document.getElementById("circleG2").style.opacity = "0.6";
    document.getElementById("circleG3").style.opacity = "0.6";
    document.getElementById("circleG4").style.opacity = "1.0";
}
//gallery

function toggle_visibility(id){

    var video1 = document.getElementById("video-1"); // Video var
    var video2 = document.getElementById("video-2"); // Video var
    var video4 = document.getElementById("video-4"); // Video var
    var video5 = document.getElementById("video-5"); // Video var
    var video6 = document.getElementById("video-6"); // Video var
    var video7 = document.getElementById("video-7"); // Video var
    var e = document.getElementById(id);

    if(e.style.display == 'initial')
       e.style.display = 'none',
                          video1.pause(), 
                          video2.pause(), // Video pause
                          video4.pause(), // Video pause
                          video5.pause(), // Video pause
                          video6.pause(), // Video pause
                          video7.pause(); // Video pause
       
       else
       e.style.display = 'initial';
}
//Play video on hover 
//1
function hoverToPlay1(){
    var video1 = document.getElementById("video-network"); // Video var
    video1.play();
}
function hoverToPause1(){
    var video1 = document.getElementById("video-network"); // Video var
    video1.load();
}
//2
function hoverToPlay2(){
    var video2 = document.getElementById("video-sH"); // Video var
    video2.play();
}
function hoverToPause2(){
    var video2 = document.getElementById("video-sH"); // Video var
    video2.load();
}
//3
function hoverToPlay3(){
    var video3 = document.getElementById("video-edisS"); // Video var
    video3.play();
}
function hoverToPause3(){
    var video3 = document.getElementById("video-edisS"); // Video var
    video3.load();
}
//4
function hoverToPlay4(){
    var video4 = document.getElementById("video-register"); // Video var
    video4.play();
}
function hoverToPause4(){
    var video4 = document.getElementById("video-register"); // Video var
    video4.load();
}
//5
function hoverToPlay5(){
    var video5 = document.getElementById("video-activeS"); // Video var
    video5.play();
}
function hoverToPause5(){
    var video5 = document.getElementById("video-activeS"); // Video var
    video5.load();
}
//6
function hoverToPlay6(){
    var video6 = document.getElementById("video-chart"); // Video var
    video6.play();
}
function hoverToPause6(){
    var video6 = document.getElementById("video-chart"); // Video var
    video6.load();
}

//Play video on hover 

//Modal gallery

//Connect
function openImgmodalConnect(){
    document.getElementById("galleryModalConnect").style.display = "block";
}
function closeImgmodalConnect(){
    document.getElementById("galleryModalConnect").style.display = "none";
}
//-Connect

//Collect
function openImgmodalCollect(){
    document.getElementById("galleryModalCollect").style.display = "block";
}
function closeImgmodalCollect(){
    document.getElementById("galleryModalCollect").style.display = "none";
}
//-Collect

//Manage
function openImgmodalManage(){
    document.getElementById("galleryModalManage").style.display = "block";
}
function closeImgmodalManage(){
    document.getElementById("galleryModalManage").style.display = "none";
}
//-Manage

//-Modal gallery

// Categories menu 
function colapseCategories1(x) {
    // Get the content collapse 1
    var cont1 = document.getElementById("content1");
    x = document.getElementById("caretMenu1");

    x.classList.toggle("rotateCaret");
    if (cont1.style.display === "block"){
        cont1.style.display = "none";
    } else {
        cont1.style.display = "block";
    }
  }
function colapseCategories2(x) {
    // Get the content collapse 1
    var cont2 = document.getElementById("content2");
    x = document.getElementById("caretMenu2");

    x.classList.toggle("rotateCaret");
    // If the checkbox is checked, display the output text
    if (cont2.style.display === "block"){
        cont2.style.display = "none";
    } else {
        cont2.style.display = "block";
    }
  }
// Categories menu 