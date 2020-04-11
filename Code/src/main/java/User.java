public class User {

    private final String username;

    private Cart cart;
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    private final String email;
    private final String password;
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        cart = new Cart();
    }

    public String getUsername() { return this.username; }


    public Cart getCart() { return cart; }
}