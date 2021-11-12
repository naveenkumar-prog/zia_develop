var getcategory = localStorage.getItem("getcategory");
var getproduct = localStorage.getItem("getproduct");
var getVendorproduct = localStorage.getItem("getVendorproduct");
var getOrderlist = localStorage.getItem("getOrderlist");
var searchproduct1 = localStorage.getItem("searchproduct1");
var searchPageNum = 0;


console.log("getcategory:",getcategory);


var cat_id =0;


function searchpageButtons() {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ''


    var maxLeft = (searchPageNum - 3)
    var maxRight = (searchPageNum + 1)

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = 5
    }
    var numberOfPages = 100
    //var numberOfPages = Math.ceil(numOrders/10);
    if (maxRight > numberOfPages) {
        maxLeft = numberOfPages - 5

        if (maxLeft < 1) {
            maxLeft = 1
        }
        maxRight = numberOfPages
    }

    var wrapper = document.getElementById("pagination-wrapper");
    //var page = pageNum + 1;
    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="page btn success pg${page}" id ='${page}'>${page}</button>`
    }
    for(var p= maxLeft; p<=maxRight;p++){
        document.getElementById(p.toString()).style.backgroundColor='#91bbcf';
    }

    var sp = searchPageNum+1;
    console.log("ssp:",sp);
    var sp1 = sp+1;
    console.log("sp1",sp1);
    var next = maxRight+1;
    document.getElementById(sp.toString()).style.backgroundColor='crimson';


    if (sp >5) {
        wrapper.innerHTML = "<button value='1' class='page btn success'>&#171; First</button>" + wrapper.innerHTML
    }

    if (searchPageNum != numberOfPages) {
        wrapper.innerHTML += "<button value='" + next + "' class='page btn success'>Next &#187;</button>"
    }

    $('.page').on('click', function () {
        $('#tableBody').empty()

        searchPageNum = Number($(this).val()) - 1
        console.log("state_page",searchPageNum)                
       console.log("Before buildtable_cpy this :",this);

        buildSearchTables()
    })
}

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

fetch(getcategory, requestOptions)
        .then(response => response.json())
        .then(result => {
//            console.log(result);
            var sub_length = result.category.length;
      
            const res = []
            const map = new Map();
            var count = 0;
            for (const item of result.category) {
                if (!map.has(item.category_id)) {
                    map.set(item.hindi_name, true);
                    res.push({
                        cat_id: item.hindi_name,
                        value: item.category_id,
                    });
                    count = count + 1;
                }

            }
    
            let dropdown = document.getElementById('locality-dropdown');
            dropdown.length = 0;

            let defaultOption = document.createElement('option');
            defaultOption.text = 'All';
            defaultOption.value = 0;
            dropdown.add(defaultOption);
            dropdown.selectedIndex = 0;
            document.getElementById("demo_main").style.display = "none";

            let option;

            for (let i = 0; i < res.length; i++) {
                option = document.createElement('option');
                option.value = res[i].value;
                option.text = res[i].cat_id;

                dropdown.add(option);


            }



        })


     //   .catch(error => console.log('error', error));



function buildSearchTables() {
    console.log("buildSearchTables enters")
    document.getElementById("goto").style.visibility="hidden";
    window.scrollTo(0, 0);
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

    var val = document.getElementById("search-input").value
    localStorage.setItem("search_val",val);
    console.log(val);
    document.getElementById("loaderV").style.display = "block";
    var searchUrl = searchproduct1 + val + "&page="+searchPageNum;
    fetch(searchUrl, requestOptions)

            .then(response => response.json())
            .then(result => {
                console.log("reesult:",result);
                console.log("result_len",result.data.length);
                get_result3(result);                   
                
                

            })
            .catch(error => console.log('error', error));

}


function getCombo(selectObject) {

    document.getElementById("nproducts").style.visibility="visible";
    document.getElementById("default_count").style.display = "none";
    document.getElementById("goto").style.visibility="hidden";
    value = selectObject.value;

    var category_id = value;

    localStorage.setItem("category_id",category_id);
    console.log("selected cat_id:", category_id);



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

    fetch(getproduct+"category_id=" + category_id.toString() + "&page=0&isFilter=1&sub_category_id=0", requestOptions)
            .then(response => response.json())
            .then(result => {

                get_result(result);
             //   pageButtons(1);

                if (value != 0) {

                    getSubCat(category_id);
                    document.getElementById("demo_main").style.display = 'Block';
                } else {
                    getCombo2(0, 0);
                    document.getElementById("demo_main").style.display = 'none';
                }


            })
            .catch(error => console.log('error', error));

}



function getSubCat(cat_id) {
   document.getElementById("goto").style.visibility="hidden";
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
    document.getElementById("nproducts").style.visibility="visible";
    console.log("getcat_id:", cat_id);

    fetch(getcategory, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result);
                var sub_length = result.sub_category.length;
                

                const res2 = []
                const map2 = new Map();
                var ct = 0;
                for (const item of result.sub_category) {
                    if (item.category_id == cat_id)
                    {
                        if (!map2.has(item.category_id)) {
                            map2.set(item.sub_category_id, true);
                            res2.push({
                                cate_id: item.category_id,
                                name: item.hindi_name,
                                value: item.sub_category_id,
                            });
                            ct = ct + 1;
                        }
                    }

                }
                //
               // console.log("res.sub_id:", result.sub_category.sub_category_id);
               // console.log("res2:", res2);
                

                var select_1 = document.createElement("select");

                var dropdown2 = document.getElementById('demo');
                dropdown2.length = 0;



                let defaultOption2 = document.createElement('option');
                defaultOption2.text = 'All';
                defaultOption2.value = 0;
                dropdown2.add(defaultOption2);
                dropdown2.selectedIndex = 0;


                let option2;
                console.log("option2 enters");
                console.log("res2:", res2)
                console.log(res2.length);


                for (let i = 0; i < res2.length; i++) {
                    option2 = document.createElement('option');
                    option2.value = res2[i].value;
                    option2.text = res2[i].name;

                    dropdown2.add(option2);


                }

                getCombo2(cat_id, 0);

                $("#demo").change(function () {
                    //var selectedText = $(this).find("option:selected").text();
                    document.getElementById("default_count").style.display = "none";
                    document.getElementById("goto").style.visibility="hidden";
                    var selectedValue = $(this).val();
                    //alert("Selected Text: " + selectedText + " Value: " + selectedValue);

                    if (selectedValue != 0) {
                        getCombo2(cat_id, selectedValue);
                    } else {
                        getCombo2(cat_id, 0);
                    }
                });

                //getCombo2(cat_id);

                // console.log(option2);

            })

            .catch(error => console.log('error', error));

}

function getCombo2(cat_id, sub_id) {

    document.getElementById("nproducts").style.visibility="visible";
    document.getElementById("search-input").value="";
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

    console.log("Cat and Sub_id : ", cat_id, sub_id);

    fetch(getproduct+"category_id=" + cat_id.toString() + "&page=0&isFilter=1&sub_category_id=" + sub_id.toString(), requestOptions)
            .then(response => response.json())
            .then(result => {

                get_result(result);



           //     pageButtons(0);


            })
            .catch(error => console.log('error', error));


}

var flag;

function get_result(result)
{
    document.getElementById("loader").style.display = "none";
    document.getElementById("nproducts").style.visibility="visible";
    document.getElementById("goto").style.visibility="visible";
   // console.log(result)
   if(typeof result.filtercount =="undefined"){
    var cnt = result.data.length;
   }
   else{
    var cnt = result.filtercount;
   }
    console.log("Filter Count1:", cnt);
    var pag = Math.round(cnt / 10) ;
   // console.log("l_p :",pag);
    document.getElementById("filter").innerHTML = cnt;
    document.getElementById("loader").style.display = "none";

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
           tds[1].setAttribute("contenteditable", "false");
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
            console.log("formdata:",formdata);
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

     
//    console.log("page button functon enters: ");

//    console.log("pageButton:()",pag);


       

    pageButtons0(pag);


/*    state.page = 0;

   var pg = document.getElementById("pagination-wrapper" + state.page)[0];
     pg.classList.add("activePage");
     console.log( "pg :",pg);
*/

 
    checkEditAccess();


}

function get_result3(result)
{
    document.getElementById("loader").style.display = "none";
    document.getElementById("goto").style.visibility="hidden";
   // console.log(result)
   if(typeof result.filtercount =="undefined"){
    var cnt = result.data.length;
   }
   else{
    var cnt = result.filtercount;
   }
    console.log("Filter Count1:", cnt);
    var pag = Math.round(cnt / 10) ;
   // console.log("l_p :",pag);
    document.getElementById("nproducts").style.visibility = "hidden";
    document.getElementById("loader").style.display = "none";

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
    if(result.data.length==0){
        document.getElementById("myTable").innerHTML += "<b>No more products available</b> !!"
    }
    else{

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
           tds[1].setAttribute("contenteditable", "false");
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
            console.log("formdata:",formdata);
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


    }

       searchpageButtons(100);
    //var pag = document.getElementById("pagination-wrapper" + state.page)[0];
     //pag.classList.add("activePage");
     //console.log( "pg :",pag);

 
    checkEditAccess();


}

function buildTable3() {
document.getElementById("search-input").value='';
var myHeaders = new Headers();
myHeaders.append("sessionkey", "a2ed9c4adb38820e98d7f511962e2372");
myHeaders.append("usertype", "3");
myHeaders.append("userid", "25");
myHeaders.append("languagetype", "2");
myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
document.getElementById("nproducts").style.visibility="visible";
document.getElementById("goto").style.visibility="visible";

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

   console.log("buildTable3 enters");
    passval();
    var val = localStorage.getItem("search_val");
   var searchUrl = searchproduct1 + val + "&page=" + (state.page - 1);
    console.log("searchUrl:",searchUrl);

fetch(searchUrl, requestOptions)
             .then(response => response.json())
            .then(result => {
                console.log("res3:",result);
                document.getElementById("loader").style.display = "none";
                 console.log("Filter Count in buildTable0:", result.filtercount);
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
                console.log("myList",myList);
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
                       tds[1].setAttribute("contenteditable", "false");
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
                        console.log("formdata:",formdata);
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
                console.log("Before pageButtons3");
                pageButtons3(fil_page);
                var pg = document.getElementsByClassName("pg" + state.page)[0];
                pg.classList.add("activePage");

                checkEditAccess();

            })
            .catch(error => console.log('error', error));

}
