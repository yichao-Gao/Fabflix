function createTable(resultData) {
    console.log("handleStarResult: populating movie list table from resultData");
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
    let movieTableBodyElement = jQuery("#movie-list-body");
    // Iterate through resultData, no more than 10 entries
    for (let i = 0; i <resultData.length; i++) {
        let rowHTML = "";
        rowHTML+="<div class='row'>";
            rowHTML+="<div class=\"col-md-6\">";
                rowHTML+='<h1><a href="/backendCode/single-movie.html?id=' + resultData[i]['movie_id'] + '">'
                    + resultData[i]["movie_title"] +     // display star_name for the link text
                    '</a></h1>';
                // start to add list of stars
                let index = i;
                let movie_title = resultData[i]["movie_title"];
                while (index < resultData.length && resultData[index]["movie_title"] === movie_title) {

                    rowHTML+='<span><a href="/backendCode/single-star.html?id=' + resultData[index]['star_id'] + '">'
                        + resultData[index]["star_name"] +     // display star_name for the link text
                        '</a></span>';
                    index++;
                }
            rowHTML+="</div>";
            rowHTML+="<div class=\"col-md-5\">";
                rowHTML += "<h1>" + resultData[i]["movie_rating"] + "  " + resultData[i]["movie_director"]+ "</h1>";
                rowHTML += "<h3>" + resultData[i]["movie_year"] + "</h3>";

                let preGenres = "";
                // start to add list of genres
                while (i < resultData.length && resultData[i]["movie_title"] === movie_title) {
                    if (preGenres === ""||preGenres !== resultData[i]["movie_genres"]) {
                        rowHTML+="<h3>"+resultData[i]["movie_genres"]+"</h3>";
                        preGenres = resultData[i]["movie_genres"];
                    }
                    i++;
                }
                rowHTML+="<button class=\"btn btn-primary\" href=\"#\">Add To Cart</button>";
            rowHTML+="</div>";
        rowHTML+="</div>";
        rowHTML+="<hr>";
        // Append the row created to the table body, which will refresh the page
        movieTableBodyElement.append(rowHTML);
    }
}

function createGenres(resultData) {
    console.log("handleStarResult: populating genres table from resultData");
    let selectOptionBody = $("#genresSelect");
    for (let i = 0; i < resultData.length; i++) {
        let rowHTML = "";
        rowHTML += "<option>";
        rowHTML += resultData[i]['genre'];
        rowHTML += "</option>";
        selectOptionBody.append(rowHTML);
    }
}

function updateTable(resultData) {
    let movieTableBodyElement = document.getElementById("movie_list_table_body");
    movieTableBodyElement.innerHTML = "";
    createTable(resultData);
}

/** listening to the search and browse function */
$("#searchAndBrowser").submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    let form = $(this);
    console.log(form);
    $.ajax({
           type: "POST",
           url: "/backendCode/api/index",
           data: form.serialize(), // serializes the form's elements.
           dataType: 'json',
           success: (data) => updateTable(data),
           error: (error) => {
               console.log(error);
           }
         });
});

$.ajax({
    url: '/backendCode/api/movie',
    type: 'GET',
    dataType: 'json',
    success: (resultData) => createTable(resultData),
    error: (error) => {console.log(error)}
});

$.ajax({
    url: '/backendCode/api/getGenres',
    type: 'GET',
    dataType: 'json',
    success: (resultData) => createGenres(resultData),
    error: (error) => {console.log(error)}
});