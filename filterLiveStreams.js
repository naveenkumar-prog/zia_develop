$(document).ready(function () {
    $("#datePicker").datepicker({
        dateFormat: 'yy-mm-dd'
    });
})
var influencerliveconfig = {
    apiKey: "AIzaSyC5Wp39Cz2-E4ui5P7Jtl55j2Y3gemm4MU",
    authDomain: "zila-android-activities.firebaseapp.com",
    databaseURL: "https://zila-android-influencerlive.firebaseio.com",
    storageBucket: "zila-android-influencerlive.appspot.com"
};
const influencerliveApp = firebase.initializeApp(influencerliveconfig, 'Secondary');

const dbrefObject = influencerliveApp.database().ref('Request/');
statusValue = 1;
dbrefObject.on('value', getData, errFunc);
var date;
$("#datePicker").on("change", function () {
    date = $(this).val()
    // console.log(date);  
    dbrefObject.on('value', getDateData, errFunc);
});

function getDateData(snap) {

    var data = snap.val();
    var sno = 1;
    document.getElementById('tableBody').innerHTML = "";
    // console.log(data.length);
    snap.forEach(childSnap => {
        childSnap.forEach(liveStream => {
            var d = liveStream.val().time.split(' ', 2)[0];
            // console.log(d)
            if (d == date) {
                // var row = "<tr>"+
                //             "<td>"+sno+"</td>"+
                //             "<td>"+liveStream.val().name+"</td>"+
                //             "<td>"+liveStream.val().seller_id+"</td>"+
                //             "<td>"+liveStream.val().title+"</td>"+
                //             "<td>"+liveStream.val().description+"</td>"+
                //             "<td>"+liveStream.val().allot_time+"</td>"+
                //             "<td>"+liveStream.val().time+"</td>"+
                //             "<td>"+liveStream.val().products+"</td>"+
                //             "<td><img src='"+liveStream.val().thumbnail+"' style='width:150px; height:150px;'/></td>"+
                //             "<td>"+liveStream.val().old-status+"</td>"+
                //           "</tr>";
                var products = liveStream.child('product_id').val();

                var productsString = "";
                // console.log(products.length)
                if (typeof products == "object") {
                    if (products.length !== 0) {
                        // var productsString=products;                    
                        // console.log(Object.keys(products).length);
                        var keys = Object.keys(products);
                        for (i = 0; i < Object.keys(products).length; i++) {
                            var key = keys[i];
                            productsString += products[key];
                            if (i != (Object.keys(products).length - 1))
                                productsString += ", ";
                        }
                    }
                } else {
                    productsString = "-"
                }

                // products.;
                var row = "<tr>" +
                        "<td>" + sno + "</td>" +
                        "<td>" + liveStream.val().name + "</td>" +
                        "<td>" + liveStream.val().seller_id + "</td>" +
                        "<td>" + liveStream.val().title + "</td>" +
                        "<td>" + liveStream.val().description + "</td>" +
                        "<td>" + liveStream.val().allot_time + "</td>" +
                        "<td>" + liveStream.val().time + "</td>" +
                        "<td>" + productsString + "</td>" +
                        "<td><img src='" + liveStream.val().thumbnail + "' style='width:150px; height:150px;'></td>" +
                        "<td>" + liveStream.val().status + "</td>" +
                        "</tr>";
                sno++;
                // console.log(products);
                document.getElementById('tableBody').innerHTML += row;
                // console.log(row);
                // console.log(liveStream.val().product_id);
            }
        })
    });
}


function change(value) {
    // console.log('x');
    statusValue = value;
    dbrefObject.on('value', getData, errFunc);
}

function getData(snap) {
    document.getElementById("datePicker").innerHTML = ""
    var data = snap.val();
    var sno = 1;
    document.getElementById('tableBody').innerHTML = "";
    // console.log(data.length);
    snap.forEach(childSnap => {
        childSnap.forEach(liveStream => {
            if (liveStream.val().status == statusValue) {
                // var row = "<tr>"+
                //             "<td>"+sno+"</td>"+
                //             "<td>"+liveStream.val().name+"</td>"+
                //             "<td>"+liveStream.val().seller_id+"</td>"+
                //             "<td>"+liveStream.val().title+"</td>"+
                //             "<td>"+liveStream.val().description+"</td>"+
                //             "<td>"+liveStream.val().allot_time+"</td>"+
                //             "<td>"+liveStream.val().time+"</td>"+
                //             "<td>"+liveStream.val().products+"</td>"+
                //             "<td><img src='"+liveStream.val().thumbnail+"' style='width:150px; height:150px;'/></td>"+
                //             "<td>"+liveStream.val().old-status+"</td>"+
                //           "</tr>";
                var products = liveStream.child('product_id').val();

                var productsString = "";
                // console.log(products.length)
                if (typeof products == "object") {
                    if (products.length !== 0) {
                        // var productsString=products;                    
                        // console.log(Object.keys(products).length);
                        var keys = Object.keys(products);
                        for (i = 0; i < Object.keys(products).length; i++) {
                            var key = keys[i];
                            productsString += products[key];
                            if (i != (Object.keys(products).length - 1))
                                productsString += ", ";
                        }
                    }
                } else {
                    productsString = "-"
                }

                // products.;
                var row = "<tr>" +
                        "<td>" + sno + "</td>" +
                        "<td>" + liveStream.val().name + "</td>" +
                        "<td>" + liveStream.val().seller_id + "</td>" +
                        "<td>" + liveStream.val().title + "</td>" +
                        "<td>" + liveStream.val().description + "</td>" +
                        "<td>" + liveStream.val().allot_time + "</td>" +
                        "<td>" + liveStream.val().time + "</td>" +
                        "<td>" + productsString + "</td>" +
                        "<td><img src='" + liveStream.val().thumbnail + "' style='width:150px; height:150px;'></td>" +
                        "<td>" + liveStream.val().status + "</td>" +
                        "</tr>";
                sno++;
                // console.log(products);
                document.getElementById('tableBody').innerHTML += row;
                // console.log(row);
                // console.log(liveStream.val().product_id);
            }
        })
    });
}
function errFunc(err) {
    console.log(err);
}
