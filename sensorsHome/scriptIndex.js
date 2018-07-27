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
// show arrow on settings
function showSettingsColapse(a){
    a.classList.toggle("rotate");
    var a = document.getElementById("showHeader");
    if (a.className === "header-home-right"){
        a.className += "button-header-responsive";
      } else {
        a.className = "header-home-right";
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
window.onscroll = function() {buttonScrollFunction()};

function buttonScrollFunction() {

// When the user scrolls the page, execute myFunction 

    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// scroll button // When the user clicks on the button, scroll to the top of the document
function buttonFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Modal
// var modal = document.getElementById('modalContent');
// var btn = document.getElementById("openVideo");
// var span = document.getElementsByClassName("close")[0];

// btn.onclick = function openModal() {
//     modal.style.display = "block";
// }

// span.onclick = function openModal() {
//     modal.style.display = "none";
// }

// window.onclick = function openModal(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
 function openModal(){
    document.getElementById("modalContent").style.display = "block";
 }
 function closeModal(){
    document.getElementById("modalContent").style.display = "none";
 }