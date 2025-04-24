package com.devsuperior.dsdeliver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        	.cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable()) // Desabilita CSRF
            .headers(headers -> headers
                .frameOptions(frame -> frame.disable()) // Permite o uso de iframes (necessário pro H2)
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/h2-console/**").permitAll() // Libera acesso ao H2
                .anyRequest().permitAll() // Libera todos os outros endpoints
            );

        return http.build();
    }
}

