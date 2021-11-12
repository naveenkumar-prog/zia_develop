var updateCategory = localStorage.getItem("updateCategory");
var admingetCategory = localStorage.getItem("admingetCategory");

console.log("updateCategory",updateCategory);
console.log("admingetCategory",admingetCategory);

var categories = []

// const proxyurl = "https://cors-anywhere.herokuapp.com/";

// To Update the category

function updateCategory(img, name, hindi_name, tamil_name, min_age, max_age, of_videos, available_in, cat_Id, updateImage) {

    var ofVideos;
    if (of_videos.toLowerCase() == "yes") {
        ofVideos = 1
    } else
        ofVideos = 0

    console.log("Name ", name, "Hindi ", hindi_name, "Tamil ", tamil_name, "Min ", min_age, "Max ", max_age, "Ava", available_in, "Ofvid ", ofVideos);

    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    var formdata = new FormData();
    formdata.append("name", name);
    console.log("Name " + name);
    formdata.append("hindi_name", hindi_name);
    console.log("Hindi Name " + hindi_name);
    formdata.append("tamil_name", tamil_name);
    console.log("Tamil Name " + tamil_name);
    if (updateImage == true) {
        formdata.append("image", img);
    }
    formdata.append("min_age", min_age);
    console.log("Min age " + min_age);
    formdata.append("max_age", max_age);
    console.log("Max age " + max_age);
    formdata.append("ofVideos", ofVideos);
    console.log("Of Videos " + ofVideos);
    formdata.append("available_in", available_in);
    console.log("Ava " + available_in);
    formdata.append("category_id", cat_Id);
    console.log("Id " + cat_Id);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(updateCategory, requestOptions)
            .then(response => response.json())
            .then(result => console.log("Result" + result))
            .catch(error => console.log('error', error));
}

// To delete Category

function deleteCategory(cat_id) {
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    var formdata = new FormData();
    formdata.append("category_id", cat_id);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(updateCategory, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                alert("Category removed");
            })
            .catch(error => console.log('error', error));
}

// Main function

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

