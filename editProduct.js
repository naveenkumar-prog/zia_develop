// $(document).ready(function(){
//     if(fileAlreadyLoaded()){
//         return;
//     }
// })

var updateproduct = localStorage.getItem("updateproduct");
var uploadproduct = localStorage.getItem("uploadproduct");
var getproduct = localStorage.getItem("getproduct");
var getimage = localStorage.getItem("getimage");
var postimage = localStorage.getItem("postimage");

var products = [];
// console.log("x");
var myHeaders = new Headers();
myHeaders.append("userid", "1784");
myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
myHeaders.append("languagetype", "1");
myHeaders.append("usertype", "0");
myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

var c_id = localStorage.getItem("catid");
console.log(c_id);
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};


var getProductUrl = getproduct+"category_id=0&page=";
var numOfProducts;
var state = {
    'querySet': products,

    'page': 1,

    //number of table rows per page
    'rows': 10,

    //number of page number buttons at the bottom
    'window': 5,
}



//var cat_id = 12;

buildTable0();
// To set number of rows per page

function pagination(querySet, page, rows) {


    var pages = Math.ceil(numOfProducts / rows);
//    console.log("Pagination enters:");
 //   console.log("no_products:",numOfProducts);

    return {
        'querySet': querySet,
        'pages': pages,
    }
}


//pageButtons()
// To display the page buttons in footer according to searchby page

function pageButtons0(pages) {
    // console.log(pages)
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
    //console.log('Pages:', pages)

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

    wrapper.innerHTML += `<button value=${1} class="page btn btn-sm btn-info activePage pg${1} ">${1}</button>`

    for (var page = 2; page <= 5; page++) {
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info pg${page} ">${page}</button>`
    }

   // if (state.page != 1) {
   //     wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info ">&#171; First</button>` + wrapper.innerHTML
   // }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }
    console.log("sate.paage: 0");
     


    $('.page').on('click', function () {
        $('#table-body').empty()
        var pgs = document.getElementsByClassName("page");
        for (i = 0; i < pgs.length; i++) {
            pgs[i].classList.remove("activePage");
        }

        state.page = Number($(this).val())
                
        $(this).addClass("activePage");
       console.log("Before buildtable this :",this);
       setValue();
        buildTable();
    })
}
function pageButtons3(pages) {
    // console.log(pages)
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
    //console.log('Pages:', pages)

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
    console.log("sate.pg:",state.page);
   // if (state.page == 1) {
     //   wrapper.innerHTML += `<button value=${1} class="page btn btn-sm btn-info activePage  pg${1} ">${1}</button>`
   // }else{
      //  wrapper.innerHTML += `<button value=${1} class="page btn btn-sm btn-info  pg${1} ">${1}</button>`
    //}

    

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info ">&#171; First</button>` + wrapper.innerHTML
    }
    for (var page = 1; page <= 5; page++) {
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info pg${page} ">${page}</button>`
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }
    console.log("sate.paage: 0");
     


    $('.page').on('click', function () {
        $('#table-body').empty()
        var pgs = document.getElementsByClassName("page");
        for (i = 0; i < pgs.length; i++) {
            pgs[i].classList.remove("activePage");
        }

        state.page = Number($(this).val())
        console.log("sate.page",state.page);
        $(this).addClass("activePage");
       console.log("Before buildtable this :",this);
       setValue();
        buildTable3();
    })
}



function pageButtons(pages) {
    // console.log(pages)
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
    //console.log('Pages:', pages)

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
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info pg${page} ">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }
    console.log("sate.paage: 0");
     


    $('.page').on('click', function () {
        $('#table-body').empty()
        var pgs = document.getElementsByClassName("page");
        for (i = 0; i < pgs.length; i++) {
            pgs[i].classList.remove("activePage");
        }

        state.page = Number($(this).val())
                
        $(this).addClass("activePage");
       console.log("Before buildtable this :",this);
       setValue();
        buildTable();
    })
}


function setValue(){
    document.getElementById("page_no").value = "";
}

var flag;

