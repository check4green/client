// rotate on settings
function showSettingsColapse(a){
    a.classList.toggle("rotate");
  }

  // show text headerHome and rotate arrow
    function  showheaderHomeColapse(){
        var head = document.getElementById('showHeader');
        document.getElementById('arrowRotate').classList.toggle("rotate");
        if(head.style.display == 'initial')
           head.style.display = 'none';
           else
           head.style.display = 'initial';
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

    var element = document.getElementById("header-scroll");   //header

    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
        element.classList.add("header-home-add");  //header
    } else {
        document.getElementById("myBtn").style.display = "none";
        element.classList.remove("header-home-add");  //header
    }
}

// scroll button // When the user clicks on the button, scroll to the top of the document
function buttonFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



// Menu account

function toggle_visibility(id){
    var e = document.getElementById(id);

    if(e.style.display == 'initial')
       e.style.display = 'none';
       else
       e.style.display = 'initial';
}
