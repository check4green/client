// scroll img moto
window.onscroll = function() {scrollFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function scrollFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
// show arrow on navbar

function showNavText(x) {
    x.classList.toggle("fa-caret-up");
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

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
