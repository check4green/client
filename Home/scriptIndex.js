// rotate on settings
function showSettingsColapse(a){
    a.classList.toggle("rotate");
  }

  // show text headerHome and rotate arrow
    function nowHeaderFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "header-container header-home-add") {
            x.className += " responsive";
        } else {
            x.className = "header-container header-home-add";
        }
    }

// show text HomeHeader
// open/close menu
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("bg-gray").style.display = "block";
    document.getElementById("close-menu").style.display = "block";
    document.getElementById("close-menu").style.marginLeft = "249px";
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

// scroll button
window.onscroll = function() { buttonScrollFunction()};

function buttonScrollFunction() {

// When the user scrolls the page, execute myFunction 

    var element = document.getElementById("myTopnav");
    var logo = document.getElementById("logoC4Gheader");
    // var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    // var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // var scrolled = (winScroll / height) * 100;
    // document.getElementById("myBar").style.width = scrolled + "%";

    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        element.classList.add("header-home-add");  //header
        logo.classList.add("logo-header-home-add");  //header
    } else {
        element.classList.remove("header-home-add");  //header
        logo.classList.remove("logo-header-home-add");  //header
    }
}

// scroll button // When the user clicks on the button, scroll to the top of the document
function buttonFunction() {
    document.body.scrollTop = 0;
    //document.documentElement.scrollTop = 0;
}



// Menu account

function toggle_visibility(id){

    var video1 = document.getElementById("video-1"); // Video var
    var video2 = document.getElementById("video-2"); // Video var
//  var video3 = document.getElementById("video-3"); // Video var
    var video4 = document.getElementById("video-4"); // Video var
    var video5 = document.getElementById("video-5"); // Video var
    var video6 = document.getElementById("video-6"); // Video var
    var video7 = document.getElementById("video-7"); // Video var
//    var video8 = document.getElementById("video-8"); // Video var
    var e = document.getElementById(id);

    if(e.style.display == 'initial')
       e.style.display = 'none',
                          video1.pause(), 
                          video2.pause(), // Video pause
//                        video3.pause(), // Video pause
                          video4.pause(), // Video pause
                          video5.pause(), // Video pause
                          video6.pause(), // Video pause
                          video7.pause(); // Video pause
//                          video8.pause(); // Video pause
       
       else
       e.style.display = 'initial';
}
