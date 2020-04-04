
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
    let rowInstance = row.parentElement;
    console.log(rowInstance.outerHTML);
    rowInstance.parentElement.outerHTML -= rowInstance.outerHTML;
    // need to find a way to remove the outer html!!!!
    alert("movie with id " + row + " has been successfully deleted!");
}