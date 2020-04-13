numberOfRows = 0;
numberOfPages = 0;
numberOfRowPerPage = 10;
curPage = 1;
globalResultData = "";
rowCache = new Map();
itemCache = new Map();
curIndexRow = 0;
sortByRatingCount = 0;
sortByTitleCount = 0;
function initializePage(resultData) {
    globalResultData = resultData;
    numberOfRows = globalResultData.length;
    rowCache.clear();
    curIndexRow = 0;
    if (numberOfRows % numberOfRowPerPage == 0) numberOfPages = numberOfRows / numberOfRowPerPage;
    else numberOfPages = parseInt(numberOfRows / numberOfRowPerPage + 1);
    update_num();
}


function spanPreFunc() {
    let nextBtn = document.getElementById("spanNext");
    nextBtn.disabled = false;
    if (curPage === 2) {
        let preBtn = document.getElementById("spanPre");
        preBtn.disabled = true;
    }
    if (curPage > 1) {
        let expectPage = curPage - 1;
        createTable(globalResultData, expectPage);
        curPage = expectPage;
    }
}

function sortByTitle() {
    if (globalResultData == null) return err;
    if (sortByTitleCount % 2 === 0) {
        globalResultData.sort(function (a, b) {
            return b["movie_title"] - a["movie_title"]
        });
        sortByTitleCount++;
    } else {
        globalResultData.sort(function (a, b) {
            return a["movie_title"] - b["movie_title"]
        });
        sortByTitleCount--;
    }
    initializePage(globalResultData);
    createTable(globalResultData, 1);
}

function sortByRating() {
    if (globalResultData == null) return err;
    if (sortByRatingCount % 2 === 0) {
        globalResultData.sort(function (a, b) {
            return b["movie_rating"] - a["movie_rating"]
        });
        sortByRatingCount++;
    } else {
        globalResultData.sort(function (a, b) {
            return a["movie_rating"] - b["movie_rating"]
        });
        sortByRatingCount--;
    }
    initializePage(globalResultData);
    createTable(globalResultData, 1);
}
function spanNextFunc() {
    let preBtn = document.getElementById("spanPre");
    preBtn.disabled = false;
    if (curPage === numberOfPages - 1) {
        let nextBtn = document.getElementById("spanNext");
        nextBtn.disabled = true;
    }

    if (curPage < numberOfPages) {
        let expectPage = curPage + 1;
        createTable(globalResultData, expectPage);
        curPage = expectPage;
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

function createTable(resultData, expectPage) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("movieContainer").style.display = "block";
    let movieTableBodyElementId = document.getElementById("movie-list-body");
    movieTableBodyElementId.innerHTML = "";
    console.log("handleStarResult: populating movie list table from resultData");

    // Populate the star table
    // Find the empty table body by id "star_table_body"
    let movieTableBodyElement = jQuery("#movie-list-body");
    let numRow = numberOfRowPerPage;


    // if that page has already been cached, then just used that cache data
    if (rowCache.has(expectPage)) {
        let rowHtmlList = rowCache.get(expectPage);
        for (let i = 0; i < rowHtmlList.length; i++) {
            movieTableBodyElement.append(rowHtmlList[i]);
        }
    } else {
        rowCache.set(expectPage, []);
        // we get the current index of the row
        let i = curIndexRow;
        for (; i < resultData.length; i++) {
            let movieId = resultData[i]['movie_id'];
            let rowHTML = "";
            rowHTML += "<div style='color: white'>";
            rowHTML += "<div class='card bg-dark' style='background-color: rgba(255, 255, 255, 0.6);'>";
            rowHTML += "<div class=\"card-header\">";
            rowHTML += '<h1><a ' +
                'style="text-decoration: none; " ' +
                'id=' + movieId + ' href="/backendCode/single-movie.html?id=' + resultData[i]['movie_id'] + '">'
                + resultData[i]["movie_title"] +     // display star_name for the link text
                '</a></h1>';
            rowHTML += "<h2>" + resultData[i]["movie_rating"] + " BY " + resultData[i]["movie_director"] + "</h2>";
            rowHTML += "<h3>" + resultData[i]["movie_year"] + "</h3>";
            rowHTML += "</div>";
            rowHTML += "<div class=\"card-body col-centered text-center \">";
            rowHTML += "<div class='card-title'>";
            // start to add list of stars
            let index = i;
            let movie_title = resultData[i]["movie_title"];
            while (index < resultData.length && resultData[index]["movie_title"] === movie_title) {

                rowHTML += '<span><a class="btn btn-outline-primary" ' +
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
                if (preGenres === "" || preGenres !== resultData[i]["movie_genres"]) {
                    rowHTML += resultData[i]["movie_genres"] + " ";
                    preGenres = resultData[i]["movie_genres"];
                }
                i++;
            }
            rowHTML += "</h4>" +
                "</span>";

            rowHTML += "<div style='display: block'>";
            rowHTML +=
                "<button id='btn_" + movieId + "' class=\"btn btn-outline-success\"" +
                "onclick=addItem(this)>" +
                "<i class='fa fa-shopping-cart'></i>" +
                "</button>";
            rowHTML += "<span id='span_"+movieId+"' style=\"border-radius: 50%;  display: none;  height: 20px;    width: 20px; background: #f30303;  vertical-align: top;\">"+
            "<span style=\"color: white;    height: 20px;    line-height: 20px;    text-align: center\"></span>" +
            "</span>";
            rowHTML += "</div>";
            rowHTML += "</div>";
            rowHTML += "</div>";
            rowHTML += "<hr>";
            rowHTML += "</div>";

            // Append the row created to the table body, which will refresh the page
            movieTableBodyElement.append(rowHTML);
            let list = rowCache.get(expectPage);
            list.push(rowHTML);
            rowCache.set(expectPage, list);
            if (--numRow === 0) break;
        }
        curIndexRow = i;
    }
}

function showASWindow() {
    console.log("hi");
    $("#itemModal").modal({
        keyboard: false
    })
}
// function addItem(title) {
//     let btn_id = $(title).attr("id");
//     $.ajax({
//         url: "/backendCode/api/cart?id=" + btn_id,
//         dataType: "text",
//         method: "GET",
//         success: () => {
//         },
//         error: (error) => {
//             console.log(error);
//         }
//     });
//     update_num();
//
// }
function createGenres(resultData) {
    console.log("handleStarResult: populating genres table from resultData");
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
    // we need to clear the cache since the table are different;
    rowCache.clear();
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