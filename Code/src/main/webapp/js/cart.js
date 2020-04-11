cancheckout = false;

function checkoutTotal() {
    window.location.href="/backendCode/cart.html";
    $.ajax({
        url: "/backendCode/api/checkout",
        dataType: "json",
        type: "GET",
        success: (resultData) => {
            console.log("resultData");
            createCart(resultData);
        },
        error: (error) => console.log(error)
    });
}

function createCart(resultData) {
    let movieCartBodyElementId = document.getElementById("cart_tbody");
    movieCartBodyElementId.innerHTML = "";
    let movieCartBodyElement=jQuery("#cart_tbody");
    // Iterate through resultData, no more than 10 entries
    for (let i = 0; i <resultData.length; i++) {
        let rowHTML="";
        rowHTML += "<tr>";
        rowHTML += "<td>"
                    + resultData[i]["id"]+
                    "</td>";
        rowHTML += "<td>"
                    + resultData[i]["title"]+
                    "</td>";
        rowHTML += "<td>"+"<input type='number' id='number' min='1' onkeydown='return false' oninput='total_price()' class='form-control' value="+resultData[i]['quantity']+" />"
            +"</td>";
        rowHTML += "<td>"
            + resultData[i]["price"].toFixed(2)+
            "</td>";
        rowHTML += "<td>"
        +"<button type='button' id='delete' class='btn btn-danger' onclick='delete_item(this)'>delete</button>"
            +"</td>";
        rowHTML += "</tr>";

        movieCartBodyElement.append(rowHTML);
    }
    total_price();
}
function total_price() {
    let tbody = document.getElementById("cart_tbody");
    let trs = tbody.getElementsByTagName("tr");
    let sum=0;
    for(let i=0; i<trs.length;i++){
        let tds= trs[i].getElementsByTagName("td");
        let qty= document.getElementsByTagName("input")[i].value;
        console.log(qty);
        let unit_price = parseFloat(tds[3].innerHTML);
        sum += qty*unit_price;
    }
    let total = document.getElementById("total_price");
    total.innerHTML="$"+ sum.toFixed(2);
}
function delete_item(i){
    let tr = i.parentNode.parentNode;
    let tds = tr.getElementsByTagName("td");
    let movie_id = tds[0].innerHTML;
    $.ajax({
        url: '/backendCode/api/delete?id='+movie_id,
        cache:false,
        type: 'GET',
        dataType: 'json',
        success: () => {
            alert("Succesfully delete!")
        },
        error: (error) => {
            console.log(error);
        }
    });
    tr.parentNode.removeChild(tr);
    total_price();
}