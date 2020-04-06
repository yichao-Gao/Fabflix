import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.*;


public class DBconnection {
    private DBconnection(){}

    public static Connection getDBconnection() throws NamingException, SQLException, ClassNotFoundException, IllegalAccessException, InstantiationException {
        // 初始化查找命名空间
        Class.forName("com.mysql.jdbc.Driver").newInstance();
        Connection conn =
                DriverManager.getConnection("jdbc:mysql://localhost:3306/moviedb", Constants.user, Constants.password);
        return conn;
    }


//    public static void main(String args[]) throws SQLException, NamingException {
//        int topMovieNum = 20;
//        String query = "SELECT m.id, m.title, m.year, m.director as director, g.name as genres, s.name as stars, r.rating as popularity from stars as s, stars_in_movies as sim, movies as m, " +
//                "genres as g, genres_in_movies as gim, " +
//                "(select * from ratings order by rating DESC limit "+topMovieNum+") as r " +
//                "where m.id = sim.movieId " +
//                "and sim.starId = s.id " +
//                "and m.id = gim.movieId " +
//                "and gim.genreId = g.id " +
//                "and r.movieId = m.id ";
//        getDBconnection();
//    }
}
