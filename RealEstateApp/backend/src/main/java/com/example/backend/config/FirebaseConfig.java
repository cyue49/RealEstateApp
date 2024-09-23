package com.example.backend.config;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseInitialize() throws IOException {
        
            FileInputStream serviceAccount =
                new FileInputStream("src/main/resources/config/serviceAccountKey.json");

            @SuppressWarnings("deprecation")
            FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

            // Initialize Firebase App with a custom name
            FirebaseApp app = FirebaseApp.initializeApp(options);

            // Print the Firebase App details
            System.out.println("FirebaseApp options: " + app.getOptions());
            
            return app;
        
    }

}
