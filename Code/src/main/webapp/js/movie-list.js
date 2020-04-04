numberOfRows = 0;
numberOfPages = 0;
numberOfRowPerPage = 10;
curPage = 1;
globalResultData = "";
function initializePage(resultData) {
    globalResultData = resultData;
    numberOfRows = globalResultData.length;
    if (numberOfRows % numberOfRowPerPage == 0) numberOfPages = numberOfRows % numberOfRowPerPage;
    else numberOfPages = parseInt(numberOfRows / numberOfRowPerPage + 1);
}

function spanPreFunc() {
    if (curPage > 1) {
        curPage--;
        createTable(globalResultData, curPage)
    }
}

function spanNextFunc() {
    if (curPage < numberOfPages) {
        curPage++;
        createTable(globalResultData, curPage);
    }
}
function createTable(resultData, curPage) {
    let movieTableBodyElementId = document.getElementById("movie-list-body");
    movieTableBodyElementId.innerHTML = "";
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
    let startIndex = numberOfRowPerPage * (curPage - 1);
    let endIndex = numberOfRowPerPage + numberOfRowPerPage * (curPage - 1);
    // Iterate through resultData, no more than 10 entries
    for (let i = startIndex; i < resultData.length; i++) {
        let movieId = resultData[i]['movie_id'];
        let rowHTML = "";
        rowHTML+="<div class='row'>";
            rowHTML+="<div class=\"col-md-6\">";
                rowHTML+='<h1><a id='+movieId+' href="/backendCode/single-movie.html?id=' + resultData[i]['movie_id'] + '">'
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
                rowHTML+="<button id='btn_"+movieId+"' class=\"btn btn-primary\" onclick='checkoutBtn(this)' href=\"#\">Add To Cart</button>";
            rowHTML+="</div>";
        rowHTML+="</div>";
        rowHTML+="<hr>";
        // Append the row created to the table body, which will refresh the page
        movieTableBodyElement.append(rowHTML);
        if (--endIndex === 0) break;
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
    
    createTable(resultData, 1);
}

/** listening to the search and browse function */
$("#searchAndBrowser").submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.s

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
    success: (resultData) => {
        initializePage(resultData);
        createTable(globalResultData, curPage);
    },
    error: (error) => {console.log(error)}
});

$.ajax({
    url: '/backendCode/api/getGenres',
    type: 'GET',
    dataType: 'json',
    success: (resultData) => createGenres(resultData),
    error: (error) => {console.log(error)}
});