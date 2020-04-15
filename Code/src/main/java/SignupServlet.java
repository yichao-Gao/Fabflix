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


@WebServlet(name = "SignupServlet", urlPatterns = {"/api/signup"})
public class SignupServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private DataSource dataSource;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {



        PrintWriter out = response.getWriter();
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        try  {

            String query = "INSERT INTO users VALUES(null,'"+username+"','"+email+"','"+password+"');";
            System.out.println(query);
            Connection connection = DBconnection.getDBconnection();
            // Declare our statement
            PreparedStatement statement = connection.prepareStatement(query);


            // Perform the query
            statement.executeUpdate();
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
