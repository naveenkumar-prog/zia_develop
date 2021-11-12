var getoffer = localStorage.getItem("getoffer");
var deloffer = localStorage.getItem("deloffer");
var updategraphic = localStorage.getItem("updategraphic");
var addoffer = localStorage.getItem("addoffer");
var searchproduct = localStorage.getItem("searchproduct");


getproffers();
function getproffers() {
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    var table = document.getElementById("tableBody");
    fetch(getoffer+"operation=6", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.data.length);
                if((result.data.length)==0)
                {
                    alert("No Daily offers are available");
                }
                var myList = result.data;
                for (var i = 0; i < myList.length; i++) {
                    var sno = i + 1;
                    var row = "<tr id='" + myList[i].offer_id + "'>" +
                            "<td>" + sno + "</td>" +
                            "<td>" + myList[i].offer_id + "</td>" +
                            "<td>" +
                            "<img id='displayImg" + myList[i].offer_id + "' src=" + myList[i].graphic + " class='product_image'>" +
                            "</td>" +
                            "<td><button class='updategraph' id = '" + myList[i].offer_id + "' data-toggle='modal' data-target='#uppgraph'> <span>Update Graphic</span></button></td>" +
                            "<td>" + myList[i].offer_rank + "</td>" +
                            "<td>" + myList[i].operation + "</td>" +
                            "<td>" + myList[i].data + "</td>" +
                            "<td>" + myList[i].pre + "</td>" +
                            "<td>" + myList[i].product_id + "</td>" +
                            "<td><button class='deleteUsers' id = '" + myList[i].offer_id + "'> <span>Delete Offer</span></button></td>" +
                            "</tr>";
                    table.innerHTML += row;
                }
                $('.deleteUsers').click(function () {
                    var $this = $(this);
                    var trId = $(this).closest('tr').prop('id');
                    var currentRow = document.getElementById(trId);

                    var offid = trId;
                    var pid = currentRow.cells.item(8).innerHTML;
                    var pre = currentRow.cells.item(7).innerHTML;
                    var data = currentRow.cells.item(6).innerHTML;
                    var offer_rank = currentRow.cells.item(4).innerHTML;

                    deloff(offid, pid, pre, data, offer_rank);
                });

                $('.updategraph').click(function () {
                    var $this = $(this);
                    var trId = $(this).closest('tr').prop('id');
                    var currentRow = document.getElementById(trId);
                    var offid = trId;
                    sessionStorage.setItem("OffID", offid);
                });
            })
}

function deloff(offid, pid, pre, data, offer_rank) {

    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("offer_id", offid);
    urlencoded.append("data", data);
    urlencoded.append("operation", "6");
    urlencoded.append("product_id", pid);
    urlencoded.append("pre", pre);
    urlencoded.append("offer_rank",offer_rank);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(deloffer, requestOptions)
            .then(response => response.json())
            .then(result => {
                alert("Offer Deleted");
                location.reload();
            })
}

function uppoff() {
    var ofid = sessionStorage.getItem("OffID");
    var imagess = document.getElementById("graphicss");
    if (imagess.files.length == 0) {
        alert("Please fill in all the fields");
    } else {
        var myHeaders = new Headers();
        myHeaders.append("sessionkey", "a2ed9c4adb38820e98d7f511962e2372");
        myHeaders.append("user_type", "3");
        myHeaders.append("userid", "25");
        myHeaders.append("languagetype", "2");
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

        var formdata = new FormData();
        formdata.append("graphic", imagess.files[0]);
        formdata.append("offer_id", ofid);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(updategraphic, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    alert("Graphic updated");
                    location.reload();
                })
                .catch(error => console.log('error', error));
    }
}

function addOff() {
    var amount = document.getElementById("amount").value;
    var image = document.getElementById("graphics");
    var pid = document.getElementById("pid").value;
    if (amount == "" || image.files.length == 0) {
        alert("Please fill in all the fields");
    } else {
        var myHeaders = new Headers();
        myHeaders.append("sessionkey", "a2ed9c4adb38820e98d7f511962e2372");
        myHeaders.append("user_type", "3");
        myHeaders.append("userid", "25");
        myHeaders.append("languagetype", "2");
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

        var formdata = new FormData();
        formdata.append("operation", "6");
        formdata.append("data", amount);
        formdata.append("graphic", image.files[0]);
        formdata.append("product_id", pid);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(addoffer, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status == 206) {
                        alert("Product already attached to product offer");
                        location.reload();
                    } else if (result.status == 200) {
                        alert("Offer Added");
                        location.reload();
                    } else if (result.status == 207) {
                        alert("Product already attached to Daily Offer");
                        location.reload();
                    } else if (result.status == 208) {
                        alert("Product already attached to Weekly Offer");
                        location.reload();
                    } else if (result.status == 209) {
                        alert("Product already attached to buy one get one offer");
                        location.reload();
                    }
                })
    }
}

function getpid() {
    $('#producttableBody').empty();
    document.getElementById("ptable").style.display = "block";
    var value = document.getElementById("pname").value;
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "2");
    myHeaders.append("user_type", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
    myHeaders.append("Cookie", "ci_session=pk1mtoors8tjkhh6rlq368a4etjh7cjv");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    var table = document.getElementById("producttableBody");
    fetch(searchproduct + value + "&page=0", requestOptions)
            .then(response => response.json())
            .then(result => {
                var myList = result.data;
                for (var i = 0; i < myList.length; i++) {
                    var sno = i + 1;
                    var row = "<tr id='" + myList[i].product_id + "'>" +
                            "<td>" + sno + "</td>" +
                            "<td>" + myList[i].product_id + "</td>" +
                            "<td>" + myList[i].name + "</td>" +
                            "</tr>";
                    table.innerHTML += row;
                }
            })
            .catch(error => console.log('error', error));
}