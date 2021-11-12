function generateInvoice(order_list, storeName, storeLocation, topay, wallet_balance_used) {

    var companyJSON = {
        CompanyName: 'Giscle Systems Pvt. Ltd',
        CompanyGSTIN: '10AAGCG9991B1ZP',
    };

    var invoiceJSON = {
        InvoiceNo: "" + order_list[0].order_id,
        InvoiceDate: "" + order_list[0].created_on,
    }

    var company_logo = new Image();

    company_logo.src2 = "https://static.wixstatic.com/media/78b2cf_83ed7d26c4284a8792da53801ecbd8b0~mv2.png/v1/fill/w_66,h_66,al_c,q_85,usm_0.66_1.00_0.01/logo.webp";
    company_logo.src1 = "images/zila.png";

    company_logo.w = 70;
    company_logo.h = 60;

    /*
     src1:'https://static.wixstatic.com/media/78b2cf_83ed7d26c4284a8792da53801ecbd8b0~mv2.png/v1/fill/w_66,h_66,al_c,q_85,usm_0.66_1.00_0.01/logo.webp',
     src:'images/zila.png',
     w: 80,
     h: 50
     };
     */

    var margin = {
        top: 10,
        bottom: 60,
        left: 40,
        width: 522
    }

    var fontSizes = {
        HeadTitleFontSizes: 17,
        HeadTitleFontSize: 18,
        Head2TitleFontSize: 16,
        TitleFontSize: 14,
        SubTitleFontSize: 12,
        NormalFontSize: 10,
        SmallFontSize: 8
    };

    var lineSpacing = {
        NormalSpacing: 12,
        LargeSpacing: 14,
        ExtraLargeSpacing: 16,
    };

    //console.log("order_list", order_list[0].address);

    var doc = new jsPDF('p', 'pt');
    // const myFont = 'fonts/Devnew.ttf';
    // doc.addFileToVFS("Devnew.ttf", myFont);
    // doc.addFont("Devnew.ttf", "Devanagari New", "Outlines");

    var rightStartCol1 = 400;
    var rightStartCol2 = 480;

    var InitialstartX = 40;
    var startX = 30;
    var InitialstartY = 50;
    var startY = 10;


    var lineHeights = 12;
    /*
     document.getElementById("wait").innerHTML = "Image is loading";
     document.getElementById("wait").innerHTML += "<img src='"+company_logo.src+"' style='heigth:100px;width:100px'>";
     */
    var res = doc.autoTableHtmlToJson(document.getElementById("basic-table"));
    res = doc.autoTableHtmlToJson(document.getElementById("tblInvoiceItemsList"));

    doc.setFontSize(fontSizes.SubTitleFontSize);
    doc.setFont('times');
    doc.setFontType('bold');

    company_logo.onError = function () {
        alert('Cannot load image');
    };
    //console.log("loading image");

    company_logo.onload = function () {
        //console.log("image loaded");
        /*
         document.getElementById("wait").innerHTML = "Image has finished loading";
         document.getElementById("wait").innerHTML += "<img src='"+company_logo.src+"' style='heigth:100px;width:100px'>";
         */

        //pdf.addImage(agency_logo.src, 'PNG', logo_sizes.centered_x, _y, logo_sizes.w, logo_sizes.h);
        doc.addImage(company_logo.src, 'PNG', startX + 20, startY += 40, company_logo.w, company_logo.h);

        doc.textAlign(companyJSON.CompanyName, {align: "left"}, startX, startY += 15 + company_logo.h);
        doc.setFontSize(fontSizes.NormalFontSize);
        doc.textAlign("GSTIN", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
        doc.textAlign(companyJSON.CompanyGSTIN, {align: "left"}, 80, startY);

        doc.setFontType('bold');
        doc.textAlign("Address", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign("H No 46, 12th Street,", {align: "left"}, 80, startY);
        doc.textAlign("Bharamantola, VPO-Dasaut,", {align: "left"}, 80, startY += lineSpacing.NormalSpacing);
        doc.textAlign("Singhia PS-Hathodi, Samastipur,", {align: "left"}, 80, startY += lineSpacing.NormalSpacing);
        doc.textAlign("Bihar, 848209, India", {align: "left"}, 80, startY += lineSpacing.NormalSpacing);

        // doc.setFontType('bold');
        // doc.textAlign("Address", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
        // doc.setFontType('normal');
        // doc.textAlign(companyJSON.CompanyAddressLine1, {align: "left"}, 80, startY);
        // doc.textAlign(companyJSON.CompanyAddressLine2, {align: "left"}, 80, startY+=lineSpacing.NormalSpacing);
        // doc.textAlign(companyJSON.CompanyAddressLine3, {align: "left"}, 80, startY+=lineSpacing.NormalSpacing);


        doc.setFontType('bold');
        doc.textAlign("EMAIL", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign("suman@myzila.com", {align: "left"}, 80, startY);

        doc.setFontType('bold');
        doc.textAlign("Phone: ", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign("7667749930", {align: "left"}, 80, startY);

        var tempY = InitialstartY;

        doc.setFontType('bold');
        doc.textAlign("INVOICE NO: ", {align: "left"}, rightStartCol1, tempY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(invoiceJSON.InvoiceNo, {align: "left"}, rightStartCol2, tempY);

        doc.setFontType('bold');
        doc.textAlign("INVOICE Date: ", {align: "left"}, rightStartCol1, tempY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(invoiceJSON.InvoiceDate, {align: "left"}, rightStartCol2, tempY);

        doc.setFontType('normal');

        doc.setLineWidth(1);
        // doc.line(20, startY+lineSpacing.NormalSpacing, 580, startY+=lineSpacing.NormalSpacing);
        doc.line(20, startY + lineSpacing.NormalSpacing, 220, startY + lineSpacing.NormalSpacing);
        doc.line(380, startY + lineSpacing.NormalSpacing, 580, startY + lineSpacing.NormalSpacing);

        doc.setFontSize(fontSizes.Head2TitleFontSize);
        doc.setFontType('bold');
        doc.textAlign("ORDER INVOICE", {align: "center"}, startX, startY += lineSpacing.NormalSpacing + 2);

        doc.setFontSize(fontSizes.NormalFontSize);
        doc.setFontType('bold');

        //-------Customer Info Billing---------------------

        var startBilling = startY;
        var store_name = storeName;
        var store_location = storeLocation;


        doc.setFontSize(fontSizes.SubTitleFontSize);
        doc.textAlign("ZCL Partner Address,", {align: "left"}, startX, startY += lineSpacing.ExtraLargeSpacing);
        doc.setFontSize(fontSizes.NormalFontSize);
        doc.textAlign(store_name, {align: "left"}, startX, startY += lineSpacing.LargeSpacing);
        /*
         doc.textAlign("GSTIN", {align: "left"}, startX, startY+=lineSpacing.LargeSpacing);
         doc.setFontType('normal');
         // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
         doc.textAlign(customer_BillingInfoJSON.CustomerGSTIN, {align: "left"}, 80, startY);
         */
        // doc.setFontType('bold');
        // doc.textAlign("PAN", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
        // doc.setFontType('normal');
        // doc.textAlign(customer_BillingInfoJSON.CustomerPAN, {align: "left"}, 80, startY);

        doc.setFontType('bold');
        doc.textAlign("Address", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');


        var pdfInMM = doc.internal.pageSize.width;  // width of page in mm        
        var storeAddress = "" + store_location;

        var lines = doc.splitTextToSize(storeAddress, 150);
        for (var j = 0; j < lines.length; j++) {

            if (j != 0) {
                startY += (lineSpacing.NormalSpacing);
            }
            doc.textAlign(lines[j], {align: "left"}, 80, startY);
        }

        var address = storeAddress.split(" ");



        doc.setFontType('bold');
        doc.textAlign("State", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(address[address.length - 3], {align: "left"}, 80, startY);

        doc.setFontType('bold');
        doc.textAlign("City", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(address[address.length - 4], {align: "left"}, 80, startY);

        doc.setFontType('bold');
        doc.textAlign("PIN", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(address[address.length - 2], {align: "left"}, 80, startY);

        // doc.setFontType('bold');
        // doc.textAlign("PIN", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
        // doc.setFontType('normal');
        // doc.textAlign(address[address.length-1], {align: "left"}, 80, startY);

        /*
         doc.setFontType('bold');
         doc.textAlign("EMAIL", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
         doc.setFontType('normal');
         doc.textAlign(customer_BillingInfoJSON.CustomerEmail, {align: "left"}, 80, startY);
         */

        doc.setFontType('bold');
        doc.textAlign("Phone: ", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(address[address.length - 1], {align: "left"}, 80, startY);


        //-------Customer Info Shipping---------------------

        var rightcol1 = 340;
        var rightcol2 = 400;
        // var customeradd = order_list[0].address;
        // var custad = customeradd.split("::");
        // console.log(customeradd);
        // console.log(custad);

        startY = startBilling;
        doc.setFontType('bold');
        doc.setFont('Devnew (1)');
        // doc.setFontType('normal');
        doc.setFontSize(fontSizes.SubTitleFontSize);
        doc.textAlign("Customer Address,", {align: "left"}, rightcol1, startY += lineSpacing.ExtraLargeSpacing);
        doc.textAlign(order_list[0].address.split(",")[0], {align: "left"}, rightcol1, startY += lineSpacing.LargeSpacing);
        doc.setFontSize(fontSizes.NormalFontSize);
        /*
         doc.setFontType('bold');
         doc.textAlign("GSTIN", {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
         doc.setFontType('normal');
         // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
         doc.textAlign(customer_BillingInfoJSON.CustomerGSTIN, {align: "left"},rightcol2, startY);
         */

        // doc.setFontType('bold');
        // doc.textAlign("PAN", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
        // doc.setFontType('normal');
        // doc.textAlign(customer_BillingInfoJSON.CustomerPAN, {align: "left"}, 80, startY);

        doc.setFontType('bold');
        doc.textAlign("Address", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        //doc.textAlign(order_list[0].address, {align: "left"}, rightcol2, startY);


        var pdfInMM = doc.internal.pageSize.width;  // width of page in mm        
        var shipAddress = "" + order_list[0].address;

        var lines = doc.splitTextToSize(shipAddress, (pdfInMM - rightcol2 - 20));
        for (var j = 0; j < lines.length; j++) {

            if (j != 0)
                startY += (lineSpacing.NormalSpacing);
            doc.textAlign(lines[j], {align: "left"}, rightcol2, startY);
        }

        var address = shipAddress.split(",");

        doc.setFontType('bold');
        doc.textAlign("State", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(address[address.length - 2], {align: "left"}, rightcol2, startY);

        doc.setFontType('bold');
        doc.textAlign("City", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(address[address.length - 3], {align: "left"}, rightcol2, startY);

        doc.setFontType('bold');
        doc.textAlign("PIN", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(address[address.length - 1], {align: "left"}, rightcol2, startY);
        /*
         doc.setFontType('bold');
         doc.textAlign("EMAIL", {align: "left"}, rightcol1, startY+=lineSpacing.NormalSpacing);
         doc.setFontType('normal');
         doc.textAlign(customer_BillingInfoJSON.CustomerEmail, {align: "left"}, rightcol2, startY);
         */
        doc.setFontType('bold');
        doc.textAlign("Phone: ", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(address[1].split(" ")[1], {align: "left"}, rightcol2, startY);

        var header = function (data) {
            doc.setFontSize(8);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            // doc.textAlign("TAX INVOICE", {align: "center"}, data.settings.margin.left, 50);

            //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
            // doc.text("Testing Report", 110, 50);
        };
        // doc.autoTable(res.columns, res.data, {margin: {top:  startY+=30}});
        doc.setFontSize(8);
        doc.setFontStyle('normal');

        var options = {

            beforePageContent: header,
            margin: {
                top: 50,
                bottom: 50
            },
            styles: {
                overflow: 'linebreak',
                fontSize: 10,
                rowHeight: 'auto',
                columnWidth: 'wrap'
            },
            columnStyles: {
                text: {columnWidth: 'wrap'},
                sno: {columnWidth: 'auto'},
                sellId: {columnWidth: 'auto'},
                Product: {columnWidth: 150},
                ratePerItem: {columnWidth: 'auto'},
                Qty: {columnWidth: 'auto'},
                Dsnt: {columnWidth: 'auto'},
                STotal: {columnWidth: 'auto'},
            },
            startY: startY += 50
        };

        var columns = [
            {title: "SNO", dataKey: "sno"}, //width: 40},
            {title: "Sell id", dataKey: "sellId"}, //width: 40},
            {title: "Product", dataKey: "Product"}, //columnWidth: 40}, 
            {title: "Rate/Item", dataKey: "ratePerItem"}, //width: 40}, 
            {title: "Qty", dataKey: "Qty"}, //width: 40}, 
            {title: "Dsnt(%)", dataKey: "Dsnt"}, //width: 40}, 
            {title: "S.Total", dataKey: "STotal"}, //width: 40}, 
                    /*
                     {title: "CGST", dataKey: "CGST",width: 40}, 
                     {title: "SGST", dataKey: "SGST",width: 40}, 
                     {title: "IGST", dataKey: "IGST",width: 40}, 
                     {title: "CESS", dataKey: "CESS",width: 40}, 
                     {title: "Total", dataKey: "Total",width: 40}, 
                     */
        ];

        var rows = [];
        var stotal = [];
        var actamt = [];
        var dissamt = [];
        var promoamt = [];
        var savedamt = [];
        dissamt[0] = 0;
        actamt[0] = 0;
        stotal[0] = 0;
        promoamt[0] = 0;
        savedamt[0] = 0;
        for (var k = 0; k < order_list.length; k++) {
            var actamtt = ((order_list[k].actual_amount) * (order_list[k].quantity));
            actamt[0] += actamtt;

            var ptotal = ((100 - order_list[k].offer_amount) / 100) * (order_list[k].actual_amount) * (order_list[k].quantity);
            stotal[0] += ptotal;

            var promo = (parseFloat(order_list[k].promo_amt));
            promoamt[0] += promo;

            var disamt = (actamtt - ptotal);
            dissamt[0] += disamt;

            var saved = (parseFloat(disamt) + parseFloat(promo));
            savedamt[0] += saved;

            var rowData = {
                "sno": k + 1,
                "sellId": order_list[k].sold_product_id,
                "Product": order_list[k].name,
                "ratePerItem": order_list[k].actual_amount,
                "Qty": order_list[k].quantity,
                "Dsnt": order_list[k].offer_amount,
                "STotal": ptotal.toFixed(3)
            }
            rows.push(rowData);
        }

        /*
         var rows = 
         [
         {"id": 1, "Product": "SAMSUNG GALAXY S8 PLUS 64GB HSNCODE: 330854040", "Rate/Item": "10","Qty" : "12","Dsnt":"0","STotal":"120","CGST":20,"SGST":20,"IGST":0,"CESS":20,"Total":180},
         {"id": 2, "Product": "SAMSUNG GALAXY S8 PLUS 64GB HSNCODE: 330854040", "Rate/Item": "10","Qty" : "12","Dsnt":"0","STotal":"120","CGST":20,"SGST":20,"IGST":0,"CESS":20,"Total":180},
         {"id": 3, "Product": "SAMSUNG GALAXY S8 PLUS 64GB HSNCODE: 330854040", "Rate/Item": "10","Qty" :"12","Dsnt":"10","STotal":"120","CGST":20,"SGST":20,"IGST":0,"CESS":20,"Total":180},
         ];
         */

        //columnStyles: {
        //    id: {fillColor: 255}
        //},

        doc.autoTable(columns, rows, options);   //From dynamic data.
        //doc.autoTable(res.columns, res.data, options); //From htmlTable

        //-------Invoice Footer---------------------

        var payment_logo = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/4RD6RXhpZgAATU0AKgAAAAgABAE7AAIAAAAQAAAISodpAAQAAAABAAAIWpydAAEAAAAgAAAQ0uocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAENIQUlUQU5ZQSBESVhJVAAABZADAAIAAAAUAAAQqJAEAAIAAAAUAAAQvJKRAAIAAAADNjEAAJKSAAIAAAADNjEAAOocAAcAAAgMAAAInAAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIwMjE6MDI6MjMgMTA6MzU6NTgAMjAyMTowMjoyMyAxMDozNTo1OAAAAEMASABBAEkAVABBAE4AWQBBACAARABJAFgASQBUAAAA/+ELImh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iLz48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHhtcDpDcmVhdGVEYXRlPjIwMjEtMDItMjNUMTA6MzU6NTguNjEwPC94bXA6Q3JlYXRlRGF0ZT48L3JkZjpEZXNjcmlwdGlvbj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPkNIQUlUQU5ZQSBESVhJVDwvcmRmOmxpPjwvcmRmOlNlcT4NCgkJCTwvZGM6Y3JlYXRvcj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC94OnhtcG1ldGE+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAg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';

        var disco = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/4RD6RXhpZgAATU0AKgAAAAgABAE7AAIAAAAQAAAISodpAAQAAAABAAAIWpydAAEAAAAgAAAQ0uocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAENIQUlUQU5ZQSBESVhJVAAABZADAAIAAAAUAAAQqJAEAAIAAAAUAAAQvJKRAAIAAAADNTYAAJKSAAIAAAADNTYAAOocAAcAAAgMAAAInAAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIwMjE6MDI6MjMgMTA6NTI6MjgAMjAyMTowMjoyMyAxMDo1MjoyOAAAAEMASABBAEkAVABBAE4AWQBBACAARABJAFgASQBUAAAA/+ELImh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iLz48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHhtcDpDcmVhdGVEYXRlPjIwMjEtMDItMjNUMTA6NTI6MjguNTYyPC94bXA6Q3JlYXRlRGF0ZT48L3JkZjpEZXNjcmlwdGlvbj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPkNIQUlUQU5ZQSBESVhJVDwvcmRmOmxpPjwvcmRmOlNlcT4NCgkJCTwvZGM6Y3JlYXRvcj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC94OnhtcG1ldGE+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAg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';

        var rightcol1 = 400;
        var rightcol2 = 510;

        startY = doc.autoTableEndPosY() + 40;

        var total = stotal[0];
        var acttamt = actamt[0];
        var disamtt = dissamt[0];
        var promocodeamt = promoamt[0];
        var save = savedamt[0];
        total = total.toFixed(1);
        acttamt = acttamt.toFixed(1);
        disamtt = disamtt.toFixed(1);
        save = save.toFixed(1);
        promocodeamt = promocodeamt.toFixed(1);


        doc.setFontSize(fontSizes.SmallFontSize);
        doc.setFontType('bold');
        doc.textAlign("Price without offer: ", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(acttamt, {align: "left"}, rightcol2, startY);

        doc.setFontSize(fontSizes.SmallFontSize);
        doc.setFontType('bold');
        doc.textAlign("Discounted Price: ", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign("- " + disamtt, {align: "left"}, rightcol2, startY);

        doc.setFontSize(fontSizes.SmallFontSize);
        doc.setFontType('bold');
        doc.textAlign("Sub Total: ", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(total, {align: "left"}, rightcol2, startY);

        doc.setFontSize(fontSizes.SmallFontSize);
        doc.setFontType('bold');
        doc.textAlign("Shipping charges: ", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(order_list[0].shipping_charges, {align: "left"}, rightcol2, startY);

        doc.setFontSize(fontSizes.SmallFontSize);
        doc.setFontType('bold');
        doc.textAlign("Promo Code Used: ", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(order_list[0].promo_code, {align: "left"}, rightcol2, startY);

        doc.setFontSize(fontSizes.SmallFontSize);
        doc.setFontType('bold');
        doc.textAlign("Promo Code Amount: ", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign("- " + promocodeamt, {align: "left"}, rightcol2, startY);

        doc.setFontSize(fontSizes.SmallFontSize);
        doc.setFontType('bold');
        doc.textAlign("Wallet Money Used: ", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign("- " + wallet_balance_used, {align: "left"}, rightcol2, startY);

        doc.line(350, startY + lineSpacing.NormalSpacing, 570, startY + lineSpacing.NormalSpacing);

        doc.setFontType('bold');
        doc.setFontSize(fontSizes.NormalFontSize);
        doc.textAlign(".", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.textAlign("Grand Total: ", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
        doc.textAlign(topay, {align: "left"}, rightcol2, startY);

        doc.setFontType('bold');
        doc.setFontSize(fontSizes.HeadTitleFontSizes);
        doc.textAlign(save, 600, 243, 617, 60);
        doc.addImage(payment_logo, "JPEG", 40, 600, 200, 20, 60);
        doc.addImage(disco, "JPEG", 287, 600, 55, 20, 50);

        doc.setFontType('bold');
        doc.setFontSize(fontSizes.TitleFontSize);
        doc.textAlign('For ' + companyJSON.CompanyName + ',', {align: "center"}, rightcol2, startY += lineSpacing.NormalSpacing + 50);
        doc.textAlign('Authorised Signatory', {align: "center"}, rightcol2, startY += lineSpacing.NormalSpacing + 25);

        doc.save("invoice.pdf");
        //console.log("pdf downloaded");

    }
    company_logo.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAAIABJREFUeJzs3Xd0HNl9J/rvraqOyDmSAAmCOZPDYZrECdIkSbYkW5Ylr9eW1rIly8fr410/++za3n1nd99q116nJ1u2V5ItWbZXkqVnjzQz0iSSMxySw2FOIJGJDDRSNzpW3fdHdVV3AyARSaCrv59zZojQXbgIXb/fvfd37xVSSolVRhoSQghIKaHHdcQjCUwOBTF4axjDrQGM9oxjrHcS4YkwpJTAqvsOiIjI0QSgqArySvwoqS9CSV0xyteXoHJjOfzFPri8GhRNAaSAEObjVxuxGhIAKc2ADwCGLjE1FsZo9xgGbg5htGscga4xBEdCiE7F4FLdMKQO3dAhrci/4t8BERHllGRAV6BAVVUoUBAzYvAV+FBYkYfSxhKUNhajqrkCxbUF8BR47Di3Wqx4AmDoBhRVAQCM9ozjyg9uoPNcDzAlEAwGYRiG2dDkiICEhID5tp1RMQEgIqIHKS3+mHFdQEJCEQqssKppLuTl+eEuU9F0pBFbnmqGr8hrPs2QEMrKJgQrlgBIKSF1iVBgCgM3h9DyZhs63u+GJlxIGAnzhyuR6uXbT1yJ1hIREc1hlnguhICQChRFQHELbDi8DhsebURZYwl8Rd4VHRV48AmABCCAQNcYbr7Rit5LgxjtGUMimoAudbNRyUwq4zlERETZQqS/mYppmqLCk+dBSUMxGh+qx4ZH1sFf4sNK5AEPLAGwhjsik1Gc/+5lXPz+NcBQIBUdUsIeMmGwJyIiR7LqBhQBw5DQhAZfiRf7f2YnNj+xAYqmPNCpgfueAEhpztkHR0LoONONqy+3YKI3hFg8OnO4hMGfiIicTFj/pGoGNFVD9dYKbH9+E2q3VcOd5zIfc5+HBR7ICEDH2W5c+qfr6GsZgpEwq/c5xE9ERDkrvYhdmKsJ/AU+lG8qxcM/uwfl60ozVsjdlybcrwRAGhKxcBznv3sFF757FRCAYRgM/ERERJa0+K4oAjAU+Iu9OPwL+7H+UANUTblvewgsewJgZSyd7/fg/HeuYOjmCGLxGIf7iYiIZjMtPirCrAXY9PgG7PnJbShdW3xfkoBlTQCkARi6jgvfv4ar/9yC0ETIXMef3nAGfiIiokzT4qQQAqqqoqAyD4d/4SE0PlRvTxcs25dczgRgajSM0988j7a3OhFNxCANbtZDRES0IGmFgkIIaKqGAz+3B1ufaYbLoy1bErBsCcBIxyje/uuz6LnSb5b4Sc71ExERLcq0IkF/ng/rjzbg4U/tgTffsyxJwJISAJncAnHw9jBe/4N3EOgZBQS4TS8REdFSTdtuWFVcqGguwTO/+TjySn1L3i9AWWr7+m8O4a0/O41AbzL4Q9rb+DL4ExERLZIVR4X5jy4TGLw1gje//A7G+yex1PH7RY0AWB38Wyfacfpr5zE5FoShG+z1ExERLbfp2wpLoLyhBMd+7Qgq1pctejpgUSMAQgBDbSN47xuXMTk2mar0Z6+fiIhoeaXFVnOUXWKkcxSv/fFJBEdCZsH9IiwqAQh0jeGtP30XY8NjMBb5hYmIiGgB0mvrhcRo1zhOfOUMYlPxRXW+F5YASGC0eww/+tIJDLYPm8P+szSMiIiI7i8pJbrO9eC1PzqBeCSx4Dg87wRAGkA0GMU7Xz+Hka4Ai/2IiIgeNJn6T0JC13X0vj+E979z2ZyOX4B5JwBCAO9/9wp6L/bft32JiYiIaP4kJGJGFDd/1IrWk50Leu68EgApJW68dgvXXrqFWDye2uSHPX8iIqKVYYViKREan8LJ/30Go3fG5708cM4EQBoSg7dGcPqbFxCJRcwPWkP/REREtHLSVgfEJmJ4689OITwexnxW+M+ZABi6gYv/dBWRiSgEx/6JiIhWl2Q9QELqGLw1gisv3YShyzk76ndNAKzs4fbJDnScvYOEnjAL/4iIiGhVSugJXP/RLQSHgnPW6901ARBCYKRzFKe+eg56Qk9lEqz6JyIiWl3SYnR4PILjf/6uuT/APcyaAEhDIjYVx5m/u4DIZBQGDM77ExERrWbSHL03pI6+K0O48oMb93z4rAmAUAT6bwxi6NoIpFjYukIiIiJaIcmDgxJGAjdeuY1A19hdtwqeNQEwdIlrL99CcDKU2uqXvX8iIqLVLX1p4FgYt0903PWhMxIAKSXaT3eh+0LvfWsfERER3V/xeBzXX7uFUGBq1s/PSADi4QROf+M89ITBDX+IiIiyTdooQGQsigvfuzprHM9IAKSU6DjbjWDfFAyps/CPiIgoG0lzNZ9u6Lj9VicC3WMz4rmS/uDYVBy33+5A3Igx8BMREWUx69C+eCiB2yfbZ+wOaCcAUkqM901gtH0CiqqYT2QSQERElLWklIjLGO6cH8DUaOYWwYr1AKEI3Dnfh1AgCEPn0j8iIiKnGL0ziqH2AIRIbQ+oALA/cOPNVugGN/0hWi3mPNBDpP13j2vM52CQ+bbnnteaoy3WNYjoAUju3CulRCwcR/u7XeaHk8v7NetxPZf7Md47AcNKAIjovrOCYXpWbk2/SSkBAzCEhBDmY4QizMcKc8MuzaPZ10lEEubbRur5UkpIQ5rPUWA+b/oL3IrHApASSGsKJCQEROpayccKISEUxW7X9PYYugE9pme0x5ASMKQ94mg/b7b28B5EtKyEEOi7OojYVBxuvwtAWgJw883bUIUKKYx5nyVMRIsnpVmgI4SwA7XUJYyEAdWrwl/qR2FFPvIq8pBX5kd+eR58hV4UludBdasQioDqUpLXAoyYDglgajyCqbEIQoEQQoEpBIdCCA6HMDkUQmQ8DAEBoSpQ1FQQthOO5PtWewxdQuoGVK+GvNI8FFTkIb8iD3lleWZ7inwoKPdB1VQIkWyPEJC6AT1hTiWGJ6IIjoQwNRZGcCiEycEggoEpBIdDiIyFoagKhKpAVRU78M+WGBHR4hnSQHg4gu6LvWg61AAA0KQhERyZQt/VIST0RDL9ZwZAtJxmG/YWyR63rhtw+TTklfpR0VyOmi1VqNlYDl+JH/ll/mXpDCfiOiaHQpgcCKLrUh8GWwYx1j2O8GQUUjegKHbkhZEw4MpzI6/Uj/KmUqzZXYeK9aXwl/jhL/KmHrsEsUgCoRGzPZ0XetF/fQDjfZOIBqOQhoSiWIlN5s+NCQHRIiRH1eKJOG6+fhvrD66FEAIahMBYzzhkSAIK5+eIlpuU0g5chm5AAtDcKoprC1G5sQI1mytQXF+E0vpieAs8ySch2TNPDrtbQ+ULiX/JM8IBQHOpKKkpRElNIdbuqYWhG5gYDGK0ZxxDbQH0XxtAbCqO0oYS1G2rQmF1IUrXFsHjd2e0J70GYKHtSb+3uL0a3LVFKKktwtq9ddDjBsb6JzDWM47B1hH0XxvESOcoIuMRSAkoqrCnKIDMaQoimpuEhC4N9F0fQmgkjPxyP4Q0pHz/ny7j7DcvmiMA5iOJaImswC9hzuUn4jryyv1o2F+P5qPrUN5YCk+eG5pbBZCaS7cThmlz4Yvp/c5I6NOvKVND/bFwHFKX0LwaXB4t1QaRmcCkW2h7ZutcZFw7mbAYukRsKoaJwSC6zvei9WQ7htsDMBIGNLdm3p44RUC0MMnpRq/biyd+4zAa96+Bpsd1jHVNQNfNgh0Gf6Klsef2k2+rbhWla4qx8YkmND+yHnnF3tTjZCrwA8lCPyuoLUNsmxEgpxf4Jb+2J8+d+rxIPS+jPcvdlmkfswoOFRXw5nvgK/SiakM59n5kG7ov9ePG67fQc7EP0WAsdfT5XZITIpqdYUiM3hlD40P10OLRBEZ7xu1CJCJauOlFa0bCQF55Htbuq0PTwQbUbK6EJ9+d6tljZuB/0KzXfHo70j+3WtqjulQ07K3Dml01CHSPoePcHbSebMdIxxikbkCowl45wWSA6B4kEI/HMNo5jkRUhxaPJDA5EGTHn2iJhCKQiCTgznNjz0d3YPuzm5Ff6rML2uygtoJBf7rV0IZ0GSMCaR0SIQBVVVDRWIryhhLsfmEr2k534ew/XMBwWwAuj5aZQBBRJgnI5PLdyEgUiWgC2mj3GKLhWKq6hojmZfqImbfQg/Uf2IjtH9yMsoaSZJW/XBW962w0Ixmw3xVweTRsemw91h1Yg5tvtuLaKy0IdI1CJqTdmeHPmWg2EpOBEOLhOLTh9lFAT20+QkT3Zgd+AUhdQnEp2HRsA7Y9sxFVG8qTgUoCUmTMpdPiWT8/s4ef7K9IwO1zYfsHNqFx/xp0nLuDC9+/grHucagu1d7tjD97ohRpSEyOTCI8HoE22R+EoqiAtQKAiO7KnutXBIyEgbL1JXj0swdRt73aDE5Y2rz+vOpw0pb3WdK/1oMOeOltnrFuP+3nca/h+fkuKUwlVJm/i/xyP3Z8cBM2HG7AO39zDldfvglVVTJqm5gIUM5LTgPEowlMDoagTY4EIQ19pZtFtKpl9PoNifzyfOx8fgs2PbYe/mKfHdwWOw+dETjTtuad+XkBPaEjEdXtHq6hG/AWeKBqqdO9V4KU0qzQNySgmN101aVCc2sQ9kZDSEsI0lYkioUX8c0I7hLwFXjx+OcOoelwIy5+/wp6rwxAxlN7nDAJIDI7EEMdI9CmRsPmHt1EdG8CSER1NB1pwIFP7EHF+tLUsjksvAc+vbc8o6cqBBLRBAI94xjtGkVwOITQyBQiwTgikxFIQ0LXDWw42oitx5qX5VtcGoFAzzjOf+8qohMRKKoCd54b3gIPfAUe5FfmoaAyHxXrypBX4ss8c8AwzwfILPyb++eYPjVg/QpUVUHD7lpUrCtFy/E2nPm784hPxc3VAkwCiAAAo3fGIb72r/9BhgLh+Q09EuWQVEA2e6sunwv7PrELu57fAk1TF71Jz2y9fQlAj+tIRBIY6gxgqDWAzvN3MNIaQHQyCj1uwNB1AMLcw18R0LwaDnxyL3a9sMXeTGhJbUmzlGsMdYzirS+/g/5rg5BSwkhIGIYBRRVQNBWaS0Xx2iLUbKlC3bYqlDWWIK/ED7fPddc9EBaTVFnBfqxvAj/+wxMYuDnEKQGi5J99eUMpxF/81N/KRFRnESBRmoxAYkjU7arBgU/sRt22avvwnIXM9c8I+slr6AkdY72T6LsxgN6rAxi8NYzgcMjssSoCECJ54p71ZPONhofqse/jO1G9sWLG15qrPQtN9hdzvchkFJd+cB2X/vk6IsnRAPvAIZg/U8OQUDUF3iIvimoLUbe9GtWbKlDVXA5/se+upwIuqD3Ja4QCU7j8wxu4/NINRINRFmdS7kr+yXvy3BB/+uGvpt3pVqhBRKtI+nw/AOz6yHYc+PhOuHyujF3ygIUF//SeZzymo+NMF2680Yq+qwOIh+MZXzN9Pjw9oBm6gX2f2I39P7kDLm/a3Ppi2mOkbfdrSARHwygo89uPWcj3Odt0htQlAj3j+NEfHMdwWwCqpqS+ZsbPI1XVLzSBvPI8bHx0PbY81Yzi6oIZP7uFfp/p7em7NYTX/tcJTPROQlEVTglQ7kkfuWQCQJSSHjT8pX7s/+ld2P7Mxhm70y0kIFrT04m4jtDIFNrPduPaj1ow3B4ADAnNrWU8726b4eRX5OHgz+3DpkfXL/icgFQSkqqg12M6Joen0P5eN67/qAXhsQjqdtZg2zMbUd5YAm+B1zyEZ9Ffy/xegiNTOPHXZ9D+Tuesc/yzfc/xaAL5ZX6s2VuHrU81o2Jdmb2TokT6iMjC2xO4M47jf3kavZf67ELK+VyHyBEyEoAPfZVhnwipQjKpS1RtqcQjn3kYletLIdSFreefbR56qD2Aa6+2oONsN4LDIbvozXzQ7Ne1rmPoBqo2V+KRzxxAVXO5ubPgPKcfpg+HW+8N3BrCtVdb0H2+F8GREKQu7flxzauhYn0ZNj6+HhsfXQ9PnntJIwLW6oAbb7Ti7D9cQCwYu+t1MkZfpDky4fK5UL25Ek1HG9F0qAG+Ak/mz28x7QnFcemla7jwvatIhBOsC6CcxASACMlArQjoMR3rDjXgA7/xGFw+LeMxCwoyhoSiKpgaC+PMP1zA5X++DkOX0LwqpD53sLHaYyQMrDvcgOd+65gZ8xdYeJje+1UUBaHRME594xyu/6gFMiGhejLbk36CYTySQEFlPh773EGsP9gAZYG97+k/D6EIdF7owcv/5Q0kIol7JjHTRwqklIiH46jeUomjn3kYa3bW2EcTLyYxsX4et97uwA//y2tmjQKSTWISQDmCCQDlNHv5mAQUVcHmp5vx8Cd2m0Voiwh01iY9k0MhtL7bhas/vIHR7nGzcn8eewTY15KAUAW2PbsJBz6xG75C77zaMlt7AGBiKIhbb3fgyg9uYLzH3CnP+r7vFoCFEDB0A6pLQf2eOuz+8DZUN1dA82oZychCh+B7rg7g7a+ewdCtkXl9T6nTFZPtcatoPLAGO57fgupNFVA1ZcZGQne73mwFi303h3DiK+9i6PZIqsBzHt8XUbZTn9v0kd9b6UYQrYT0neRUl4p9P70LB35qFzwF7hk3/zkDijVPLoD2s904+Vdn0PJ6KyLjEQglFfzvda30GhzVo+Lgz+3Hno9sS50iOEdbZmuPrhtoP9uF43/+Lm4fb0d0MgoluUPevTbeSV+OJyUw3jOOjvfuYGo8jLJ1pfD4XQvufVufL6jIQ+3WKoz1TmC8dwKKcu9iPCFEap+FZMHiaNc4ui/0IDwWRsX6Mrh8me2Z8/tKk1/qR/XmSgS6xzDeOwnVGg1gAkAOxwSAclL6XLMeTeDwLx7Avo9sh+pSMoKI9d9dn5/2fiwUx9tfP4uTXzmNqUB4xlLBu10r/XpCEVBUBY/9ymHsfHaT2btVMttzz+/HelsCsXAC7/ztOZz8qzOIjEcXVUmfvimRHtfRd2UALcfbULKmBEXVhbNeZ7b3pycK3gIP1h1Yi8CdcQQ6A1BU1W77vdplf04BEpEE7lzsQ+s7nSheU4KiqoKMr3e3hGu29viKvGg60ojhtgDGeybsFQLz/TkRZSMmAJRz0oOlt8CDI599GLue2zKvJX6zLneTQNu7XXjzy6fQdrIDimbNJ9876M+4pgS8RV4c/ewBbHp0vTlyoMwdrKevODB0iZYT7fjxHx5H57vd9vz2XNe5G/t7kICqqYhH4mh/twuh0SkU1hTAb01PzDEEP/1nq7pUrDuwBrpuYLg1MO+KfKstAKC6VERDMXSc7kZobApFNUXwFXrmtXJhens0TcW6A2sRCUUx3BZY8HJPomzDBIBySnrP31PgweO/fAhbjm0AMLNXeO8LmdeIBmN4+2tnceab5xEcCi2oMn16e7xFXjz7W09g3YE1qWH6Oa41PfhHp2I48Zen8f63LyGcnH5YSHvmQxEChiExdHsEt9/uQH5FHkrXFGdMKcxnCF4Is+6idms1DF2i63wPNJc6r7am9/KtYsnBlmF0XepFYXUBimsL5z0lkD7dobpUrNlRjWgkht4r/alkjgkAORATAMoZ9pAuANWt4okvHEbz0XUZS8rmNeSfXE433BHAa3/yNm4db8+YU59Pr3/6Nd1+F4598SjW7qmz2zHf9kgJKIpA/80hvPKlN9F2qguKsvD2zMW+TlrA1KMJtJ3uhqEbqGgqg+bSMnre6d/LjOsk31ZUgfqdtXDnudB7tX9Ba/Mz6gMUIDoeQdu7XVDcKsrWlmRM6dzreqn2mElA4756GIbEcGsAhmGwMJAciQkA5RxPgQdP/9tH0XSoAcDC5sSlIaHHddx8qw1v/b/vYKQtYG9zu6jgICU8BR489euPYt1Da2YEx9mfkjnfb+gSN95sxfE/fxdjdyaguJT7HrCEEBDSXBYIKdF7tR9D7SMoayiFv9i7oGORzSAO1G2rhuZzoe9qP4wFbtBjTwsIAalLdJ/vwXj/JMoaSlIrKObZHkv1pgpoXhfuXOplAkCOxASAcoI1VAwh8NjnDpo9f5nWmZ1PsDXMrv+Zv7+IU187i3g4YX9uoYHBao/qUvDEF4+i6WDDvJayTW9PIq7j3W+dx9t/eRp6TM947n0PVmk1EwICE/1BdJy7g+pNFSioyJtzCH768DsAVDWXQ/WoaD/VZSYyd3nurM1Je5yiKAh0jaLtbDfqd9cib5azBeYqXlRUBdUbK+At9KLjbLf597PYRI9oFWICQI6XCpoCh//1fmz/4GbzvQUEf0ggNBrGif99Bpf/5br5XLm4QJteXX74Fx7C5sebMoPpLNecrfgwODKFd75+DldfugHVpa5Y1Xr614uH4mg53gZPgQcl9cVQ53Fq4vQh+prNlfAWedB/bRBGwrjnc2e7ll0bIARiwRhuvn4L3iIvyhpKIBQFYo4kICNpEUB1cwVcfhcGri+8PUSrGRMAcjR7ExkhsP+nd2HPh7dBmSMIZF4AgAAmBoN46y9O4faJ9iVVh6cH8oc/tRc7PrgZmkud/zWT7Ql0j+H1P30bHe92mpnMCg9Rpy/PkwkDPVcHYOgSddur7EA647GzPR8AJFDZVAYDAn1XBhb1804P4lKX6Ls6AANA7ZZKQIg5f/8Zz4dEeWMpYtEEei+zMJCcgwkAOZa9y58BNB1txJF/tR+qS13wuvpEwsD3f/dV9F7un9dz79mepG3Pbcbhn9sHZdpSvzmvKcyjbV/6v18zd65bQnuWW3pBntQl7lzoRaBnHE1HGmcMnd8zCRCAUBTUbKlCOBRF7+U+KPNcHTCjPcnHGwmJjjNdmJqMoWFPrVl8qNw7kKcnAapLRcPuOkxNRjFwfYgnCZIjMAEgR0o/8rZyYzme+JUj8BV55lwWl74m3zAkBm4P41/+848x3BYwT8a7y/Pm0x6rN7p2fz0e+YUDcHldc67zT2+PBNB3cxA//K+vY7R7fEHFiw+SNQSvaiqG2wII3BlD9cZKuPNc8+/NJ0dt1u6pQyKmY/D2MATm3kr5XjSXhqHbIwgFplC1qRKaZwEjLwAggYY9dQiNhTHSHrC/z3k9l2gVYgJAjiWlRFFdEV78j0+jsDJ/zpt9xja6AAZbh/H6H580g+0SCsDSk5H86gI885uPobA8f94Ff1axYu/1Afz4f57AZN/kqg3+0ymagrHucQy2DmPdgbVwubV7ft+zFQZWb6pEaDSMwZbhRfW8M3/vwEjHKPpvDqF+dy3c/nsnJTPaIwSqN1Vi5M44Au0BTgdQVmMCQAuSDT0eq8Le3OjnMKqay+258/kMlUspMdozjn/5Tz/GRH9wzmLBuVjP8xV58fx/eArla0oylqTNvUwOGO2dwMv/7Q2EhkJZEfyt78vcDRGY6J9E14UerN1bD88cQTf9Y0IIqJqCms2V6Ls5hOBQcFHTHXZ7ks+b6JvASOcoardVw+N3z/kzTX0e0DwqGvfVoff6AEIjU/d83mKkJzicZqD7iacB0rykHxObvBXaH5eGuR0uksezYpX8RVVtrcSTXzyK8rWZAfdurO+l60IvXvujE5joD5ob6iwDKSXq99Timd94DPll/nkF8fT2/Ph/ncDkwPK154ETgKEbqNpciUc++zDqt1enPjXHz8B8AwgGpvDKl97EnYt90/caWlR7pJSo31WHJz5/GKVriuZsy/T2BHrG8fqfnETvpf4ltcNOTAQy/wWSr7elTX0Q3Y0290Mol6UfUgMAMi6RSOiAIqAIAZffhfyKPOSX58Nf6oPLo6GwPC9ZgLdyNywBMw+ZGp0CGkrm/TwpJeKRBHa+uPU+JDISY70TKCjPM9s4j5+PnjAQmYxi14tbgKWHvZUnJaZGwwt/ngDyy/x48otH0fZuF6RhYJaTfRd2SWEWK471jtsJwHxJSJTUFuKJXzmM9jNdyXqABV0AQgiExqYQCcYQGp3C1GgYoeEQohPR5BkTEqqqmAWQQtg7JDIRoOXCEQDKYAfuaXczRVPgLXCjqL4YZWuKUba+FFUbKlBUlQ9FU8zq+iy4L82rt/mAzLu36XCr6ecwn+A6fX+I5cjLpAT0hA6ZMDA+MInBtgCGW4cx2j2OQPc4opNR6HF9xvOmbx5FtBAcAaAZhDB7noqmIK88D/U7qlGzrRoV60pRUJEHb75nRqGWxbw5ilTl2goT9v8W4D7OYizmR+K0PEAA5vLFeX5j6dX2wPL/PJbUnvk/LZP9+pDJKQCYByG5VJQ3lKK8oRTyiQ2IBqOYHAoh0D2GvmsD6L7Yh4n+SRgJ3dxkyWF/G/RgMQGgjMI+aUjEwnHU767Frg9txbr9a6C6VCiquYTNXKMt7hrfU4nByq9LX6iMdegr2xQAmYVnjrSESv774gG2J5U0zPYish4EePLc8PjdqFhfio1H10FP6Gh/7w4uv3QdXefuQHWpZiIAFgzSwjEByGHTD5Vx+12o2V6NHc9uRu3WKri8yT8Paf4n1NTNJWuL0YhWgfkE6ukzcUIR0Dwamo80Yt3+evRcG8CN11vRc7EX4bGwWSeQBat0aPVgApCjrN6CYUgomoKmQ2ux/YObUNlUDpfPlfngOdarE9H9MX26waK5NTTsrkPdtmoMdwRw9ZUWtLzVCj2qp/ZKWC1DWbRqMQHIMek9BD1hIL8iD49+7iDWH1iTttwo9XgGfKKVNf01aG9xDUB1KahurkD1xgpsfGw9jv/Fuwh0jkLVVHtJLl/DdDdcBZBDrBuHNCS8hV5s/cAm7Pjgpnkd3UpEq0/6LpNCEQiNhnHpBzdw7ZWbiIyFk8WNfE3T7DgCkCOsAK8ndBRUF+DxXzmEtTtr59yLnohWP+t17C/24uFP7MaaHdV488unEOgYhebRWCBIs1JWugF0f1kbigAABNBwYA0+/j9eQOOeegh15kl0vEkQZY/pr1shBIQC1O+owce+9Dw2Hmuypwsy7gVEYAKQMySATU9uwFNfPIq8Il/GdqNE5BzWdsLePA+OfeEIdrywZaWbRKsUpwAcLH3O/8Cn9mLvh7dBm+M0NiLKTukHCJkfANw+Fw5/eh/85Xl496tnzU2uOB1ASUwAHMiu9IeAUAV2/uQ1iWf/AAAgAElEQVQ27P/oTggF8zoUh4iy1/REQHEp2PfhbXC5VLz7N+cQj8S5XwAB4BSAoxlSYtdHtmP/R3dAUQSr/IlySPrrXUqJLU9uwEOf3A0jYaxwy2i1YALgNMklP4ZuYNdHtuLwp/fC7Xex50+Ug9KTAJdbw54PbcOBT+2FoRszzlig3MMEwEGklJAwK303PtGEg5/cm7EGmMGfKPdMP7jroY/txLZnN9ufYxKQu1gD4DDSkChtKMGhT++D5sks+LtvX5M3EKJlcb+S9PRAL1SBA5/YheH2EQzeGIZQBQsDcxRHABzCenG781x46tcfQUFF3rJv6WutI7b+Mwwj9b4hYej38RxdIieSgNTN10/qdSVnvNaWQ/pIYF6pH4/98mF4CtzLcm3KThwBcAArexeKwL6P70JlU1nGTWO5M3v76yV7FYmYjvB4BPGpOCLBGKKhKBJx3bnH2BItkZSApqlw57vh8bnhyXfDU+CB26vZm3Ol98qXu4cuhEBVUxkOf+YATnz5XegJnaMAOYgJgENIKVGztQpbnmy29wUHlh78Z/Q+7CJDib6WQXSf78Hg7QBG74whMhqGTK4z5kgA0RyEtZMf4C3yorCmEFXNZViztx61myuhauYArRWYl2PpXvp1pJTYeGQdus/3oPVEB5IfBDP33MEEIMtZm/0YCQN7P7oDvkKPHfyX5dr2O4BhSIQCU+g834Nrr7Zg6PYwEpEEhCqguVQIRWHwJ1oAKczgHhwOYaJvEl1nu3H+O1dQvqEMW59qRsO+euSX+iHU1NG+y9VTF0JA82jY+fxWdJ69g0Q0gbSDBikHMAFwACNuYOtzm7BmR82yVfyn9xKEEJgcCeHG67dx63gbRrvH7VEGl9cFCQlA2EuLiGieJGAY5utG0RSoLvMY36GWYbx1axhFNQVoOtKIbR/YhKKqAiRfaksaDcicVgCqm8ux84WteO/vL0B1qcv53dEqx+OAs5yUEr4SH/7VX34s48W7lEA8/YjRO1f68dofncRE74T9Ne7n/CRRLkoP6vZrKjm65y3y4vHPH0bTwbXmNNwyTPGlj/AlYjq++Sv/hMnBSR4KlkPU5zZ95PdWuhG0cOk3i50vbkHDnnp7+m6xL970G4KUEuGJCC7+8zUc//N3ERmLQGjCHt5P/xq8WRAt3fRT/YBkcq0I6BEd7ae7kIjqKG0ogdvnmvHcxXw962uomgIhgDsX+yDAZYG5gssAs5EVhBUBb5EX6w82JIffl+9LTA6F8Pqfvo3T3ziPeCRhTgxKsHdA9AAJIexhfyNh4P1vX8aP/vA4xvsnl63WxhpxaHxoDYrrCpfnopQVmABkIQmzUicR1VG/uwZljSVLHhJM7/3rcR0//uO30X66K2MLYQZ+ogcv47WnAD0XevHml08hFo7bj1nsfgHpIw6Flflo2L8GiVgCQmBR16PswgQgW0lzR69Nj2+AsoSq//Qbh5QSU2Nh/OD/eQM9F3qgqErGVsJEtHLs0QBFoPv9Hrz6h8cRHA7NqMdZyvXXPbzWnEdk7M8JTACylNQlKjeWo2571bJU/kspkYjqOPsPF9F5uhuKxuBPtNpYSYBQBTpOdeHkV88iGorB0Bd/wl/6WQFVG8pQt6MaOk8MzAlMALKMle0bUmLrU83QksuGlhSok4G+89wdXHu1hcGfaBWzkgDFpaDtVCdunWi3R+uWRAKKpmLz081A2k6f5FxMALKQhER+mR9r99SZwX+RW3ekv7gnh0I49bfnYMQNc/kfgz/RqiWEMM8P0CXO/Z9LGOufsD+3pFoAAE0PNyC/3M/gnwOYAGQZK/svbShBfpnfrhBeCgng9N+9j9GuMQiFxX5E2cB6nU4OBvHml0/BWOounMmXva/Ag7KmMkiwI+B0TACyVPWWSiiauuhtf9M3++m50oeWt9qheTRm/URZRnWpaD/Vhfaz3fbHlvo6rt9ebe8HQM7FBCALKZqCsrXF9rr/RWfp0kwA2k53Qerm0D8RZRcpJTS3iltvtSGe3M9/MaydBwGgdG0xVLfZwWAS4FxMALKIdfCPoiooqCxY9HCf3fuHRDQUQ8cZs+fAtf5E2UUIAQEB1aWi50o/JgaDEEgt610MQzdQWJkPl9e1pJ1FafVjApBFrPl/b5EHBUss0pHJKv+eawMIDod4BBhRlpJSQhoS0cko7lzpA5ahet/td8NX4oXUl6mRtCoxAcgyRsJAQWUBNI+2LEG77VQX9KjOjT+IspS1XM9IGOh+v8f+2FK4/S4UVhZATzADcDImAFlGTxgosIfnFj9kLwBMTUTQc6UfQuXQP1E2s+4F/TeHEJuKLe06ioDL50JhZT70uJkAsA7AmZgAZAnrBWjoOgrK/BBL+c0lX8sT/ZOY6JuAoih8gRNlOaEIhEcjGOocW/rFDAlfsdceGGQHwZmYAGQZ6wRASCx5ze/A7REO/RM5iZQYah1Z+nUE4PK7Fr3MmLIDE4AsYe/UpSpw+13mGP5iX5vJ5wWHQ/ZfADN8ouwnpcR47/iSrmHdCzz5HiYADscEINtIueh1vtNFg1EW/99nCz2mlVMxtFgS5r0hPBZZlpE9j9+1pJNGafXTVroBtIIYa+4b64Amc2tlQBrmpkvWkq0MAlAUBUIRUFRhJngydQ2i+bD+UvRoYlmux9uD8zEByGl8iS8Hc4MmYb1jHs8gASkkVFWFqilwF7jhyXPDneeG2+/OeH58Ko54JI7IZBTRySj0hAEjYQAGYECasz1pa7uZFNDslvvvgn9nTscEgGgR0nvnQggYugHDMODyulBUV4iqDeUoayxBYVUB8kv9cOe7oblVqG4NmlvNuJYe06HHdSSiCcTCcYTGI5joncBw5ygGbw1jvGcC0WAMiiLMo5qJiJYBEwCiBUqfpzcMA/FwHMVrirHxsfXYfGwDyteWZDzeSBjmqMBdzm7Q3GpyyN98v1JTgL2pzwd6J9ByvBUtb7Vh5PYINI9mnv8OThMQ0eIxASCaBzvoC5jBGhL+Eh9qt1djw9FG1G6pgq/QC4jkY+0F1DA3WrLenSVYW6euWZ+Z/vySmgIc+Knd2P3CVvReG8CtE+3ovdJvruKwvoZ1DSYDRDRPTACI5kkIQI8b8BZ5sOlYM7Y904zCygK4PBokpJ0cTF+iOZ+gnP4Y69Cn1AfMr+32u7Bu/xqs2VWLsd4J3HyzFTdeu4WpQBiqPYrAJICI5ocJANFdpIrukh9QBNYfbsDhn9+Pkroiu+DP6oEDWJZ10zMCuMgM7KpLQXlDCcp/fj+2P7sZp75xDq3H2zMeO+t1iIjSMAEgmoOeMFCzrQq7PrQNGw412Gekm0exmu53sLWun54ISClRVJWPJ79wBBsfWYcL37uKvmsDySdwNICI7o0JANE06UV+Ukrs+dgOPPTxXXD7UlujpgfWBxlkZ1sOqLk1rH9oLWq3VOHKKzdx5lvnoUd1KJrCJICI7ooJAFGa9ODvLfJi/0/vws5nN88IoisZVKfXC1jvevLd2P+xnajbWYN3vvYeBq4NJneHk7M+l4hyGxMAoiSr+E7qEuVNpXjkswdRs7liUUV9D8r0EQEpJaqby/Hsv3sct9/pwKV/uYHR7jGoqmJvS7ya2k9EK4cJABFSPX9pSNRsr8Kz//4J+It9Mx63GoPnbPUBviIvdj67BRsONeLtr5/F1Zdb4HJrGfULRJTbuK0Y5Tx7iFxKVG2pxLEvHDGDf9pOyUKIVR8009sohDD3Kij24clfPYrnfudJlDeV2SMZUkpIbgVNlNM4AkA5ze75S4mabVV4+tcfRWFFvvnJ1R3v78qaCrCSAUVR0HykETWbK3Htxy248P2riAVjdpGg9Rwiyi0cAaCclX5iX3F9EZ76tUfM4J+2ZW829Pxnk9FuYe5PkF+eh4d/Zg8+/gcvomZ7NaSRuaSQRxET5RYmAJTTpJQQqoIjv3AAhVUFK92cZZe5XNE8b6C0tggv/M6TOPKLB1BYnT9jbwEiyg1MACjnPf6FQ2jYU2cup8u+zv6cMmsDzCTAm+/B7he34kO//wy2P7cZhmHYiQCTAKLcwASAck76cPeGR9dh6xPNGSf1Zeuw/1xS3xuSSxsFCiry8dgvHcIH/t3jKKgqyEgCmAgQORuLACmnpAe14rpC7P2JHeZc+DLs4Z8tUkWCsA86aD6yDhUbynHlBzdw/UctiAZjUNSZuw4SkXNwBIByjhACiWgCOz+0FWUNxTm5HG62UY7iqgIc+vQ+fPRLL6BqayUSMZ21AUQOxgSAco6RMFC7swZbn9wIRVUy1s7nmvSVAhCAogmU1hfhQ//xaRz6+f3wFnntT3NagMhZmABQzrCCl6fAjUc/+zBUV+rPPxeDv2X6BkKQgCfPjf0f34UXf+9pbH66GUJT7GWDTAKInIEJAOWE9KBVv7sWFetKIQ3Ob6eziwSV1IqB8oYSPPWrR/Hsbx9DXpnfnBZQWCRI5ARMACh3CEDRVGw4ug5CVXKq8G+xhBCQhkTj3np8/H++iN0/uQ0un2vGkclElH2YAFDuMICi2gLUbasCcrDwbyHsaQF7ySCQX+rH4U/vw4d+/xnU76mzR1AgmAQQZSMmAOR41jG/8UgcTYcbzYN+crjwbyEyfj4CUN0qqprL8fxvPYGHPrkHUiCjNoCJAFH2YAJAuUEC3iIv1h9aa3f+GfznZ7YiQc3rwsM/sxsf+9LzaH50PVS3aidaAEcEiLIBEwDKCYZuoKK5HGVrSiAhIRifFizjcKHkm5Xry3Ds84dx7NeOoqAyH3rcYBJAlCW4EyDlBKEoaNhfD0Vlr38ppm8MJBQBzauh+XAj6nZU49TfnMPt421IRPXMx3G0hWjV4QgA5QSXV8OaHTUr3QzHmDEtAMBf6MWjn30YH/j3x1C3syZ1sBKLBIlWJY4AkOMJAfiKfWbxn/0x9kiXg70xUPLH6XJraNxXh9qtlbj88k2c/tv3oUcTUF1qxrHDRLTyOAJAjmb2PAUKKvPg9rtSS9do2WScK2AlAl4N+35iO37qD17AhkfX2UWCUkqAqwWIVgUmAORo5kY2Bgoq86G61JVujqOl9+6t1QJla0tw7FeP4vHPH0ZxfTEM3bArCJkEEK0sJgDkeIYuUVCRD0VTOAR9n00fDRCKgNunYdNj6/HJP/4wNj3VjEQswVMGiVYBJgDkbMmNavzFPntnOyYB9599roCVEEhA0RQ8+fnDePZ3nkRFc5m5FbMEJDglQLQSWARIjmUVnekJA958N6RhQKjMeVdEMudSNRXNhxtRu6USN95oxbnvXEZ0PGIWCZrZABM0ogeEd0NyLCuQqG4FmldDal0aPUgzigQF4C/2Yd9Hd+BjX3oea/bVJT+VmhbgiADR/ccEgJxNAoqqQPNoEBz+X1EZRYLJ4f/S2iI8938dwyOfO4jC6oLkkkLWBxA9CEwAyPGk/T9aabONBri8GrY/sxEf/e/PY/tzmyENw/59MQkgun+YAJDjKYoCRWPPfzWZsZOgEPAVevDYvzmIZ3/nSZQ1lZqjBEhNCTAZIFpeLAIkR5NSQvVocPvdK90UmoW1k6A9KKAIrD+wBlUbynHj9du49NJ1hIZCUFxmX4W7CRItH44AkOMxXqxu0wO6EAJ5pX7s++gOfOg/fQB1u2qgxw3uHUC0zJgAkPMxXqx6GbUBSCZtAihfW4wXf/dpPPJLD8Nf6rd/lZwSIFo6TgGQo2VMAXAkYNVL7+Vbb2tuFbue34KGPXW4+NJ13PjxLegxHUIRnBIgWgKOAJCzSUBVhbkMkBlA1pheJKgoCkrri/HELx3CB3/rGPLK/JAJA0KwSJBosZgAUE5gcMhO05cMQgDr9tXj4//jRez5+E74in0w0k545O+ZaP6YAJDjCVWB6lI4BZClZhvizyv14+DP7MEL/+EpND5UD0NnkSDRQjEBIEeTUsLj1eDL96x0U2gJZpwyKADVpaKiqQzP/faTePSXD8FTkFrqySkBormxCJCcTQLs+jtHRi8/+WtVVIGdz21G9cYKnPv2JbSf7jL3FzAkiwSJ7oEjAORsgkPCTieEgIBAZVMZjn3hCHa8sBWxqRgDP9EcmACQ4/nKfCvdBFpm1pRAxrSAIuDJd+ORX3wIj37uUPIESE4HEN0NEwByNmkeNkPOlbmBkDkasPcntuOxzx2EvzSV/DEJIMrEBICcj0PBjjfjlEEAGx9bj2NfPApdN7gHBNEsmACQo0kAmpsjALkiYzQAAg276/Di7z0Nd6G5QoCjAEQpTADI2aS5ZpxySebmQY1763Ho0/ugqIq9fTARMQEgIocRYmZdwJYnN2DLB5qhx3SuDCFKYgJAjicUzv/mNAEoioJDn9qHhgNrIA0GfyKACQA5nkRBVYH1JuWQ6YWBHr8bh35uH/JK/eZGQRwFoBzHBIAcT3OrK90EWiXK1pZg+/NbYOgGpwIo5zEBIMfjPT63ZW4WBGx9uhll60ohdf5hUG5jAkCO5/JwBIBMQgjkFfvw2C8f5BERlPOYAJCzSaCsvsh8mzf8nJVeDyClRO2WKqx7eK29TTCnAigXMQEg5+NOgDSdBLZ9YBO8+R4eGkQ5iwkAOZaENAv/2bujNEIISADVGytQtakChsGCQMpNTADIuSTg8rvsU+GIrN6+EIC30IP1hxuQiOk8K4ByEhMAcjRVU6Co/DOnlPRagPodNfAWeCClZApAOYd3RnIumfyPOwDRLAQEiqoLsP7Q2uQWwUwBKLcwASDnEoDiUqBoXAZImdIL/zYda4bqVVkDQDmHCQA5lpQSLp8Lmoc1ADSLZA6wdmcNT4yknMQEgBxNAJwBoLuTgKIqKF9fBim5EoByCxMAcrbkmfBE91LZVMYSAMo5TADIuSTgK/LBm+de6ZbQapUM+kW1hVA0hZsCUU5hAkDOxhs63YUV7A1DoqA8z0wAFB4TTLmDCQA5G+/lNAdpSHjy3Oax0fx7oRzCBIAcS0oJRU1t+kI0GyEAzavBne+BYRicBqCcwQSAnEsCecVe+22i6axgr7k1ePxu/p1QTmECQA6XHAHgnZ3uQSgCiqZwpIhyChMAcqTUjdz8V0BwaJdmJYSAy6vBW+iBNJgAUO5gAkCOJISAUAQ8hZ7kB1a2PbTaccMIyj1MAMi5BHgOAM2LYRgwEjpzAMopTACIKKdJKZGIJBCdjEJReEuk3MG/dnIuIaB5OAJAc5OGhK4bK90MogeKCQA5lqIIePM9K90MWsWsYtFELIFYKAahcA6AcgcTAHI0ruqiuUhDIhFOIBqMQSjcNIpyBxMAcjT26OhurDivaAqCY2HocZ0JI+UUJgDkTMIM/v4Sf/JdJgI0nYSU5pLR4FAQRsIAJLhfBOUMJgDkXAJQVd7MaW6BrjFIXXL4n3IKEwByLglwYze6Fys9HLg9vKLtIFoJTADIsYQi4PG7ku+sbFto9ZESgAAioRjGuscBcPifcgsTAHIkAXMZoMfv4v7uNIM91C+BW2+3IzIZZcEo5RwmAORovKXT3QhhJgKtJzogdYPz/5RzmACQ48x2I+fQLk0npcRgewCd79+B5tZWujlEDxwTAHIcIQQkAJfPBdWjcRiAMqQniB1nulgpSjmLaS85lxDJnj8zADJZwV8aEhODQbSf7rZ7/xwlolzDEQByLt7PaTbSXCHSc7UfY3fG+HdCOYsJADmW6lKhaPwTp2kEoOsGLr90A4mozlUilLN4dyTH0jwqVLfKDh5BSpkx/H/h+1cxcHMIQhEc+qecxQSAnEsm/yNKkoZEoHsMF753BaqmMPhTTmMCQM7F+j9CWuGflNDjOs5//yrCo5GMzxHlIiYA5EwScPvdcHm40CWXpQd4IQS6L/eh9e0OiOQhURwBoFzGuyM5lqIo3N41h6UHfyklAt3jOPGV00iEE+Zx0Qz+lOM4AkDOJSVrAAjSkIgG43j9T05ioneS00JESUwAyLFcXg2aR13pZtADllHxLyUM3cDpb72PwZZhe1koe/9ETADIwVxeDZpLZY8vh0wf9hdC4OTX3sPVH97M+BgRMQEgB8qo7Oa9PmdkBH9DQo8bOPuPF3Hhu5ftqSAGf6IUFgGSI7Gnl1vs4C8BCQldN3Dm7y/g0v93DZpb43I/olkwASDHEULASBjwFHqYBOSA6cE9PBHFG3/2NjrP3oE0Uh/n3wJRJiYA5FhCFZwCcKjpQd98X2C4I4DjXzmNngu90DwaAI4EEd0NEwByLo76OtJshX7xcAI33mzF+X+6gsmBIFSPymF/ojkwASBHkoaEy+di789hps/1CyEQGgvjtT8+ia6zd6CoCoQwP8/fPdG9MQEgRzIMCbffDTAIZL2Mnry9t5PEWN8kWk914uL3r2IqEIaiCfuxDP5Ec2MCQI5k9gI5BJzNZgzhm9P8CI1M4eqrLbh1og3jvROABBRVsNdPtEBMAMi5WAOYtTLn+c1/jbiOlpPtOP3N8xjrGYfbqzHoEy0BEwAiWjXS5/it96OhGO5c7sOVl2/izsU+wJBwe10s8iNaIiYA5FzSHjWmLGDv329ICEVAj+voutiLC9+7ioGbQ9Bjuvm7VHiUL9FyYAJAziQBCMHgv4pNH+YXwvyYnjAw3j+JU397Dm2nOqEIkazuF9zhkWgZMQEgRxKKQHwqxoCxSk2v7BfC7NH3XB3AtVdb0H62C7HJGDRNtU/3E0Lwd0m0jJgAkCMJRSASipqBg+MAq8r0eX4IYKx3Aqe+cQ5d7/UgEU2YBZxK6vfGwE+0/JgAkCMpmoJwIAI9bkBRFBYCrLCZW/cCUjcwMRTEjddu49qPWhAcmoLmVmcM9TP4E90fTADIsUKjYUSCUbg8GqcCVtBsu/eND0zi6is30fZOJ8b7JiCEgOpSuJEP0QPEBICcSQBTY2FEJ6PIL/NDEcpKtyjnZBT5GRKKqiAeTuDSKzdx7lsXEJ6IQHOr5giNVQVIRA8MEwByHKu3H52IYGosjHKUsmf5gMy2Nl8aElPjEfRdG8D5711F//VBCEVAc2vJwA8Gf6IVwASAnEkCiaiOgdvDWLunjlMAD8D0yn4A0HUDre904PIPbmCwZRhGwjC37TXX/K1MQ4kIABMAciCriMzQDfRfHzQ/yB2B7ovZivsEJAxdou/mIN75+jn0XuqD5tHMBCz5OxAAe/1EK4wJADmWoigYvD2C0GgYeSW+lW6O48xYzgcgHoljoGUYV16+ga5zPYiFYnB5XZDgFAzRasMEgBxJCAEJidBwCB3vdWPb0xtXukmOMaPXn6zs7781jPf+zyX0nO9BIqYDMJdj2o9n7CdaVZgAkGMJIaAoCq788AY2P94ERVMyPkcLM9scv5QSI11juPrqTVx9+Sb0qA7VrdoP48+ZaPViAkCOpmgKhttG0XdjEHXbqtkLXYQZgV+YxX3D7QHcOtmO1pMdmBgMQlGE2eM3WHBJlA2YAJBjSWuJmS5x++1O1GyugiLYK12I6Wv5hSKQiOk4/a0LuPLSNcQjCQhFQOG2vURZhwkAOZa9payqoPt8D4IjIRRVFQAAlwXOwT6aV5pdfiHMnRU7zt3BuX+8iPHeCagucxMf7rFAlJ2YAJCjWUnARP8kbhxvw8M/tWulm7Sqzdi2FwLRUBQtJ9px9dUWjHaNQY/r0NyqvYyfgZ8oOzEBIMezkoDz37mMzY83obAij0FrFum9fgGzgLLzfC9OfOUURtpHoXk0u+LfGhUgouzFBIAcz6oFiAVjOPX193DsC0fg8qb+9HM5GchYyy/M9+ORBLov9OLqqy3ovtALI65D9agc6idyGCYA5HjWCIDqUtBxphvtZ7qx6dH1OX/+TEaPXwgYuoGuC704//2rGLwxhEQ0AQBQVAWQDPxETsMEgHKClQToMR3nvn0Ja/fUwlfgtee6rcc4WeZyPjP7kYa5be9Y3zje+/Yl3HqrFcIAhKakiigd/nMhylVMACjnBDpG8eaXT+GJLxyB1+9e6eY8EDNP6ROQEuhvGUbLW61oOd6OyHjY7O2rsNfyM/gTORcTAMoZqWWBArePt6OothAHP7nHDHSKc3u7mUv6zJ/D+FAQ5/7xElrebIUe1wFhDvWz10+UO5gAUE6x6wHcKq68dANla0uw+fEmSEPaRXBOCH6zndInDSA8HkbL2x248J3LmBwMQnNr5mZJaXP8Tvj+iWhuTAAo5wiYc9/xcBwn//oMNI+GpoNrMyrhszkIzljLLwSmxsJoeasNN16/jUDnKCAB1aXOMjVARLmCCQDlnmSPFwAi4xG8/F9fx/O/+zQa99bZKwOyMQnI2LbXquyPS1x/4xbOfus8gkNTUJPD/E5IdIhoaZgAUE6ypgKst1/7g+N47JcPoelwY8ZIQPrjV6MZPXhpfiwSjKL7Yh+uvnITvZf7zR5/8mheAQ71ExETAMphVhIgpURkMoo3/uxtTAwGsfOFLVCTy+CyhdWb13UDrac6cO3VFvRdH4IeS2T0+ImILEwAKKdZQV5KiXg4gZN/dQaTwyEc+tm9cPtd9uNWyy54M4r7AIhkgd9Qxwje+Zv30HGqCy6vC1BY2EdEd8cEgAjJ0QDD3C3w8r9cx0hHAA99YjdqNlVCc6urokBwtuF+Pa6j/+YQbrxxG63vdCAWjMGd5zZXNXD3PiK6ByYAREkCyTXwAPquDODl//YGNj+5AQd/di9cHm1GbcCDCq4zev2GhFAERrrHcO7bl9BxphvxcByAuZZfGqtjtIKIVjcmAEQWkUoCACAeiuP8ty/jzsVeHPzUPqzZWWOeiJccBZgemJcr4M42Vy+ltFcuhAJTuPzyTZz/7mUkIgloHo0b+BDRgjEBIJomvThQdakYaRvFq//9TazZV4+Nj65H3bYq+Aq9aaMBYtmWDs62ht96f7hzFG2nOnHrRDvGesYhhIBqTU+APX4iWhgmAESzyFgmqAgkYjra3+1E+6lOlK8rxeanm7H5iSZ4kmcJWMPuUO5+velmrcqXqUVKq+MAACAASURBVERCCAFIoP/2MC6/dB0dZ7oRC8Uyr5ecliAiWigmAER3kR60rSF4oQgMtY5g4NYw3vvHi2jYV4+1e+pQ2VQGT4EHvgJP8gmZsdk6cTDDtMdAAPFYAtFgDBMDQQy1DqPtdBf6rg0iHo5Bc3Oon4iWDxMAonmwlwsmC/A0VUFkNIIbP7qFW2+1wV/sRVFtEcrWFqOovghFNYUoqS2E5lahuVUIVcH0HECP69DjOsITUQTujGOifwIjHaMY7RnH5EAQ0WDUTjpcHpc9LcHgT0TLgQkA0QJkBF+RnCrQJaYCYQSHp9D9fg8MXQJSwpASvhIf8sr85ioC60nJTCAUmEJkIop4KAahmEP+QhVQNdU8nU9RMgI+Az8RLScmAESLlNpEKPW+6lKhpvYPgh5OYLxrfNYpACvou5N1BOmkkVYHQDQv1h/i8l6OnIsJQA7j63t53C1GS2lOFwjl3nfk2Yb1GfhpoSTMv0XVvTy3df4JOt9dapZptTJ7hctzLU+em1nAfTTfIM5gT8vBPORJwFviXZZRgHg0jtkWqpBzMAHIJgLQEwZiwdjSAnfyucW1RckXuORBMUQOIARQWFWwpGtY94LIeASGbixHs2iVYgKQJcxlaOa6schEZOkZvgSqmssh+BdA5AhSSkAANZsrl+FiQHQyBqkb3GfCwXj7zxLmMLGAqimYGJ6CYcDeNGbhFzP/ySvzo6C6AIbB3j9RNrP2qfCV+FC+tniJFzP/CY9HzPqVxd5naNVjApBlFE3B5GAQiUh89s1l5klCwlfgRf3OGnPZGhFlNcMwULu1yj6vYjGklJCQiEcTmBgOmktSwToVp2ICkGUUVcFk/4R5+tsS4rZI7l+/dn+9edwtEWUnmVqCumZv3dKDtQRiU3FMDExC0RginIy/3SxizfFFQ3EER6aW9kIXZklBw85aFNUWpq5PRNnFnB2Ev8SH+m3V9h4SSxGZiCAciEBRBVcCOBgTgCxiHQ6jx3WMD0wuujgn/ebgznOhYX+9/T6TAKLsYW0PbSQM1G6vRkFFnn1fWGwSoCgC4wNBJLgM0PGYAGQhqUsEOkftYL2YoG3tJyCEwIbDjVBUYe9MR0TZQwiBWDiOLcc2QE0eGLWY17FVSAghMNozDj1uJKcXlr/NtDowAchGAui/OQQjYaSOoV3spYRAxfpSbH5mI/SYvqTCQiJ68PSEji1PN6NmW9UyrA42X/+9V/vZ+88BTACyjNXbD3SOYXJkyl6ms2gCUDUVBz+5F8VriiANbgpElA2s12lRbSEe+zcHobnUJa/ZF0IgPBnFcGsAQnBK0OmYAGQZa3hvanQKPRd7l3wt8w3AV+jB4Z/fD5fXZZ85zxc/0epjvzaFuSx470d3wF/iS50FtNjhfwCQQOupDoRGQvZpl+RcTACykPliFbj8SgsSMT1Z0b+0YC2lxNrdddj27CYkYgm+8IlWMSEEjLiBjU80ofnoOjshWBIJJGI6rrx8k2eE5AgmAFlKUQUGbwyi+2LvkooBLUIIuLwaDn5yL5oeaWQSQLQKWSdHJmI61h1qwKOfeRhuv2tJr9X0+0b/zSH0Xx2A6lKZBOQAJgDZKjk8d/PNVuhxY9FJwPSKYc2j4vnffgqbntxgjyxwOoBoZU1/Da47uBZP/9tH4fJq9ut3MdX/6fcNQzfQdrrT3vyHHQDnYwKQrSSgulXcudSP4fZA8ijQZWJIPPKLD2PzU832DcKqCyCiB8vq9QPmaaAbH1+PJz5/GG6fy37McgTriaEgOt+7A1VT+VrPEUwAspD9YpdAdCKC2293LHk1QMYNRAD+Ii8e/6WDOPKZAwCEPcfIGwPRg5M+ty8BPPzpvTj2hSPIL/Uv2/p8K8HovtiLycHg8lyUsgITgCyV3iNveasNwcBU6kaxyCA9PQlQVAW7X9iKF3//aVRtqrB3IgQ4LUB0v2S8tpL7/Jc2FOOZ33wM+z+2E4qqZBT8Lbb3b4/uQSA8EcH571z5/9u78+A4svs+4N/3uucGMIP7BgGC4A3e5B7kHtJ6dR+WFflQVLEdSVVxOU5i+Y/8k6rkn1SlyilXKnbsWHEiy5euyJYtx7K01kq7qyWXu7xvkFiCIHHfNzCY6X75o6cbAx6YHnAAzEx/P1XYJcHpmZ4BXr9f/957vwfTMFdlHKi46Vt9ArR+diOdH1/Az/70HF79N6cgpXiq2cD2c9p3HkIItBxsQGVLDHfffYArf38TEz0TAGBNFEqTPlxARJk9rs0IIWAmTRimgYrWcuz/6G60P7cNpVWRVKU+rHrs050AYCqF9751GdMDM9B8Ek91AaGCwgCgwCmloOkSN3/YhY5TrWg72rQqO7DeC8TDgUA4FkLnR3Zh9wfacesn3bjxozsY7R4DTFjDDxJpwxAPXaWI6DGU1WaQamfmyna8VdsrsffDHdj9wQ4EQr6Vip85WJufnl1QSmHw1ghu/Og2NJ+EYulfT2EAUASUUvAFdFz6m2uo66hCOBrKef9rd+6+gI7OD+/GrpfaMdYzgZHucYx0j2F6aBaLkwtILCZhGGZuJyUSFSEFBU2T0IM6whUhRGvLUNVegdqOKlS1ViAQ9ju7dtqBQq4lEwaufP8GjGVjQ56f8hsDgAJn3+0LITB0cwTXfngbJ37pYM5uwlfN/refTwC+oI76PTVo3FeHRDyJxGICyWUDyWUD8cXl3Lw4UTFTCoGwD7pPhx7Q4Av5oPu1R9qbyGXK33lp65px66fvo+fsAwgIKHDs32sYABQBp5NWwLlvX0bDPqtjFnj6oYDHHZs+SUgpBc2nQUtfO8xrCJE7Ki0ln7ae35bLDvnhSbsDN4bx9v96FyppsuyvR3EVQJGwO16VMPGT3z+NifvTq5YF5nLGvl1wxP6SMrWV8FNOQCTyHAGn7UgpHmlbG0IBUwMz+OkfnYGxbGzY8ALlP2YAikkq7T8zNIt3/vI8PvSVl6D7tU1p4Lx7IMpfTsU/U0GZCu9+8xImH0xBSMFlfx7GDEARSW/E984+wLvfuojlxcSqcr5cu0/kHeltXimFZMLAmb+6iDtv9jjDD+z8vYsBQJFJb8wX//oaTn/9HBJLSW7sQeRhylRIxg1c+O41XPru1ZX5vOz8PY0BQBGyG7WUEjd+eBsX/+4GADhria27gi07PSLaBOlpfyEFrvygC+9965IzJMjOnzgHoEgJIawOXwDnv3kJ8bklHP/cQQRLA6mGr1JFP3gRICom6cN8SinE55dx9QddOPfNSxBIBQRs9wQGAEXNXh6olMLVv7uJubEFvPTlZxCpCDsTBjkGSFQ8Hp7jk1hI4PSfncet1+5AgaW6aTUGAEXOqREggLtv38Pi1CI+9DsvoaQivPrfwQsDUaF6+K4fJrAwvYQf//7P0PveA0hdOhsLEdm0j+36+f+01SdBG8vexU8IgdnhOdw9ex+B0gDKm2KQMjUNRKQ9logKRnptfwBQhsKdt3vw2n97C8O3RqzdA8G2TY9iBsAjnJLBUmBudA5v/vE7GOoaxbNfOIJQacDZBITZAKLCsbLEz2q/i7NLOPuNS7j9424k4kmn8yd6HAYAHpJevjcZT+Lq393A/Qv9eO7XjqH1cCN8Id15XHpKkcEAUX54eIzf/nsybqD/2hDe/vo5jHWPQw9oTPlTRuIPPvU1LgjzmPTNRpQJ6AENTQfqsefVnWg+UA9/2Jd63MZsREJE2VnV8adt9JVctjr+6/94Cw8uDyKxmEjblpttltbGDIAHpWcChACMhIHec3249+4DNB6ow/FfOWxtJiRWagfYJUMffg4i2iAKzsx9AM6GX/Y6/r7rw7j4N1fx4Hy/s+Q3fb4PUSYMADwsPRAAAKlJ9F0eRP+VIdR31mHnC9vRsKcGJTUlCIR9q5YOPpwdSH8+IsrOo6l9APb2vKl2l1w2MDsyh4FbI+h+swcDV4eQXE5C82upg9gGKTsMAGhVICA1CSEEBq8NYfjmCIJlAVS3V6Jhfx2aDzQg2lCKQMi/cnDqLiV962Eiyl76On1h/QHLSwlMD86i7+oghm4MY/jOOBYmF2AmTQghoPt11vKgdWMAQI6H9yFXSmFpJo7e9/rQc+Y+lADKW2JoPlCP6h2VqGyrRFVTDELaaUnBrUWJsmSl9q1d+pQCxvumMN47gZGuMQzeGsH43QkowwrOpU8+0uGz86f1YgBAj5W+EkBqElKzLjwz/TO40jsF6ZPwBX3wBTQEy4IIRYPQAzpCsRB4OSJyRwGIz8aRWEpgcWYJS9NxJBYTSCwlYCQMaJpmZeV0sXIAU/2UIwwA6Iked5ERUsIXsO72jXgSyaUEFqeXMNmXSltyFIAoO/ak/bQaHFIIyIDvscNq7PwpVxgAkGsrF57Vu4mtuiDx2kSUNXvMn+l92kwsE0VPhRcootxhe6LNxACAiIjIgxgAEBEReRADACIiIg9iAEBERORBDACIiIg8iAEAERGRBzEAICIi8iAGAERERB7EAICIiMiDGAAQERF5EAMAIiIiD2IAQERE5EEMAIiIiDyIAQAREZEHMQAgIiLyIAYAREREHsQAgIiIyIMYABAREXkQAwAiIiIPYgBARETkQQwAiIiIPIgBABERkQcxACAiIvIgBgBEREQexACAiIjIgxgAEBEReRADACIiIg9iAEBERORBDACIiIg8iAEAERGRBzEAICIi8iAGAERERB7EAICIiMiDGAAQERF5EAMAIiIiD2IAQERE5EEMAIiIiDyIAQAREZEHMQAgIiLyIAYAREREHsQAgIiIyIMYABAREXmQvtUnQBalVOoPgGn/ucgJAML5DyBS/18v+zNUSgHF/BGK1Z/V035umai030dlZvHBbvJ5FrP064Nax/VBSP4c6FEMAPJM3d4aNOyttS60Rd1QFYQQGLk7jgcX+nN6USqpKUHdrhqY2XRWBcRIGBi8NoTEYmJTX9cX8qFhfx2kT8v4WAFgeSmBgauDMBPmxp+cFyggUBZAw/46QArXQa4QwHjPBKb6plcFAkQMAPKIkAIf+M3nUdEc2+pT2TSTgzP4zm9/PyedmRACEMCRz3bi4Mf2rOtOqRAYCQM/+cMz6Hq9e1Pu5oQQSCYM7DjRhA9/5aWsjv3H330DXT/uhi/IS816KaWsbIom8NJvPIeOk61ZP0d8YRnf/sr3MTMwAwVmAcjCVplnZCqytxt90VIABGAmc393KFN3OcpURXmh03QNodKA9f60TXp/SsEX9KX+qCAy/HLav78lFSEokxmApyWEQFltCep2Vaeyg8j4M7ApUyEQ9qOxsw7TAzMQSP0Mi7BtUHYYAOSj1NhpMTdQ5+58A9+jnREoOuscB37617Ve083vpYCAgspuzgA9wg6klKFQ01GNYEkACoDMpt2kpnq3HmtG10/uwkwaxT1HhlxjAEBFqHgnPOXLsEamz1XBmohZXJ/+5rM/P8Mw0bi/DnpAd2LmbH63lVIob4oiUhnC3PB87k+UChKXARIR5TGlAH/Eh4Z9tU5AkG1gK4RAaXUJanZUwTRMQCgno0PexQCAiChPKQBm0kD9/nrE6svWlVKxgwXNJ9F6rNmacFtkmTFaHwYAtCVW1jUzT0z0OM5EPSGw99UO68/q6Ya16vbUIFIdgTIUpwEQAwDafM6FTQGJxQSS8eRWnxJRXlKmQnlzDC0HG6x5FU8RLAshEK0tReuJZphcmUFgAJB3ij0qT5/EZhgmzn37MowlYwvPiCg/2Xf6TYca4A/7Vn1vvc8lBHDwE/ug6ZmLOVHx4yqAPCMUnGVehZCky6bEaHqpXtNQuPoPt9D7Xh80v7Yhs9uVUlBGjp43y7K2T1u6NdO5UHGzs2SaX6LlUAMA63fucev37e/Zv2cCay9/rWiOItYUxeSDKdYD8DgGAHlEmQq3f9aDthMtgJn/Y+OmYaK8KQp/2J/VcQICk/1TuPL3N6z14jm8CCmlMDUwjZmRWRg5LjIUioYQSN2JuTsZYGF6Ecs5LNmrAJgJE+P3p1jWtdgJIFIZRmVLuVX0SbqrDaLw5EJNSinoPg31+2ox+WAq12dMBYYBQJ4586fn8NZXz271aWSmgJKaCD7/h5+xAoBUZb8nPjztLtg0Fd7+2nuYGZx1fVFzdUqp17jwnSu48v0bVgGVHDyvXZTp1BdPoPMju6x5i5lOWQHJhIEzf3ERXT/pzlk2RwBQpjUzXErJO7hilJroZywbqNlZg3BF6Im/cKs2wHJBCAFoQPOhRtz84W2rjRRpxUzKjAFAnrBTeL6gD75QFneZW0AIAT2g4aXffB6llZHsOn/DxPm/vob77/VB6rmdgmJ/hrpfB3I5y1kASqi095HhDadRhgmVw0yE/cpSk089I5zyVOpHaiQNNB9qgM+vZ2xfUkoMdI2gurUCuk+zsgBPChpMhcqWKMKVYcyPzfN3yMM4CTCPOA1R5eeXMq1OMBlPovXZFrQdb85qzwKlgKGuUVz+3nVoLnaUWy+VukUXOfrKhVydi70srACmh9BTMA0T4YowWg43OO3rib+Lqd+Fm/90GwuTi0/MBqxMBBSI1pWhpqMq58NkVFgYAFB2TCBSHcHxXzwI3a+tuqg8TnqKMrGUwHvfuoz4XNxJXef67qPY91CweeV9epG9h0LrMy0oqQgDWLvzF1JgYmAG988PYGF6MZUJe/ywgP08UgrsfGm7s1FTvpSYps3FAIBcsS8Q/ogPH/rKi4jVl7nu/O3HXP77m+i7PLjxJ0tUyBSg+TV0fnSX60PuX+jDzNAshrpGM2fkhPXVtL8OseaYVRqYPIkBAGWUnubf9cEdaNxfl9Udg1IK9y/248zX3stqRzkir1HK2kSpoqUc9TtrMh8grEm175/uBUyF/mvD9rfXfh1TIVgawPZnWmByEqBnMQCgNTmdvwKijWU48PE9AOA+9W8qLE4v4b1vX3Ym/fFiQ/Qop60JoH5fDYQUa26nbLexhclFDF4fgubXMHhjGPH55YwRgL2EdPuz2xCI+K2aGRwG8BwGAJSZAoQm8PyvHUesoSzj+vP0cX8hBa7+oAvDXaNct07kgubX0HSgwdWduVIK/deHkFxKQgiBxclFDNwacfU6SgGV22KINpTl4rSpADEAoDUJIWAaCgc+uRfbTzSvVBtzMQlNQGDk7gQufOeKVZGPy9aIMiqtiqBmR6WVDHhCnYz0SpMjd8ZTq0MAZZro/llP6jGPf/70ssD+kB9NB+pXfZ+8gwEAPZadElRKoWF/LY78QieA7Mr9Tg3P4rXfexNGwnB1LJFX2atijGUD9fvrECkPWx36Y3pxp40ZCoszSxi+PQItoAHKqg8x3DWG+clFYI20vrMaQBNOAPCk16PixQCAnsjur498thOh0kDGx6d3/sm4gfPfuYLJ+5NM/RO5pJTC9meaIVJX5rWCZqEJzI0vYHpw1qkKKXWJ6YFpTPZNr3rOtV6vqrUcpXWluds3gwoGAwB6hD0ZKZkw0fmpvWg73ux04hlT/6k0f//1Idx58y6k5MQ/IjeMpImKlgrU7al9Yi1/R6qvHn1/HEszSzAN09liGyYwfHt01ePWUlIZQfOheiQTBtupxzAAoFXSZ++3PduCZz9/2NVFxDkOwPTwHN7+P+/BiBusVU/kghVYA63PNiMY8bsu9Hj/0sCqO3c7eB++MwYjsfb6/pXKksDOl9uhb9CunJS/GADQI4QUiFSE8cznD8Mf9Dkb2WQs+KOs+uVv/e+zmLg3mfe7GRLlC6UU9KCO3S+3A7CG39YMnAWwvJjE4PWhR7aqhgBGusesXShdtsGGXTWoaC1nAOAxDADIYd89GHEDez60E1Wt5QDcpe/tCYPdb/Wg9+wDaH7N9bFEXmZnyWJNMZRVl2Qcs7f+ALx/thfzE4uQaW3MHgZYnFjE6L0J57GZnlNIgdZjzRkfS8WFAQCtYiYVGg/V4+An9ljj/hk2InGWBUJgdnQe57971fr+GgVMiMhiB91KKTTsrYEv6GKDVmVV/3twoR9mwnhkq2AhBJLxJN4/fS/18LXbot22mw81wB/2WQWIGAR4AgMAArDSkYdiQXzk37+MUFkwY7W/VQRw+s/OYaJ3MrvjiDxOCAHTVGjcX2et+8+Qt1dKYX5yAb3n+6AH9Ec6ePuOvv/KIBZn45knFMIK2GMNZSirZ1EgL2EAQE4KUtMljv/SQYSjoVUFf550jP0Y0zBx6fs3cOendyF1yYl/RC4JIaAME6U1Jahur0x9M8PyPyEwfm8Si1NLVpbuMTfrUpOYuDflrAbIuEWwFAhHg6jfUwNjmasBvIIBgMc5BUiSBhoPNWDXy+1ZdeBKAeO9k7j8veuQPsl96omyZBgKjZ11KK2KrFkzY2WljcLQrWHIVOf/pLYqJPD+md6MAYVNahJNhxqcwl0cBih+DAAIylTwR/w4+evHECjxZ7XRDwC89+3LmB2bdy5GvHsgyszJoilgzysdzt38WqV/lVKIzy1j8OaT99awj9d81uZAVlXAzFkAAGjYU4NwdYRzeDyCAYCHOan/gIaXfuM5VDTFXI0/2qyNfm6h550HXPFHtA7KVKjdXYXanVVW9mythpRqevOTi5jsm7KGD9a4SxdSYG5sHhMPplYFEGsJlgax55UdMI21awhQcWAA4FHpF4T2k63Y8XyrMyPZzV28Ugp914bw1lfPOruO8M6fyCVlrZwRQqDlaBN8j5nM9zhCCAzeGsbi9NKaj7czC0bcwHDX2vMA0k4JQgB7X90Jf8Sf1duhwsQAwIOcC4EQ8Ef8OPiJPdB0mdVGPwvTS3jnLy4ATBUSZU8ASij4wjpajzZZ33IZQD+4OAAzYa49/p+WHRi6NQLTVGvOz7ErESqlUNVSjvKWGBRrAhQ9BgBeJoCTXzyOmh1VrjfssYcNbr7ejZHbY6v2CCCi7EQboiirKXHG3DNV/1uYXkL/1SFIFwG7bfTuOOLzcVdt3B4C3Ha0ydmQiIoXf8QepUwTez+yC7tf3rHqzsBNwZ+R7nGc/+ZlKMPkkj+idVKGQt3uaoRjIVeds1JAz7kHWJxcdNXm7MfMjS3gwaXB1JNkeHzqaRv21kL36ywKVOQYAHiMPc5ftaMKJz53wFpK5LLan1IK81OL+NHvvYHEQmLNY4jo8Zz6GaZCy+FGV6tulAKUYeLBhX7r71CuOmarNLDCrZ92W1kGkTmtbyZNlDdFUVZb4kxMZBBQnBgAeIjd+QPA0c8eQCgayrhZSHrnbywbuPi9a5h6MA2p81eHaL3MpInylhhqO6oyTOZL/d9UmBmZw3DXGDSfllW9DSklhq6PYHJgxl1HLgVC0SAaO+uRWEq4qiRIhYlXcY9Jxg3seqUDHadaIbWHNhFZgxACIz0TuP6DLghNMPVPtE5W6V8TbSeaEI6GMqy6sTpsqQlM9s9gfmwu63k3UhOYG5/HyJ1RJ3BYqyaAlAJSE2g52ugE+mzrxYkBgEfYDb5hfy1O/dox60LgLAZwkfqfWMCbf/wOEkuJNWcfE9HalFLwhX3Y/UqHu+16lZUBGLgxBAUBZWYRfCsrixAI+XHvfJ9V5S9DEsAO7psP1KO8JQYzNdeHig8DAA+wNwfxR3x45vOHESgJWBeeNUqEpm87aiRNnP7z8xi9M8aOn+gp2NX/qtsrUdVS7u4gYbXBgWvDK2MCbqXG74UuMNY9jrmJxcyHpJYQaj4Ne1/tsJYQstkXJQYARc6O5pPxJHa8sB2NnfVZtWUFhfvn+9H9Zo819gje/ROth9UWrWI7rceanO+5MTexgPF7EwCyb39CWDsMzo0vYHZk1urMM6zxt1+j5WgTgmWBrM6VCgcDAA8wDRPVO6pw7J8dsMb9Xc/6BxamlnD+u1dgJs3sUo9E9Cgh4A/7Ube7xqkG+CR2NT8AuPPmXSQWE3ia5mcsG7h/2VoO6KbqoDIVyuvLUNVWwWG/IsUAoIjZHXmgNIBXf+dFlFZHXFf7A6w7lbe/fg7Dt0Y39DyJvMDa+lehvDmGiubYqlU5a4kvJNB95h6A7EcAbPbQQ//lwYxbDqycMCB1Dc2HG9b3opT3GAAUKWeWvgD2f2w3Ku0LDp5c6z+98zcNE9f/6Q5u/qjLWS3AOwCi9bHX7hsJA/X761YV/1mrXSkoTA9MY/T2GDRdW/fr221+onfSGkpwserHGjoA6vfUQg/6rLPhMEBRYQBQhJxCI4aJmp3VOPCx3a73BLeeABi/P4Xz37oE3adDMf1HlBsCaDvW5HoFjhACPef6oHKxOZ8AlheW0X26N6vDKreVI9pYCmWmMgcMAooGA4AiJnSJF778DMLloaw2+hFS4Px3r2J2ZH4zTpPIE1TSRFVHFarbK13Pql9eTGDo5khuJuAqQGoS3T/rsZYDws0OgQrBEj/an9mG5aVlwOWeIVQYGAAUGWtcUUDqEqe+/AzqOqqcf3OT+ocCrr92G3ffvrfmMUTkjj0cpwDsfHG7tfXvGh2vE4ybCtNDsxjvnYTUnr4mvxACUpOYGZzFcPf4qqD/SY+3VxC0HG1EsCyYKifM60GxYABQRJxJRUqh9UQz9n5wR1YV+5RSGOwaxRv/84yzOxkRPT2lFILRIDpOtQHIHFjbmbixe5OIz8Rzdg4AYMQNDHeNrioGlkl1WyWq2yutmgBUNBgAFBE7Wpe6xOHP7Ifu11xtNAJYdxvLi0mc/79XrL3GiSgn7KV+FS0xlJSH3AXlqXk3/VcGYCSNnCzDs4+XPomhrhEklw3XNwhSE+h4cTvrARUZBgBFwl7mo5TCs//iKOp2VmfcYjS92p+QArfffB99lwYyBg1E5JJSgLAycy1HGqH5NKfS3lqEFEgsJdF/bdjasRNwqnc+1RcAoQmM3Z3A0uxSxnNJ3yK4aX8dgrFg6m0xE1AM9K0+AcodpRR2vLjdmvWfttjXTUc+1juJs39+AWbSdH0MEbkgBDRNon53DRQUBNzNq7lzugdj749DyNzuJcMhDQAAF3tJREFUx6cALM8vY6R7HKXVJe6OMRUilWFUtMQwdH04h2dDW4kBQIFzlgtJgZLKCJ75lUPWeuE1Ov+HJ/0tzcXxk/9xGkvTcQiNk/6IckYIKMNEWXMU5U1RuK/CA5Q3RvGp//jqxsy8VwrR+jLXDxdCwB/yo7GzHv2XBiF9kjuCFgEGAMVAWGU+j3y2E9G6UtcXGKUUlKFw5R9uYfjWKKQumdojyjEjYaLlSBPCsXBWE+jrdlajtqN6w84rq647tYdB/d4aSJ+05jWw7y94nANQ4IQQMBMmtp/chr0/t3PVuH+m6FwIgYmBGVz9fzchJMf1iHJNKQXpl9hxqtXp/LO5a7Y3D9qIL7cduDMnSArU76pBaW0JTJMThYsBA4AClT7pL9YcxSu/dQqaLteewJe2A5hSCkuzcfz4v7+FhYlFZ5YxU3pEuaGUgjIVavfUom5HVeYDUpz195v45eaclFLwBXTsfXWntTmY2zWElLcYABQwIQX0gI4Tv3IYwZKA0yCfuOQPK7v8mUkTZ/7iAkZujjq1/okox6TAzhestf+F3l8KIQAFdLy4HeHyUMYthSn/MQAoQHbBn2TcQPPRRrQ/2wLAfWpRCOD+pQF0vd4Nzb/+DUaI6PHsCXKhsiCaDxbPbnpKKURrSlC9o5LFwooAA4BCZQKxpiie+8JRqxPPML6YnvpfnF7CuW9fhrFsOI2YqX+i3LFT5hXbYghH7RK6W31WOZB6D63HWyA1yetGgWMAUGCUstYR+8I+vPLvTqG8scypNOamuhgAvPONi1Yp0BQ2YqLcUwpo3F+HQMRfNMW17GGAul3VCJQGAHAYoJBxGWABce7iobD3wzvRsLsGyrRqhme687f/fPvtHlz+3jX4Q37r2AK/IBHlGzv9r/slGjvrnWp6mWr/54snnWd61cBofSliDaUY6loCBFgToEAxA1Ag7HF/ZSpUtlWg86O7rYuKyyIhSilMD8/i/LevwBfwcfyOaKMIa5Jt5fZKVLWWb/XZbAh/yI/mI01YXkg4GUgqPAwACokCpC5x8osnUFZbktUuf0IInP/uVUw+mFrXemQickdAIJk00P7cNvjDvozL5fLp7t+VVB2BpoP18IV8zrAkFR4OARQA5wIhgEOf7URzZ92qJUUZy/0CuPP2Pdx87Y61W/ATjiGip6OUAhQQqQij7bkWp2Kem904B26N4Ef/9Q2opLmpSwYVACkFPvu7H0dZTcma6Xx7GEBIgbqd1ajpqMLwrRGr/DgVHAYABaSxsx6HP7Uvu41+FDB2bxJvffUdJ0Zn50+0cRQUanfXoLyuDMrF5H87Vh/pHsPc8JxVknsTh+iEABJxAz3v3seBj+9Z6eTXCgJMBSkF9n10N4ZvjSCrTQ4ob3AIIM/ZDVGZJg5/Zh+CJf6M7Sz9riIRT+LCX1/F4tTSJpwtEQkpnNocrigFI2Fg4NowZGq7YKnJTfkSUgBSQNMl+q8NIxFPwtWIROoa1P5MM0KxkLtjKO8wAMhjdkduGiYO/UInth1pyq7WvxS4f7EfPe/cz2prYCLKnp0aD8VCqN1lbeIjMsz+B6x2Gl9IYPzepPM8m8Ve1qf5NYzeGbXKgrvMPiilECoNon5vDRQKcC4DMQDIe0qh6UgjTvzyoVUNLOOyPwWM3ZvAW39yFkbccGr9E1HuOat0DIXq9kqUVkUypvHT2/PQ7VHMjcwBW7WcTgGL03GM35+EyLI0+LajTZBSQEjBIKDAMADIU0opSE3CXxLAc184An/Il7GYSHrnn4gn8fofvI3Z4TkOzRFtMHtTncRSAs0H6uEP+zIu0bXvvgHgzlt3YRjmlnT+9msaywZG7ow755WpMxdCwDRM1HZUIRgN8iajADEAyEPWuL/ViR/41F5UtVW4HmNTSsE0TFz9wS2Mdo87s3PZMIk2ljIV9KCOhs5653tuiv/MTSxg4MqQFadv4Q20EkDvhT6YLsoWp28RHGuIompbOUyDWwQXGgYAecpImGg51oRDn9qb2ubX+n6mu38hBMbvT+Ly3153vs/On2jjmYaJ2t01qNpWnrHNpe/NMXBtCDPDs5D6Fl6OU33+dP8Mxu5NZHWoL6Bj24lmJONJ66k4DFAwGADkGbvxlNaU4NXffgGBsN/5Nzcb/STjBt746lnMjc0zJUe0SZRSUKZC58d2Q2prL6NbOQgwDYV7F/qhaRJQKmPRoA2Tmqy4NBPHnZ/dg0oNAazVmdvvT0Fh2+FGBMqC7PwLDAOAPGJfNDS/huOfP4RILLTqzv5Jx9j/NxImzn7zEgavDm3t3QSRhzhBe20Jth1pAuA+8J6fXMDIrRFIv2bVDNjCgF0pBU2XeP/tHiQW3Zf4FRAoqytF8+EGDgMUGPYSecK+iBhJA02H6tFxsi2r9L0QViGRm6/dhubTtnQskciLajqqra1/M9wFp//71MAM5icWN/rUXJO6xMS9SYzfn3R9jF1JsP1kK6TGioCFhAFAnglGg3j2C0fhC+mQ0vrxuEv9m3j3W5cRn4k7gQPT/0Qbz25r2440ug7a7fT6wI1hJONJCGx9e02f2PfgyqAzHJFpGECk6otvO9SASGUo4zGUPxgA5AG7sWh+DS//5vPOJKK1LiarG5jA2W9dQt/F/ozbjhJR7tjr/wOlftTsqHKfeVOAkTTRf2XQ1ZK7zaTpGoa7RrG8kMiqJLE/5EPNzuoNPDPKNQYAWyy94befbEXbseasGp0yFXov9OHcNy46GYNCk2my0VY9Vz7zyvvcbOv5TJWhUN4cQ6yhzPmem+p/E31TGOuZyLs6HUITGLs7joWplaGJjJ+LAHS/jsbOOihTsShQgeBmQFsovYFEKsM4/PP7rSV/0l3BH6UUZsfm8e43LkLz6db6XRRex+DMJn7KJYvp79s0czcZyTonkX29cwVXs6nXf075v8zTKhFbOAFLpsxbOvtxy4vLaD3eDF/I56ozt4/rPdeHpZk49ICWN9vp2lv7Ls3GMdozgfLGqOt9fpSpULezGr6QD8aysfJ8efz76XUMAPKAkMDJL51A5bZyuG4rqRnDg7dGIH0a6vbWoOBm/inrTmiqbwZLM7nbrChUHkK0vtTKpOTk2mNt6RqpCKX+5uJJRapISmMZ6vbUAiJXGQ4ApsLEvSkkl5M5ec6NIiBQWleC+n010IM+5Pfvp1XFb/zuhOsgwH5cMBpEy+FGV69iP6+RMHDr9TtWwJ8nnT+w8p7MuInec/3YeaoNCmrNc7SPgQQqt8VQvaMS/VcGrZVI+fwjJwYAW8W+EJimwt4P70LH862pOySXk4FSD9n14nbsenH7hp7rRrv4/Rs4/SfvPvWdghBWR338lw/iwEf3bNwdp8vT1HwSxz93AMc/dyCnL28kTbzxR2dw87U7GcvNbikBHPrkPhz65L6tPhNXFIA//1ffxUz/DKSWeThNQcE0FJr316Kqtdzp7DJn7oD+myOYejBjrdjJM0IIKAH0XemHaZiuPgv7Pet+Hdufb0Xf5UF2/gWgMAeNC1x6Cr+qvQJHPtMJYP2T95Qq1K9UjYMcd2L23YoyVU7Pd71y/ZlJTSAQ8RdESh05fe8b+7toGibC0ZD7H7YCpC6w99Vd1t9dTsBVponBa0Mwk9YwVT7+HIUA5kYX0H2mF9l25Lte2m6tBsi/t0UPYQZgi1h3/yYOfXofSqvCWR+7+u+5PLPNo+xh+lxfKNLKJm/VHXL6zyiXPx+lgHybNf44zvsXeTfH7bGUAoQ9f8bl+D8AlFRFULfb/cx3ZSosLyTQf30IekDfusp/GVgb/Ri4+04vdp5qA2C9ZzcljkOlATQfakDX6++7yh7Q1uFPZwvYnX9pTQmaOusf6iwK4XKZ7/gZ0jq4/LWxl/4BQE1HFYKRgOuVO0IIzI0vYKpvBkKzclV52eaVgq5r6L88iOmhWffvL/XBtBxuhO7XIcDVAPmMAcBWUQDsyTMZNvohovxiZ5ca99dB88mMWQOlFOzZ9CPdY9akV5X6Rh5SsJYDzo8vYOzehPtrk7CyHHW7ahCuCLEuSZ5jAJAn2EiICoMQAlBAsCyA2p3VqU4u83H2ffCDKwOFUTNfWUWBBm+OuLqLTx/2iVSEUb2jMquaJrT5GAAQEblk1zMwkgaq2ytR3VaxUkJ3rShAKQgBLC8mMHBlyP5W3kpf2jd0cwRLc3HnvWc6TggBX1BH4/76VG0S5O1cB69jAEBElAUhBMykiR2n2iA16WpynDXcB/Se78Pc+EJ+L998yNTADObG5ldW17iIXJRSaDpQD3/Yx84/jzEA2CqF0/6JvMHt6j9TIVIVQfPBeldj3M6yX9NE1xs9UEkTdiGvfCaEgIBAfDaOB1cGrWuWy89ICIGK5hiaDjfAiBtcEpinuAxwqzgNwroI5LJ0bcFQG7tUTylVxGOQm9x5iNR/lJXOLdqZ3fZkvScQQsAwDDQfrEdJZcSpNpnx81DA3Ng8+i8PQPfn7/K/h9n1EXrP9+PQJ/c5cx3cvF8hBDpeaEPP6V7e7+QpBgBbREiB+OwSRt4fQ3yh1JsRsrL2H5/qn87dUyqFyYFpTPRNwUiYxZdpUVawONE3talpZCEEZoZmMNozAaEV24cKQACJhQRmRuYzfq5WEGBiom86q8l875/pRWIpYW3aVUDtXWoSQzdHcOd0D6q2VbgO/qQUmJ9ctDYGQvE1xWIg/uBTXyugX8Xi4DQgBUACMg/LgW4WIYDkkuHcWeRqMyDpL+LPVCkYy4a7yWc5eTk7ha0g/VpBjV+7JQAYhgmVMNfcjCv9s9BSn4XbC2hyKQmZYaOvfJPepgzDtDY8yoIRT27a7ylljxmALeDMsE2NqZlxY6tPaUvlovO3j7cvWEX9maaNO2/GRdX+XKUmoZJmXs9efyoCGXfidB4qBcxEFsN2AtDcThjMI+ltStdl1u2qkN6rFzEA2CKrdhzzeBvZiPHkYrxLTbdVY/DF/vuaqYNO7xCL/XfMtvKeBcQ6po0XWtDjJQwAthAbhSWXn4NXPtPNfp/8XLN7zEYcu5W8+J69gMsAiYiIPIgBABERkQcxACAiIvIgBgBEREQexACAiIjIgxgAEBEReRADACIiIg9iAEBERORBDACIiIg8iAEAERGRBzEAICIi8iAGAERERB7EAICIiMiD9FVbexbrPt9ERES0ajtvZgCIiIg8RkBA+gI6BATv/omIiDwiUOKHDJYFrQCAiIiIPKGsthQyVBaEEBwJICIi8oqy2hLIcCwETQoIJgGIiIg8IdYQhSytjqQyAIwAiIiIip2AQHV7BWS0vgzLyQQUZwESEREVNQGBQMiPSGUEsrw5Cs0nrYmATAIQEREVJwEIKRApjyAUDUKWN0URKglCcBIAERFR0SutKoEvpEP6Qj6UVkegFIcAiIiIipKw0v/KUPDHdOh+HdIX1BFrjm71qREREdFGEoDfH0D19grofg1S6hoqtsWg67o1DMCRACIiouIkFMpbygEAElCobC1HOBze4rMiIiKiDaEApRSEH6hqrYCQAhIKiDWUQSu1VgKwLDAREVFxEUJAFzoaO+sQjgUBAFJIgUhFGLW7q6AJjfUAiIiIiomA07fv+sAOZ6hfAta6wJ0vbYehDOfBREREVBw0qaG0LoKGfbXOsn9nF6CGvbWo2l4Bzd4YiEEAERFRYUv15UopNB9qQCDih73q3wkApC6x42QrWA6AiIioeNjlf1ufabb+nj4EAKSigyONiNaWQUre/hMRERU0AWv2P4CKbeWoaI6t+meZ/pdobQmqOiqgzLSDiYiIqCAJKeCXfjQfqUe4PLTq35wAQAgBX8iH9udb4NcC1iQBDgcQEREVJAEBmIDym+h4oe2RPX/kwwc0H2pArK0UEhorAxIRERUaYX0ppSClxMFP7kVZXekj/fkjAYA/7Mfz//IYNB97fiIiokKlaRpijVF0fnz3Y//9kQAAyloS2HKkCUJIaxggFU0QERFRHhP2/6w/tD3XjGBZ8LFD+o8GAKlZg7tfbUckGoLgigAiIqKCU1Zbip0vtUE+YTj/0QAgpXF/HRoO1EKDtpHnR0RERDkkhIBP+rD/47sQa4w+MYP/+ABAALpfx9Ff7EQwGoBE2lAAERER5Rd7qF4BEhL1B2uw/yO7Hpn5n+6JGQAIoLwphpNfPA49oK/5JERERLT1pBQoqY7guV89CqGt3W8/OQAAoEyF7c+1oP25lpVvckIgERFR3hFCQNN07PvoTlS0xDLeuK8ZAAgpIDSJzk/uQVVTJTSpsTgQERFRvkhL/QslUN1Rid0faHeVtV8zAACsTQOq2ipw5Jf3QwisVAhkFoCIiCgvaJqGWH0ZPvhbzyMUC7nqozMGAAAAAew41Yqjv3jQygKIle8TERHRFrAn/UkBf8iHk186jmhDmevDXQUAdirhwCd2Y+dL26Fr+krfzyCAiIhoc9lpfyGgDGD/J3ajobMOSrkfp3eXAUjxhX04/s8PItZYBinS5gMwCCAiItocaVl4TWrY/coOHP7Mfuh+LasVe0JlEy7A2lxgcWoJf/sffojpwVkYhrFyMpwgSEREtHHS+ne/z4+2Z1vwc79zal1PlVUGALDSDeFYCC//6+dR3hSFJiWHA4iIiDZaeuev+dFypAHP/urhdT9d1gGAfRK1O6vwc195AVpQgxSas/EAgwAiIqIce6jzr++swStfOYVIZXj9T5ntEEA6pRSmB2bwj//lDUz1T3M4gIiIKNdSE/4AQPfpaD3WjFd++yT0gP5UT7u+DECaWEMUH/y3z6Omowq6lnYyrBhIRES0fulFfoSAJnV0nGrDyS8de+rOH3jKDIBDAcuLCfzgP7+O4ZtjSKrk6qUIzAYQERFlx17nr1lL/Q7+/F6c/PXjuXv6nAQAsIYDEotJvPeXl3D9tS4YCRNKmSt9P4MAIiKitaVnzpVV4S8cDeHAp/dg/8d2Q/druXupXAUAtuXFBN4/3Yuzf3YBSzNxmDBXsgEMAoiIiJ7Mnk8vAKE01LRX4uSXj6N6RyU0/alH7Ve/VK4DAKUUhBCYuD+Fn/7hGYx1T8AwkjBN9UhkQ0RE5Hli9R+FkAiFQqg/XIMXvnQC4fLQxrxsrgMAYCUImBtfQNfr3ej68V3MDM/CVMbqfp9BABERedVDN8VCCOi6jsrWchz49B60Hm+GL/j0k/2e+PIbEQA4FGCaCpN9U3j3ry6h/9wwlo04IMBJgkRE5F3pd/1CQEKDUiYOfnovDnxyD0qqIlDKGgrYsFPY0AAgRSkFZSjcfL0bV79/CzODMzBNBcMwrI0MwGCAiIiKnHj4rwJSCvj8flS1V+DoL3Wi6UC91Q9uwjL6TQkAbEoBs8Oz6D59Dz1vP8BYzwRM04QSCip9jgCDACIiKiYPdeia0KD7NdTtqUXHS63YdrQJwbLA5p7SZgYAQCr1r4DlhWXcfvMuLn3vOuLjCSTMhDMswIwAEREVvFWT+wQgAAkJISSqdsRw9HMH0HSgHlpqaV82O/nl5PQ2OwAAsCq9EZ9fxt137uP+u/0YuzuB2Yk5QAmrhoAyATw0RGAfT0RElA/Ss9fOtjjWH6QUEBAQmkCsLoaK7VF0vNCGbceaHjlms21NAPAwE1heWsb0wCyGukbR+14/xu6OITFvwDAMGDAA2JMhBIcLiIhoaz08g1+myvapVMcvNAgAkaoQajqq0XqiCTUdlSipikDzaanHb638CACwsnTQNjM8h/sX+tH9dg/G7k4ASQGpJJaTy1ZGIC0AMJW5NSdNRESeIyCs/kpYaXtlKmhSg0/zwRAGhF+gqbMO7c+3oulgPYKlK2P7D/d1WylvAoB06UsflFKYH1/AxIMpTPXPYHpwFguji4jPLmNhehFL83EsL8SRTBhMBhAR0YYSAPxBH3xBH8JlYYSjIfhKNJTWlaC0NoLKlnKUN8cQLA04nb0yVV7c8T8sLwOAx7E/QCNhwFg2kEwYSMYNLC8sI7mURGIpiamBmdQeBAXxloiIqEAIAMGyAEqqItCDGnxBP/xhH3S/Bs2vQU+l9e3MQCH4/0+4Z/7AAxW6AAACD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLycgeDp4bXB0az0nSW1hZ2U6OkV4aWZUb29sIDEwLjgwJz4KPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+amhhc3VtYW4zNjwvcGRmOkF1dGhvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhPC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0ncic/Pjbfd1QAAAAASUVORK5CYII=';
}