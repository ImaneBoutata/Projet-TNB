package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.TaxeTNB;
import com.bezkoder.springjwt.models.Terrain;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.UserRepository;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  UserRepository userRepository;
  @Autowired
  private RestTemplate restTemplate;
  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

    return UserDetailsImpl.build(user);
  }

  public List<TaxeTNB> findHistoriqueByCIN(String cin) {

    User redevable = userRepository.findByCin(cin);
    System.out.println("cin  "+ redevable);
           // .orElseThrow(() -> new EntityNotFoundException("Redevable with CIN " + cin + " not found."));

    ParameterizedTypeReference<List<TaxeTNB>> responseType = new ParameterizedTypeReference<List<TaxeTNB>>() {};
    List<TaxeTNB> taxesList = new ArrayList<>();
    for(Terrain t: redevable.getTerrains()){
      String apiUrl="http://Taxe-SERVICE/taxe-tnb/"+t.getTerrainID()+"/history";
      ResponseEntity<List<TaxeTNB>> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.GET, null, responseType);
      taxesList.addAll(responseEntity.getBody());
    }
    return taxesList;
  }

}
