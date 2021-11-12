/* only replace the content (works!)
 $('#profile').on('click',function() {
 $("#content").load("profile.html");
 })
 */

// const proxyurl = "https://cors-anywhere.herokuapp.com/";

var  getproduct = localStorage.getItem("getproduct");
var getOrderlist = localStorage.getItem("getOrderlist");
var getAccountDetails = localStorage.getItem("getAccountDetails");
var getTask = localStorage.getItem("getTask");
var admingetCategory = localStorage.getItem("admingetCategory");
var getUploadvideo = localStorage.getItem("getUploadvideo");
var vendorData = localStorage.getItem("vendorData");

console.log("vendorData",vendorData);
console.log("getUploadvideo",getUploadvideo);
console.log("getTask",getTask);
console.log("admingetCategory",admingetCategory);
console.log("getAccountDetails",getAccountDetails);
console.log("getOrderlist",getOrderlist);
console.log("getproduct",getproduct);

if (sessionStorage.getItem("user_type") == "4" || sessionStorage.getItem("user_type") == "0") {
    // console.log("connected");  
    document.getElementById("adminOnly").style.display = "block";


// function declaration

    getNumberOfProducts()
    getNumberOfOrders()
    getNumberOfBankAccounts()
    getNumberOfZilaStore()
    getNumberOfCategories()
    getNumberOfVideos()

// To get Total no of products

    function getNumberOfProducts() {
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

        fetch(getproduct+"category_id=0", requestOptions)
                .then(response => response.json())
                .then(result => {
                    document.getElementById("numProducts").innerHTML = result.totalproduct
                })
                .catch(error => console.log('error', error));
    }

// To get Total number of Orders

    function getNumberOfOrders() {
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

        fetch(getOrderlist+"seller_id=0&page=0", requestOptions)
                .then(response => response.json())
                .then(result => {
                    document.getElementById("numOrders").innerHTML = result.totalordertozila
                })
                .catch(error => console.log('error', error));
    }

// To get Total no of Bank Accounts

    function getNumberOfBankAccounts() {
        var myHeaders = new Headers();
        myHeaders.append("userid", "1784");
        myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
        myHeaders.append("languagetype", "1");
        myHeaders.append("usertype", "0");
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
        myHeaders.append("Cookie", "ci_session=oshp08q3phv657ldtbg8d6nvj91o0vuv");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(getAccountDetails+"user_id=1788", requestOptions)
                .then(response => response.json())
                .then(result => {
                    document.getElementById("numAccounts").innerHTML = result.data.length;
                    //console.log(result.data.length)
                })
                .catch(error => console.log('error', error));
    }

// To get Total no of tasks handled by Zila store

    function getNumberOfZilaStore() {
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

        fetch(getTask+"store_id=1959", requestOptions)
                .then(response => response.json())
                .then(result => {
                    document.getElementById("tasks").innerHTML = result.data.length;
                    //console.log(result)
                })
                .catch(error => console.log('error', error));
    }

// To get Toatal no of categories

    function getNumberOfCategories() {
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
                    document.getElementById("categories").innerHTML = result.category.length;
                    //console.log(result)
                })
                .catch(error => console.log('error', error));
    }

// To get Total no of Videos available for products 
    function getNumberOfVideos() {
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

        fetch(getUploadvideo+"seller_id=0", requestOptions)
                .then(response => response.json())
                .then(result => {
                    document.getElementById("approveVideos").innerHTML = result.data.length;
                    //console.log(result)
                })
                .catch(error => console.log('error', error));
    }
}

// If User type != 4 or 0 

else {
    document.getElementById("sales").href = "vendorSales";
    document.getElementById("vendor").style.display = "block";
    getNumberOfProducts();
    function getNumberOfProducts() {
        var myHeaders = new Headers();
        myHeaders.append("userid", "3513");
        myHeaders.append("sessionkey", "AyvRZMmvXUZpKxyYat3qeiD2MRjD66HM");
        myHeaders.append("languagetype", "1");
        myHeaders.append("usertype", "2");
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(vendorData+"user_id=" + localStorage.getItem("userId"), requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    document.getElementById("numVendorProducts").innerHTML = result.data.total_product;
                    document.getElementById("numVendorOrders").innerHTML = result.data.total_order;
                })
                .catch(error => console.log('error', error));
    }
}
