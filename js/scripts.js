/*!
* Start Bootstrap - Landing Page v6.0.4 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function checkPasswordMatch(){
    var pswd = document.getElementById('RegisterInputPassword')
    var pswdCheck = document.getElementById('RegisterInputPasswordConfirm')
    pswdCheck.setCustomValidity(pswdCheck.value != pswd.value ? "Hasła muszą się zgadzać" : '')
}


function logout(){
    console.log("[DEBUG] logout(): remove cookie login")
    sessionStorage.setItem("showLogoutToast", "1");
    Cookies.remove("login")
}

function remove_account(){
    sessionStorage.setItem("showLogoutToast", "0");
    Cookies.remove("login")
}


function login(){
    console.log("[DEBUG] login(): set cookie login=true")
    sessionStorage.setItem("showLoginToast", "1");
    Cookies.set('login', 'true');
}


function setNavbar(){
    if (Cookies.get('login') === "true"){
        $("#login-opt").hide();
        $("#register-opt").hide();
        $("#logout-opt").show();
        $("#account-opt").show();
    } else {
        $("#login-opt").show();
        $("#register-opt").show();
        $("#logout-opt").hide();
        $("#account-opt").hide();
    }
}