// Function for the Table
function buildTable0() {

 document.getElementById("search-input").value='';
 document.getElementById("nproducts").style.visibility="visible";
    var myHeaders = new Headers();
myHeaders.append("sessionkey", "a2ed9c4adb38820e98d7f511962e2372");
myHeaders.append("usertype", "3");
myHeaders.append("userid", "25");
myHeaders.append("languagetype", "2");
myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

    //console.log("buildTable enters");
    passval();
    var lo_storage = localStorage.getItem("dcat_value");
console.log("loc_storage:",lo_storage);
var lo_storage2 = localStorage.getItem("dsub_cat_value");
console.log("loc_storage2:",lo_storage2);

    fetch(getproduct+"category_id="+lo_storage.toString()+"&page=" + (state.page - 1) + "&isFilter=1&sub_category_id=0", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("res",result);
                document.getElementById("loader").style.display = "none";
     //            console.log("Filter Count in buildTable0:", result.filtercount);
                 var fil_page = Math.ceil(result.filtercount/10);
       //          console.log("Fil_page:",fil_page);
                products = result.data;
                state.querySet = products;
                var table = document.getElementById("myTable")
                table.innerHTML = ''

                var lang = document.getElementById("selectLang").value;
                var name1 = '';
                var desc = '';
                var color = '';

                var res = pagination(state.querySet, state.page, state.rows)
                var myList = res.querySet

                for (var i = 0; i < myList.length; i++)
                {
                    // console.log(myList[i].vendor_id)
                    if (lang == "english") {
                        name1 = myList[i].name;
                        desc = myList[i].description;
                        color = myList[i].color;
                    } else if (lang == "hindi") {
                        name1 = myList[i].hindi_name;
                        desc = myList[i].hindi_desc;
                        color = myList[i].hindi_color;
                    } else if (lang == "tamil") {
                        name1 = myList[i].tamil_name;
                        desc = myList[i].tamil_desc;
                        color = myList[i].tamil_color;
                    }

                    var row = "<tr class='del' id=" + myList[i].product_id + ">" +
                            "<td><button class='editbtn'>Edit</button><br><br><button class='delbtn'>Delete</button></td>" +
                            "<td>" + myList[i].product_id + "</td>" +
                            "<td>" +
                            "<img id='displayImg" + myList[i].product_id + "' src=" + myList[i].image + " class='product_image'>" +
                            "<label id='editLabel" + myList[i].product_id + "' for='editImg" + myList[i].product_id + "' class='fa fa-edit' style='font-size:24px; display:none; cursor:pointer'></label>" +
                            "<input type='file' onchange='showPreview(event," + myList[i].product_id + ")' id='editImg" + myList[i].product_id + "' accept='image/*' style='display:none'>" +
                            "<button style='margin-top:5px;' type='button' id='multiImagesBtn" + myList[i].product_id + "' class='btn btn-success' data-toggle='modal' onclick='multiImages(this.id)'>View more images</button>" +
                            "</td>" +
                            "<td contenteditable='true'>" + name1 + "</td>" +
                            "<td><div contenteditable='false' id='descriptionDiv" + myList[i].product_id + "' style='width:150px; white-space: pre-wrap;'>" + formatDesc(desc) + "</div><textarea style='display: none' rows='4' cols='50' id='description" + myList[i].product_id + "' >" + desc + "</textarea><button id='descPreview" + myList[i].product_id + "' class='btn btn-primary btn-sm' onclick='descPreview(" + myList[i].product_id + ")' style='display:none;'>Preview</button></td>" +
                            "<td contenteditable='true' class='actualAmount'>" + myList[i].actual_amount + "</td>" +
                            "<td contenteditable='true' class='discount'>" + myList[i].discount + "</td>" +
                            "<td contenteditable='false'>" + myList[i].final_amount + "</td>" +
                            "<td contenteditable='false' id='cid'>" + myList[i].category_id + "</td>" +
                            "<td contenteditable='false'>" + myList[i].sub_category_id + "</td>" +
                            "<td contenteditable='false'>" + myList[i].seller_id + "</td>" +
                            "<td contenteditable='false'>" + myList[i].old_discount + "</td>" +
                            "<td contenteditable='true'>" + myList[i].product_count + "</td>" +
                            "<td contenteditable='true'>" + myList[i].size + "</td>" +
                            "<td contenteditable='true'>" + color + "</td>" +
                            "<td contenteditable='false'>" + myList[i].brand + "</td>" +
                            "<td contenteditable='false'>" + myList[i].brand_id + "</td>" +
                            "<td contenteditable='true'>" + myList[i].fabric + "</td>" +
                            "<td contenteditable='true'>" + myList[i].returnable + "</td>" +
                            "<td contenteditable='true'>" + myList[i].max_day_return + "</td>" +
                            "<td contenteditable='true'>" + myList[i].hashtag + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].name + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].description + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].color + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].hindi_name + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].hindi_desc + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].hindi_color + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].tamil_name + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].tamil_desc + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].tamil_color + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].vendor_id + "</td>" +
                            "<td contenteditable='true'>" + myList[i].transfer_amt + "</td>" +
                            "<td contenteditable='true'>" + myList[i].store_partner_com + "</td>" +
                            "</tr>";
                    table.innerHTML += row;
                    //mainContainer.appendChild(row);
                }

                //when edit button is clicked
                $('.editbtn').click(function () {
                    var $this = $(this);
                    //get the row element of the edit button
                    var trId = $(this).closest('tr').prop('id');
                    var currentRow = document.getElementById(trId);
                    var imgLabel = document.getElementById("editLabel" + trId);
                    imgLabel.style.display = "block";
                    var desc = document.getElementById("descriptionDiv" + trId);
                    var descTA = document.getElementById("description" + trId);
                    var multiImagesBtn = document.getElementById("multiImagesBtn" + trId);
                    var descPreview = document.getElementById('descPreview' + trId);

                    //get the <td> elements of the selected row
                    var tds = $this.closest('tr').find('td').filter(function () {
                        return $(this).find('.editbtn').length === 0;
                    });

                    //if the button displays 'edit'
                    if ($this.html() === 'Edit') {
                        //change text displayed in button to 'save' 
                        $this.html('Save');
                        //make <td> elements of that row editable
                        console.log("4");
                       // tds.prop('contenteditable', true);
                        tds[1].setAttribute("contenteditable", "false");
                        console.log("tds[1]",tds[1]);
                      //  
                //add class to apply css
                        currentRow.classList.add('currRowEdit');
                        desc.style.display = 'none';
                        descTA.style.display = 'block';
                        multiImagesBtn.style.display = 'none';
                        descPreview.style.display = 'block';

                    } else {
                        $this.html('Edit');
                        //make <td> elements of that row uneditable
                        tds.prop('contenteditable', false);
                        //remove css of that row
                        currentRow.classList.remove('currRowEdit');
                        descPreview.style.display = 'none';
                        desc.style.display = 'block';
                        console.log(descTA.value)
                        desc.innerHTML = formatDesc(descTA.value);
                        descTA.style.display = 'none';
                        multiImagesBtn.style.display = 'block';
                        descPreview.style.display = 'none';
                        imgLabel.style.display = "none";

                        //get the values stored in the discount and actual amount fields and update them
                        // var discount = currentRow.cells.item(6).innerHTML;
                        // var actualAmount = currentRow.cells.item(5).innerHTML;
                        // console.log("amt: ", actualAmount, "dis ", discount, "id",trId);
                        var lang = document.getElementById("selectLang").value;
                        var name1, desc1, color1, hindi_name1, hindi_color1, hindi_desc1, tamil_name1, tamil_color1, tamil_desc1;
                        if (lang == "english") {
                            name1 = currentRow.cells.item(3).innerHTML;
                            desc1 = descTA.value;
                            color1 = currentRow.cells.item(14).innerHTML;
                            hindi_name1 = currentRow.cells.item(24).innerHTML;
                            hindi_desc1 = currentRow.cells.item(25).innerHTML;
                            hindi_color1 = currentRow.cells.item(26).innerHTML;
                            tamil_name1 = currentRow.cells.item(27).innerHTML;
                            tamil_desc1 = currentRow.cells.item(28).innerHTML;
                            tamil_color1 = currentRow.cells.item(29).innerHTML;
                        } else if (lang == "hindi") {
                            name1 = currentRow.cells.item(21).innerHTML;
                            desc1 = currentRow.cells.item(22).innerHTML;
                            color1 = currentRow.cells.item(23).innerHTML;
                            hindi_name1 = currentRow.cells.item(3).innerHTML;
                            hindi_desc1 = descTA.value;
                            hindi_color1 = currentRow.cells.item(14).innerHTML;
                            tamil_name1 = currentRow.cells.item(27).innerHTML;
                            tamil_desc1 = currentRow.cells.item(28).innerHTML;
                            tamil_color1 = currentRow.cells.item(29).innerHTML;
                        } else if (lang == "tamil") {
                            name1 = currentRow.cells.item(21).innerHTML;
                            desc1 = currentRow.cells.item(22).innerHTML;
                            color1 = currentRow.cells.item(23).innerHTML;
                            hindi_name1 = currentRow.cells.item(24).innerHTML;
                            hindi_desc1 = currentRow.cells.item(25).innerHTML;
                            hindi_color1 = currentRow.cells.item(26).innerHTML;
                            tamil_name1 = currentRow.cells.item(3).innerHTML;
                            tamil_desc1 = descTA.value;
                            tamil_color1 = currentRow.cells.item(14).innerHTML;
                        }

                        var formdata = {
                            discount: currentRow.cells.item(6).innerHTML,
                            amount: currentRow.cells.item(5).innerHTML,
                            product_id: trId,
                            name: name1,
                            hindi_name: hindi_name1,
                            tamil_name: tamil_name1,
                            description: desc1,
                            hindi_desc: hindi_desc1,
                            tamil_desc: tamil_desc1,
                            category_id: currentRow.cells.item(8).innerHTML,
                            sub_category_id: currentRow.cells.item(9).innerHTML,
                            old_discount: currentRow.cells.item(11).innerHTML,
                            product_count: currentRow.cells.item(12).innerHTML,
                            size: currentRow.cells.item(13).innerHTML,
                            color: currentRow.cells.item(14).innerHTML,
                            hindi_color: hindi_color1,
                            tamil_color: tamil_color1,
                            brand: currentRow.cells.item(15).innerHTML,
                            brand_id: currentRow.cells.item(16).innerHTML,
                            fabric: currentRow.cells.item(17).innerHTML,
                            returnable: currentRow.cells.item(18).innerHTML,
                            max_day_return: currentRow.cells.item(19).innerHTML,
                            hashtag: currentRow.cells.item(20).innerHTML,
                            vendor_id: currentRow.cells.item(30).innerHTML,
                            transfer_amt: currentRow.cells.item(31).innerHTML,
                            store_partner_com:currentRow.cells.item(32).innerHTML,

                        }
                        console.log("f",formdata);
                        updateProduct(formdata);
                        multiImagesBtn.style.display = 'block';
                    }
                });

                //when delete button is clicked
                $('.delbtn').click(function () {
                    var $this = $(this);
                    //get the row element of the delete button
                    var trId = $(this).closest('tr').prop('id');
                    var currentRow = document.getElementById(trId);
         //           console.log(trId);

                    var tds = $this.closest('tr').find('td').filter(function () {
                        return $(this).find('.editbtn').length == 0;
                    });

                    var retVal = confirm("Do you want to continue ?");
                    //if 'ok' is clicked on the alert box
                    if (retVal == true) {
                        deleteProduct(trId)
                        alert("product deleted");
                        currentRow.style.display = 'none';
                    }
                });

                pageButtons(fil_page);
                console.log("fil_page:",fil_page);
                var pg = document.getElementsByClassName("pg" + state.page)[0];
                pg.classList.add("activePage");

                checkEditAccess();

            })
            .catch(error => console.log('error', error));

}



