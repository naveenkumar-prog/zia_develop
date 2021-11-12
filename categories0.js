var admingetCategory = localStorage.getItem("admingetCategory");
var updaterank1 = localStorage.getItem("updaterank1");


console.log("updaterank1:",updaterank1);
console.log("admingetCategory:",admingetCategory);

var newRank = {}
var categories = []

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

//const proxyurl = "https://cors-anywhere.herokuapp.com/";

fetch(admingetCategory, requestOptions)
        .then(response => response.json())
        .then(result => {
            categories = result.category
            for (var i = 0; i < result.category.length; i++) {
                for (var j = 0; j < result.category.length; j++) {
                    if (result.category[j].rank == (i + 1)) {
                        var li = "<li id='" + result.category[j].category_id + "' class='draggable' draggable='true'>" + result.category[j].name + "</li>";

                        document.getElementById('list').innerHTML += li;
                    }
                }
            }
            var btn = document.querySelector('.add');
            var remove = document.querySelector('.draggable');

            // Drag and Drop event listeners

            function dragStart(e) {
                this.style.opacity = '0.4';
                dragSrcEl = this;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', this.innerHTML);
            }
            ;

            function dragEnter(e) {
                this.classList.add('over');
            }

            function dragLeave(e) {
                e.stopPropagation();
                this.classList.remove('over');
            }

            function dragOver(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                return false;
            }

            function dragDrop(e) {
                if (dragSrcEl != this) {
                    dragSrcEl.innerHTML = this.innerHTML;
                    this.innerHTML = e.dataTransfer.getData('text/html');
                }
                return false;
            }

            function dragEnd(e) {
                var listItens = document.querySelectorAll('.draggable');
                [].forEach.call(listItens, function (item) {
                    item.classList.remove('over');
                });
                this.style.opacity = '1';
            }

            function addEventsDragAndDrop(el) {
                el.addEventListener('dragstart', dragStart, false);
                el.addEventListener('dragenter', dragEnter, false);
                el.addEventListener('dragover', dragOver, false);
                el.addEventListener('dragleave', dragLeave, false);
                el.addEventListener('drop', dragDrop, false);
                el.addEventListener('dragend', dragEnd, false);
            }

            var listItens = document.querySelectorAll('.draggable');
            [].forEach.call(listItens, function (item) {
                addEventsDragAndDrop(item);
            });

            function addNewItem() {
                var newItem = document.querySelector('.input').value;
                if (newItem != '') {
                    document.querySelector('.input').value = '';
                    var li = document.createElement('li');
                    var attr = document.createAttribute('draggable');
                    var ul = document.querySelector('ol');
                    li.className = 'draggable';
                    attr.value = 'true';
                    li.setAttributeNode(attr);
                    li.appendChild(document.createTextNode(newItem));
                    ul.appendChild(li);
                    addEventsDragAndDrop(li);
                }
            }
            btn.addEventListener('click', addNewItem);
        })
        .catch(error => console.log('error', error));

// To get the Rank of the Categories

function getRank() {
    var rank = []

    var list = document.getElementById("list")
    var listli = list.getElementsByTagName("li")
    //console.log(listli);
    for (var i = 0; i < listli.length; i++) {
        for (var j = 0; j < listli.length; j++) {
            if (listli[i].textContent == categories[j].name) {
                var dataObj = {
                    "cat_id": categories[j].category_id,
                    "rank": i + 1,
                }
            }
        }
        rank.push(dataObj)
    }

    var res = {
        "rank": rank,
    }
    //console.log(rank);
    newRank = res
}

function passData() {

    //console.log(newRank)

    var myHeaders = new Headers();
    myHeaders.append("userid", "1784");
    myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
    myHeaders.append("languagetype", "1");
    myHeaders.append("usertype", "0");
    myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(newRank);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
   // var proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch( updaterank1, requestOptions)
            .then(response => response.text())
            .then(result => {
                //console.log(result)
                alert("Successfully made changes")
                location.href = "getCategory.html";
            })
            .catch(error => {
                console.log('error', error)
                alert("Changes could not be made!")
            });
}

// Oncllick Save 

function setNewRank() {
    getRank()
    passData()
}