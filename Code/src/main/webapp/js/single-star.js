/**
 * This example is following frontend and backend separation.
 *
 * Before this .js is loaded, the html skeleton is created.
 *
 * This .js performs three steps:
 *      1. Get parameter from request URL so it know which id to look for
 *      2. Use jQuery to talk to backend API to get the json data.
 *      3. Populate the data to correct html elements.
 */

/**
 * Retrieve parameter from request URL, matching by parameter name
 * @param target String
 * @returns {*}
 */

function getParameterByName(target) {
    // Get request URL
    let url = window.location.href;
    // Encode target parameter name to url encoding
    target = target.replace(/[\[\]]/g, "\\$&");

    // Ues regular expression to find matched parameter value
    let regex = new RegExp("[?&]" + target + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    // Return the decoded parameter value
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Handles the data returned by the API, read the jsonObject and populate data into html elements
 * @param resultData jsonObject
 */

function handleResult(resultData) {

    console.log(resultData);
    console.log("handleResult: populating star info from resultData");

    // populate the star info h3
    // find the empty h3 body by id "star_info"
    let starInfoElement = jQuery("#star-name");

    // append two html <p> created to the h3 body, which will refresh the page
    starInfoElement.append("<b style='color: #ad0803;'><i>"+resultData[0]["star_name"]+"</i></b>");

    console.log("handleResult: populating movie table from resultData");

    // Populate the star table
    // Find the empty table body by id "movie_table_body"
    let movieTableBodyElement = jQuery("#single-star-body");

    // Concatenate the html tags with resultData jsonObject to create table rows
    for (let i = 0; i < resultData.length; i++) {
        let rowHTML = "";
        rowHTML+="<tr>";
        rowHTML+="<td>";
        rowHTML+='<a href="/backendCode/single-movie.html?id=' + resultData[i]['movie_id'] + '">'
            + resultData[i]["movie_title"] +     // display star_name for the link text
            '</a>';
        rowHTML+="</td>";

        rowHTML+="<td>";
        rowHTML+='<a href="/backendCode/single-star.html?id=' + resultData[i]['star_id'] + '">'
            + resultData[i]["movie_director"] +     // display star_name for the link text
            '</a>';
        rowHTML+="</td>";

        rowHTML+="<td>";
        rowHTML+=resultData[i]["movie_year"];
        rowHTML+="</td>";

        rowHTML+="<td>";
        rowHTML+=resultData[i]["movie_rating"];
        rowHTML+="</td>";

        rowHTML+="<td>";
        rowHTML+=
            "<button id='btn_" + resultData[i]['movie_id'] + "' class=\"btn btn-outline-success\"" +
            "onclick=addItem(this)>" +
            "<i class='fa fa-shopping-cart'></i>" +
            "</button>";

        rowHTML += "<span id='span_"+resultData[i]['movie_id']+"' style=\"border-radius: 50%;  display: none;  height: 20px;    width: 20px; background: #f30303;  vertical-align: top;\">"+
            "<span style=\"color: white;    height: 20px;    line-height: 20px;    text-align: center\"></span>" +
            "</span>";

        rowHTML+="</tr>";
        rowHTML+="</td>";
        // Append the row created to the table body, which will refresh the page
        movieTableBodyElement.append(rowHTML);
    }
}

/**
 * Once this .js is loaded, following scripts will be executed by the browser\
 */

// Get id from URL
let starId = getParameterByName('id');

if (starId != null) {
    console.log("send the star request");
// Makes the HTTP GET request and registers on success callback function handleResult
    $.ajax({
        dataType: "json",  // Setting return data type
        method: "GET",// Setting request method
        data: {"id":starId},
        cache:false,
        url: "/backendCode/api/single-star?id=" +starId, // Setting request url, which is mapped by StarsServlet in Stars.java
        success: (resultData) => handleResult(resultData), // Setting callback function to handle data returned successfully by the SingleStarServlet
        error: (error)=> {console.log(error)}
    });
}