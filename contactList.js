var getContact = localStorage.getItem("getContact");
var sendSms = localStorage.getItem("sendSms");

console.log("sendSms", sendSms);
console.log("getContact",getContact);


var zclId = localStorage.getItem("zclid")
var zclName = localStorage.getItem("zclPartName")
console.log("zclId",zclId);
console.log("zclName",zclName);

document.getElementById("zclName").innerHTML = "Contact List - " + zclName + " (User Id: " + zclId + ")";

// const proxyurl = "https://cors-anywhere.herokuapp.com/";
var contacts = []

var state = {
    'querySet': contacts,

    'page': 1,
    'rows': 20,
    'window': 7,
}

buildTable();

function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    console.log("l",querySet.length)
    console.log("te",trimEnd)

    var trimmedData = querySet.slice(trimStart, trimEnd)

    var pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
    //console.log('Pages:', pages)

    var maxLeft = (state.page - 2)
    var maxRight = (state.page + 2)

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = 5
    }

    else if (maxRight > pages) {
        maxLeft = pages - 4
        maxRight = pages
    }


    

    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="pg btn btn-sm btn-info pg${page}" id ='${page}'>${page}</button>`
    }
    for(var p= maxLeft; p<=maxRight;p++){
        document.getElementById(p.toString()).style.backgroundColor='#91bbcf';
    }

    var sp = state.page
    document.getElementById(sp.toString()).style.backgroundColor='crimson';


    if (state.page > 3) {
        wrapper.innerHTML = `<button value=${1} class="pg btn btn-sm btn-info ">&#171; First</button>` + wrapper.innerHTML
    }

    if ((state.page != pages) && (state.page != pages-1)){
        wrapper.innerHTML += `<button value=${pages} class="pg btn btn-sm btn-info " id = "lst">Last &#187;</button>`
    }
    console.log("tot_pg",pages);

    $('.pg').on('click', function () {
        $('#table-body').empty();


        state.page = Number($(this).val())
                
        $(this).addClass("activePag");
       console.log("Before buildtable this :",this);
        buildTable();
    })
}

function buildTable() {
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
    var p = state.page
    console.log("p",p)


    fetch(getContact+"user_id=" + zclId+"&page="+p.toString(), requestOptions)
            .then(response => response.json())
            .then(result => {
                 document.getElementById("total_contact").innerHTML =''
                 document.getElementById("total_contact").innerHTML += result.total_contact;
                document.getElementById("main").style.visibility='hidden'
                //console.log(result)
                var tot_pg = Math.ceil(result.total_contact/state.rows);
                var table = document.getElementById("tableBody");
                table.innerHTML = ''
                contacts = result.data;
                console.log("contacts",contacts);

                if (contacts.length == 0) {
                    document.getElementById("main").style.visibility='visible'
                    document.getElementById("load").style.visibility = 'hidden';
                    alert("No contacts!");
                }
                state.querySet = result.data;
                var res = pagination(state.querySet, state.page, state.rows)
                var myList = contacts;
                console.log("myList",myList);

                for (var i = 0; i < myList.length; i++) {
                    var obj = myList[i];

                    var phoneno = obj.number;
                    var mobileno = '';
                    if (phoneno.charAt(0) == '+' || phoneno.charAt(0) == '0') {
                        mobileno = phoneno.replace(/[^a-zA-Z0-9+]{10}/g, "").substr(3);
                    } else {
                        mobileno = phoneno.replace(/[^a-zA-Z0-9]{10}/g, "");
                    }
            //        console.log("Numbers are " + mobileno);

                    var phonenumber = [];
                    phonenumber.push(mobileno);
            //        console.log("Numbers in array are " + phonenumber);


                    var row = "<tr>" +
                            "<td>" + obj.name + "</td>" +
                            "<td>" + obj.number + "</td>" +
                            "</tr>";

                    table.innerHTML += row;
                }
                //console.log("before pagebuttons");
                //console.log();
                
                pageButtons(tot_pg-1)
                var pg = document.getElementsByClassName("pg" + state.page)[0];
                pg.classList.add("activePag");
                console.log("pg",pg);
                document.getElementById("main").style.visibility='visible'
                document.getElementById("load").style.visibility = 'hidden';

                
            })
            .catch(error => console.log('error', error));
}


function sendMsg(phonenumber) {
    var send_msg = document.getElementById("msgUser").value;
    var myHeaders = new Headers();
    myHeaders.append("authkey", "256829AajxOw3q5c3e0991");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=rl0rcnqdf7arf2lsb3pr9nace7");
    // var test = JSON.stringify(testarray);


    var raw = JSON.stringify({"sender": "MYZILA", "route": "4", "country": "91", "sms": [{"message": send_msg, "to": phonenumber}]});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //const url = "https://api.msg91.com/api/v2/sendsms";
    fetch(sendSms, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.type == "success") {
                    alert("Message sent");
                } else {
                    alert("Error")
                }

            })
            .catch(error => {
                console.log('error', error);
                alert("Message sent...!");
            });
}