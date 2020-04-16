import com.google.gson.JsonObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * This class is declared as LoginServlet in web annotation, 
 * which is mapped to the URL pattern /api/login
 */
@WebServlet(name = "LoginServlet", urlPatterns = "/api/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        out.write("test");
    }
    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        /**
         * This example only allows username/password to be anteater/123456
         * In real world projects, you should talk to the database to verify username/password
         */

            String query = "select * from users where userName='"+username+"' and email='"+email+"' and password='"+password+"';";
            System.out.println(query);
            try {
                Connection connection = DBconnection.getDBconnection();
                // Declare our statement
                PreparedStatement statement = connection.prepareStatement(query);

                ResultSet rs = statement.executeQuery();


                if (rs.next()) {
                    String sessionId = ((HttpServletRequest) request).getSession().getId();
                    Long lastAccessTime = ((HttpServletRequest) request).getSession().getLastAccessedTime();
                    request.getSession().setAttribute("user", new User(username, email, password));
                    JsonObject responseJsonObject = new JsonObject();
                    responseJsonObject.addProperty("status", "success");
                    responseJsonObject.addProperty("message", "success");
                    response.getWriter().write(responseJsonObject.toString());
                    response.setStatus(200);
                }
                else {
                    response.setStatus(500);
                }
                statement.close();
                rs.close();
                response.getWriter().close();
            
        } catch (Exception e) {
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("errorMessage", e.getMessage());
            response.getWriter().write(jsonObject.toString());
            response.setStatus(500);
            response.getWriter().close();
        }
    }
}