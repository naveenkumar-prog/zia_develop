// var phoneNumber=[];

// getContacts(1);
// var func;
// var users = [];
// var date;
// // $( function() {
// //     $( "#datepicker" ).datepicker({ 
// //             format: 'yyyy-mm-dd'
// //     });
// //   } );
//   $( document ).ready(function() {
//     $("#datepicker").datepicker({dateFormat: 'yy-mm-dd'});
//     $("#datepicker").on("change", function () {
//         date = $(this).val();
//         console.log(date);
//         if(date == "")
//         {console.log(date); func=1;
//         getGetContacts(document.getElementById("select").value);}
//         else
//         {func=0;getContacts(document.getElementById("select").value, date);}

//     });
// });
// // $.fn.datepicker.defaults.format = 'yyyy-mm-dd';
// var state = {
//     'querySet': users,

//     'page': 1,

//     //number of table rows per page
//     'rows': 10,

//     //number of page number buttons at the bottom
//     'window': 5,
// }

// // $(window).scroll(function() {
// //     if(func == 1)
// //     {
// //         if($(window).scrollTop() + $(window).height() > $(document).height() - 300){
// //             //document.getElementById("overlay").style.display="block";
// //             getContacts(document.getElementById("select").value);
// //         }
// //     }
// // });

// var checkedUsers = [];
// function notify(){
//     checkedUsers.map(checkedUser => {
//         sendNotif(checkedUser);
//     })
// }

// function sendNotif(id){
//     let row = document.getElementById(id);
//     let fcm = row.cells[5].innerHTML;
//     if(fcm == ""){
//         return;
//     }
//     var notif_title = document.getElementById("notifTitle").value;
//     // var notif_topic = document.getElementById("notifTopic").value;
//     var notif_body = document.getElementById("notifBody").value;
//     var notif_image = document.getElementById("notifImage");
//     if(notif_title=="" || notif_body=="" || notif_image.files.length==0){
//         alert("Please fill in all the fields");
//     }else{
//         //console.log(notif_title, notif_topic, notif_body, notif_image.files[0]);

//         var myHeaders = new Headers();
//         myHeaders.append("userid", "1784");
//         myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
//         myHeaders.append("languagetype", "1");
//         myHeaders.append("usertype", "0");
//         myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

//         var formdata = new FormData();
//         formdata.append("fcm_token",fcm);
//         formdata.append("body_notification", notif_body);
//         formdata.append("title_notification", notif_title);
//         formdata.append("image", notif_image.files[0]);

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: formdata,
//             redirect: 'follow'
//         };

//         // const proxyurl = "https://cors-anywhere.herokuapp.com/";

//         fetch("http://api.myzila.com/SendNotification", requestOptions)
//         .then(response => response.json())
//         .then(result => {
//             if(result.status == 200){
//                 alert("Notification sent");
//             }
//             else{
//                 alert("Error")
//             }

//         })
//         .catch(error => {
//             console.log('error', error);
//             alert("Could not send notification!");
//         });
//     }
//     // checkedUsers.map(checkedUser => {
//     //     console.log(document.getElementById(checkedUser));
//     // })
//     // alert("Working on it");

// }
// var num = 0;
// var ano=1;

// function getGetContacts(app_no){
//     var table = document.getElementById("tableBody");
//     table.innerHTML = "";
//     var date = document.getElementById("datepicker");
//     date.value = "";
//     ano=app_no;
//     num=0;
//     checkedUsers=[];
//     getContacts(app_no);
// }

// // function getContactsWithDate(app_no, date){
// //     document.getElementById("overlay").style.display="block";
// //     func = 0;
// //     var myHeaders = new Headers();
// //     myHeaders.append("userid", localStorage.getItem("userId"));
// //     myHeaders.append("sessionkey", sessionStorage.getItem("sessionKey"));
// //     myHeaders.append("languagetype", "1");
// //     myHeaders.append("user_type", sessionStorage.getItem("user_type"));
// //     myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

// //     var requestOptions = {
// //     method: 'GET',
// //     headers: myHeaders,
// //     redirect: 'follow'
// //     };

// //     // console.log(localStorage.getItem("userId"));
// //     // console.log(sessionStorage.getItem("sessionKey"));
// //     // console.log(sessionStorage.getItem("user_type"));

// //     const proxyurl = "https://cors-anywhere.herokuapp.com/";
// //     console.log(app_no, date)
// //     const url = "http://api.myzila.com/GetContact?app_no="+app_no+"&date="+date;

