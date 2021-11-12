// var proxyurl;
var banner = localStorage.getItem("banner");

console.log("banner:",banner);

$(document).ready(getEnglishBanner());
function getEnglishBanner() {
  //  document.getElementById("english").style.display = "none";
  //  document.getElementById("hindi").style.display = "block";
  document.getElementById("english").style.backgroundColor = "#7FFF00";
  document.getElementById("hindi").style.backgroundColor = "pink";
  document.getElementById("zclenglish").style.backgroundColor = "pink";
  document.getElementById("zclhindi").style.backgroundColor = "pink";
  
  myTable.innerHTML ="";
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    var formdata = new FormData();
    formdata.append("offers_id", "0");
    formdata.append("type", "2");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(banner, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                if (result.status == 200) {
                    // console.log(result.list);
                    var myList = result.list;
                    var table = document.getElementById("myTable");
                    document.getElementById("englishBanners").style.display = "block";  // 
                    document.getElementById("hindiBanners").style.display = "none";
                    var offer_type, discount_type;
                    for (var i = 0; i < myList.length; i++) {
                        // console.log(i);
                        switch (myList[i].offer_type) {
                            case 1 :
                                offer_type = "Offer";
                                break;
                            case 2 :
                                offer_type = "Promotion";
                                break;
                        }
                        switch (myList[i].discount_type) {
                            case 1 :
                                discount_type = "Percentage";
                                break;
                            case 2 :
                                discount_type = "Money";
                                break;
                        }
                        var row = "<tr id='" + myList[i].offers_id + "'>" +
                                "<td><button class='editbtn'>Edit</button><br><br><button class='delbtn'>Delete</button></td>" +
                                "<td contenteditable='false'>" + myList[i].offers_id + "</td>" +
                                "<td><img id='displayImg" + myList[i].offers_id + "' style='width: 360px; height: 180px' src=" + myList[i].image + " class='product_image'><label id='editLabel" + myList[i].offers_id + "' for='editImg" + myList[i].offers_id + "' class='fa fa-edit' style='font-size:24px; display:none; cursor:pointer'></label><input type='file' onchange='showPreview(event," + myList[i].offers_id + ")' id='editImg" + myList[i].offers_id + "' accept='image/*' style='display:none'>" + "</td>" +
                                "<td contenteditable='false'>" + myList[i].brand + "</td>" +
                                "<td contenteditable='false'>" + myList[i].category_id + "</td>" +
                                "<td contenteditable='false'>" + myList[i].discount + "</td>" +
                                "<td contenteditable='false'>" + discount_type + "</td>" +
                                "<td contenteditable='false'>" + offer_type + "</td>" +
                                "<td contenteditable='false'>" + myList[i].operation_value + "</td>" +
                                "</tr>";
                        table.innerHTML += row;
                    }

                    // on edit button gets click

                    $('.editbtn').click(function () {
                        var $this = $(this);
                        //get the row element of the edit button
                        var trId = $(this).closest('tr').prop('id');
                        console.log(trId);
                        var currentRow = document.getElementById(trId);
                        var imgLabel = document.getElementById("editLabel" + trId);
                        imgLabel.style.display = "block";

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
                            console.log("ok");
                            //add class to apply css
                            currentRow.classList.add('currRowEdit');
                        } else {
                            $this.html('Edit');
                            //make <td> elements of that row uneditable
                            tds.prop('contenteditable', false);
                            //remove css of that row
                            currentRow.classList.remove('currRowEdit');
                            var dsc_type = currentRow.cells.item(6).innerHTML;
                            var map = {
                                Percentage: 1,
                                Money: 2
                            }
                            var map1 = {
                                Offer: 1,
                                Promotion: 2
                            }
                            var formdata = {
                                offers_id: currentRow.cells.item(1).innerHTML,
                                brand: currentRow.cells.item(3).innerHTML,
                                category_id: currentRow.cells.item(4).innerHTML,
                                discount: currentRow.cells.item(5).innerHTML,
                                discount_type: map[currentRow.cells.item(6).innerHTML].toString(),
                                offer_type: map1[currentRow.cells.item(7).innerHTML].toString(),
                                operation_value: currentRow.cells.item(8).innerHTML,
                                image: document.getElementById('editImg' + trId).files[0]
                            }
                            console.log(formdata);
                            edit(formdata);
                        }
                    }
                    );

                    //when delete button is clicked
                    $('.delbtn').click(function () {

                        var $this = $(this);
                        //get the row element of the delete button
                        var trId = $(this).closest('tr').prop('id');
                        var currentRow = document.getElementById(trId);
                        console.log(trId);

                        var tds = $this.closest('tr').find('td').filter(function () {
                            return $(this).find('.editbtn').length == 0;
                        });

                        var retVal = confirm("Do you want to continue ?");
                        //if 'ok' is clicked on the alert box
                        if (retVal == true) {
                            var formdata = {
                                id: trId
                            };
                            edit(formdata, 1);
                            currentRow.style.display = 'none';
                        }
                    });
                } else {
                    alert("Could not fetch data");
                }
            })
            .catch(error => console.log('error', error));
}

