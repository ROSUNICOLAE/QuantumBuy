package com.QuantumBuy.QuantumBuy.controllers.Request;

import com.QuantumBuy.QuantumBuy.controllers.Request.SignupRequest;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.QuantumBuy.QuantumBuy.Models.ERole;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
@JsonDeserialize(using = SignupRequestDeserializer.class)
public class SignupRequestDeserializer extends JsonDeserializer<SignupRequest> {

    @Override
    public SignupRequest deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        SignupRequest signupRequest = new SignupRequest();
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
        signupRequest.setUsername(node.get("username").asText());
        signupRequest.setEmail(node.get("email").asText());
        signupRequest.setPassword(node.get("password").asText());

        Set<String> roles = new HashSet<>();
        JsonNode roleNode = node.get("role");
        if (roleNode.isArray()) {
            for (JsonNode role : roleNode) {
                String roleValue = role.asText();
                if (ERole.ROLE_ADMIN.toString().equalsIgnoreCase(roleValue)) {
                    roles.add(ERole.ROLE_ADMIN.toString());
                } else if (ERole.BUYER.toString().equalsIgnoreCase(roleValue)) {
                    roles.add(ERole.BUYER.toString());
                } else if (ERole.SELLER.toString().equalsIgnoreCase(roleValue)) {
                    roles.add(ERole.SELLER.toString());
                }
            }
        } else if (roleNode.isTextual()) {
            String roleValue = roleNode.asText();
            if (ERole.ROLE_ADMIN.toString().equalsIgnoreCase(roleValue)) {
                roles.add(ERole.ROLE_ADMIN.toString());
            } else if (ERole.BUYER.toString().equalsIgnoreCase(roleValue)) {
                roles.add(ERole.BUYER.toString());
            } else if (ERole.SELLER.toString().equalsIgnoreCase(roleValue)) {
                roles.add(ERole.SELLER.toString());
            }
        }
        signupRequest.setRole(roles);

        return signupRequest;
    }
}