fetch(admingetCategory, requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result)
            categories = result.category
            var tab = document.getElementById("myTable");
            tab.innerHTML = ''

            for (var i = 0; i < categories.length; i++) {
                var sno = (i + 1)
                var ofVid;
                if (categories[i].ofVideos == 0)
                    ofVid = "No"
                else
                    ofVid = "Yes"

                var name = "img" + categories[i].category_id

                var row = "<tr id='" + categories[i].category_id + "'>" +
                        "<td>" + sno + "</td>" +
                        "<td><button class='editbtn'>Edit</button><br><br><button class='delbtn'>Delete</button></td>" +
                        "<td>" + categories[i].category_id + "</td>" +
                        "<td class='image'><img src='" + categories[i].image + "' class='categoryImage'><p class='imgbtn'>Change</p><input type='file' name='" + name + "' hidden /></td>" +
                        "<td class='canEdit'>" + categories[i].name + "</td>" +
                        "<td class='canEdit'>" + categories[i].hindi_name + "</td>" +
                        "<td class='canEdit'>" + categories[i].tamil_name + "</td>" +
                        "<td class='canEdit'>" + categories[i].min_age + "</td>" +
                        "<td class='canEdit'>" + categories[i].max_age + "</td>" +
                        "<td class='canEdit'>" + ofVid + "</td>" +
                        "<td>" + categories[i].rank + "</td>" +
                        "<td><button class='viewSubCat' onclick=\"location.href='getSubCategory.html'\"><span>View</span></button></td>" +
                        //onclick=\"location.href='http://api2.myzila.com/ZilaDashBoard/products/getSubCategory.html'\"
                        "<td class='canEdit'>" + categories[i].available_in + "</td>" +
                        "<td>" + categories[i].offer_image + "</td>" +
                        "<td>" + categories[i].offer_in_percent + "</td>" +
                        "<td>" + categories[i].offer_status + "</td>" +
                        "</tr>";

                tab.innerHTML += row;
            }

            // OnClick Change Button 

            $('.imgbtn').click(function () {
                var $this = $(this);
                //get the row element of the button
                var trId = $(this).closest('tr').prop('id');
                var currentRow = document.getElementById(trId);

                //get the <td> elements of the selected row
                var tds = $this.closest('tr').find('.image').filter(function () {
                    return $(this).find('.editbtn').length === 0;
                });

                if ($this.html() === 'Change') {
                    $this.html('Update');
                    var name = "img" + trId
                    document.getElementsByName(name)[0].hidden = false
                } else {
                    $this.html('Change');
                    var name = "img" + trId
                    var imgElem = document.getElementsByName(name)
                    imgElem[0].hidden = true
                    /*
                     if ($(".image:contains('img')")) {
                     //currentRow.cells.item(3).innerHTML = "<input type='file' value='Choose photo'/>"
                     console.log("has image")
                     } else {
                     console.log("no image")
                     }
                     */
                    var img = imgElem[0].files[0]
                    var name = currentRow.cells.item(4).textContent
                    var hindi_name = currentRow.cells.item(5).textContent
                    var tamil_name = currentRow.cells.item(6).textContent
                    var min_age = currentRow.cells.item(7).textContent
                    var max_age = currentRow.cells.item(8).textContent
                    var of_videos = currentRow.cells.item(9).textContent
                    var available_in = currentRow.cells.item(12).textContent
                    var isUpdateImage = true
                    console.log("Image ", img, "Name ", name, "Hindi ", hindi_name, "Tamil ", tamil_name, "Min ", min_age, "Max ", max_age, "Ofvid ", of_videos);
                    if (imgElem[0].files.length == 1) {
                        updateCategory(img, name, hindi_name, tamil_name, min_age, max_age, of_videos, available_in, trId, isUpdateImage);
                    }
                }
            });

            $('.editbtn').click(function () {
                var $this = $(this);
                //get the row element of the edit button
                var trId = $(this).closest('tr').prop('id');
                var currentRow = document.getElementById(trId);

                //get the <td> elements of the selected row that can be edited
                var tds = $this.closest('tr').find('.canEdit').filter(function () {
                    return $(this).find('.editbtn').length === 0;
                });

                if ($this.html() === 'Edit') {
                    $this.html('Save');
                    //make <td> elements of that row editable
                    tds.prop('contenteditable', true);
                    currentRow.classList.add('currRowEdit');
                } else {
                    $this.html('Edit');
                    tds.prop('contenteditable', false);
                    currentRow.classList.remove('currRowEdit');

                    var img = 0
                    var name = currentRow.cells.item(4).textContent;
                    var hindi_name = currentRow.cells.item(5).textContent;
                    var tamil_name = currentRow.cells.item(6).textContent;
                    var min_age = currentRow.cells.item(7).textContent;
                    var max_age = currentRow.cells.item(8).textContent;
                    var of_videos = currentRow.cells.item(9).textContent;
                    var available_in = currentRow.cells.item(12).innerHTML;
                    var isUpdateImage = false
                    console.log("Image ", img, "Name ", name, "Hindi ", hindi_name, "Tamil ", tamil_name, "Min ", min_age, "Max ", max_age, "Ofvid ", of_videos);
                    updateCategory(img, name, hindi_name, tamil_name, min_age, max_age, of_videos, available_in, trId, isUpdateImage);
                }
            });

            // OnClick delete Button

            $('.delbtn').click(function () {
                var $this = $(this);
                //get the row element of the delete button
                var trId = $(this).closest('tr').prop('id');
                var currentRow = document.getElementById(trId);
                console.log(trId);

                var tds = $this.closest('tr').find('td').filter(function () {
                    return $(this).find('.editbtn').length == 0;
                });

                var retVal = confirm("Do you want to remove this category?");
                //if 'ok' is clicked on the alert box
                if (retVal == true) {
                    deleteCategory(trId)
                    currentRow.style.display = 'none';
                }
            });

            // on Click View Button

            $('.viewSubCat').click(function () {
                var $this = $(this);
                //get the row element of the delete button
                var trId = $(this).closest('tr').prop('id');
                var currentRow = document.getElementById(trId);
                localStorage.setItem("catid", trId)
                localStorage.setItem("catName", currentRow.cells.item(4).textContent)
                //console.log(localStorage.getItem("catid"));
                //console.log(localStorage.getItem("catName"));
            });
            checkEditAccess();
        })
        .catch(error => {
            console.log('error', error)
        });

function checkEditAccess() {

    var userId = localStorage.getItem("userId");
    console.log(userId);

    var userDataRef = accessDB.database().ref().child("Access").child(userId).child(18);//.orderByKey();

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
            $(".imgBtn").remove();
        }
        if (!snapshot.val().delete) {
            $(".delBtn").remove();
        }
    })
}