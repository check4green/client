// scroll img moto
window.onscroll = function() {scrollFunction()};

function scrollFunction() {

    var afterHead = document.getElementById('headerImg').clientHeight;

  if (document.body.scrollTop > afterHead || document.documentElement.scrollTop > afterHead) {
    navbar.classList.add("sticky")
    document.getElementById("marginTopView").style.marginTop = "70px";
} else {
    navbar.classList.remove("sticky");
    document.getElementById("marginTopView").style.marginTop = "15px";
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
