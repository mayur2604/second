
function searchMenu() {
    //var menu=["French fries","pizza","burger","cheese burger","coke"];

    var x = document.getElementById("menuSearch").value;
    console.log(x);
    var list = document.getElementsByClassName("menu");
    var len = list.length;
    console.log(len);
    x = x.trim().toLowerCase();
    for (var i = 0; i < len; i++) {
        var item = list[i].getElementsByTagName("h2")[0];
        var val = item.innerText;
        val = val.toLowerCase();
        if (!val.startsWith(x))
            list[i].style.display = "none";

        else list[i].style.display = "";
    }
}
function searchTable() {
    //var menu=["French fries","pizza","burger","cheese burger","coke"];

    var x = document.getElementById("tableSearch").value;
    console.log(x);
    var list = document.getElementsByClassName("table");
    var len = list.length;
    console.log(len);
    x = x.trim().toLowerCase();
    for (var i = 0; i < len; i++) {
        var item = list[i].getElementsByTagName("h3")[0];
        var val = item.innerText;
        val = val.toLowerCase();
        if (!val.startsWith(x))
            list[i].style.display = "none";

        else list[i].style.display = "";
    }
}
function drag(ev) {

    var p = ev.target.id;
    console.log(p);
    ev.dataTransfer.setData("text", p);
}
function allowDrop(ev) {
    ev.preventDefault();
}
function Drop(ev) {
    ev.preventDefault();
    var foodItem = ev.dataTransfer.getData("text");
    var tableId = ev.target.id;
    console.log(tableId);
    var tableAmt = document.getElementById(tableId).children[3];
    var food = document.getElementById(foodItem);
    var itemAmt = food.lastElementChild.id;
    //console.log(data);
    tableAmt.innerHTML = parseFloat(document.getElementById(itemAmt).innerText) + parseFloat(tableAmt.innerText);
    var tableItems = document.getElementById(tableId).children[5];
    tableItems.innerHTML = parseFloat(tableItems.innerText) + 1;

    var items = [];
    if (sessionStorage.getItem("items" + tableId) != null) {
        
        items = sessionStorage.getItem("items" + tableId);
        items = JSON.parse(items);
        var present = check(items, foodItem);
        var totalAmt = 0.0, totalItems = 0;
        if (!present){
            if(items==null) items=[];
                items.push({ table: tableId, name: foodItem, price: document.getElementById(itemAmt).innerText, servings: 1 });
            }
        if(items!=null){
            for (var i = 0; i < items.length; i++) {
                if(items[i]==null)
                continue;
                totalAmt += parseFloat(items[i].price) * parseFloat(items[i].servings);
                totalItems += parseInt(items[i].servings);
            }
            console.log(totalAmt + " " + totalItems);
            tableAmt.innerHTML = totalAmt;
            tableItems.innerHTML = totalItems;
    

    }}
   
        items = JSON.stringify(items);
    sessionStorage.setItem("items" + tableId, items);


}
function check(items, foodItem) {
    if(items!=null){
    for (var i = 0; i < items.length; i++) {
        if(items[i]==null)
        continue;
        if (items[i].name == foodItem) {
            items[i].servings = parseInt(items[i].servings) + 1;
            return true;
        }

    }}
    return false;
}
function orderDetails(ev) {
    document.getElementById("popup").innerHTML = ' <h2>order details <button class="close" onclick="closePopup(event)">&times;</button></h2>';
    document.getElementById("popup").style.display = "block";
    var tableId = ev.target.id;

    var tableName = document.createElement("h3");
    tableName.class = tableId;
    tableName.innerHTML = "table" + tableId;
    document.getElementById("popup").appendChild(tableName);
    var items = sessionStorage.getItem("items" + tableId);
    items = JSON.parse(items);
    console.log(ev.target);
    var table = ev.target.id;
    //  console.log(items.length);
    var itemName = document.createElement("span");
    var sno = document.createElement("span");
    var itemServings = document.createElement("span");
    var itemPrice = document.createElement("span");
    var newLine = document.createElement("br");



    var itemNo = document.createTextNode("SNO   ");
    var price = document.createTextNode("PRICE   ");
    var name = document.createTextNode("NAME    ");
    var servings = document.createTextNode("SERVINGS    ");


    sno.appendChild(itemNo);
    itemName.appendChild(name);
    itemServings.appendChild(servings);
    itemPrice.appendChild(price);

    document.getElementById("popup").appendChild(sno);
    document.getElementById("popup").appendChild(itemName);
    document.getElementById("popup").appendChild(itemPrice);
    document.getElementById("popup").appendChild(itemServings);
    document.getElementById("popup").appendChild(newLine);

    var total = 0.0;
    var cn=1;
    if(items!=null){
    for (var i = 0; i < items.length; i++) {
        // if(items[i].table!=ev.target.id)
        //continue;
        if(items[i]==null)
        continue;

        var itemName = document.createElement("span");
        var sno = document.createElement("span");
        var itemPrice = document.createElement("span");
        var itemServings = document.createElement("input");
        var newLine = document.createElement("br");
        var deleteItem = document.createElement("button");

        var itemNo = document.createTextNode("SNO");
        var itemNo = document.createTextNode(cn + "       ");
        var price = document.createTextNode(items[i].price + "    ");
        var name = document.createTextNode(items[i].name + "     ");
        deleteItem.innerHTML = "remove";
        deleteItem.id = items[i].table + "/" + items[i].name;
        deleteItem.setAttribute("onclick" , "removeItem(event)");
        //var servings = document.createTextNode(items[i].servings+"     ");

        sno.appendChild(itemNo);
        itemName.appendChild(name);

        //itemServings.appendChild(servings);

        itemServings.type = "number";
        itemServings.setAttribute("class","serv"+i);
        itemServings.setAttribute("value",items[i].servings);

        // console.log(items[i].name + " " + "" + name + itemName);

        itemPrice.appendChild(price);
        document.getElementById("popup").appendChild(sno);
        document.getElementById("popup").appendChild(itemName);
        document.getElementById("popup").appendChild(itemPrice);
        document.getElementById("popup").appendChild(itemServings);
        document.getElementById("popup").appendChild(deleteItem);
        document.getElementById("popup").appendChild(newLine);
        cn++;
        total += parseFloat(items[i].price) * parseFloat(items[i].servings);
    }
    }
    var totalAmt = document.createElement("span");
    totalAmt.appendChild(document.createTextNode(total));
    document.getElementById("popup").appendChild(totalAmt);
    var updatedItems = JSON.stringify(items);
    sessionStorage.setItem("items", updatedItems);

    var generateBill=document.createElement("button");
    generateBill.innerHTML="close session(generate bill)";
    generateBill.style.padding="10px";
    generateBill.style.position="relative";
    generateBill.style.top="30px";
    generateBill.style.left="30px";
    generateBill.style.marginTop="20px";
    generateBill.setAttribute("id","bill."+tableId);
    generateBill.setAttribute("onclick","closeSession(event)");
    document.getElementById("popup").appendChild(generateBill);

}
function closePopup(ev) {
    var popup = document.getElementById("popup");
    //popup.getElementsByClassName("serv");
   
    var tableId = popup.getElementsByTagName("h3")[0].class;
    console.log(tableId);
    var items = sessionStorage.getItem("items" + tableId);
    items = JSON.parse(items);
    var amt = 0.0, noOfItems = 0;
    if(items!=null){
    for (var i = 0; i < items.length; i++) {
        if(items[i]==null)
        continue;
        console.log(popup.getElementsByClassName("serv"+i)[0].value);
        if(parseInt(popup.getElementsByClassName("serv"+i)[0].value)>=0){
        items[i].servings = popup.getElementsByClassName("serv"+i)[0].value;
        amt += parseFloat(items[i].price) * parseInt(items[i].servings);
        noOfItems += parseInt(items[i].servings);}
    }
    }
    items = JSON.stringify(items);
    sessionStorage.setItem("items" + tableId, items);
    document.getElementById("popup").style.display = "none";
    var tables = document.getElementsByClassName("table");
    tables[parseInt(tableId) - 1].children[3].innerHTML = amt;
    tables[parseInt(tableId) - 1].children[5].innerHTML = noOfItems;
}

function removeItem(ev) {
        var deleteItem = ev.target.id;
    deleteItem = deleteItem.split("/");
    console.log(deleteItem);
    var table = deleteItem[0];
    var food = deleteItem[1];
    var items = sessionStorage.getItem("items" + table);
    items = JSON.parse(items);
    if(items!=null){
    for (var i = 0; i < items.length; i++) {
        if(items[i]!=null && items[i].name==food){
            //items[i].name="";
            items[i]=null;
         
        }
        }
    }
        items=JSON.stringify(items);
        sessionStorage.setItem("items"+table,items);
        
}

function closeSession(ev){
var billId=ev.target.id;
var tabId=billId.split(".");
tabId=tabId[1];
sessionStorage.setItem("items"+tabId,null);
var table=document.getElementById(tabId);
table.children[3].innerHTML="0";
table.children[5].innerHTML="0";
}