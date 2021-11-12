


$(document).ready(function () {
    $(document).ajaxStart(function () {
        $("#wait").css("display", "block");
    });
    $(document).ajaxComplete(function () {
        $("#wait").css("display", "none");
    });
    $("button").click(function () {
        tableFromJson();
    });
});

var assignProduct = localStorage.getItem("assignProduct");
var getUploadvideo = localStorage.getItem("getUploadvideo");

// On Change the Current Status

function changeStatus(prodVideoId, newStatus) {
    console.log(prodVideoId, newStatus);
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("product_video_id", prodVideoId);
    urlencoded.append("product_video_status", newStatus);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    // const proxyurl = "https://cors-anywhere.herokuapp.com/";

    fetch(assignProduct, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result)
                if (result.status == 200) {
                    var status;
                    if (newStatus == 1) {
                        status = "Approved";
                    } else if (newStatus == 2) {
                        status = "Rejected";
                    } else {
                        status = "Not Approved";
                    }

                    document.getElementById(prodVideoId).cells.item(10).textContent = status;
                }
            })
            .catch(error => console.log('error', error));
}

function changeLang(x) {
    return x;
    location.reload();
}

// the json data. (you can change the values for output.)
var myHeaders = new Headers();
myHeaders.append("usertype", "0");
myHeaders.append("userid", "1784");
myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
myHeaders.append("languagetype", "1");
myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

// const proxyurl = "https://cors-anywhere.herokuapp.com/";

// Status ==1 // Because  if (status==1) then approved

const url = getUploadvideo+"seller_id=0&status=1";

fetch(url, requestOptions)
        .then(response => {
            return response.json()
        })
        .then(data => {
// Work with JSON data here


            for (var i = 0; i < data.data.length; i++) {
                var statusString = "<select onchange='changeStatus(" + data.data[i].product_video_id + ",this.value)' id=" + 63 + " name=" + status + "><option selected hidden>--Select--</option><option value=" + 0 + ">Not Approved</option> <option value=" + 1 + ">Approved</option><option value=" + 2 + ">Rejected</option> </select>";

                var obj = data.data[i];
                var videoString = "<video width=" + 200 + " height=" + 140 + " controls=\"\"> <source src=" + data.data[i].hindi_video_link + "></video>"
                var imageString = "<img src=" + data.data[i].thumbnail + " alt=\"Thumbnail\" width=" + 150 + " height=" + 150 + ">";
                var rowId = data.data[i].product_video_id
                var $tr = $("<tr id='" + rowId + "'>");
                var $SNO = $("<td>");
                var $title = $("<td>");
                var $category_id = $("<td>");
                var $Video = $("<td>");
                var $product_details = $("<td>");
                var $created_on = $("<td>");
                var $seller_id = $("<td>");
                var $seller_name = $("<td>");
                var $thumbnail = $("<td>");
                var $status = $('<td>');
                var $changeStatus = $("<td>");
                var vidStatus = "Not approved";
                if (data.data[i].isApproved === 1) {
                    vidStatus = "Approved"
                }
                if (data.data[i].isApproved === 2) {
                    vidStatus = "Rejected"
                }

                $SNO.append(i + 1);
                $title.append(obj.title);
                $category_id.append(obj.category_id);
                $Video.append(videoString);
                $product_details.append(obj.product_id + "<br> Details");
                $created_on.append(obj.created_on);
                $seller_id.append(obj.seller_id);
                $seller_name.append(obj.name);
                $thumbnail.append(imageString);
                $status.append(vidStatus)
                $changeStatus.append(statusString);

                $tr.append($SNO);
                $tr.append($title);
                $tr.append($category_id);
                $tr.append($Video);
                $tr.append($product_details);
                //   $tr.append($add_product);
                $tr.append($created_on);
                $tr.append($seller_id);
                $tr.append($seller_name);
                $tr.append($thumbnail);
                $tr.append($status);
                $tr.append($changeStatus);

                $('#tableBody').append($tr);
            }

            //console.log(data)
            checkEditAccess();
        })
        .catch(error => {
            // Do something for an error here
            console.log("Error", error);
            alert("Error fetching data");
        })

function checkEditAccess() {

    var userId = localStorage.getItem("userId");
    console.log(userId);

    var userDataRef = accessDB.database().ref().child("Access").child(userId).child(21);//.orderByKey();

    userDataRef.on("value", function (snapshot) {

        //console.log(snapshot.val().view);
        var tble = document.getElementById("table");
        var row = tble.rows;

        if (!snapshot.val().edit) {
            $(".addbtn").remove();
            $(".donebtn").remove();
            $(".prodAddInput").remove();

            for (var j = 0; j < row.length; j++) {

                // Deleting the 10th cell of each row. 
                row[j].deleteCell(11);
            }
        }

    })
}