// On click Hindi banner button

function getHindiBanner() {
 //   document.getElementById("english").style.display = "block";   // to apper english banner button
 //   document.getElementById("hindi").style.display = "none";      // to disapper Hindi banner button
 document.getElementById("english").style.backgroundColor = "pink"; 
 document.getElementById("hindi").style.backgroundColor = "#7FFF00";
 document.getElementById("zclenglish").style.backgroundColor = "pink";
 document.getElementById("zclhindi").style.backgroundColor = "pink";  
    myTables.innerHTML ="";
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    var formdata = new FormData();
    formdata.append("offers_id", "0");
    formdata.append("type", "1");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(banner, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result" + result);
                if (result.status == 200) {
                    // console.log(result.list);
                    var myList = result.list;
                    var tables = document.getElementById("myTables");
                    document.getElementById("englishBanners").style.display = "none";
                    document.getElementById("hindiBanners").style.display = "block";
                    var offer_type, discount_type;
                    for (var i = 0; i < myList.length; i++) {
                        // console.log(i);
                        switch (myList[i].offer_type) {
                            case 1 :
                                offer_type = "Offer";
                                break;
                            case 2 :
                                offer_type = "Promotion";
                                break;
                        }
                        switch (myList[i].discount_type) {
                            case 1 :
                                discount_type = "Percentage";
                                break;
                            case 2 :
                                discount_type = "Money";
                                break;
                        }
                        var rows = "<tr id='" + myList[i].offers_id + "'>" +
                                "<td><button class='editbtn'>Edit</button><br><br><button class='delbtn'>Delete</button></td>" +
                                "<td contenteditable='false'>" + myList[i].offers_id + "</td>" +
                                "<td><img id='displayImg" + myList[i].offers_id + "' style='width: 360px; height: 180px' src=" + myList[i].image + " class='product_image'><label id='editLabel" + myList[i].offers_id + "' for='editImg" + myList[i].offers_id + "' class='fa fa-edit' style='font-size:24px; display:none; cursor:pointer'></label><input type='file' onchange='showPreview(event," + myList[i].offers_id + ")' id='editImg" + myList[i].offers_id + "' accept='image/*' style='display:none'>" + "</td>" +
                                "<td contenteditable='false'>" + myList[i].brand + "</td>" +
                                "<td contenteditable='false'>" + myList[i].category_id + "</td>" +
                                "<td contenteditable='false'>" + myList[i].discount + "</td>" +
                                "<td contenteditable='false'>" + discount_type + "</td>" +
                                "<td contenteditable='false'>" + offer_type + "</td>" +
                                "<td contenteditable='false'>" + myList[i].operation_value + "</td>" +
                                "</tr>";
                        tables.innerHTML += rows;
                    }

                    // on edit button gets click

                    $('.editbtn').click(function () {
                        var $this = $(this);
                        //get the row element of the edit button
                        var trId = $(this).closest('tr').prop('id');
                        console.log(trId);
                        var currentRow = document.getElementById(trId);
                        var imgLabel = document.getElementById("editLabel" + trId);
                        imgLabel.style.display = "block";

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
                            console.log("ok");
                            //add class to apply css
                            currentRow.classList.add('currRowEdit');
                        } else {
                            $this.html('Edit');
                            //make <td> elements of that row uneditable
                            tds.prop('contenteditable', false);
                            //remove css of that row
                            currentRow.classList.remove('currRowEdit');
                            var dsc_type = currentRow.cells.item(6).innerHTML;
                            var map = {
                                Percentage: 1,
                                Money: 2
                            }
                            var map1 = {
                                Offer: 1,
                                Promotion: 2
                            }
                            var formdata = {
                                offers_id: currentRow.cells.item(1).innerHTML,
                                brand: currentRow.cells.item(3).innerHTML,
                                category_id: currentRow.cells.item(4).innerHTML,
                                discount: currentRow.cells.item(5).innerHTML,
                                discount_type: map[currentRow.cells.item(6).innerHTML].toString(),
                                offer_type: map1[currentRow.cells.item(7).innerHTML].toString(),
                                operation_value: currentRow.cells.item(8).innerHTML,
                                image: document.getElementById('editImg' + trId).files[0]
                            }
                            console.log(formdata);
                            edit(formdata);
                        }
                    }
                    );

                    //when delete button is clicked
                    $('.delbtn').click(function () {

                        var $this = $(this);
                        //get the row element of the delete button
                        var trId = $(this).closest('tr').prop('id');
                        var currentRow = document.getElementById(trId);
                        console.log(trId);

                        var tds = $this.closest('tr').find('td').filter(function () {
                            return $(this).find('.editbtn').length == 0;
                        });

                        var retVal = confirm("Do you want to continue ?");
                        //if 'ok' is clicked on the alert box
                        if (retVal == true) {
                            var formdata = {
                                id: trId
                            };
                            edit(formdata, 1);
                            currentRow.style.display = 'none';
                        }
                    });
                } else {
                    alert("Could not fetch data");
                }
            })
            .catch(error => console.log('error', error));
}

