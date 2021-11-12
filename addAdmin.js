var signUp = localStorage.getItem("signUp");

console.log("signUp",signUp);

function addEmployee() {
    var userName = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var phoneNum = document.getElementById("phone").value;

    if (userName == '' || email == '' || pass == '' || phoneNum == '') {
        alert("Please enter all the fields");
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("user_type", "0");
        urlencoded.append("email", email);
        urlencoded.append("password", pass);
        urlencoded.append("phone", phoneNum);
        urlencoded.append("device_type", "1");
        urlencoded.append("username", userName);

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
                    //console.log(result)
                    if (result.status == 200) {
                        addEmployeeToFirebase(result.data.userId);
                        alert("Admin added");
                        location.reload();
                    }
                })
                .catch(error => console.log('error', error));
    }
}

function addEmployeeToFirebase(userId) {
    /*
     var config = {
     apiKey: "AIzaSyC5Wp39Cz2-E4ui5P7Jtl55j2Y3gemm4MU",
     authDomain: "zila-dashboard-access.firebaseapp.com",
     databaseURL: "https://zila-dashboard-access.firebaseio.com",
     storageBucket: "zila-dashboard-access.appspot.com",
     };
     
     firebase.initializeApp(config);
     */
    var userDataRef = accessDBdatabase().ref().child("Access");//.orderByKey();

    var obj = {
        [userId]: {
            "9": {"delete": 1, "edit": 1, "name": "Add admin", "view": 1},
            "10": {"delete": 1, "edit": 1, "name": "Users", "view": 1},
            "11": {"delete": 1, "edit": 1, "name": "Bank accounts", "view": 1},
            "12": {"delete": 1, "edit": 1, "name": "Orders page", "view": 1},
            "13": {"delete": 1, "edit": 1, "name": "Live stream", "view": 1},
            "14": {"delete": 1, "edit": 1, "name": "Products page", "view": 1},
            "15": {"delete": 1, "edit": 1, "name": "Add product", "view": 1},
            "16": {"delete": 1, "edit": 1, "name": "Zila store", "view": 1},
            "17": {"delete": 1, "edit": 1, "name": "Task by Id", "view": 1},
            "18": {"delete": 1, "edit": 1, "name": "Categories page", "view": 1},
            "19": {"delete": 1, "edit": 1, "name": "Add category", "view": 1},
            "20": {"delete": 1, "edit": 1, "name": "Rearrange categories", "view": 1},
            "21": {"delete": 1, "edit": 1, "name": "Video approve", "view": 1},
            "22": {"delete": 1, "edit": 1, "name": "Live videos", "view": 1},
            "23": {"delete": 1, "edit": 1, "name": "Past live statistics", "view": 1},
            "24": {"delete": 1, "edit": 1, "name": "Academy videos", "view": 1},
            "25": {"delete": 1, "edit": 1, "name": "Notifications page", "view": 1},
            "26": {"delete": 1, "edit": 1, "name": "Send notifcation now", "view": 1},
            "27": {"delete": 1, "edit": 1, "name": "Add notification", "view": 1},
            "28": {"delete": 1, "edit": 1, "name": "Add employee", "view": 1},
            "29": {"delete": 1, "edit": 1, "name": "Sales", "view": 1},
            "30": {"delete": 1, "edit": 1, "name": "Monthly sales", "view": 1},
            "31": {"delete": 1, "edit": 1, "name": "Daily sales", "view": 1},
            "32": {"delete": 1, "edit": 1, "name": "Top ZCL", "view": 1},
        }
    }

    userDataRef.update(obj);

}