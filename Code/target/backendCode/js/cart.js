cancheckout = false;
function checkoutBtn(movieId) {
    console.log("click id", movieId["id"]);
    movieId = movieId['id'];
    $.ajax({
        dataType: "text",
        method: "GET",
        url: "/backendCode/api/cart?id="+movieId.toString(),
        success: (data) => deleteRow(movieId),
        error: (error) => console.log(error)
    });
}

// delete the movie row by its id, if this row has been successfully added to the cart
function deleteRow(movieId) {
    const row = document.getElementById(movieId);
    let rowInstance = row.parentNode.parentNode.parentNode;
    let container = rowInstance.parentNode.parentNode;
    rowInstance.outerHTML = "";
    // need to find a way to remove the outer html!!!!
    alert("movie with id " + row + " has been successfully deleted!");
}

function checkoutTotal() {
    cancheckout = true;
    window.location.href="/backendCode/cart.html";
}

function createCart(resultData) {
    let movieTableBodyElementId = document.getElementById("cart-list-body");
    movieTableBodyElementId.innerHTML = "";
    console.log("handleStarResult: populating cart list table from resultData");
    /** Example
     movie_id: "tt0395642"
     movie_title: "Loma Lynda: Episode II"
     movie_year: "2004"
     movie_director: "Jason Bognacki"
     start_id: "nm1531570"
     star_name: "Sarah Ellquist"
     movie_genres: "Drama"
     movie_rating: "9.7"
     * **/
        // Populate the star table
        // Find the empty table body by id "star_table_body"
    let movieCartBodyElement = jQuery("#cart-list-body");
    let totalPrice = 0;
    // Iterate through resultData, no more than 10 entries
    for (let i = 0; i < resultData.length; i++) {
        let rowHTML = "";
        rowHTML += "<div>";
            rowHTML+="<div class='row'>";
                rowHTML+="<div class=\"col-md-6\">";
                    rowHTML+="<h1>"
                        + resultData[i]["title"] +     // display star_name for the link text
                        "</h1>";
                // start to add list of stars
                rowHTML+="</div>";

                rowHTML+="<div class=\"col-md-1\">";
                    rowHTML += "<h1>" + resultData[i]["quantity"] + "</h1>";
                // start to add list of genres
                rowHTML+="</div>";

                rowHTML+="<div class=\"col-md-5\">";
                    rowHTML += "<h3>" + "$" + resultData[i]["price"] + "</h3>";
                // start to add list of genres
                rowHTML+="</div>";
            rowHTML+="</div>";

            rowHTML+="<hr>";
        rowHTML+="</div>";
        // Append the row created to the table body, which will refresh the page
        movieCartBodyElement.append(rowHTML);
        totalPrice += parseFloat(resultData[i]["price"]);
    }
    let rowHTML = "";
    rowHTML += "<div>";
        rowHTML+="<div class='row'>";
        rowHTML+="<div class=\"col-md-6\">";
            rowHTML += "<h1>" + "Total: " + "</h1>";
        // start to add list of stars
        rowHTML+="</div>";

        rowHTML+="<div class=\"col-md-1\" style='float: right'>";

        // start to add list of genres
        rowHTML+="</div>";

        rowHTML+="<div class=\"col-md-5\">";
        rowHTML += "<h1>" + "$" + totalPrice.toFixed(2) + "</h1>";
        // start to add list of genres
        rowHTML+="</div>";
        rowHTML+="</div>";

        rowHTML+="<hr>";
    rowHTML+="</div>";
    movieCartBodyElement.append(rowHTML);
}
/**Request the cart information to the backend, jump to the cart html**/
if (cancheckout) {
    $.ajax({
        url: "/backendCode/api/checkout",
        dataType: "json",
        type: "GET",
        success: (resultData) => {
            console.log(resultData);
            createCart(resultData);
        },
        error: (error) => console.log(error)
    });
}