function getZclEnglishBanner(){
    document.getElementById("english").style.backgroundColor = "pink"; 
 document.getElementById("hindi").style.backgroundColor = "pink";
 document.getElementById("zclenglish").style.backgroundColor = "#7FFF00";
 document.getElementById("zclhindi").style.backgroundColor = "pink";  

 myTables.innerHTML ="";
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    var formdata = new FormData();
    formdata.append("offers_id", "0");
    formdata.append("type", "6");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(banner, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result" + result);
                if (result.status == 200) {
                    // console.log(result.list);
                    var myList = result.list;
                    var tables = document.getElementById("myTables");
                    document.getElementById("englishBanners").style.display = "none";
                    document.getElementById("hindiBanners").style.display = "block";
                    var offer_type, discount_type;
                    for (var i = 0; i < myList.length; i++) {
                        // console.log(i);
                        switch (myList[i].offer_type) {
                            case 1 :
                                offer_type = "Offer";
                                break;
                            case 2 :
                                offer_type = "Promotion";
                                break;
                        }
                        switch (myList[i].discount_type) {
                            case 1 :
                                discount_type = "Percentage";
                                break;
                            case 2 :
                                discount_type = "Money";
                                break;
                        }
                        var rows = "<tr id='" + myList[i].offers_id + "'>" +
                                "<td><button class='editbtn'>Edit</button><br><br><button class='delbtn'>Delete</button></td>" +
                                "<td contenteditable='false'>" + myList[i].offers_id + "</td>" +
                                "<td><img id='displayImg" + myList[i].offers_id + "' style='width: 360px; height: 180px' src=" + myList[i].image + " class='product_image'><label id='editLabel" + myList[i].offers_id + "' for='editImg" + myList[i].offers_id + "' class='fa fa-edit' style='font-size:24px; display:none; cursor:pointer'></label><input type='file' onchange='showPreview(event," + myList[i].offers_id + ")' id='editImg" + myList[i].offers_id + "' accept='image/*' style='display:none'>" + "</td>" +
                                "<td contenteditable='false'>" + myList[i].brand + "</td>" +
                                "<td contenteditable='false'>" + myList[i].category_id + "</td>" +
                                "<td contenteditable='false'>" + myList[i].discount + "</td>" +
                                "<td contenteditable='false'>" + discount_type + "</td>" +
                                "<td contenteditable='false'>" + offer_type + "</td>" +
                                "<td contenteditable='false'>" + myList[i].operation_value + "</td>" +
                                "</tr>";
                        tables.innerHTML += rows;
                    }

                    // on edit button gets click

                    $('.editbtn').click(function () {
                        var $this = $(this);
                        //get the row element of the edit button
                        var trId = $(this).closest('tr').prop('id');
                        console.log(trId);
                        var currentRow = document.getElementById(trId);
                        var imgLabel = document.getElementById("editLabel" + trId);
                        imgLabel.style.display = "block";

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
                            console.log("ok");
                            //add class to apply css
                            currentRow.classList.add('currRowEdit');
                        } else {
                            $this.html('Edit');
                            //make <td> elements of that row uneditable
                            tds.prop('contenteditable', false);
                            //remove css of that row
                            currentRow.classList.remove('currRowEdit');
                            var dsc_type = currentRow.cells.item(6).innerHTML;
                            var map = {
                                Percentage: 1,
                                Money: 2
                            }
                            var map1 = {
                                Offer: 1,
                                Promotion: 2
                            }
                            var formdata = {
                                offers_id: currentRow.cells.item(1).innerHTML,
                                brand: currentRow.cells.item(3).innerHTML,
                                category_id: currentRow.cells.item(4).innerHTML,
                                discount: currentRow.cells.item(5).innerHTML,
                                discount_type: map[currentRow.cells.item(6).innerHTML].toString(),
                                offer_type: map1[currentRow.cells.item(7).innerHTML].toString(),
                                operation_value: currentRow.cells.item(8).innerHTML,
                                image: document.getElementById('editImg' + trId).files[0]
                            }
                            console.log(formdata);
                            edit(formdata);
                        }
                    }
                    );

                    //when delete button is clicked
                    $('.delbtn').click(function () {

                        var $this = $(this);
                        //get the row element of the delete button
                        var trId = $(this).closest('tr').prop('id');
                        var currentRow = document.getElementById(trId);
                        console.log(trId);

                        var tds = $this.closest('tr').find('td').filter(function () {
                            return $(this).find('.editbtn').length == 0;
                        });

                        var retVal = confirm("Do you want to continue ?");
                        //if 'ok' is clicked on the alert box
                        if (retVal == true) {
                            var formdata = {
                                id: trId
                            };
                            edit(formdata, 1);
                            currentRow.style.display = 'none';
                        }
                    });
                } else {
                    alert("Could not fetch data");
                }
            })
            .catch(error => console.log('error', error));

}
function getZclHindiBanner() {
    document.getElementById("english").style.backgroundColor = "pink"; 
 document.getElementById("hindi").style.backgroundColor = "pink";
 document.getElementById("zclenglish").style.backgroundColor = "pink";
 document.getElementById("zclhindi").style.backgroundColor = "#7FFF00";  

 myTables.innerHTML ="";
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    var formdata = new FormData();
    formdata.append("offers_id", "0");
    formdata.append("type", "5");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(banner, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result" + result);
                if (result.status == 200) {
                    // console.log(result.list);
                    var myList = result.list;
                    var tables = document.getElementById("myTables");
                    document.getElementById("englishBanners").style.display = "none";
                    document.getElementById("hindiBanners").style.display = "block";
                    var offer_type, discount_type;
                    for (var i = 0; i < myList.length; i++) {
                        // console.log(i);
                        switch (myList[i].offer_type) {
                            case 1 :
                                offer_type = "Offer";
                                break;
                            case 2 :
                                offer_type = "Promotion";
                                break;
                        }
                        switch (myList[i].discount_type) {
                            case 1 :
                                discount_type = "Percentage";
                                break;
                            case 2 :
                                discount_type = "Money";
                                break;
                        }
                        var rows = "<tr id='" + myList[i].offers_id + "'>" +
                                "<td><button class='editbtn'>Edit</button><br><br><button class='delbtn'>Delete</button></td>" +
                                "<td contenteditable='false'>" + myList[i].offers_id + "</td>" +
                                "<td><img id='displayImg" + myList[i].offers_id + "' style='width: 360px; height: 180px' src=" + myList[i].image + " class='product_image'><label id='editLabel" + myList[i].offers_id + "' for='editImg" + myList[i].offers_id + "' class='fa fa-edit' style='font-size:24px; display:none; cursor:pointer'></label><input type='file' onchange='showPreview(event," + myList[i].offers_id + ")' id='editImg" + myList[i].offers_id + "' accept='image/*' style='display:none'>" + "</td>" +
                                "<td contenteditable='false'>" + myList[i].brand + "</td>" +
                                "<td contenteditable='false'>" + myList[i].category_id + "</td>" +
                                "<td contenteditable='false'>" + myList[i].discount + "</td>" +
                                "<td contenteditable='false'>" + discount_type + "</td>" +
                                "<td contenteditable='false'>" + offer_type + "</td>" +
                                "<td contenteditable='false'>" + myList[i].operation_value + "</td>" +
                                "</tr>";
                        tables.innerHTML += rows;
                    }

                    // on edit button gets click

                    $('.editbtn').click(function () {
                        var $this = $(this);
                        //get the row element of the edit button
                        var trId = $(this).closest('tr').prop('id');
                        console.log(trId);
                        var currentRow = document.getElementById(trId);
                        var imgLabel = document.getElementById("editLabel" + trId);
                        imgLabel.style.display = "block";

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
                            console.log("ok");
                            //add class to apply css
                            currentRow.classList.add('currRowEdit');
                        } else {
                            $this.html('Edit');
                            //make <td> elements of that row uneditable
                            tds.prop('contenteditable', false);
                            //remove css of that row
                            currentRow.classList.remove('currRowEdit');
                            var dsc_type = currentRow.cells.item(6).innerHTML;
                            var map = {
                                Percentage: 1,
                                Money: 2
                            }
                            var map1 = {
                                Offer: 1,
                                Promotion: 2
                            }
                            var formdata = {
                                offers_id: currentRow.cells.item(1).innerHTML,
                                brand: currentRow.cells.item(3).innerHTML,
                                category_id: currentRow.cells.item(4).innerHTML,
                                discount: currentRow.cells.item(5).innerHTML,
                                discount_type: map[currentRow.cells.item(6).innerHTML].toString(),
                                offer_type: map1[currentRow.cells.item(7).innerHTML].toString(),
                                operation_value: currentRow.cells.item(8).innerHTML,
                                image: document.getElementById('editImg' + trId).files[0]
                            }
                            console.log(formdata);
                            edit(formdata);
                        }
                    }
                    );

                    //when delete button is clicked
                    $('.delbtn').click(function () {

                        var $this = $(this);
                        //get the row element of the delete button
                        var trId = $(this).closest('tr').prop('id');
                        var currentRow = document.getElementById(trId);
                        console.log(trId);

                        var tds = $this.closest('tr').find('td').filter(function () {
                            return $(this).find('.editbtn').length == 0;
                        });

                        var retVal = confirm("Do you want to continue ?");
                        //if 'ok' is clicked on the alert box
                        if (retVal == true) {
                            var formdata = {
                                id: trId
                            };
                            edit(formdata, 1);
                            currentRow.style.display = 'none';
                        }
                    });
                } else {
                    alert("Could not fetch data");
                }
            })
            .catch(error => console.log('error', error));

}


