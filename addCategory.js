// On click submit

var addCategory = localStorage.getItem("addCategory");

console.log("addCategory",addCategory);

function addCategory() {
    var catName = document.getElementById("catName").value;
    var catHindiName = document.getElementById("catHindiName").value;
    var catTamilName = document.getElementById("catTamilName").value;
    //var catImage = document.getElementById("catImage").files[0];
    var catImage = document.getElementsByName("images")[0].files[0];
    var catMinAge = document.getElementById("catMinAge").value;
    var catMaxAge = document.getElementById("catMaxAge").value;
    var ofVideos, ofVideosFlag = 1;
    var ele = document.getElementsByName("ofVid");
    if (ele[0].checked)
        ofVideos = ele[0].value;
    else if (ele[1].checked)
        ofVideos = ele[1].value;
    else
        ofVideosFlag = 0
    var availableIn = document.getElementById("availableIn").value;
    if (catName == '' || catHindiName == '' || catTamilName == '' || document.getElementsByName("images")[0].files.length == 0 || catMinAge == '' || catMaxAge == '' || ofVideosFlag == 0 || availableIn == '') {
        alert("Please fill in all the fields")
        console.log("Name: ", catName, "Hindi ", catHindiName, "Tamil ", catTamilName, "Image", catImage, "Min ", catMinAge, "Max ", catMaxAge, "OfVid ", ofVideos, "AvailableIn ", availableIn);
    } else {
        var myHeaders = new Headers();
        myHeaders.append("userid", "1784");
        myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
        myHeaders.append("languagetype", "1");
        myHeaders.append("usertype", "0");
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

        var formdata = new FormData();
        formdata.append("name", catName);
        formdata.append("hindi_name", catHindiName);
        formdata.append("tamil_name", catTamilName);
        formdata.append("image", document.getElementsByName("images")[0].files[0]);
        formdata.append("min_age", catMinAge);
        formdata.append("max_age", catMaxAge);
        formdata.append("ofVideos", ofVideos);
        formdata.append("available_in", availableIn);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";

        fetch(addCategory, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    alert("Category added")
                })
                .catch(error => {
                    console.log('error', error)
                    alert("Error adding new category!")
                });
    }
}