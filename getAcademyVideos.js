// Main Function

var getAcadamyvideos = localStorage.getItem("Acadamyvideos");
var updateAcademy = localStorage.getItem("updateAcademy");

console.log("updateAcademy:",updateAcademy);
console.log("getAcadamyvideos:",getAcadamyvideos);

var videos = []

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

// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const getAcademyUrl = getAcadamyvideos;
const para1 = "?app=";
const para2 = "&isActive=1";


// To Update the Changes
function updateVideo(video_code, appNum, isActive, video_title, vid_id) {
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("video_code", video_code);
    urlencoded.append("app_no", appNum);
    urlencoded.append("isActive", isActive);
    urlencoded.append("video_title", video_title);
    urlencoded.append("academy_videos_id", vid_id);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(updateAcademy, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
}

// To Delete the data

function deleteVideo(vid_id) {
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("academy_videos_id", vid_id);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(updateAcademy, requestOptions)
            .then(response => response.text())
            .then(result => {
                alert("Product deleted");
                console.log(result)
            })
            .catch(error => console.log('error', error));
}


// On click change app

function changeApp(appNum) {

    var url = getAcademyUrl + para1 + appNum + para2;

    fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result)
                videos = result.data
                buildTable(videos)
            })
            .catch(error => console.log('error', error));
}


// To display the data in a table

function buildTable(videos) {
    var table = document.getElementById("myTable")
    table.innerHTML = ''

    for (var i = 0; i < videos.length; i++) {

        var sno = i + 1;

        var app;
        if (videos[i].app_no == 1)
            app = "Zila Users"
        else if (videos[i].app_no == 2)
            app = "Zilakar"
        else if (videos[i].app_no == 3)
            app = "ZCL"

        var active
        if (videos[i].isActive == 1)
            active = "Yes"
        else
            active = "No"

        var row = "<tr id='" + videos[i].academy_videos_id + "'>" +
                "<td>" + sno + "</td>" +
                "<td><button class='editbtn'>Edit</button><br><button class='delbtn'>Delete</button></td>" +
                "<td>" + app + "</td>" +
                "<td>" + active + "</td>" +
                "<td>" + videos[i].video_link + "</td>" +
                "<td>" + videos[i].video_title + "</td>" +
                "<td>" + videos[i].created_on + "</td>" +
                "<td>" + videos[i].updated_on + "</td>" +
                "</tr>";

        table.innerHTML += row;
    }

    // On click edit Button

    $('.editbtn').click(function () {
        var $this = $(this);
        //get the row element of the edit button
        var trId = $(this).closest('tr').prop('id');
        var currentRow = document.getElementById(trId);

        //get the <td> elements of the selected row
        var tds = $this.closest('tr').find('td').filter(function () {
            return $(this).find('.editbtn').length === 0;
        });

        //if the button displays 'edit'
        if ($this.html() === 'Edit') {
            //change text displayed in button to 'save' 
            $this.html('Save');
            //make <td> elements of that row editable
            tds.prop('contenteditable', true);
            //add class to apply css
            currentRow.classList.add('currRowEdit');
        } else {
            $this.html('Edit');
            //make <td> elements of that row uneditable
            tds.prop('contenteditable', false);
            //remove css of that row
            currentRow.classList.remove('currRowEdit');
            //get the values stored in the discount and actual amount fields and update them
            var video_link = currentRow.cells.item(4).textContent;

            var appNum;
            var app = currentRow.cells.item(2).textContent;
            if (app == "Zila Users")
                appNum = 1
            else if (app == "Zilakar")
                appNum = 2
            else if (app == "ZCL")
                appNum = 3

            var isActive
            var active = currentRow.cells.item(3).textContent;
            if (active.toLowerCase() == "yes")
                isActive = 1
            else
                isActive = 0

            var video_title = currentRow.cells.item(5).textContent;
            console.log("VidLink ", video_link, " AppNum ", appNum, " Isactive ", isActive, " VidTitle ", video_title, " id", trId);
            updateVideo(video_link, appNum, isActive, video_title, trId);
        }
    });

    $('.delbtn').click(function () {
        var $this = $(this);
        //get the row element of the delete button
        var trId = $(this).closest('tr').prop('id');
        var currentRow = document.getElementById(trId);
        //console.log(trId);

        var tds = $this.closest('tr').find('td').filter(function () {
            return $(this).find('.editbtn').length == 0;
        });

        var retVal = confirm("Do you want to delete this video?");
        //if 'ok' is clicked on the alert box
        if (retVal == true) {
            deleteVideo(trId)
            currentRow.style.display = 'none';
        }
    });

    checkEditAccess();
}

/*
 document.onreadystatechange = function() { 
 if (document.readyState !== "complete") { 
 document.querySelector("body").style.visibility = "hidden"; 
 document.querySelector("#loader").style.visibility = "visible"; 
 } else { 
 document.querySelector("#loader").style.display = "none"; 
 document.querySelector("body").style.visibility = "visible"; 
 } 
 }; 
 */

function checkEditAccess() {

    var userId = localStorage.getItem("userId");
    console.log(userId);

    var userDataRef = accessDB.database().ref().child("Access").child(userId).child(24);//.orderByKey();

    userDataRef.on("value", function (snapshot) {

        //console.log(snapshot.val().view);

        var tble = document.getElementById("table-1");
        var row = tble.rows;

        if ((!snapshot.val().edit) && (!snapshot.val().delete)) {

            for (var j = 0; j < row.length; j++) {

                // Deleting the 10th cell of each row. 
                row[j].deleteCell(1);
            }

        }
        if (!snapshot.val().edit) {
            $(".editBtn").remove();
        }
        if (!snapshot.val().delete) {
            $(".delBtn").remove();
        }
    })
}