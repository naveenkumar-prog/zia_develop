var Inventory = localStorage.getItem("Inventory");

let selectedFile;

document.getElementById('fileInput').addEventListener("change",(event)=>{
	console.log(event.target.files)
	selectedFile = event.target.files[0];
})

document.getElementById('convert').addEventListener("click",()=>{
	console.log("clicked")
	if(selectedFile){
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(selectedFile);
		fileReader.onload = (event)=>{
			console.log(event.target.result)
			let data = event.target.result;
			let workbook = XLSX.read(data, {type:"binary"});
			console.log(workbook)
			workbook.SheetNames.forEach(sheet => {
				let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
				console.log(rowObject);
				//console.log(rowObject[0].MRP);
				upct(rowObject);
			});
		}
	}else{
		alert("Please Upload Excel File !!")
	}
})

function upct(myList){
	console.log("uploadProduct enter")
	if (myList[0]==undefined){
		console.log('YEs')
		alert("Please fill the details in Excel!!")
	}
	else{
		console.log(myList[0].Seller_Mobile)
		
		var myHeaders = new Headers();
		myHeaders.append("sessionkey", "rq3fDv7ySfbo3YzZxYBgg5FNjCQjvkRi");
		myHeaders.append("usertype", "0");
		myHeaders.append("userid", "1784");
		myHeaders.append("languagetype", "1");
		myHeaders.append("Authorization", "Basic dGVjaHppbGE6dGVjaHppbGFAMjAxOSFAI3RlY2g=");
		myHeaders.append("Content-Type","application/x-www-form-urlencoded");

		for(var i=0;i<myList.length;i++){
			let j = i+1
			let urlencoded = new URLSearchParams();
				
				// To check Compulsory Fields

			if(myList[i].Product_Id == undefined || myList[i].Quantity == undefined || myList[i].Quantity_Unit == undefined || myList[i].Seller_Price_Per_Unit_Without_tax_and_offer == undefined || myList[i].Seller_Mobile == undefined || myList[i].Seller_Name == undefined || myList[i].Seller_Address == undefined){
				alert("Please Check the item  row  "+j+" and fill all Compulsory Fields in that !!")
			}else{

				urlencoded.append("seller_mobile", myList[i].Seller_Mobile);
				urlencoded.append("seller_name", myList[i].Seller_Name);
			    urlencoded.append("seller_address", myList[i].Seller_Address);
				urlencoded.append("product_id",myList[i].Product_Id);
				urlencoded.append("quantity",myList[i].Quantity)
				urlencoded.append("quantity_unit",myList[i].Quantity_Unit)
				urlencoded.append("seller_price_per_unit",myList[i].Seller_Price_Per_Unit_Without_tax_and_offer)

			// if clause to check igst
			if(myList[i].IGST == undefined){
				urlencoded.append("igst",0)
			}else{
				urlencoded.append("igst",myList[i].IGST)
			}

				// To check Type-2 (set -1) error

				if(myList[i].CGST == undefined && myList[i].SGST== undefined){
				urlencoded.append("cgst",0)
				urlencoded.append("sgst",0)
				var flag = 1
			}else if(myList[i].CGST != undefined && myList[i].SGST!= undefined){
				urlencoded.append("cgst",myList[i].CGST)
				urlencoded.append("sgst",myList[i].SGST)
				var flag = 1
			}else if(myList[i].CGST != undefined || myList[i].SGST!= undefined){
				var flag = 0
			}


			// To chack Type-2 (set-2) error
			if(myList[i].Zila_Offer != undefined || myList[i].CP_Commission != undefined || myList[i].MRP != undefined ) {
				if(myList[i].Zila_Offer == undefined || myList[i].CP_Commission == undefined || myList[i].MRP == undefined){
					alert("Please Check the item row  "+j+" !!, if any field in Type-2 is filled then, all the remainings fields in particular set must be filled");
				}else{
					urlencoded.append("zila_offer",myList[i].Zila_Offer)
				  urlencoded.append("cp_commission",myList[i].CP_Commission)
				  urlencoded.append("zila_mrp",myList[i].MRP);
				  check_threshold(myList[i].Threshold,j,urlencoded,myHeaders,myList.length,flag);
				}		
			
	}else if(myList[i].Zila_Offer == undefined && myList[i].CP_Commission == undefined && myList[i].MRP == undefined){
		urlencoded.append("zila_offer",0)
		urlencoded.append("cp_commission",0)
		urlencoded.append("zila_mrp",0);
		check_threshold(myList[i].Threshold,j,urlencoded,myHeaders,myList.length,flag);
	}
			
			}


	}
}
}
var counter =0
function to_fetch(urlencoded,myHeaders,l){
	console.log("Fetch functio enters")
	 counter = counter+1
	 for (var pair of urlencoded.entries()) {
	 	console.log(pair[0]+ ' - ' + pair[1]);
	}

			var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow'
		};
			console.log("counter",counter);
			fetch(Inventory+"operation=1", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("res:",result);
                console.log("result_sts:",result.status);
                if (result.status == 200) {
                    alert("Successfully added  "+counter +"  items in  Inventory");
                    window.location.href="addinventory.html";

                }
            })
            .catch(error => console.log('error', error));	 	
	 //else{
	 	//alert("Please Correct all the errors and try to add inventory! Click ok to see the errors");
	 //}

		
}

function check_threshold(x,j,urlencoded,myHeaders,l,flag){
	console.log("threshold functioinn enterrs")
	console.log('fl',flag)
if(flag == 1){
	if(x == undefined){
	alert("Please fill threshold in row "+j);
}else{
	urlencoded.append("threshhold",x)
	to_fetch(urlencoded,myHeaders,l);
 }

}else if(flag==0){
	alert("Please Check CGST and SGST in row "+j+",  It is Type-2 (Set-1) error!!")
}

}