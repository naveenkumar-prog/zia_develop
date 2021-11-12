var getcategory = localStorage.getItem("getcategory");
var banner = localStorage.getItem("banner");


console.log("getcategory:",getcategory);
console.log("banner:",banner);

var myHeaders = new Headers();
myHeaders.append("userid", "1784");
myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
myHeaders.append("languagetype", "1");
myHeaders.append("usertype", "0");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = getcategory;

fetch(url, requestOptions)          // to fetch data from url
        .then(response => {
            return response.json()
        })
        .then(result =>
        {
            var category = document.getElementById("categorylist");

            for (var i = 0; i < result.category.length; i++) {
                var option = document.createElement("OPTION");       // To generate option variable

                //Set Customer Name in Text part.
                option.innerHTML = result.category[i].name;

                //Set CustomerId in Value part.
                option.value = result.category[i].category_id;

                //Add the Option element to DropDownList.
                category.options.add(option);
            }
            // console.log("kk",result)
        }
        )
        .catch(error => console.log('error', error));

// onclick submit

function addBanner(event) {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("userid", "3513");
    myHeaders.append("sessionkey", "AyvRZMmvXUZpKxyYat3qeiD2MRjD66HM");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "2");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

    var formdata = new FormData();
    formdata.append("offer_type", document.getElementById("offerType").value);
    formdata.append("brand", document.getElementById("brand").value);//1
    formdata.append("category_id", document.getElementById("categorylist").value);
    formdata.append("discount", document.getElementById("discount").value);
    formdata.append("discount_type", document.getElementById("discountType").value);
    formdata.append("operation_value", "0");
    formdata.append("type",document.getElementById("lang").value);
    console.log("lang valu",document.getElementById("lang").value);
    formdata.append("image", document.getElementById("img").files[0]);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = banner;

    fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("res:",result);
                console.log("result_sts:",result.status);
                if (result.status == 200) {
                    alert("Successfully added banner");
                    window.location.href="banners.html";

                }
            })
            .catch(error => console.log('error', error));
}