// //     fetch(proxyurl+url, requestOptions)
// //     .then(response => response.json())
// //     .then(result => {
// //         num=0;
// //         var table = document.getElementById("tableBody");
// //         table.innerHTML = "";

// //         console.log(result.data);

// //         // users = result.data;
// //         // state.querySet = users;
// //         // var res = pagination(state.querySet, state.page, state.rows)
// //         var data = result.data;
// //         console.log(data.length);

// //         if(data.length == 0){
// //             document.getElementById("overlay").style.display="none";
// //             table.innerHTML="No results to display";
// //         }
// //         // var data = result.data;
// //         var sno; var flag=false;
// //         var limit = num+100;
// //         for(; num<limit && num<data.length; num++){            

// //             sno=num+1;
// //             var row = "<tr id="+data[num].user_id+">"+
// //                         "<td>"+sno+"</td>"+
// //                         "<td><input type='checkbox' class='checkBoxes' id=checkBox"+data[num].user_id+"></td>"+
// //                         "<td>"+data[num].name+"</td>"+
// //                         "<td>"+data[num].number+"</td>"+
// //                         "<td>"+data[num].user_id+"</td>"+
// //                         "<td>"+data[num].fcm_token+"</td>"+
// //                       "</tr>";

// //                     // console.log(row);
// //                     table.innerHTML += row;
// //                     // console.log(document.getElementById("checkBox"+data[num].user_id));

// //             $('#masterCheck').change(function() {
// //                 // this will contain a reference to the checkbox  
// //                 // alert("checked");
// //                 var checkBoxes = document.querySelectorAll(".checkBoxes"); 
// //                 if (this.checked) {  
// //                     flag=true;      
// //                     checkBoxes.forEach(checkBox => {
// //                         flag=true;
// //                         checkBox.checked = true;
// //                     });
// //                 } else {
// //                     flag=false;
// //                     checkBoxes.forEach(checkBox => {
// //                         checkBox.checked = false;
// //                     });
// //                 }
// //             });
// //             document.getElementById("overlay").style.display="none";
// //             // console.log(flag);
// //         }
// //         // var numberOfUsers = data.length;
// //         // pageButtons(res.pages);

// //     })
// //     .then(res => {
// //         var checkBoxes = document.getElementsByClassName("checkBoxes");

// //         for(i=0; i<checkBoxes.length; i++){
// //             checkBoxes[i].addEventListener('change', function() {
// //                 if(this.checked) {
// //                     checkedUsers.push(this.id.split("x")[1]);
// //                     console.log(checkedUsers);
// //                 } else {
// //                     for(i=0; i<checkedUsers.length;i++){
// //                         if(checkedUsers[i] == this.id.split("x")[1]){
// //                             checkedUsers.splice(i,1);
// //                             console.log(checkedUsers);
// //                         }
// //                     }
// //                 }
// //             });
// //     }})

// //     .catch(error => console.log('error', error));
// // }

// var totalPages;
// var pageNum = 0;

// function pageButtons(app_no,date=0) {
//     var app_no = sessionStorage.getItem("appno");
//     var wrapper = document.getElementById('pagination-wrapper')
//     wrapper.innerHTML = ''
//     var maxLeft = (pageNum - 2)
//     var maxRight = (pageNum + 2)
//     if (maxLeft < 0) {
//         maxLeft = 0
//         maxRight = 4
//     }
//     var numberOfPages;
//     totalPages = numberOfPages;
//     if (maxRight > numberOfPages) {
//         maxLeft = numberOfPages - 5

//         if (maxLeft < 1){
//             maxLeft = 0
//         }
//         maxRight = numberOfPages
//     }
//     var wrapper = document.getElementById("pagination-wrapper");
//     for (var page = maxLeft; page <= maxRight; page++) {
//         wrapper.innerHTML += "<button value='"+ page +"' class='page btn btn-sm btn-info pg"+(page+1)+"'>"+(page+1)+"</button>"
//     }

//     if (pageNum != 1) {
//         wrapper.innerHTML = "<button value='0' class='page btn btn-sm btn-info'>&#171; First</button>" + wrapper.innerHTML
//     }

//     if (pageNum != numberOfPages) {
//         wrapper.innerHTML += "<button value='"+numberOfPages+"' class='page btn btn-sm btn-info'>Last &#187;</button>"
//     }
//     $('.page').on('click', function() {
//         $('#tableBody').empty()
//         var pgs = document.getElementsByClassName("page");
//         for(i=0; i<pgs.length; i++){
//             pgs[i].classList.remove("activePage");  
//         }
//         pageNum = Number($(this).val());
//         getContactspage(app_no,date=0)
//     })
// }

