// const proxyurl = "https://cors-anywhere.herokuapp.com/";
var getSaleData = localStorage.getItem("getSaleData");

getAmbassaddorStats();
console.log("cc")
function getAmbassaddorStats() {
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

    fetch(getSaleData+"page=0", requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result)
                document.getElementById("overlay").style.display = 'none';
                var data = result.ambassador_data;
                var table = document.getElementById("myTable");
                table.innerHTML = '';
                // for(var i = 0 ; i < data.length; i++){
                // var rank = i+1;
                var row = "<tr>" +
                        "<td>" + data.tot_ambassador + "</td>" +
                        "<td>₹" + data.tot_amount + "</td>" +
                        "<td>₹" + data.tot_delivered + "</td>" +
                        "<td>" + data.tot_order + "</td>" +
                        "</tr>";

                table.innerHTML += row;
                // }
            })
            .catch(error => console.log('error', error));
}