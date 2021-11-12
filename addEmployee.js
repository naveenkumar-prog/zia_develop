// On Click Add Emlopyee()

var signUp = localStorage.getItem("signUp");

console.log("signup:",signUp);

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
        urlencoded.append("usertype", "4");  // Only for usertype  == 4
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

        fetch(signUp, requestOptions)     // To fetch data to database
                .then(response => response.json())
                .then(result => {
                    //console.log(result)
                    if (result.status == 200) {
                        console.log("ok");
                        console.log(result.data.userId);
                        addEmployeeToFirebase(result.data.userId);
                        alert("Employee added");
                        location.reload();
                    }
                })
                .catch(error => console.log('error', error));
    }
}

function addEmployeeToFirebase(userId) {
    /*
     var configObj = {
     apiKey: "AIzaSyC5Wp39Cz2-E4ui5P7Jtl55j2Y3gemm4MU",
     authDomain: "zila-dashboard-access.firebaseapp.com",
     databaseURL: "https://zila-dashboard-access.firebaseio.com",
     storageBucket: "zila-dashboard-access.appspot.com",
     };
     
     firebase.initializeApp(configObj);
     */
    var userDataRef = firebase.database().ref().child("Access");//.orderByKey();

    console.log("hi");

    var obj = {
        [userId]: {
            "10": {"delete": 0, "edit": 0, "name": "Users", "view": 0},
            "11": {"delete": 0, "edit": 0, "name": "Bank accounts", "view": 0},
            "12": {"delete": 0, "edit": 0, "name": "Orders page", "view": 0},
            "13": {"delete": 0, "edit": 0, "name": "Live stream", "view": 0},
            "14": {"delete": 0, "edit": 0, "name": "Products page", "view": 0},
            "15": {"delete": 0, "edit": 0, "name": "Add product", "view": 0},
            "16": {"delete": 0, "edit": 0, "name": "Zila store", "view": 0},
            "17": {"delete": 0, "edit": 0, "name": "Task by Id", "view": 0},
            "18": {"delete": 0, "edit": 0, "name": "Categories page", "view": 0},
            "19": {"delete": 0, "edit": 0, "name": "Add category", "view": 0},
            "20": {"delete": 0, "edit": 0, "name": "Rearrange categories", "view": 0},
            "21": {"delete": 0, "edit": 0, "name": "Video approve", "view": 0},
            "22": {"delete": 0, "edit": 0, "name": "Live videos", "view": 0},
            "23": {"delete": 0, "edit": 0, "name": "Past live statistics", "view": 0},
            "24": {"delete": 0, "edit": 0, "name": "Academy videos", "view": 0},
            "25": {"delete": 0, "edit": 0, "name": "Notifications page", "view": 0},
            "26": {"delete": 0, "edit": 0, "name": "Send notifcation now", "view": 0},
            "27": {"delete": 0, "edit": 0, "name": "Add notification", "view": 0},
            "28": {"delete": 0, "edit": 0, "name": "Add employee", "view": 0},
            "29": {"delete": 0, "edit": 0, "name": "Sales", "view": 0},
            "30": {"delete": 0, "edit": 0, "name": "Monthly sales", "view": 0},
            "31": {"delete": 0, "edit": 0, "name": "Daily sales", "view": 0},
            "32": {"delete": 0, "edit": 0, "name": "Top ZCL", "view": 0},
            "33": {"delete": 0, "edit": 0, "name": "Banners", "view": 0},
            "34": {"delete": 0, "edit": 0, "name": "Contact Directory", "view": 0},
            "35": {"delete": 0, "edit": 0, "name": "Promo codes", "view": 0},
            "36": {"delete": 0, "edit": 0, "name": "Add Promo codes", "view": 0},
            "37": {"delete": 0, "edit": 0, "name": "Activity", "view": 0},
            "38": {"delete": 0, "edit": 0, "name": "Calculator", "view": 0},
            "40": {"delete": 0, "edit": 0, "name": "Approved Videos", "view": 0},
            "41": {"delete": 0, "edit": 0, "name": "Add campus ambassador", "view": 0},
        }
    }

    userDataRef.update(obj);

}