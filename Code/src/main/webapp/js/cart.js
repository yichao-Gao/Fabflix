

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
        +"<button type='button' id='delete' class='btn btn-danger' style=\'width:100%\' onclick='createDeleteWindow(this)'>delete</button>"
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
function createDeleteWindow(i) {
    let tr = i.parentNode.parentNode;
    let tds = tr.getElementsByTagName("td");
    let movie_title = tds[1].innerHTML;
    let deleteModalElementId = document.getElementById("dModal");
    deleteModalElementId.innerHTML = "";
    let deleteModalElement=jQuery("#dModal");
    let rowHTML = "";
rowHTML += "<div class='modal fade' id='deleteModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>";
rowHTML += "<div class='modal-dialog' role='document'>";
rowHTML +=  "<div class='modal-content' style='background-color: black'>";
rowHTML +=        "<div class='modal-header'>";
rowHTML +=       "<h5 class='modal-title' id='exampleModalLabel' style='color: #ad0803'>"+"<b>"+"<i>"+"Confirm"+"</i>"+"</b>"+"</h5>";
rowHTML +=        "</div>";
rowHTML +=    "<div class='modal-body' style='color: red;'>";
rowHTML +=       "Are you sure to delete "+ movie_title+ " ?";
rowHTML +=    "</div>";
rowHTML +=    "<div class='modal-footer'>";
rowHTML +=        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>"+"No"+"</button>";
rowHTML +=        "<button type='button' id='delete_button' class='btn btn-primary'  data-dismiss='modal'>"+"Yes"+"</button>";
rowHTML +=    "</div>";
rowHTML +=   "</div>";
rowHTML +=  "</div>";
    deleteModalElement.append(rowHTML);
    document.getElementById("delete_button").addEventListener("click",function () {
        delete_item(i);
    })
    showDeleteWindow();
}

function showDeleteWindow() {
    console.log("hi");
    $("#deleteModal").modal({
        keyboard: false
    })

}
function delete_item(i) {
    let tr = i.parentNode.parentNode;
    let tds = tr.getElementsByTagName("td");
    let movie_id = tds[0].innerHTML;//get movie_id through delete_button

    $.ajax({
        url: '/backendCode/api/delete?id=' + movie_id,
        cache: false,
        type: 'GET',
        dataType: 'text',
        success: () => {
        },
        error: (error) => {
            console.log(error);
        }
    });
    tr.parentNode.removeChild(tr);
    total_price();
}

    $.ajax({
        url: "/backendCode/api/checkout",
        dataType: "json",
        type: "GET",
        success: (resultData) => {
            createCart(resultData);
        },
        error: (error) => console.log(error)
    });
