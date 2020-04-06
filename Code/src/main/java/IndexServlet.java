import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;

/**
 * This IndexServlet is declared in the web annotation below, 
 * which is mapped to the URL pattern /api/index.
 */
@WebServlet(name = "IndexServlet", urlPatterns = "/api/index")
public class IndexServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * handles POST requests to store session information
     */
    protected void doPost(final HttpServletRequest request, final HttpServletResponse response) throws IOException {

        String search = request.getParameter("search");
        String browse = request.getParameter("browse");
        String sort = request.getParameter("sortBy");

        // write all the data into the jsonObject
        // response.getWriter().write(responseJsonObject.toString());
        String query = "SELECT m.id as movieId, m.title as movieTitle, m.year as movieYear, m.director as movieDirector, " +
        "g.name as genres, s.id as starId, s.name as starName, r.rating as rating " +
        "from stars as s, stars_in_movies as sim, movies as m, " +
        "genres as g, genres_in_movies as gim, " +
        "(select * from ratings) as r " +
        "where m.id = sim.movieId " +
        "and sim.starId = s.id " +
        "and m.id = gim.movieId " +
        "and gim.genreId = g.id " +
        "and r.movieId = m.id ";
        
        String updateQuery = "select * from ("+query + ") t where";
        if (search.length() !=0 && !browse.equals("Default")) {
            updateQuery += " t.movieTitle like '%"+search+"%' ";
            updateQuery += " and t.genres='"+browse+"' ";
        } else if (search.length() == 0 && !browse.equals("Default")) {
            updateQuery += " t.genres='"+browse+"' ";
        } else if (search.length() != 0 && browse.equals("Default")){
            updateQuery += " t.movieTitle like '%"+search+"%' ";
        } else {
            updateQuery = query;
        }

        switch(sort) {
            case "Rating Up":
                updateQuery += " order by rating DESC ";
                break;
            case "Rating Down":
                updateQuery += " order by rating ";
                break;
            case "Title Up":
                updateQuery += " order by movieTitle DESC ";
                break;
            case "Title Down":
                updateQuery += " order by movieTitle ";
                break;
            default:
                break;
        }

        System.out.println();
        System.out.println("update Query: "+updateQuery);

        PrintWriter out = response.getWriter();
        // Declare our statement
        try {
            Connection connection = DBconnection.getDBconnection();
            // Declare our statement
            PreparedStatement statement = connection.prepareStatement(updateQuery);

            // Set the parameter represented by "?" in the query to the id we get from url,
            // num 1 indicates the first "?" in the query
            // Perform the query
            ResultSet rs = statement.executeQuery();

            JsonArray jsonArray = new JsonArray();

            // Iterate through each row of rs
            while (rs.next()) {
                String movie_id = rs.getString("movieId");
                String movie_title = rs.getString("movieTitle");
                String movie_year = rs.getString("movieYear");
                String movie_director = rs.getString("movieDirector");

                String star_id = rs.getString("starId");
                String star_name = rs.getString("starName");

                String movie_genres = rs.getString("genres");
                String movie_rating = rs.getString("rating");

                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("movie_id", movie_id);
                jsonObject.addProperty("movie_title", movie_title);
                jsonObject.addProperty("movie_year", movie_year);
                jsonObject.addProperty("movie_director", movie_director);

                jsonObject.addProperty("star_id", star_id);
                jsonObject.addProperty("star_name", star_name);
                jsonObject.addProperty("movie_genres", movie_genres);
                jsonObject.addProperty("movie_rating", movie_rating);

                jsonArray.add(jsonObject);
            }

            // write JSON string to output
            out.write(jsonArray.toString());
            // set response status to 200 (OK)
            response.setStatus(200);
            statement.close();
        } catch (Exception e) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());
            response.setStatus(500);
        } finally {
            out.close();
        }
    }

    /**
     * handles GET requests to add and show the item list information
     */
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        final String item = request.getParameter("item");
        System.out.println(item);
        final HttpSession session = request.getSession();

        // get the previous items in a ArrayList
        ArrayList<String> previousItems = (ArrayList<String>) session.getAttribute("previousItems");
        if (previousItems == null) {
            previousItems = new ArrayList<>();
            previousItems.add(item);
            session.setAttribute("previousItems", previousItems);
        } else {
            // prevent corrupted states through sharing under multi-threads
            // will only be executed by one thread at a time
            synchronized (previousItems) {
                previousItems.add(item);
            }
        }

        response.getWriter().write(String.join(",", previousItems));
    }
}