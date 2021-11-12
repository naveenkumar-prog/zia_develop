var addNotification = localStorage.getItem("addNotification");

console.log("addNotification",addNotification);


function sendNotif() {
    var notif_title = document.getElementById("notifTitle").value;
    var notif_topic = document.getElementById("notifTopic").value;
    var notif_body = document.getElementById("notifBody").value;
    var notif_image = document.getElementById("notifImage");
    if (notif_title == "" || notif_topic == "" || notif_body == "" || notif_image.files.length == 0) {
        alert("Please fill in all the fields");
    } else {
        var myHeaders = new Headers();
        myHeaders.append("userid", "1784");
        myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
        myHeaders.append("languagetype", "1");
        myHeaders.append("usertype", "0");
        myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");

        var formdata = new FormData();
        formdata.append("image", notifImage.files[0]);
        formdata.append("topic", notif_topic);
        formdata.append("title", notif_title);
        formdata.append("description", notif_body);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";

        fetch(addNotification, requestOptions)
                .then(response => response.json())
                .then(result => {
                    alert("New notification added");
                    window.location.reload();
                })
                .catch(error => {
                    console.log('error', error);
                    alert("Could not send new notification!");
                });

    }
}