var getSaleData = localStorage.getItem("getSaleData");

console.log("getSaleData:",getSaleData);

var productId;
var prod = [];
var orders = [];
const totalPages = 8;

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

var pageNum = 0;
// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = getSaleData+"page="

buildTable()

function buildTable()
{
    var numberOfOrders;
    var displayUrl = url + pageNum;
    fetch(displayUrl, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(result => {
                // Work with JSON data here
                var data = result.day_sale;
                var table = document.getElementById('tableBody');
                table.innerHTML = '';
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i];

                    var row = "<tr>" +
                            "<td>" + obj.day + "</td>" +
                            "<td>" + obj.tot_orders + "</td>" +
                            "<td>" + obj.total_sale + "</td>" +
                            "</tr>";

                    table.innerHTML += row;
                }
                //console.log(data)
                pageButtons()
            })
            .catch(error => {
                console.log("error", error);
                alert("Error fetching data");
            })
}

function pageButtons() {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ''
    //console.log('Pages:', pages)

    //var maxLeft = (state.page - Math.floor(state.window / 2))
    //var maxRight = (state.page + Math.floor(state.window / 2))

    var maxLeft = (pageNum - 2)
    var maxRight = (pageNum + 2)

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = 5
    }

    //var numberOfPages = Math.ceil(numOrders/10);
    //totalPages = numberOfPages;
    var numberOfPages = totalPages;
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
        wrapper.innerHTML += "<button value='" + page + "' class='page btn btn-sm btn-primary'>" + page + "</button>"
    }

    if (pageNum != 1) {
        wrapper.innerHTML = "<button value='1' class='page btn btn-sm btn-primary'>&#171; First</button>" + wrapper.innerHTML
    }

    if (pageNum != numberOfPages) {
        wrapper.innerHTML += "<button value='" + numberOfPages + "' class='page btn btn-sm btn-primary'>Last &#187;</button>"
    }

    $('.page').on('click', function () {
        $('#tableBody').empty()

        pageNum = Number($(this).val()) - 1

        buildTable()
    })
}
