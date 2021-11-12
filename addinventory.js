var Inventory = localStorage.getItem("Inventory");


function template(){
	saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), 'ZilaUploadInventory.xlsx');
}

var wb = XLSX.utils.book_new();
wb.Props = {
	Title : 'Zila Upload Inventory',
	Subject : "Upload Inventory Items ",
	Author : "Zila",
	CreatedDate : new Date(2021,9,14)
};
wb.SheetNames.push("Upload Inventory");
var ws_data = [['Sl.No','Product_Id','Quantity','Seller_Name','Seller_Mobile','Seller_Address','Quantity_Unit','Seller_Price_Per_Unit_Without_tax_and_offer','CGST','SGST','IGST','MRP','Zila_Offer','CP_Commission','Threshold']]
var ws = XLSX.utils.aoa_to_sheet(ws_data)
wb.Sheets['Upload Inventory'] = ws;

var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});
function s2ab(s){
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for(var i=0; i<s.length; i++) view[i]= s.charCodeAt(i) & 0xFF;
	return buf;
}

