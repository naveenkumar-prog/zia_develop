var config = {
    apiKey: "AIzaSyC5Wp39Cz2-E4ui5P7Jtl55j2Y3gemm4MU",
    authDomain: "zila-dashboard-access.firebaseapp.com",
    databaseURL: "https://zila-dashboard-access.firebaseio.com",
    storageBucket: "zila-dashboard-access.appspot.com",
};

firebase.initializeApp(config);

const tableBody = document.getElementById("myTable");
var userId = sessionStorage.getItem("userId");

var userDataRef = firebase.database().ref().child("Access").child(userId);//.orderByKey();
userDataRef.on("value", function (snapshot) {
    tableBody.innerHTML = '';

    snapshot.forEach(function (childSnapshot) {
        var rootKey = childSnapshot.key;
        var childData = childSnapshot.val();
        /*
         console.log(rootKey);           //pageId
         console.log(childData);         //childNodes
         console.log(childData.name);    //pageName
         */
        var pageName = childData.name;
        var viewAccess = childData.view;
        var editAccess = childData.edit;
        var deleteAccess = childData.delete;

        console.log(viewAccess, editAccess, deleteAccess);

        var viewInput = '';
        var editInput = '';
        var deleteInput = '';

        if (viewAccess) {
            viewInput = "<input type='checkbox' class='view " + rootKey + "' onchange=\"changeAccess(" + rootKey + ",1,0)\" checked>"
        } else {
            viewInput = "<input type='checkbox' class='view " + rootKey + "' onchange=\"changeAccess(" + rootKey + ",1,1)\">"
        }

        if (editAccess) {
            editInput = "<input type='checkbox' class='edit " + rootKey + "' onchange=\"changeAccess(" + rootKey + ",2,0)\" checked>"
        } else {
            editInput = "<input type='checkbox' class='edit " + rootKey + "' onchange=\"changeAccess(" + rootKey + ",2,1)\">"
        }

        if (deleteAccess) {
            deleteInput = "<input type='checkbox' class='delete " + rootKey + "' onchange=\"changeAccess(" + rootKey + ",3,0)\" checked>"
        } else {
            deleteInput = "<input type='checkbox' class='delete " + rootKey + "' onchange=\"changeAccess(" + rootKey + ",3,1)\">"
        }

        var viewAccessToggle = "<label class='switch'>" +
                viewInput +
                "<span class='slider round'></span>" +
                "</label>"

        var editAccessToggle = "<label class='switch'>" +
                editInput +
                "<span class='slider round'></span>" +
                "</label>"

        var deleteAccessToggle = "<label class='switch'>" +
                deleteInput +
                "<span class='slider round'></span>" +
                "</label>"

        var row = "<tr>" +
                "<td>" + pageName + "</td>" +
                "<td>" + viewAccessToggle + "</td>" +
                "<td>" + editAccessToggle + "</td>" +
                "<td>" + deleteAccessToggle + "</td>" +
                "</tr>";

        tableBody.innerHTML += row;

    });
});

function changeAccess(pageId, mode, val) {
    var childDataRef = userDataRef.child(pageId);

    console.log(pageId, mode);

    childDataRef.once("value", function (snapshot) {

        var obj;
        if (mode == 1) {
            obj = {"view": val};
        } else if (mode == 2) {
            obj = {"edit": val};
        } else if (mode == 3) {
            obj = {"delete": val};
        }
        childDataRef.update(obj);
        /*
         console.log(snapshot.key);
         console.log(snapshot.val());
         console.log("changed");
         */
    })
}

/*
 function changeStatus(timeStamp, userId, newStatus){
 var ref = userDataRef.child(userId).child(timeStamp);
 ref.once("value", function(snapshot) {
 var rootKey = snapshot.key;
 var childData = snapshot.val();
 var oldStatus = childData.status;
 //console.log(rootKey) //same as timestamp
 var obj = {"status" : newStatus, "old-status" : oldStatus};
 ref.update(obj);
 })
 }
 */