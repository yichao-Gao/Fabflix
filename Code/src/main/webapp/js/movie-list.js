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
function searchMovie() {
    let body =  document.getElementById("movie-list-body");
    let titles = body.getElementsByTagName("h1");
    let input = document.getElementById("search");
    let filter = input.value.toUpperCase();
    console.log(titles);
    for (let i = 0; i < titles.length; i++) {
        if (titles[i]) {
            let movieTitleContent = titles[i].innerText;
            let row = titles[i].parentElement.parentElement.parentElement;
            if (movieTitleContent.toUpperCase().indexOf(filter) > -1) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    }
}

function createTable(resultData, curPage) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("movieContainer").style.display = "block";
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
        rowHTML += "<div class='col-centered text-center' style='color: white'>";
            rowHTML+="<div class='card bg-dark'>";
                rowHTML+="<div class=\"card-header\">";
                    rowHTML+='<h1><a ' +
                        'style="text-decoration: none; " ' +
                        'id='+movieId+' href="/backendCode/single-movie.html?id=' + resultData[i]['movie_id'] + '">'
                        + resultData[i]["movie_title"] +     // display star_name for the link text
                        '</a></h1>';
                    rowHTML += "<h2>" + resultData[i]["movie_rating"] + "  " + resultData[i]["movie_director"]+ "</h2>";
                    rowHTML += "<h3>" + resultData[i]["movie_year"] + "</h3>";
                rowHTML+="</div>";
                rowHTML+="<div class=\"card-body\">";
                    rowHTML += "<div class='card-title'>";
                        // start to add list of stars
                        let index = i;
                        let movie_title = resultData[i]["movie_title"];
                        while (index < resultData.length && resultData[index]["movie_title"] === movie_title) {

                            rowHTML+='<span><a class="btn btn-outline-primary" ' +
                                'href="/backendCode/single-star.html?id=' + resultData[index]['star_id'] + '">'
                                + resultData[index]["star_name"] +  // display star_name for the link text
                                '</a></span>';
                            index++;
                        }
                    rowHTML += "</div>";
                    let preGenres = "";
                    rowHTML += "<span>" +
                        "<h4>";
                    // start to add list of genres
                    while (i < resultData.length && resultData[i]["movie_title"] === movie_title) {
                        if (preGenres === ""||preGenres !== resultData[i]["movie_genres"]) {
                            rowHTML+= resultData[i]["movie_genres"]+" ";
                            preGenres = resultData[i]["movie_genres"];
                        }
                        i++;
                    }
                    rowHTML += "</h4>" +
                        "</span>";

                    rowHTML+="<button id='btn_"+movieId+"' class=\"btn btn-primary\"" +
                        "data-toggle=\"modal\" onclick=showPopUpItem(this) href=\"#\">Add To Cart</button>";
                rowHTML+="</div>";
            rowHTML+="</div>";
            rowHTML+="<hr>";
        rowHTML+="</div>";

        // Append the row created to the table body, which will refresh the page
        movieTableBodyElement.append(rowHTML);
        if (--endIndex === 0) break;
    }
}


function showPopUpItem(title) {
    console.log(title);
    jQuery('#itemModal').modal({
        remote: "showAction.action?id="+title
    });
}
function createGenres(resultData) {
    console.log("handleStarResult: populating genres table from resultData");
    console.log(resultData);
    let selectOptionBody = $("#genresProjectionDiv");
    for (let i = 0; i < resultData.length; i++) {
        let rowHTML = "";
        rowHTML += "<button onclick='genresProjection()' id='"+resultData[i]['genre']+"' class=\"dropdown-item\">";
        rowHTML += resultData[i]['genre'];
        rowHTML += "</button>";
        selectOptionBody.append(rowHTML);
    }
}
function genresProjection() {
    let genresList = document.getElementById("genresProjectionDiv");
    let options = genresList.getElementsByTagName("button");
    for (let i = 0; i < options.length; i++) {
        options[i].onclick=function () {
            console.log(this.id);
            /** listening to the search and browse function */
            $.ajax({
                type: "GET",
                url: "/backendCode/api/index?genre="+this.id,
                dataType: 'json',
                success: (data) => updateTable(data),
                error: (error) => {
                    console.log(error);
                }
            });
        }
    }
}
function updateTable(resultData) {
    createTable(resultData, 1);
}


$.ajax({
    url: '/backendCode/api/movie',
    cache:false,
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