function buildTable() {

    document.getElementById("search-input").value='';
    var myHeaders = new Headers();
myHeaders.append("sessionkey", "a2ed9c4adb38820e98d7f511962e2372");
myHeaders.append("usertype", "3");
myHeaders.append("userid", "25");
myHeaders.append("languagetype", "2");
myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
document.getElementById("nproducts").style.visibility="visible";
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

   // console.log("buildTable enters");
    passval();
    var lo_storage = localStorage.getItem("dcat_value");
console.log("Cat_sel:",lo_storage);
var lo_storage2 = localStorage.getItem("dsub_cat_value");
console.log("Sub_cat_sel:",lo_storage2);

if (lo_storage==0) {
    buildTable0(); 
}
else{
    fetch(getproduct+"category_id="+lo_storage.toString()+"&page=" + (state.page - 1) + "&isFilter=1&sub_category_id="+lo_storage2.toString(), requestOptions)
            .then(response => response.json())
            .then(result => {
                document.getElementById("loader").style.display = "none";
    //             console.log("Filter Count in buildTable0:", result.filtercount);
                 var fil_page = Math.ceil(result.filtercount/10);
               //  console.log("Fil_page:",fil_page);
                products = result.data;
                state.querySet = products;
                var table = document.getElementById("myTable")
                table.innerHTML = ''

                var lang = document.getElementById("selectLang").value;
                var name1 = '';
                var desc = '';
                var color = '';

                var res = pagination(state.querySet, state.page, state.rows)
                var myList = res.querySet

                for (var i = 0; i < myList.length; i++)
                {
                    // console.log(myList[i].vendor_id)
                    if (lang == "english") {
                        name1 = myList[i].name;
                        desc = myList[i].description;
                        color = myList[i].color;
                    } else if (lang == "hindi") {
                        name1 = myList[i].hindi_name;
                        desc = myList[i].hindi_desc;
                        color = myList[i].hindi_color;
                    } else if (lang == "tamil") {
                        name1 = myList[i].tamil_name;
                        desc = myList[i].tamil_desc;
                        color = myList[i].tamil_color;
                    }

                     var row = "<tr class='del' id=" + myList[i].product_id + ">" +
                            "<td><button class='editbtn'>Edit</button><br><br><button class='delbtn'>Delete</button></td>" +
                            "<td>" + myList[i].product_id + "</td>" +
                            "<td>" +
                            "<img id='displayImg" + myList[i].product_id + "' src=" + myList[i].image + " class='product_image'>" +
                            "<label id='editLabel" + myList[i].product_id + "' for='editImg" + myList[i].product_id + "' class='fa fa-edit' style='font-size:24px; display:none; cursor:pointer'></label>" +
                            "<input type='file' onchange='showPreview(event," + myList[i].product_id + ")' id='editImg" + myList[i].product_id + "' accept='image/*' style='display:none'>" +
                            "<button style='margin-top:5px;' type='button' id='multiImagesBtn" + myList[i].product_id + "' class='btn btn-success' data-toggle='modal' onclick='multiImages(this.id)'>View more images</button>" +
                            "</td>" +
                            "<td contenteditable='true'>" + name1 + "</td>" +
                            "<td><div contenteditable='false' id='descriptionDiv" + myList[i].product_id + "' style='width:150px; white-space: pre-wrap;'>" + formatDesc(desc) + "</div><textarea style='display: none' rows='4' cols='50' id='description" + myList[i].product_id + "' >" + desc + "</textarea><button id='descPreview" + myList[i].product_id + "' class='btn btn-primary btn-sm' onclick='descPreview(" + myList[i].product_id + ")' style='display:none;'>Preview</button></td>" +
                            "<td contenteditable='true' class='actualAmount'>" + myList[i].actual_amount + "</td>" +
                            "<td contenteditable='true' class='discount'>" + myList[i].discount + "</td>" +
                            "<td contenteditable='false'>" + myList[i].final_amount + "</td>" +
                            "<td contenteditable='false' id='cid'>" + myList[i].category_id + "</td>" +
                            "<td contenteditable='false'>" + myList[i].sub_category_id + "</td>" +
                            "<td contenteditable='false'>" + myList[i].seller_id + "</td>" +
                            "<td contenteditable='false'>" + myList[i].old_discount + "</td>" +
                            "<td contenteditable='true'>" + myList[i].product_count + "</td>" +
                            "<td contenteditable='true'>" + myList[i].size + "</td>" +
                            "<td contenteditable='true'>" + color + "</td>" +
                            "<td contenteditable='false'>" + myList[i].brand + "</td>" +
                            "<td contenteditable='false'>" + myList[i].brand_id + "</td>" +
                            "<td contenteditable='true'>" + myList[i].fabric + "</td>" +
                            "<td contenteditable='true'>" + myList[i].returnable + "</td>" +
                            "<td contenteditable='true'>" + myList[i].max_day_return + "</td>" +
                            "<td contenteditable='true'>" + myList[i].hashtag + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].name + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].description + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].color + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].hindi_name + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].hindi_desc + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].hindi_color + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].tamil_name + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].tamil_desc + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].tamil_color + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].vendor_id + "</td>" +
                            "<td contenteditable='true'>" + myList[i].transfer_amt + "</td>" +
                            "<td contenteditable='true'>" + myList[i].store_partner_com + "</td>" +
                            "</tr>";
                    table.innerHTML += row;
                    //mainContainer.appendChild(row);
                }

                //when edit button is clicked
                $('.editbtn').click(function () {
                    var $this = $(this);
                    //get the row element of the edit button
                    var trId = $(this).closest('tr').prop('id');
                    var currentRow = document.getElementById(trId);
                    var imgLabel = document.getElementById("editLabel" + trId);
                    imgLabel.style.display = "block";
                    var desc = document.getElementById("descriptionDiv" + trId);
                    var descTA = document.getElementById("description" + trId);
                    var multiImagesBtn = document.getElementById("multiImagesBtn" + trId);
                    var descPreview = document.getElementById('descPreview' + trId);

                    //get the <td> elements of the selected row
                    var tds = $this.closest('tr').find('td').filter(function () {
                        return $(this).find('.editbtn').length === 0;
                    });

                    //if the button displays 'edit'
                    if ($this.html() === 'Edit') {
                        //change text displayed in button to 'save' 
                        $this.html('Save');
                        //make <td> elements of that row editable
                        console.log("2");
                        tds.prop('contenteditable', false);
                        //add class to apply css
                        currentRow.classList.add('currRowEdit');
                        desc.style.display = 'none';
                        descTA.style.display = 'block';
                        multiImagesBtn.style.display = 'none';
                        descPreview.style.display = 'block';

                    } else {
                        $this.html('Edit');
                        //make <td> elements of that row uneditable
                        tds.prop('contenteditable', false);
                        //remove css of that row
                        currentRow.classList.remove('currRowEdit');
                        descPreview.style.display = 'none';
                        desc.style.display = 'block';
                        console.log(descTA.value)
                        desc.innerHTML = formatDesc(descTA.value);
                        descTA.style.display = 'none';
                        multiImagesBtn.style.display = 'block';
                        descPreview.style.display = 'none';
                        imgLabel.style.display = "none";

                        //get the values stored in the discount and actual amount fields and update them
                        // var discount = currentRow.cells.item(6).innerHTML;
                        // var actualAmount = currentRow.cells.item(5).innerHTML;
                        // console.log("amt: ", actualAmount, "dis ", discount, "id",trId);
                        var lang = document.getElementById("selectLang").value;
                        var name1, desc1, color1, hindi_name1, hindi_color1, hindi_desc1, tamil_name1, tamil_color1, tamil_desc1;
                        if (lang == "english") {
                            name1 = currentRow.cells.item(3).innerHTML;
                            desc1 = descTA.value;
                            color1 = currentRow.cells.item(14).innerHTML;
                            hindi_name1 = currentRow.cells.item(24).innerHTML;
                            hindi_desc1 = currentRow.cells.item(25).innerHTML;
                            hindi_color1 = currentRow.cells.item(26).innerHTML;
                            tamil_name1 = currentRow.cells.item(27).innerHTML;
                            tamil_desc1 = currentRow.cells.item(28).innerHTML;
                            tamil_color1 = currentRow.cells.item(29).innerHTML;
                        } else if (lang == "hindi") {
                            name1 = currentRow.cells.item(21).innerHTML;
                            desc1 = currentRow.cells.item(22).innerHTML;
                            color1 = currentRow.cells.item(23).innerHTML;
                            hindi_name1 = currentRow.cells.item(3).innerHTML;
                            hindi_desc1 = descTA.value;
                            hindi_color1 = currentRow.cells.item(14).innerHTML;
                            tamil_name1 = currentRow.cells.item(27).innerHTML;
                            tamil_desc1 = currentRow.cells.item(28).innerHTML;
                            tamil_color1 = currentRow.cells.item(29).innerHTML;
                        } else if (lang == "tamil") {
                            name1 = currentRow.cells.item(21).innerHTML;
                            desc1 = currentRow.cells.item(22).innerHTML;
                            color1 = currentRow.cells.item(23).innerHTML;
                            hindi_name1 = currentRow.cells.item(24).innerHTML;
                            hindi_desc1 = currentRow.cells.item(25).innerHTML;
                            hindi_color1 = currentRow.cells.item(26).innerHTML;
                            tamil_name1 = currentRow.cells.item(3).innerHTML;
                            tamil_desc1 = descTA.value;
                            tamil_color1 = currentRow.cells.item(14).innerHTML;
                        }

                        var formdata = {
                            discount: currentRow.cells.item(6).innerHTML,
                            amount: currentRow.cells.item(5).innerHTML,
                            product_id: trId,
                            name: name1,
                            hindi_name: hindi_name1,
                            tamil_name: tamil_name1,
                            description: desc1,
                            hindi_desc: hindi_desc1,
                            tamil_desc: tamil_desc1,
                            category_id: currentRow.cells.item(8).innerHTML,
                            sub_category_id: currentRow.cells.item(9).innerHTML,
                            old_discount: currentRow.cells.item(11).innerHTML,
                            product_count: currentRow.cells.item(12).innerHTML,
                            size: currentRow.cells.item(13).innerHTML,
                            color: currentRow.cells.item(14).innerHTML,
                            hindi_color: hindi_color1,
                            tamil_color: tamil_color1,
                            brand: currentRow.cells.item(15).innerHTML,
                            brand_id: currentRow.cells.item(16).innerHTML,
                            fabric: currentRow.cells.item(17).innerHTML,
                            returnable: currentRow.cells.item(18).innerHTML,
                            max_day_return: currentRow.cells.item(19).innerHTML,
                            hashtag: currentRow.cells.item(20).innerHTML,
                            vendor_id: currentRow.cells.item(30).innerHTML,
                            transfer_amt: currentRow.cells.item(31).innerHTML,
                            store_partner_com:currentRow.cells.item(32).innerHTML,

                        }
                        console.log(formdata);
                        updateProduct(formdata);
                        multiImagesBtn.style.display = 'block';
                    }
                });

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
                        deleteProduct(trId)
                        alert("product deleted");
                        currentRow.style.display = 'none';
                    }
                });

                pageButtons(fil_page);
                var pg = document.getElementsByClassName("pg" + state.page)[0];
                pg.classList.add("activePage");

                checkEditAccess();

            })
            .catch(error => console.log('error', error));

}
}

    

