import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.annotation.Resource;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


@WebServlet(name = "MovieServlet", urlPatterns = {"/api/movie"})
public class MovieServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private DataSource dataSource;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("application/json");

        // Retrieve parameter id from url request.
        // Output stream to STDOUT
        PrintWriter out = response.getWriter();
        try  {

            String query = "SELECT m.id as movieId, m.title as movieTitle, m.year as movieYear, m.director as movieDirector, " +
                    "g.name as genres, s.id as starId, s.name as starName, r.rating as rating " +
                    "from stars as s, stars_in_movies as sim, movies as m, " +
                    "genres as g, genres_in_movies as gim, " +
                    "(select * from ratings order by rating DESC) as r " +
                    "where m.id = sim.movieId " +
                    "and sim.starId = s.id " +
                    "and m.id = gim.movieId " +
                    "and gim.genreId = g.id " +
                    "and r.movieId = m.id limit 10000";

            Connection connection = DBconnection.getDBconnection();
            // Declare our statement
            PreparedStatement statement = connection.prepareStatement(query);

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
            out.close();
            statement.close();
        } catch (Exception e) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            out.write(jsonObject.toString());
            response.setStatus(500);
        }
    }
}
