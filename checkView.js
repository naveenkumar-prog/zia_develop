var accessDB = firebase.initializeApp({
    apiKey: "AIzaSyC5Wp39Cz2-E4ui5P7Jtl55j2Y3gemm4MU",
    authDomain: "zila-dashboard-access.firebaseapp.com",
    databaseURL: "https://zila-dashboard-access.firebaseio.com",
    storageBucket: "zila-dashboard-access.appspot.com",
});

checkView();

function checkView() {

    var userId = localStorage.getItem("userId");
    console.log(userId);

    var page_url = window.location.href;
    var page_link = page_url.split("/")[page_url.split("/").length - 1];
    var page_name = page_link.split(".")[0];
    //console.log(page_name); //getOrderList

    var userDataRef = accessDB.database().ref().child("Access").child(userId);//.orderByKey();

    if (page_name == "getUsers") {
        userDataRef = userDataRef.child(10);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "getUsers.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "bankAccounts") {
        userDataRef = userDataRef.child(11);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "bankAccounts0.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "getOrderList") {
        userDataRef = userDataRef.child(12);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "getOrderList0.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "liveStream") {
        userDataRef = userDataRef.child(13);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "liveStream.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "editProduct") {
        userDataRef = userDataRef.child(14);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "editProduct.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "uploadProduct") {
        userDataRef = userDataRef.child(15);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } /*else {
             var newScript = document.createElement("script");
             newScript.setAttribute("src", "liveStream.js");
             newScript.type = "text/javascript";
             document.body.appendChild(newScript);
             }*/
        })
    } else if (page_name == "getTask") {
        userDataRef = userDataRef.child(16);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "getTask0.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "getTaskById") {
        userDataRef = userDataRef.child(17);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "getTasKById.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "getCategory") {
        userDataRef = userDataRef.child(18);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "getCategory.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "addCategory") {
        userDataRef = userDataRef.child(19);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                history.back();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "addCategory.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "categories") {
        userDataRef = userDataRef.child(20);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                history.back();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "categories0.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "videoApprove") {
        userDataRef = userDataRef.child(21);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "videoApprove.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "liveVideos") {
        userDataRef = userDataRef.child(22);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                history.back();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "liveVideos.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "pastLiveStatistics") {
        userDataRef = userDataRef.child(23);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                history.back();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "pastLiveStatistics.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "getAcademyVideos") {
        userDataRef = userDataRef.child(24);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "getAcademyVideos.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "getNotifications") {
        userDataRef = userDataRef.child(25);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "getNotifications.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "sendNotification") {
        userDataRef = userDataRef.child(26);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                history.back();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "sendNotification.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "addNotifications") {
        userDataRef = userDataRef.child(27);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                history.back();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "addNotifications.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "addEmployee") {
        userDataRef = userDataRef.child(28);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "addEmployee.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "sales") {
        userDataRef = userDataRef.child(29);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                history.back();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "sales.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "monthlySales") {
        userDataRef = userDataRef.child(30);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "monthlySales0.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "dailySales") {
        userDataRef = userDataRef.child(31);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "dailySales.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "topZcl") {
        userDataRef = userDataRef.child(32);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "topZcl0.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    }else if (page_name == "banners") {
        userDataRef = userDataRef.child(33);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "banners.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "contactDirectory") {
        userDataRef = userDataRef.child(34);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "newcontactDirectory.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "promocodes") {
        userDataRef = userDataRef.child(35);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "promocodes.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "addPromocode") {
        userDataRef = userDataRef.child(36);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            }
        })
    } else if (page_name == "activity") {
        userDataRef = userDataRef.child(37);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "activity.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "calculator") {
        userDataRef = userDataRef.child(38);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            }
        })
    } else if (page_name == "rejectedVideos") {
        userDataRef = userDataRef.child(39);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "rejectedVideos0.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "approvedVideos") {
        userDataRef = userDataRef.child(40);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            } else {
                var newScript = document.createElement("script");
                newScript.setAttribute("src", "approvedVideos0.js");
                newScript.type = "text/javascript";
                document.body.appendChild(newScript);
            }
        })
    } else if (page_name == "addCampusAmbassador") {
        userDataRef = userDataRef.child(41);

        userDataRef.on("value", function (snapshot) {

            if (!snapshot.val().view) {
                alert("You are not authorised to view this page");
                window.close();
            }
        })
    }
}