// function getContactspage(app_no,date=0){
//     var table = document.getElementById("tableBodypage");
//     var myHeaders = new Headers();
//     myHeaders.append("userid", localStorage.getItem("userId"));
//     myHeaders.append("sessionkey", sessionStorage.getItem("sessionKey"));
//     myHeaders.append("languagetype", "1");
//     myHeaders.append("usertype", sessionStorage.getItem("user_type"));
//     myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

//     var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//     };

//     var appno = app_no;
//     sessionStorage.setItem("appno",appno)

//     var url = "http://api.myzila.com/GetContact?app_no="+app_no+"&page="+pageNum;
//     if(date!=0){
//         url += "&date="+date;
//         console.log(url);   
//         num=0;   
//         func = 0;  
//         table.innerHTML = "";
//         checkedUsers = [];
//     }
//     else{
//         func=1;
//     }
//     fetch(url, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//         var data = result.data;
//         var totalusers = result.total_user;

//         if(app_no==1){
//             document.getElementById("noResults").innerHTML = totalusers;
//         }
//         else{
//             document.getElementById("noResults").innerHTML = data.length;
//         }

//         if(data.length == 0){
//             table.innerHTML="No results to display";
//         }

//         var sno; 
//         var flag=false;
//         var limit = num+100;
//         for(; num<limit && num<data.length; num++){            

//             sno=num+1;
//             var onclick = "onclick=contactList(this.id)";
//             var row = "<tr id="+data[num].user_id+">"+
//                         "<td>"+sno+"</td>"+
//                         "<td><input type='checkbox' class='checkBoxes' id=checkBox"+data[num].user_id+"></td>"+
//                         "<td>"+data[num].name+"</td>"+
//                         "<td>"+data[num].number+"</td>"+
//                         "<td>"+data[num].user_id+"</td>"+
//                         "<td style='display: none'>"+data[num].fcm_token+"</td>"+
//                         "<td><button class='btn btn-primary contactbtn' id='contactListBtn"+data[num].user_id +"'"+ onclick+">Contact List</button></td>"+
//                         "<td style='display:none'>"+data[num].session_key+"</td>"+
//                       "</tr>";

//                 table.innerHTML += row;

//                 var phoneno = data[num].number;
//                 var mobileno = '';
//                 if(phoneno.charAt(0) == '+' || phoneno.charAt(0) == '0'){
//                     mobileno = phoneno.replace(/[^a-zA-Z0-9+]/g,"").substr(3);
//                 }
//                 else{
//                     mobileno = phoneno.replace(/[^a-zA-Z0-9]/g,"");
//                 }
//                 var phoneAllnumber=[];
//                 phoneAllnumber.push(mobileno);

//             $('#masterCheck').change(function() {
//                 var checkBoxes = document.querySelectorAll(".checkBoxes"); 
//                 if (this.checked) {  
//                     flag=true;      
//                     checkBoxes.forEach(checkBox => {
//                         checkBox.checked = true;
//                         checkedUsers.push(this.id.split("x")[1]);

//                         console.log(checkedUsers);
//                     });
//                 } else {
//                     flag=false;
//                     checkBoxes.forEach(checkBox => {
//                         checkBox.checked = false;
//                         checkedUsers.splice(i,1);
//                         console.log(checkedUsers);
//                     });
//                 }
//             });
//         }
//         pageButtons(app_no,date=0);
//         if(pageNum!=0){
//             var pg = document.getElementsByClassName("pg"+(pageNum+1))[0];
//         }else{
//             var pg = document.getElementsByClassName("pg"+(pageNum+1))[0]
//         }
//         pg.classList.add("activePage");

//     })
//     .then(res => {
//         var checkBoxes = document.getElementsByClassName("checkBoxes");

//         for(i=0; i<checkBoxes.length; i++){
//             checkBoxes[i].addEventListener('change', function() {
//                 if(this.checked) {
//                     checkedUsers.push(this.id.split("x")[1]);
//                     let row = document.getElementById(this.id.split("x")[1]);
//                     phoneNumber.push(row.cells[3].innerHTML);
//                     //console.log("Number Array is "+phoneNumber);
//                     console.log(checkedUsers);
//                 } else {

//                     for(i=0; i<checkedUsers.length;i++){
//                         let row = document.getElementById(this.id.split("x")[1]);
//                         if(checkedUsers[i] == this.id.split("x")[1]){
//                             checkedUsers.splice(i,1);
//                             console.log(checkedUsers);
//                         }
//                         if(phoneNumber[i] == row.cells[3].innerHTML )
//                         {
//                             phoneNumber.splice(i,1);
//                             console.log("Number are " +phoneNumber);
//                         }
//                     }
//                 }
//             });
//         }
//     })

