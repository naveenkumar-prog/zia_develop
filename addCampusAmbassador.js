console.log("xx");

var signUp = localStorage.getItem("signUp");

console.log("signup:",signUp);

function addCampusAmbassador() {
    var name = document.getElementById("name").value;
    // var name = "Sathyasai Ajitesh";
    var email = document.getElementById("email").value;
    console.log('email - ', email);
    var pass = document.getElementById("password").value;
    console.log('pass - ', pass);
    var phoneNum = document.getElementById("phone").value;
    console.log('phone - ', phoneNum);
    var collegeName = document.getElementById("collegeName").value;
    console.log('clg - ', collegeName);

    if (name == '' || email == '' || pass == '' || phoneNum == '' || collegeName == '') {
        alert("Please enter all the fields");
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("usertype", "6");
        urlencoded.append("email", email);
        urlencoded.append("password", pass);
        urlencoded.append("phone", phoneNum);
        urlencoded.append("device_type", "1");
        urlencoded.append("username", collegeName);
        urlencoded.append("name", name);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";

        fetch(signUp, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status == 200) {
                        // console.log("ok");
                        console.log(result.data.userId);
                        alert("Campus Ambassador added");
                        sessionStorage.setItem('pUserId', result.data.userId);
                        location.href = 'addPromocode';
                    } else if (result.status == 204) {
                        alert("User already exists");
                    }
                })
                .catch(error => console.log('error', error));
    }
}