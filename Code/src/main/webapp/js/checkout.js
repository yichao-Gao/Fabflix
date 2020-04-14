
$.ajax({
    url: "/backendCode/api/checkout",
    dataType: "json",
    type: "GET",
    success: (resultData) => {
        createCart(resultData);
    },
    error: (error) => console.log(error)
});

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
            +"<button type='button' id='delete' class='btn btn-danger'  onclick='createDeleteWindow(this)'>delete</button>"
            +"</td>";
        rowHTML += "</tr>";

        movieCartBodyElement.append(rowHTML);
    }
    total_price();
}