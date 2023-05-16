package com.QuantumBuy.QuantumBuy.controllers.Request;

import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfiguration {

    @Bean
    public SimpleModule signupRequestDeserializerModule() {
        SimpleModule module = new SimpleModule();
        module.addDeserializer(SignupRequest.class, new SignupRequestDeserializer());
        return module;
    }
}