//update products after changing value and clicking on 'save'
function updateProduct(formdata)
{
    var myHeaders = new Headers();
    myHeaders.append("userid", localStorage.getItem("userId"));
    myHeaders.append("sessionkey", sessionStorage.getItem("sessionKey"));
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", sessionStorage.getItem("usertype"));
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    // var urlencoded = new URLSearchParams();
    // urlencoded.append("discount", discount);
    // urlencoded.append("amount", amt);
    var store_partner_com1 = formdata.store_partner_com.replace("<br>","");
    var dis1 = formdata.discount.replace("<br>","");
    console.log("dis:",formdata.store_partner_com,store_partner_com1)
    // urlencoded.append("product_id", id);
    var formData = new FormData();
    formData.append("discount", dis1);
    formData.append("amount", formdata.amount.replace("<br>",""));
    formData.append("product_id", formdata.product_id.replace("<br>",""));
    formData.append("name", formdata.name.replace("<br>",""));
    formData.append("hindi_name", formdata.hindi_name.replace("<br>",""));
    formData.append("tamil_name", formdata.tamil_name.replace("<br>",""));
    formData.append("description", formdata.description.replace("<br>",""));
    formData.append("hindi_desc", formdata.hindi_desc.replace("<br>",""));
    formData.append("tamil_desc", formdata.tamil_desc.replace("<br>",""));
    formData.append("category_id", formdata.category_id.replace("<br>",""));
    formData.append("sub_category_id", formdata.sub_category_id.replace("<br>",""));
    formData.append("old_discount", formdata.old_discount.replace("<br>",""));
    formData.append("product_count", formdata.product_count.replace("<br>",""));
    formData.append("size", formdata.size.replace("<br>",""));
    formData.append("color", formdata.color.replace("<br>",""));
    formData.append("hindi_color", formdata.hindi_color.replace("<br>",""));
    formData.append("tamil_color", formdata.tamil_color.replace("<br>",""));
    formData.append("brand", formdata.brand.replace("<br>",""));
    formData.append("brand_id", formdata.brand_id.replace("<br>",""));
    formData.append("fabric", formdata.fabric.replace("<br>",""));
    formData.append("returnable", formdata.returnable.replace("<br>",""));
    formData.append("max_day_return", formdata.max_day_return.replace("<br>",""));
    formData.append("hashtag", formdata.hashtag.replace("<br>",""));
    formData.append("vendor_id", formdata.vendor_id.replace("<br>",""));
    formData.append("transfer_amt", formdata.transfer_amt.replace("<br>",""));
    formData.append("store_partner_com",store_partner_com1);
    // formData.append("store_partner_com",formdata.store_partner_com);
    console.log("Before flag",formdata);
    if (flag) {
        formData.append("image", document.getElementById('editImg' + formdata.product_id).files[0]);
    }

    

    var updateOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    }
    // console.log("Func amt: "+ amt+ "dis "+ discount+ "id",id);

    fetch(updateproduct, updateOptions)
            .then(response => response.text())
            .then(result => {
                console.log("updateproduct",result);
                alert("Successfully updated product details");
                // window.location.reload();
            })
            .catch(error => {
                console.log("error", error);
                alert("Error updating product details");
            });

    //document.location.reload();
}

