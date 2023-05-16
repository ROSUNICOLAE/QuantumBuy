package com.QuantumBuy.QuantumBuy.security;

import com.QuantumBuy.QuantumBuy.services.CustomOAuth2User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // load user details from the OAuth2 provider
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // create a custom OAuth2 user object
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(oAuth2User.getAuthorities(),
                oAuth2User.getAttributes(), "name");

        // load user details from the database using the email address
        UserDetails userDetails = userDetailsService.loadUserByUsername(customOAuth2User.getEmail());

        // authenticate the user
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, "",
                userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return customOAuth2User;
    }
}

