// fucntion to add amount to the datdabase

var addTransaction = localStorage.getItem("addTransaction");

function addMoney(credit_amt, debit_amt, order_id) {
    var myHeaders = new Headers();
    myHeaders.append("userid", sessionStorage.getItem("mUserId"));
    myHeaders.append("sessionkey", sessionStorage.getItem("mSessionKey"));
    myHeaders.append("languagetype", "1");
    myHeaders.append("user_type", sessionStorage.getItem("mUserType"));
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // myHeaders.append("Cookie", "ci_session=05hs6nu0kgvknnom0r3gtiu6nm5pd787");

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    var urlencoded = new URLSearchParams();
    urlencoded.append("credit_amt", credit_amt);
    urlencoded.append("debit_amt", debit_amt);
    urlencoded.append("transaction_date", dateTime);
    urlencoded.append("order_id", order_id);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = addTransaction;

    fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
}

// To get values from user
function addMoneyBtn() {
    event.preventDefault();

    var d_amt = document.getElementById("debit_amt").value;
    var c_amt = document.getElementById("credit_amt").value;
    var o_id = document.getElementById("order_id").value;
    addMoney(c_amt, d_amt, o_id);


    // console.log(dateTime);

}
