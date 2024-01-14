package com.bezkoder.springjwt.controllers;

import java.util.*;
import java.util.stream.Collectors;


import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.security.services.UserDetailsServiceImpl;
import jakarta.annotation.security.PermitAll;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.bezkoder.springjwt.payload.request.LoginRequest;
import com.bezkoder.springjwt.payload.request.SignupRequest;
import com.bezkoder.springjwt.payload.response.JwtResponse;
import com.bezkoder.springjwt.payload.response.MessageResponse;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import com.bezkoder.springjwt.security.jwt.JwtUtils;
import com.bezkoder.springjwt.security.services.UserDetailsImpl;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  private RestTemplate restTemplate;
  @Autowired
  private UserDetailsServiceImpl userDetailsServiceImpl;


  @PermitAll()
  @GetMapping("/{cin}")
  public User findByCin(@PathVariable String cin) {
    return userRepository.findByCin(cin);
  }
  @PermitAll()
  @GetMapping("/{cin}/terrains")
  public List<Terrain> findTerrainsByCIN(@PathVariable String cin) {
    return userDetailsServiceImpl.findTerrainsByCIN(cin);
  }
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getUsername(),
                         userDetails.getEmail(), 
                         roles,
            userDetails.getCin()
    ));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(
            signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            encoder.encode(signUpRequest.getPassword()),
            signUpRequest.getCin(),
            signUpRequest.getNom(),
            signUpRequest.getPrenom(),
            signUpRequest.getAdresse()
    );


    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
        case "mod":
          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);

          break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
  @PermitAll()
  @GetMapping("/findHistoriqueByCIN/{cin}")
  public List<TaxeTNB> findHistoriqueByCIN(@PathVariable String cin) {
    return userDetailsServiceImpl.findHistoriqueByCIN(cin);
  }
  @GetMapping("/users")
  @PreAuthorize("permitAll()")
  public ResponseEntity<List<User>> findAllUsers() {
    List<User> users = userRepository.findAll();
    return ResponseEntity.ok(users);
  }
  @GetMapping("/findByUsername/{username}")
  public Optional<User> findByUsername(@PathVariable String username) {
    return userRepository.findByUsername(username);
  }
  @GetMapping("/findById/{id}")
  public Optional<User> findById(@PathVariable Long id) {
    return userRepository.findById(id);
  }
  @PutMapping("/update/{id}")
  //@PreAuthorize("hasRole('ADMIN')") // Add appropriate authorization based on your requirements
  public ResponseEntity<?> updateUser(@PathVariable Long id,  @RequestBody SignupRequest updateUserRequest) {
    Optional<User> userData = userRepository.findById(id);
    System.out.println("i am here !!!!!!!!!!!");

    if (userData.isPresent()) {
      User user = userData.get();
      user.setUsername(updateUserRequest.getUsername());
      user.setEmail(updateUserRequest.getEmail());
      user.setPassword(encoder.encode(updateUserRequest.getPassword())); // Consider validating password updates

      // Update roles if needed
      Set<String> strRoles = updateUserRequest.getRole();
      Set<Role> roles = new HashSet<>();

      if (strRoles != null) {
        strRoles.forEach(role -> {
          switch (role) {
            case "admin":
              Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                      .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
              roles.add(adminRole);
              break;
            case "mod":
              Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                      .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
              roles.add(modRole);
              break;
            default:
              Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                      .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
              roles.add(userRole);
          }
        });
        user.setRoles(roles);
      }

      userRepository.save(user);
      return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
    } else {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: User not found!"));
    }
  }
}
