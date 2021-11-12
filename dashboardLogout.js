var cookieName

var config = {
    apiKey: "AIzaSyC5Wp39Cz2-E4ui5P7Jtl55j2Y3gemm4MU",
    authDomain: "zila-android-activities.firebaseapp.com",
    databaseURL: "https://zila-android-activities.firebaseio.com",
    storageBucket: "zila-android-activities.appspot.com"
};
firebase.initializeApp(config);

checkCookie();

function checkCookie() {
    var c_name = "zilaName"
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }

    if (!c_value) {
        location.href = "login.html"
    } else {
        cookieName = c_value
    }
}

var username = sessionStorage.getItem("name");
// document.getElementById("userName").innerHTML = username;

function userLogout()
{
    console.log('ss')
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        alert("Error")
    });
    sessionStorage.clear();
    localStorage.clear();
    var numExpiryDays = 0;
    var d = new Date();
    d.setTime(d.getTime() + (numExpiryDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "zilaName=" + cookieName + ";" + expires + ";path=/";

    location.href = "login";
    function preventBack() {
        window.history.forward();
    }
    setTimeout("preventBack()", 0);
    window.onunload = function () {
        null
    };
}
