var signUp = localStorage.getItem("signUp");
var addAddress = localStorage.getItem("addAddress");

console.log("addAddress",addAddress);
console.log("signUp",signUp);

var config = {
    apiKey: "AIzaSyC5Wp39Cz2-E4ui5P7Jtl55j2Y3gemm4MU",
    authDomain: "zila-android-activities.firebaseapp.com",
    databaseURL: "https://zila-android-activities.firebaseio.com",
    storageBucket: "zila-android-activities.appspot.com"
};
firebase.initializeApp(config);
console.log("ccdd");
function firebaseVerification() {
    // event.preventDefault();

    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, pass).then(function (user) {
        // console.log("okay");


    })
            .then(function () {
                var user = firebase.auth().currentUser;
                user.sendEmailVerification().then(function () {
                    // Email sent.
                    alert("A verification link has been sent to your email account");
                    // gotoLogin();
                })
                        .then(function () {
                            // addVendor();
                            firebase.auth().signOut().then(function () {
                                // Sign-out successful.
                            }).catch(function (error) {
                                // An error happened.
                            });
                        })
                        .catch(function (error) {
                            var errorCode = error.code;
                            if (errorCode == 'auth/weak-password') {
                                alert('The password is too weak.');
                            } else {
                                alert(errorCode);
                            }
                            var errorMessage = error.message;
                            console.log(errorMessage);
                            // ...
                        })
            })
            .catch(function (error) {
                var errorCode = error.code;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(error.code + "2");
                }
                var errorMessage = error.message;
                console.log(errorMessage);
                // ...
            });
}
function addVendor() {
    // e.preventDefault();
    document.getElementById("overlay").style.display = "block";
    var name = document.getElementById("name").value;
    var userName = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var phoneNum = document.getElementById("phone").value;

    if (name == '' || userName == '' || email == '' || pass == '' || phoneNum == '') {
        document.getElementById("overlay").style.display = "none";
        alert("Please enter all the fields");

    } else {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("usertype", "2");
        urlencoded.append("email", email);
        urlencoded.append("password", pass);
        urlencoded.append("phone", phoneNum);
        urlencoded.append("device_type", "1");
        urlencoded.append("username", userName);
        urlencoded.append("name", name);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";

        fetch("signUp", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.status == 200) {
                        // console.log("ok");
                        // console.log(result.data.userId);
                        document.getElementById("overlay").style.display = "none";
                        // addVendorToFirebase(result.data.userId);
                        alert("You have successfully been added as a vendor");
                        addAddress(result.data.userId, result.data.sessionKey);
                        // firebaseVerification();
                        // location.reload();
                        // sessionStorage.setItem("name", name);
                        // sessionStorage.setItem("email", email);
                        // localStorage.setItem("username", userName);
                        // localStorage.setItem("userId", result.data.userId);
                        // gotoDashboard(result.data);
                        // window.location.href="dashboard";
                        // gotoLogin();
                    } else if (result.status == 204) {
                        document.getElementById("overlay").style.display = "none";
                        alert("User already signed up");
                    } else {
                        document.getElementById("overlay").style.display = "none";
                        alert("Unsuccessful");
                    }
                })
                .catch(error => console.log('error', error));
    }
}

function gotoLogin() {
    location.href = 'login';
}

