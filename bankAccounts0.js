var updateStatus = localStorage.getItem("updateStatus");
var getAccountDetails = localStorage.getItem("getAccountDetails");
console.log("updateStatus",updateStatus);
console.log("getAccountDetails",getAccountDetails);

var accounts = [];

// On change button clicks

function enableButton(x) {
    var elem = document.getElementById("razorpay_" + x)
    var btn = document.getElementById(x)
    if (btn.textContent == 'Change') {
        elem.disabled = false;
        btn.textContent = "Save"
    } else {
        elem.disabled = true;
        btn.textContent = "Change"
    }
}

// on change the current status

function changeStatus(x, y, z) {
    var result = confirm("Click OK to continue!");
    if (result == true) {

        var myHeaders = new Headers();
        myHeaders.append("userid", "1784");
        myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
        myHeaders.append("languagetype", "1");
        myHeaders.append("usertype", "0");
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("razorpayid", z);
        urlencoded.append("isapproved", x);
        urlencoded.append("bankAccId", y);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
       // const url = "http://api.myzila.com/UpdateStatus";

        fetch(updateStatus, requestOptions)
                .then(response => response.text())
                .then(result => {
                    location.reload();
                })
                .catch(error => console.log('error', error));
    }

}

// the json data. (you can change the values for output.)
var myHeaders = new Headers();
myHeaders.append("userid", "1784");
myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
myHeaders.append("languagetype", "1");
myHeaders.append("usertype", "0");
myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
myHeaders.append("Cookie", "ci_session=oshp08q3phv657ldtbg8d6nvj91o0vuv");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = getAccountDetails+"user_id=1788";

var state = {
    'querySet': accounts,

    'page': 1,
    'rows': 10,
    'window': 5,
}

buildTable()

// To display the filtered pages according to search

function pagination(data, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = data.slice(trimStart, trimEnd)

    var pages = Math.ceil(data.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

// To Display the page buttons in footer

function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ''
    console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)

        if (maxLeft < 1) {
            maxLeft = 1
        }
        maxRight = pages
    }

    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    $('.page').on('click', function () {
        //$('#tableBody').empty()

        state.page = Number($(this).val())
        buildTable()
    })
}

// To display products in table

function buildTable() {

    fetch(url, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // Work with JSON data here
                accounts = data.data
                state.querySet = accounts
                var res = pagination(state.querySet, state.page, state.rows)
                var myList = res.querySet
                document.getElementById("tableBody").innerHTML = '';
                for (var i = 0; i < myList.length; i++) {
                    var obj = myList[i];
                    var videoString = "<video width=" + 200 + " height=" + 140 + " controls=\"\"> <source src=" + myList[i].hindi_video_link + "></video>"
                    var imageString = "<img src=" + myList[i].thumbnail + " alt=\"Thumbnail\" width=" + 150 + " height=" + 150 + ">";

                    var status = "";
                    switch (myList[i].status) {
                        case 0 :
                            status = "Not Approved";
                            break;
                        case 1 :
                            status = "Approved";
                            break;
                    }

                    if (myList[i].razorpay_id == "") {
                        var inputString = "  <div>  <input type= \"text\" id= \"razorpay_" + myList[i].bank_account_id + "\"  placeholder = \"Enter RazorPay Id\" > <button class='changeBtn' onclick=enableButton(this.id)  id= " + data.data[i].bank_account_id + " >Change</button> </div> ";
                    } else {
                        var inputString = "  <div>  <input type= \"text\" id= \"razorpay_" + myList[i].bank_account_id + "\"  value = " + myList[i].razorpay_id + " disabled > <button class='changeBtn' onclick=enableButton(this.id)  id= " + myList[i].bank_account_id + " >Change</button> </div> ";
                    }

                    var statusSelect = " <select id=" + myList[i].bank_account_id + "  onchange=\"changeStatus(this.value,this.id,document.getElementById('razorpay_" + myList[i].bank_account_id + "').value)\"> <option value=" + 0 + ">Not Approved</option> <option value=" + 1 + ">Approved</option> <option selected value=" + 2 + ">--Select--</option> </select> ";
                    var statusString = " <lable> " + status + "  <lable> ";

                    var $tr = $("<tr>");

                    var $SNO = $("<td>");
                    var $user_id = $("<td>");
                    var $account_holder_name = $("<td>");
                    var $razorpay_id = $("<td>");
                    var $bank_name = $("<td>");
                    var $account_no = $("<td>");
                    var $ifsc_code = $("<td>");
                    var $status = $("<td>");
                    var $Choosestatus = $("<td>");

                    $SNO.append(i + 1);
                    $user_id.append(obj.user_id);
                    $account_holder_name.append(obj.account_holder_name);
                    $razorpay_id.append(inputString);
                    $bank_name.append(obj.bank_name);
                    $account_no.append(obj.account_no);
                    $ifsc_code.append(obj.ifsc_code);
                    $status.append(statusString);
                    $Choosestatus.append(statusSelect);

                    $tr.append($SNO);
                    $tr.append($user_id);
                    $tr.append($account_holder_name);
                    $tr.append($razorpay_id);
                    $tr.append($bank_name);
                    $tr.append($account_no);
                    $tr.append($ifsc_code);
                    $tr.append($status);
                    $tr.append($Choosestatus);

                    $('#tableBody').append($tr);
                }
                //console.log(data)
                pageButtons(res.pages)

                //checkEditAccess();
            })
            .catch(error => {
                // Do something for an error here
                console.log("error", error)
            })
}

function checkEditAccess() {
    /*
     var config = {
     apiKey: "AIzaSyC5Wp39Cz2-E4ui5P7Jtl55j2Y3gemm4MU",
     authDomain: "zila-dashboard-access.firebaseapp.com",
     databaseURL: "https://zila-dashboard-access.firebaseio.com",
     storageBucket: "zila-dashboard-access.appspot.com",
     };
     
     firebase.initializeApp(config);
     */
    var userId = localStorage.getItem("userId");
    console.log(userId);

    var userDataRef = firebase.database().ref().child("Access").child(userId).child(11);//.orderByKey();

    userDataRef.on("value", function (snapshot) {

        //console.log(snapshot.val().view);

        if (!snapshot.val().edit) {

            $(".changeBtn").remove();

            var tble = document.getElementById("table");
            var row = tble.rows;

            for (var j = 0; j < row.length; j++) {

                // Deleting the 10th cell of each row. 
                row[j].deleteCell(8);
            }
        }
    })
}