var addSubCategory = localStorage.getItem("addSubCategory");


console.log("addSubCategory:",addSubCategory);


function addSubCategory() {
    var subCatName = document.getElementById("subCatName").value;
    var subCatHindiName = document.getElementById("subCatHindiName").value;
    var subCatImage = document.getElementsByName("images")[0].files[0];
    var category_id = localStorage.getItem("catid")
    console.log("Name: ", subCatName, "Hindi ", subCatHindiName, "Image ", subCatImage, "Cat id ", category_id);
    //alert("Category added successfully")
    if (subCatName == '' || subCatHindiName == '' || document.getElementsByName("images")[0].files.length == 0) {
        alert("Please fill in all the details");
    } else {
        var myHeaders = new Headers();
        myHeaders.append("userid", "1784");
        myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
        myHeaders.append("languagetype", "1");
        myHeaders.append("usertype", "0");
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

        var formdata = new FormData();
        formdata.append("name", subCatName);
        formdata.append("hindi_name", subCatHindiName);
        formdata.append("category_id", category_id);
        formdata.append("image", subCatImage);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";

        fetch(addSubCategory, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status == 200) {
                        console.log(result);
                        alert("Sub-category added");
                    }

                })
                .catch(error => {
                    console.log('error', error)
                    alert("Error adding new sub-category!")
                });
    }
}