function gotoDashboard(details) {
    var name = document.getElementById("name").value;
    var numExpiryDays = 30
    var d = new Date();
    d.setTime(d.getTime() + (numExpiryDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "zilaName=" + details.name + ";" + expires + ";path=/";

    //console.log(document.cookie);

    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", details.email);
    sessionStorage.setItem("user_type", 2);
    // console.log(details);
    // console.log(details.user_type);
    sessionStorage.setItem("sessionKey", details.sessionKey);
    localStorage.setItem("userId", details.userId);
    localStorage.setItem("username", details.username);
    // sessionStorage.setItem("name", )
    //console.log("Name ", details.name, "Email ", details.email, "Userid ", details.userId, "username ", details.username) 
    // document.getElementById("overlay").style.display="none";
    location.href = "dashboard";
    //console.log("Name ", sessionStorage.getItem("name"), "Email ", sessionStorage.getItem("email"), "Userid ", localStorage.getItem("userId"),"username ", localStorage.getItem("username"))
}
console.log('modal')
function addressModal(e) {
    e.preventDefault();
    $('#exampleModal').modal('show');
    var name = document.getElementById("name").value;
    var userName = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var phoneNum = document.getElementById("phone").value;

    if (name == '' || userName == '' || email == '' || pass == '' || phoneNum == '') {
        document.getElementById("overlay").style.display = "none";
        alert("Please enter all the fields");
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser. Please use a different browser :(");
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    //document.getElementById("lat").value = lat;
    //document.getElementById('lng').value = lng;

    //document.getElementById("latlngDiv").style.display = 'block';

    //console.log(lat, lng);
}

function addAddress(uid, sesKey) {
    var first_name = document.getElementById("firstName").value;
    var last_name = document.getElementById("lastName").value;
    var pin = document.getElementById("pincode").value;
    var complete_address = document.getElementById("fullAddress").value;
    //var latitude = document.getElementById("lat").value;
    //var longitude = document.getElementById("lng").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var phone = document.getElementById("phoneAdd").value;

    if (first_name == "") {
        alert("Please enter the first name");
    } else if (last_name == "") {
        alert("Please enter the last name");
    } else if (pin == "") {
        alert("Please enter the pincode");
    } else if (complete_address == "") {
        alert("Please enter the address");
    } else if (city == "") {
        alert("Please enter the city");
    } else if (state == "") {
        alert("Please enter the state");
    } else if (phone == "") {
        alert("Please enter the phone");
    } else {
        var myHeaders = new Headers();
        myHeaders.append("sessionkey", sesKey);
        myHeaders.append("userid", uid);
        myHeaders.append("languagetype", "1");
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Cookie", "ci_session=vr7d25lk2ajmfacb5gpd26h9am3qnf92");

        var urlencoded = new URLSearchParams();
        urlencoded.append("address", complete_address);
        urlencoded.append("first_name", first_name);
        urlencoded.append("last_name", last_name);
        urlencoded.append("state", state);
        urlencoded.append("pincode", pin);
        urlencoded.append("city", city);
        urlencoded.append("phone", phone);
        urlencoded.append("latitude", "0");
        urlencoded.append("longitude", "0");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(addAddress, requestOptions)
                .then(response => response.json())
                .then(result => {
                    //console.log(result)
                    if (result.status == 200) {
                        alert("Address has been added");
                        gotoLogin();
                    }
                })
                .catch(error => console.log('error', error));
    }
}

// function addVendorToFirebase(userId){
//     /*
//     var configObj = {
//         apiKey: "AIzaSyC5Wp39Cz2-E4ui5P7Jtl55j2Y3gemm4MU",
//         authDomain: "zila-dashboard-access.firebaseapp.com",
//         databaseURL: "https://zila-dashboard-access.firebaseio.com",
//         storageBucket: "zila-dashboard-access.appspot.com",
//     };

//     firebase.initializeApp(configObj);
//     */
//     var userDataRef = firebase.database().ref().child("Access");//.orderByKey();

//     console.log("hi");

//     var obj = {
//                 [userId] : {
//                             "10" : {"delete" : 0,"edit" : 0,"name" : "Users","view" : 0},
//                             "11" : {"delete" : 0,"edit" : 0,"name" : "Bank accounts","view" : 0},
//                             "12" : {"delete" : 0,"edit" : 0,"name" : "Orders page","view" : 0},
//                             "13" : {"delete" : 0,"edit" : 0,"name" : "Live stream","view" : 0},
//                             "14" : {"delete" : 0,"edit" : 0,"name" : "Products page","view" : 0},
//                             "15" : {"delete" : 0,"edit" : 0,"name" : "Add product","view" : 0},
//                             "16" : {"delete" : 0,"edit" : 0,"name" : "Zila store","view" : 0},
//                             "17" : {"delete" : 0,"edit" : 0,"name" : "Task by Id","view" : 0},
//                             "18" : {"delete" : 0,"edit" : 0,"name" : "Categories page","view" : 0},
//                             "19" : {"delete" : 0,"edit" : 0,"name" : "Add category","view" : 0},
//                             "20" : {"delete" : 0,"edit" : 0,"name" : "Rearrange categories","view" : 0},
//                             "21" : {"delete" : 0,"edit" : 0,"name" : "Video approve","view" : 0},
//                             "22" : {"delete" : 0,"edit" : 0,"name" : "Live videos","view" : 0},
//                             "23" : {"delete" : 0,"edit" : 0,"name" : "Past live statistics","view" : 0},
//                             "24" : {"delete" : 0,"edit" : 0,"name" : "Academy videos","view" : 0},
//                             "25" : {"delete" : 0,"edit" : 0,"name" : "Notifications page","view" : 0},
//                             "26" : {"delete" : 0,"edit" : 0,"name" : "Send notifcation now","view" : 0},
//                             "27" : {"delete" : 0,"edit" : 0,"name" : "Add notification","view" : 0},
//                             "28" : {"delete" : 0,"edit" : 0,"name" : "Add employee","view" : 0},
//                             "29" : {"delete" : 0,"edit" : 0,"name" : "Sales","view" : 0},
//                             "30" : {"delete" : 0,"edit" : 0,"name" : "Monthly sales","view" : 0},
//                             "31" : {"delete" : 0,"edit" : 0,"name" : "Daily sales","view" : 0},
//                             "32" : {"delete" : 0,"edit" : 0,"name" : "Top ZCL","view" : 0},
//                             }
//                 }

//     userDataRef.update(obj);

// }