//     .catch(error => console.log('error', error));
// }

// function getContacts(app_no,date=0){
//     var table = document.getElementById("tableBody");
//     var myHeaders = new Headers();
//     myHeaders.append("userid", localStorage.getItem("userId"));
//     myHeaders.append("sessionkey", sessionStorage.getItem("sessionKey"));
//     myHeaders.append("languagetype", "1");
//     myHeaders.append("usertype", sessionStorage.getItem("user_type"));
//     myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

//     var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//     };

//     var appno = app_no;
//     sessionStorage.setItem("appno",appno)

//     var url = "http://api.myzila.com/GetContact?app_no="+app_no+"&page="+pageNum;
//     if(date!=0){
//         url += "&date="+date;
//         console.log(url);   
//         num=0;   
//         func = 0;  
//         table.innerHTML = "";
//         checkedUsers = [];
//     }
//     else{
//         func=1;
//     }
//     fetch(url, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//         var data = result.data;
//         var totalusers = result.total_user;

//         if(app_no==1){
//             document.getElementById("noResults").innerHTML = totalusers;
//         }
//         else{
//             document.getElementById("noResults").innerHTML = data.length;
//         }

//         if(data.length == 0){
//             table.innerHTML="No results to display";
//         }

//         var sno; 
//         var flag=false;
//         var limit = num+100;
//         for(; num<limit && num<data.length; num++){            

//             sno=num+1;
//             var onclick = "onclick=contactList(this.id)";
//             var row = "<tr id="+data[num].user_id+">"+
//                         "<td>"+sno+"</td>"+
//                         "<td><input type='checkbox' class='checkBoxes' id=checkBox"+data[num].user_id+"></td>"+
//                         "<td>"+data[num].name+"</td>"+
//                         "<td>"+data[num].number+"</td>"+
//                         "<td>"+data[num].user_id+"</td>"+
//                         "<td style='display: none'>"+data[num].fcm_token+"</td>"+
//                         "<td><button class='btn btn-primary contactbtn' id='contactListBtn"+data[num].user_id +"'"+ onclick+">Contact List</button></td>"+
//                         "<td style='display:none'>"+data[num].session_key+"</td>"+
//                       "</tr>";

//                 table.innerHTML += row;

//                 var phoneno = data[num].number;
//                 var mobileno = '';
//                 if(phoneno.charAt(0) == '+' || phoneno.charAt(0) == '0'){
//                     mobileno = phoneno.replace(/[^a-zA-Z0-9+]/g,"").substr(3);
//                 }
//                 else{
//                     mobileno = phoneno.replace(/[^a-zA-Z0-9]/g,"");
//                 }
//                 var phoneAllnumber=[];
//                 phoneAllnumber.push(mobileno);

//             $('#masterCheck').change(function() {
//                 var checkBoxes = document.querySelectorAll(".checkBoxes"); 
//                 if (this.checked) {  
//                     flag=true;      
//                     checkBoxes.forEach(checkBox => {
//                         checkBox.checked = true;
//                         checkedUsers.push(this.id.split("x")[1]);

//                         console.log(checkedUsers);
//                     });
//                 } else {
//                     flag=false;
//                     checkBoxes.forEach(checkBox => {
//                         checkBox.checked = false;
//                         checkedUsers.splice(i,1);
//                         console.log(checkedUsers);
//                     });
//                 }
//             });
//         }
//         pageButtons(app_no,date=0);
//         if(pageNum!=0){
//             var pg = document.getElementsByClassName("pg"+(pageNum+1))[0];
//         }else{
//             var pg = document.getElementsByClassName("pg"+(pageNum+1))[0]
//         }
//         pg.classList.add("activePage");

//     })
//     .then(res => {
//         var checkBoxes = document.getElementsByClassName("checkBoxes");

//         for(i=0; i<checkBoxes.length; i++){
//             checkBoxes[i].addEventListener('change', function() {
//                 if(this.checked) {
//                     checkedUsers.push(this.id.split("x")[1]);
//                     let row = document.getElementById(this.id.split("x")[1]);
//                     phoneNumber.push(row.cells[3].innerHTML);
//                     //console.log("Number Array is "+phoneNumber);
//                     console.log(checkedUsers);
//                 } else {