//delete function to delete a product
function deleteProduct(id)
{
    console.log(id);
    var deleteProductHeaders = new Headers();
    deleteProductHeaders.append("userid", "1784");
    deleteProductHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    deleteProductHeaders.append("languagetype", "1");
    deleteProductHeaders.append("usertype", "0");
    deleteProductHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    var formdata = new FormData();
    formdata.append("product_id", id);

    var deleteOptions = {
        method: 'POST',
        headers: deleteProductHeaders,
        body: formdata,
        redirect: 'follow'
    }

    fetch(updateproduct, deleteOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status == 200)
                {
                    console.log(result);
                    alert("Successfully deleted product details")
                } else {
                    alert("Error deleting product details")
                }
            })
            .catch(error => {
                console.log('error', error)
                alert("Error deleting product details")
            })
}

//prevent f12 click action to open page source
$(document).keydown(function (e) {
    if (e.which === 123) {
        return false;
    }
});

function checkEditAccess() {

    var userId = localStorage.getItem("userId");
    // console.log(userId);

    var userDataRef = accessDB.database().ref().child("Access").child(userId).child(14);//.orderByKey();

    userDataRef.on("value", function (snapshot) {

        //console.log(snapshot.val().view);
        var tble = document.getElementById("table-1");
        var row = tble.rows;

        if ((!snapshot.val().edit) && (!snapshot.val().delete)) {

            for (var j = 0; j < row.length; j++) {

                // Deleting the 10th cell of each row. 
                row[j].deleteCell(0);
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

function multiImages(btnid) {
    var id = btnid.split('n', 2)[1];
    getImage(id);
}

function getImage(pid) {
    var myHeaders = new Headers();
    myHeaders.append("userid", localStorage.getItem("userId"));
    myHeaders.append("sessionkey", sessionStorage.getItem("sessionKey"));
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", sessionStorage.getItem("usertype"));
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(getimage+"product_id=" + pid, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                document.getElementById("idInModal").innerHTML = pid;
                var modalBody = document.getElementById("multiImageModalBody");
                modalBody.innerHTML = "";
                var resultobj = [];
                for (i = 0; i < result.data.length; i++) {
                    var t = {
                        rank: result.data[i].rank,
                        product_image_id: result.data[i].product_image_id,
                        image: result.data[i].image,
                        product_id: result.data[i].product_id
                    }
                    resultobj.push(t);
                }
                resultobj.sort(function (a, b) {
                    return a.rank - b.rank
                })
                console.log(resultobj);
                var remImages = [];
                if (resultobj[resultobj.length - 1].rank != 0) {
                    console.log(resultobj)
                    for (j = 0; j < resultobj.length; j++) {
                        if (resultobj[j].rank != 0) {
                            var img = "<div class='ImgDiv' id='ImgDiv" + resultobj[j].product_image_id + "' style='border:1px solid black;'><img class='productImg' src=" + resultobj[j].image + " id=" + resultobj[j].product_image_id + " style='width:150px; height:150px; padding:3px; margin:3px;'><span class='removeImage' id='removeImage" + resultobj[j].product_image_id + "' onclick='removeImage(this.id)' style='position:absolute'>X</span></div>";
                            modalBody.innerHTML += img;
                        } else {
                            var img = "<div class='ImgDiv' id='ImgDiv" + resultobj[j].product_image_id + "' style='border:1px solid black;'><img class='productImg' src=" + resultobj[j].image + " id=" + resultobj[j].product_image_id + " style='width:150px; height:150px; padding:3px; margin:3px;'><span class='removeImage' id='removeImage" + resultobj[j].product_image_id + "' onclick='removeImage(this.id)' style='position:absolute'>X</span></div>";
                            var id = resultobj[j].product_image_id;
                            var imgObj = {
                                img: img,
                                id: id
                            }
                            remImages.push(imgObj);
                        }
                    }
                    console.log(remImages)
                    for (i = 0; i < remImages.length; i++) {
                        modalBody.innerHTML += remImages[i].img;
                    }
                } else {
                    for (j = 0; j < resultobj.length; j++) {
                        var img = "<div class='ImgDiv' id='ImgDiv" + resultobj[j].product_image_id + "' style='border:1px solid black;'><img class='productImg' src=" + resultobj[j].image + " id=" + resultobj[j].product_image_id + " style='width:150px; height:150px; padding:3px; margin:3px;'><span class='removeImage' id='removeImage" + resultobj[j].product_image_id + "' onclick='removeImage(this.id)' style='position:absolute'>X</span></div>";
                        modalBody.innerHTML += img;
                    }
                }
                document.getElementById("overlay").style.display = "none";
                $('#imgs').val('');
                imgsUpload();
                modalBody.innerHTML += "<p class='text-center' style='font-weight:600'>Follow the steps given to edit the order of images:</p>";
                modalBody.innerHTML += "<p class='text-center'>1. Click on edit order button</p>";
                modalBody.innerHTML += "<p class='text-center'>2. Drag and drop images over each other in  desired order</p>"
                modalBody.innerHTML += "<p class='text-center'>3. Click on save order button</p>"
                modalBody.innerHTML += "<button id='rearrangeEditBtn' onclick='rearrange()' class='btn btn-primary my-2' id='" + id + "'>Edit order</button>"
                $('#multiImageModal').modal('show');
            })
            .catch(error => console.log('error', error));
}

function imgsUpload() {
    // console.log("images")
    var imgsUploadBtn = document.getElementById('imgsUploadBtn');


    if (document.getElementById('imgs').files.length > 0) {
        imgsUploadBtn.disabled = false;
    } else {
        imgsUploadBtn.disabled = true;
    }
}

function imgsUploadBtn() {
    var prod_id = document.getElementById('idInModal').innerHTML;
    document.getElementById("overlay").style.display = "block";
    // return;
    for (i = 0; i < document.getElementById('imgs').files.length; i++) {
        imgsUploadAPI(i, prod_id, document.getElementById('imgs').files.length);
    }
}

// Upload the changed picture to API

function imgsUploadAPI(i, prod_id, l) {
    console.log(i, prod_id, l);
    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    console.log(i);

    var formdata = new FormData();

    formdata.append("image", document.getElementById('imgs').files[i]);
    formdata.append("product_id", prod_id);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    //   const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //const url = "http://api.myzila.com/PostImage";


    fetch(postimage, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status == 200) {
                    if (i == (l - 1)) {
                        document.getElementById("overlay").style.display = "none";
                        alert("Image(s) Added Successfully");
                    }
                } else {
                    alert("Error");
                }
                //console.log(result)

            })
            .catch(error => console.log('error', error));
}

// To get the Page which we search 


function getPageNo() {

        var myHeaders = new Headers();
myHeaders.append("sessionkey", "a2ed9c4adb38820e98d7f511962e2372");
myHeaders.append("usertype", "3");
myHeaders.append("userid", "25");
myHeaders.append("languagetype", "2");
myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
    var pageno = document.getElementById("page_no").value;
    if (pageno=="") {
        pageno = 1;
    }

    passval();
    var lo_storage = localStorage.getItem("dcat_value");
console.log("Cat_sel:",lo_storage);
var lo_storage2 = localStorage.getItem("dsub_cat_value");
if(lo_storage2==""){
    lo_storage2 = 0;
    console.log("loc_storage2 changed to 0");
}
console.log("Sub_cat_sel:",lo_storage2);

    var pagno = (parseInt(pageno) - 1);
    state.page = pagno+1;
    // console.log("Page " +pageno);
    // console.log("Pages " +pagno);

    fetch(getproduct+"category_id="+lo_storage.toString()+"&page=" + pagno+"&isFilter=1&sub_category_id="+lo_storage2.toString(), requestOptions)
            .then(response => response.json())
            .then(result => {
                document.getElementById("loader").style.display = "none";
                 var fil_page = Math.ceil(result.filtercount/10);
                products = result.data;
                state.querySet = products;
                var table = document.getElementById("myTable")
                table.innerHTML = ''

                var lang = document.getElementById("selectLang").value;
                var name1 = '';
                var desc = '';
                var color = '';

                var res = pagination(state.querySet, state.page, state.rows)
                var myList = res.querySet

                for (var i = 0; i < myList.length; i++)
                {
                    // console.log(myList[i].vendor_id)
                    if (lang == "english") {
                        name1 = myList[i].name;
                        desc = myList[i].description;
                        color = myList[i].color;
                    } else if (lang == "hindi") {
                        name1 = myList[i].hindi_name;
                        desc = myList[i].hindi_desc;
                        color = myList[i].hindi_color;
                    } else if (lang == "tamil") {
                        name1 = myList[i].tamil_name;
                        desc = myList[i].tamil_desc;
                        color = myList[i].tamil_color;
                    }

                    var row = "<tr class='del' id=" + myList[i].product_id + ">" +
                            "<td><button class='editbtn'>Edit</button><br><br><button class='delbtn'>Delete</button></td>" +
                            "<td>" + myList[i].product_id + "</td>" +
                            "<td>" +
                            "<img id='displayImg" + myList[i].product_id + "' src=" + myList[i].image + " class='product_image'>" +
                            "<label id='editLabel" + myList[i].product_id + "' for='editImg" + myList[i].product_id + "' class='fa fa-edit' style='font-size:24px; display:none; cursor:pointer'></label>" +
                            "<input type='file' onchange='showPreview(event," + myList[i].product_id + ")' id='editImg" + myList[i].product_id + "' accept='image/*' style='display:none'>" +
                            "<button style='margin-top:5px;' type='button' id='multiImagesBtn" + myList[i].product_id + "' class='btn btn-success' data-toggle='modal' onclick='multiImages(this.id)'>View more images</button>" +
                            "</td>" +
                            "<td contenteditable='true'>" + name1 + "</td>" +
                            "<td><div contenteditable='false' id='descriptionDiv" + myList[i].product_id + "' style='width:150px; white-space: pre-wrap;'>" + formatDesc(desc) + "</div><textarea style='display: none' rows='4' cols='50' id='description" + myList[i].product_id + "' >" + desc + "</textarea><button id='descPreview" + myList[i].product_id + "' class='btn btn-primary btn-sm' onclick='descPreview(" + myList[i].product_id + ")' style='display:none;'>Preview</button></td>" +
                            "<td contenteditable='true' class='actualAmount'>" + myList[i].actual_amount + "</td>" +
                            "<td contenteditable='true' class='discount'>" + myList[i].discount + "</td>" +
                            "<td contenteditable='false'>" + myList[i].final_amount + "</td>" +
                            "<td contenteditable='false' id='cid'>" + myList[i].category_id + "</td>" +
                            "<td contenteditable='false'>" + myList[i].sub_category_id + "</td>" +
                            "<td contenteditable='false'>" + myList[i].seller_id + "</td>" +
                            "<td contenteditable='false'>" + myList[i].old_discount + "</td>" +
                            "<td contenteditable='true'>" + myList[i].product_count + "</td>" +
                            "<td contenteditable='true'>" + myList[i].size + "</td>" +
                            "<td contenteditable='true'>" + color + "</td>" +
                            "<td contenteditable='false'>" + myList[i].brand + "</td>" +
                            "<td contenteditable='false'>" + myList[i].brand_id + "</td>" +
                            "<td contenteditable='true'>" + myList[i].fabric + "</td>" +
                            "<td contenteditable='true'>" + myList[i].returnable + "</td>" +
                            "<td contenteditable='true'>" + myList[i].max_day_return + "</td>" +
                            "<td contenteditable='true'>" + myList[i].hashtag + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].name + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].description + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].color + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].hindi_name + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].hindi_desc + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].hindi_color + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].tamil_name + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].tamil_desc + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].tamil_color + "</td>" +
                            "<td contenteditable='false' style='display:none'>" + myList[i].vendor_id + "</td>" +
                            "<td contenteditable='true'>" + myList[i].transfer_amt + "</td>" +
                            "<td contenteditable='true'>" + myList[i].store_partner_com + "</td>" +
                            "</tr>";
                    table.innerHTML += row;
                    //mainContainer.appendChild(row);
                }

                //when edit button is clicked
                $('.editbtn').click(function () {
                    var $this = $(this);
                    //get the row element of the edit button
                    var trId = $(this).closest('tr').prop('id');
                    var currentRow = document.getElementById(trId);
                    var imgLabel = document.getElementById("editLabel" + trId);
                    imgLabel.style.display = "block";
                    var desc = document.getElementById("descriptionDiv" + trId);
                    var descTA = document.getElementById("description" + trId);
                    var multiImagesBtn = document.getElementById("multiImagesBtn" + trId);
                    var descPreview = document.getElementById('descPreview' + trId);

                    //get the <td> elements of the selected row
                    var tds = $this.closest('tr').find('td').filter(function () {
                        return $(this).find('.editbtn').length === 0;
                    });

                    //if the button displays 'edit'
                    if ($this.html() === 'Edit') {
                        //change text displayed in button to 'save' 
                        $this.html('Save');
                        //make <td> elements of that row editable
                        console.log("3");
                        tds.prop('contenteditable', false);
                        //add class to apply css
                        currentRow.classList.add('currRowEdit');
                        desc.style.display = 'none';
                        descTA.style.display = 'block';
                        multiImagesBtn.style.display = 'none';
                        descPreview.style.display = 'block';

                    } else {
                        $this.html('Edit');
                        //make <td> elements of that row uneditable
                        tds.prop('contenteditable', false);
                        //remove css of that row
                        currentRow.classList.remove('currRowEdit');
                        descPreview.style.display = 'none';
                        desc.style.display = 'block';
                        console.log(descTA.value)
                        desc.innerHTML = formatDesc(descTA.value);
                        descTA.style.display = 'none';
                        multiImagesBtn.style.display = 'block';
                        descPreview.style.display = 'none';
                        imgLabel.style.display = "none";

                        //get the values stored in the discount and actual amount fields and update them
                        // var discount = currentRow.cells.item(6).innerHTML;
                        // var actualAmount = currentRow.cells.item(5).innerHTML;
                        // console.log("amt: ", actualAmount, "dis ", discount, "id",trId);
                        var lang = document.getElementById("selectLang").value;
                        var name1, desc1, color1, hindi_name1, hindi_color1, hindi_desc1, tamil_name1, tamil_color1, tamil_desc1;
                        if (lang == "english") {
                            name1 = currentRow.cells.item(3).innerHTML;
                            desc1 = descTA.value;
                            color1 = currentRow.cells.item(14).innerHTML;
                            hindi_name1 = currentRow.cells.item(24).innerHTML;
                            hindi_desc1 = currentRow.cells.item(25).innerHTML;
                            hindi_color1 = currentRow.cells.item(26).innerHTML;
                            tamil_name1 = currentRow.cells.item(27).innerHTML;
                            tamil_desc1 = currentRow.cells.item(28).innerHTML;
                            tamil_color1 = currentRow.cells.item(29).innerHTML;
                        } else if (lang == "hindi") {
                            name1 = currentRow.cells.item(21).innerHTML;
                            desc1 = currentRow.cells.item(22).innerHTML;
                            color1 = currentRow.cells.item(23).innerHTML;
                            hindi_name1 = currentRow.cells.item(3).innerHTML;
                            hindi_desc1 = descTA.value;
                            hindi_color1 = currentRow.cells.item(14).innerHTML;
                            tamil_name1 = currentRow.cells.item(27).innerHTML;
                            tamil_desc1 = currentRow.cells.item(28).innerHTML;
                            tamil_color1 = currentRow.cells.item(29).innerHTML;
                        } else if (lang == "tamil") {
                            name1 = currentRow.cells.item(21).innerHTML;
                            desc1 = currentRow.cells.item(22).innerHTML;
                            color1 = currentRow.cells.item(23).innerHTML;
                            hindi_name1 = currentRow.cells.item(24).innerHTML;
                            hindi_desc1 = currentRow.cells.item(25).innerHTML;
                            hindi_color1 = currentRow.cells.item(26).innerHTML;
                            tamil_name1 = currentRow.cells.item(3).innerHTML;
                            tamil_desc1 = descTA.value;
                            tamil_color1 = currentRow.cells.item(14).innerHTML;
                        }

                        var formdata = {
                            discount: currentRow.cells.item(6).innerHTML,
                            amount: currentRow.cells.item(5).innerHTML,
                            product_id: trId,
                            name: name1,
                            hindi_name: hindi_name1,
                            tamil_name: tamil_name1,
                            description: desc1,
                            hindi_desc: hindi_desc1,
                            tamil_desc: tamil_desc1,
                            category_id: currentRow.cells.item(8).innerHTML,
                            sub_category_id: currentRow.cells.item(9).innerHTML,
                            old_discount: currentRow.cells.item(11).innerHTML,
                            product_count: currentRow.cells.item(12).innerHTML,
                            size: currentRow.cells.item(13).innerHTML,
                            color: currentRow.cells.item(14).innerHTML,
                            hindi_color: hindi_color1,
                            tamil_color: tamil_color1,
                            brand: currentRow.cells.item(15).innerHTML,
                            brand_id: currentRow.cells.item(16).innerHTML,
                            fabric: currentRow.cells.item(17).innerHTML,
                            returnable: currentRow.cells.item(18).innerHTML,
                            max_day_return: currentRow.cells.item(19).innerHTML,
                            hashtag: currentRow.cells.item(20).innerHTML,
                            vendor_id: currentRow.cells.item(30).innerHTML,
                            transfer_amt: currentRow.cells.item(31).innerHTML,
                            store_partner_com:currentRow.cells.item(32).innerHTML,

                        }
                        console.log(formdata);
                        updateProduct(formdata);
                        multiImagesBtn.style.display = 'block';
                    }
                });

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
                        deleteProduct(trId)
                        alert("product deleted");
                        currentRow.style.display = 'none';
                    }
                });


                 pageButtons(fil_page);
//                 document.getElementById("page_no").innerHTML = "";
            //    state.page = 1;
                var pg = document.getElementsByClassName("pg" + state.page)[0];
                pg.classList.add("activePage");

                


                checkEditAccess();

            })
            .catch(error => console.log('error', error));

}

