var addproductprice1 = localStorage.getItem("addproductprice1");

console.log("addproductprice1",addproductprice1);

function addColor() {
    var color = document.getElementById("addColorInput").value;

    document.getElementsByClassName("colorListDiv")[0].innerHTML += color + "<br>";
    document.getElementById("addColorInput").value = '';
    makeTable();
}

function addSize() {
    var size = document.getElementById("addSizeInput").value;

    document.getElementsByClassName("sizeListDiv")[0].innerHTML += size + "<br>";
    document.getElementById("addSizeInput").value = '';
    makeTable();
}

function addDetails(count) {
    var price = document.getElementsByClassName("priceInput");
    var offer = document.getElementsByClassName("offerInput");
    var qty = document.getElementsByClassName("qtyInput");
    var flag = 0;

    for (var i = 0; i < price.length; i++) {
        if (price[i].value == '') {
            alert("Please fill in all the prices in table");
            flag = 1;
            break;
        }
    }
    if (flag == 0) {
        for (var i = 0; i < offer.length; i++) {
            if (offer[i].value == '') {
                alert("Please fill in all the offers in table");
                flag = 1;
                break;
            }
            if (offer[i].value > 100) {
                alert("Offer cannot be greater than 100%");
                flag = 1;
                break;
            }
        }
    }
    if (flag == 0) {
        for (var i = 0; i < qty.length; i++) {
            if (qty[i].value == '') {
                alert("Please fill in all the quantity in table");
                flag = 1;
                break;
            }
        }
    }

    var prodId = sessionStorage.getItem("uploadedProdId");

    if (!flag) {
        var data = [];
        var tableRows = document.getElementById("table").rows;


        for (var i = 0; i < count; i++) {
            var row = tableRows[i + 1];
            if (document.body.contains(document.getElementsByClassName("priceInput")[i])) {
                var price = document.getElementsByClassName("priceInput")[i].value;
                var offer = document.getElementsByClassName("offerInput")[i].value;
                // if(offer > 100){
                //     // document.getElementById("overlay").style.display="none";
                //     alert("Invalid discount");
                //     return;
                // }
                var qty = document.getElementsByClassName("qtyInput")[i].value;

                var finalPrice = ((100 - parseInt(offer)) / 100) * price;

                var objItem = {
                    "product_id": "" + prodId,
                    "color": "" + row.cells.item(1).textContent,
                    "size": "" + row.cells.item(2).textContent,
                    "price": "" + price,
                    "offer": "" + offer,
                    "final_price": "" + finalPrice,
                    "quantity": "" + qty
                }

                data.push(objItem);
            } else {
                continue;
            }

        }

        document.getElementById("overlay").style.display = "block";

        console.log(data)
        var obj = {data};
        console.log(obj);

        var myHeaders = new Headers();
        myHeaders.append("userid", "1784");
        myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
        myHeaders.append("languagetype", "1");
        myHeaders.append("usertype", "0");
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(obj);

        console.log("raw",raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";

        fetch(addproductprice1, requestOptions)
                .then(response => response.json())
                .then(result => {
                    //console.log(result)
                    if (result.status == 200) {
                        document.getElementById("overlay").style.display = "block";
                        alert("Product details added successfully");
                        location.reload();
                    }
                })
                .catch(error => console.log('error', error));
    }
}
var count = 0;

function makeTable() {
    var colors = document.getElementsByClassName("colorListDiv")[0].innerHTML;
    var colorList = colors.split("<br>");
    //console.log(colorList);

    var size = document.getElementsByClassName("sizeListDiv")[0].innerHTML;
    var sizeList = size.split("<br>");
    //console.log(sizeList);


    var table = "<table class='table' id='table'>" +
            "<thead>" +
            "<tr>" +
            "<th></th>" +
            "<th>Color</th>" +
            "<th>Size</th>" +
            "<th>Price</th>" +
            "<th>Offer %</th>" +
            "<th>Quantity</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>"

    for (var i = 0; i < colorList.length - 1; i++) {
        for (var j = 0; j < sizeList.length - 1; j++) {
            var row = "<tr id='row" + count + "'>" +
                    "<td><button class='removeBtn btn btn-primary' id='" + count + "' onclick='removeCombo(this.id, count)'>X</button></td>" +
                    "<td>" + colorList[i] + "</td>" +
                    "<td>" + sizeList[j] + "</td>" +
                    "<td><input type='text' class='priceInput'/></td>" +
                    "<td><input type='text' class='offerInput'/></td>" +
                    "<td><input type='text' class='qtyInput'/></td>" +
                    "</tr>"

            table += row;
            count++;
        }
    }

    table += "</tbody></table>";

    document.getElementById("prodTable").innerHTML = table;
    document.getElementById("prodTable").innerHTML += "<button class='btn btn-primary' onclick='addDetails(" + count + ")'>Add details</button>"
}

function removeCombo(id, count) {
    document.getElementById("row" + id).remove();
    count--;
    console.log(count);
}