//  if Save button has been clicked


function edit(formdata, flag = 0) {
    var myHeaders = new Headers();
    myHeaders.append("userid", "3513");
    myHeaders.append("sessionkey", "AyvRZMmvXUZpKxyYat3qeiD2MRjD66HM");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "2");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

// if delete button gets clicked
    if (flag == 1) {
        var formData = new FormData();
        formData.append("offers_id", formdata.id);
    }
// else if save button gets clicked
    else {
        var formData = new FormData();
        formData.append("offer_type", formdata.offer_type);
        formData.append("brand", formdata.brand);
        formData.append("category_id", formdata.category_id);
        formData.append("discount", formdata.discount);
        formData.append("discount_type", formdata.discount_type);
        formData.append("operation_value", formdata.operation_value);
        formData.append("offers_id", formdata.offers_id);
        formData.append("image", formdata.image);
    }

// console.log(formData.forEach(data => console.log(data)));



    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    };

//    const editurl = "http://api.myzila.com/Banner";
// const proxyurl = "https://cors-anywhere.herokuapp.com/";

    fetch(banner, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                if (result.status == 200) {
                    alert("Changes were updated successfully");
                    window.location.reload();
                }
            })
            .catch(error => console.log('error', error));
}

function showPreview(event, id) {
    // console.log(id);
    if (event.target.files.length > 0) {
        document.getElementById("displayImg" + id).src = URL.createObjectURL(event.target.files[0]);
        flag = 1;
    }
}