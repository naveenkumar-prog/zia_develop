var activitiesconfig = {
    apiKey: "AIzaSyC5Wp39Cz2-E4ui5P7Jtl55j2Y3gemm4MU",
    authDomain: "zila-android-activities.firebaseapp.com",
    databaseURL: "https://zila-android-activities.firebaseio.com",
    storageBucket: "zila-android-activities.appspot.com"
};
const activityApp = firebase.initializeApp(activitiesconfig, 'Secondary')

const dbrefObject = activityApp.database().ref('Activities/');

dbrefObject.on('value', getData);

function getData(data) {
    var activityData = data.val();
    var keys = Object.keys(activityData);
    var table = document.getElementById("table");
    // console.log(keys);
    var j = keys.length - 1;
    for (i = 0; i < keys.length; i++) {
        var k = keys[j];
        var userId = activityData[k].userId;
        var activity = activityData[k].activity;
        var time = activityData[k].time;

        if (sessionStorage.getItem("user_type") == 2) {
            if (userId == localStorage.getItem("userId")) {
                addToTable(activity, time, userId);
            }
        } else {
            addToTable(activity, time, userId);
        }
        // console.log(activity, time, userId);   
        j--;
    }
}

function addToTable(activity, time, userId) {
    var tr = document.createElement("tr");
    var userIdtd = document.createElement("td");
    var activitytd = document.createElement("td");
    var timetd = document.createElement("td");

    activitytd.innerHTML = activity;
    timetd.innerHTML = time;
    userIdtd.innerHTML = userId;
    tr.appendChild(activitytd);
    tr.appendChild(timetd);
    tr.appendChild(userIdtd);
    table.append(tr);
}