//                     for(i=0; i<checkedUsers.length;i++){
//                         let row = document.getElementById(this.id.split("x")[1]);
//                         if(checkedUsers[i] == this.id.split("x")[1]){
//                             checkedUsers.splice(i,1);
//                             console.log(checkedUsers);
//                         }
//                         if(phoneNumber[i] == row.cells[3].innerHTML )
//                         {
//                             phoneNumber.splice(i,1);
//                             console.log("Number are " +phoneNumber);
//                         }
//                     }
//                 }
//             });
//         }
//     })

//     .catch(error => console.log('error', error));
// }

// function contactList(id){
//     console.log(id.split('n',3)[2]);
//     let userId = id.split('n',3)[2];
//     let row = document.getElementById(userId);
//   //  console.log(row.cells[2].innerHTML);
//     let userName = row.cells[2].innerHTML;
//     localStorage.setItem("zclid", userId);
//     localStorage.setItem("zclName", userName);
//     // window.open='contactList';
//     window.open('contactList', '_blank');
// }






// function getAddMoney(event){
//     event.preventDefault();
//     console.log(checkedUsers);
//     if(checkedUsers.length==0){
//         alert("Please select users before you add money");
//         return;
//     }
//     checkedUsers.map(checkedUser => {
//         let row = document.getElementById(checkedUser);
//         let useridx = row.cells[4].innerHTML;
//         let sessionkeyx = row.cells[7].innerHTML;
//         let hash = {
//             1:3,
//             2:1,
//             3:5
//         }
//         let headers = {
//             userid:useridx,
//             sessionkey: sessionkeyx,
//             user_type: hash[document.getElementById("select").value]
//         }
//         // console.log(row);
//         // console.log(userid);
//         // console.log(sessionkey);
//         // console.log(hash[document.getElementById("select").value]);
//         var d_amt = document.getElementById("debit_amt").value;
//         var c_amt = document.getElementById("credit_amt").value;
//         var o_id = document.getElementById("order_id").value;
//         console.log(d_amt, c_amt, o_id);
//         addMoney(c_amt, d_amt, o_id, headers);
//     })
// }

// function addMoney(credit_amt, debit_amt, order_id, headers){
//     console.log(credit_amt, debit_amt, order_id, headers);
//     console.log(headers);
//     var myHeaders = new Headers();
//     myHeaders.append("userid", headers.userid);
//     myHeaders.append("sessionkey", headers.sessionkey);
//     myHeaders.append("languagetype", "1");
//     myHeaders.append("usertype",headers.user_type );
//     myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//     // myHeaders.append("Cookie", "ci_session=05hs6nu0kgvknnom0r3gtiu6nm5pd787");
//     console.log(headers.userid);

//     var today = new Date();
//     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var dateTime = date+' '+time;

//     var urlencoded = new URLSearchParams();
//     urlencoded.append("credit_amt", credit_amt);
//     urlencoded.append("debit_amt", debit_amt);
//     urlencoded.append("transaction_date", dateTime);
//     urlencoded.append("description", order_id);

//     console.log(urlencoded);

//     var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: 'follow'
//     };

//     // const proxyurl = "https://cors-anywhere.herokuapp.com/";
//     const url = "http://api.myzila.com/AddWalletMoney";

//     fetch(url, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result);
//         console.log(result.status);
//         if(result.status == 200){
//             alert("Money added successfully!");
//         }
//     })
//     .catch(error => console.log('error', error));
// }


// // var testarray=[];
// // testarray.push("8390197580");
// // testarray.push("9901950366");


// function sendMessage(phoneNumber,type){
//     var send_msg = document.getElementById("msgUser").value;
//     var send_msgAll = document.getElementById("msgAllUser").value;
//     var myHeaders = new Headers();
//     myHeaders.append("authkey", "256829AajxOw3q5c3e0991");
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Cookie", "PHPSESSID=rl0rcnqdf7arf2lsb3pr9nace7");
//     //var test = JSON.stringify(testarray);

//     if(type=="0"){
//         var raw = JSON.stringify({"sender":"MYZILA","route":"4","country":"91","sms":[{"message":send_msg,"to":phoneNumber}]});
//     }
//     else{
//         var raw = JSON.stringify({"sender":"MYZILA","route":"4","country":"91","sms":[{"message":send_msgAll,"to":phoneAllnumber}]});
//     }

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     const proxyurl = "https://cors-anywhere.herokuapp.com/";
//     const url = "https://api.msg91.com/api/v2/sendsms";
//     fetch(proxyurl+url, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//         console.log('Response Is '+ result.type);
//         if(result.type == "success"){
//             alert("Message sent");
//         }
//         else{
//             alert("Error")
//         }   
//     })
//     .catch(error => {
//         console.log('error', error);
//     });
// }





