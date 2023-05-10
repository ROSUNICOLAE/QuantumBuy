import com.QuantumBuy.QuantumBuy.Models.User;
import com.QuantumBuy.QuantumBuy.Models.UserRole;
import com.QuantumBuy.QuantumBuy.repositories.RoleRepository;
import com.QuantumBuy.QuantumBuy.services.UserService;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/users/all")
    public List<User> getAllUsers() {
        return userService.getUsers();
    }

    @PostMapping("/users/signin")
    public ResponseEntity<User> signIn(@RequestBody User user) {
        // Find the user by email
        Optional<User> optionalUser = userService.findByUsername(user.getEmail());

        if (optionalUser.isPresent()) {
            // User exists, return the user
            return ResponseEntity.ok(optionalUser.get());
        } else {
            // User does not exist, create a new user and return the user
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            UserRole userRole = roleRepository.findByName(user.getRole().getName()).orElse(null);
            if (userRole == null) {
                // If the role doesn't exist, return an error
                return ResponseEntity.badRequest().build();
            }
            user.setRole(userRole);
            User savedUser = userService.addUser(user);
            return ResponseEntity.ok(savedUser);
        }
    }

    @PostMapping("/oauth2/google")
    public ResponseEntity<String> handleGoogleOAuth2Callback(HttpServletRequest request, @RequestParam("code") String authorizationCode) throws IOException {
        // Exchange the authorization code for an access token and refresh token
        String redirectUri = "http://localhost:3000/api/oauth2/google";
        String clientId = "93882205022-tvclhr0t1e1ricnatjub6adtn28ad8u5.apps.googleusercontent.com";
        String clientSecret = "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";
        String tokenUrl = "https://oauth2.googleapis.com/token";

        HttpPost httpPost = new HttpPost(tokenUrl);
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("code", authorizationCode));
        params.add(new BasicNameValuePair("client_id", clientId));
        params.add(new BasicNameValuePair("client_secret", clientSecret));
        params.add(new BasicNameValuePair("redirect_uri", redirectUri));
        params.add(new BasicNameValuePair("grant_type", "authorization_code"));

        httpPost.setEntity(new UrlEncodedFormEntity(params));
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = httpClient.execute(httpPost);

        if (response.getStatusLine().getStatusCode() == 200) {
            HttpEntity entity = response.getEntity();
            String body = EntityUtils.toString(entity);
            JSONObject jsonObject = new JSONObject(body);
            String accessToken = jsonObject.getString("access_token");
            String refreshToken = jsonObject.getString("refresh_token");

            // Use the access token to retrieve user information and authenticate the user
            // ...

            // Redirect the user to the specified URL after successful authentication
            return ResponseEntity.status(HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, "http://localhost:3000")
                    .build();
        } else {
            return ResponseEntity.status(response.getStatusLine().getStatusCode()).build();
        }
    }

    @GetMapping("/users/roles/{name}")
    public ResponseEntity<UserRole> findRoleByName(@PathVariable String name) {
        Optional<UserRole> optionalRole = roleRepository.findByName(name);
        if (optionalRole.isPresent()) {
            return ResponseEntity.ok(optionalRole.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
