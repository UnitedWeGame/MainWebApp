package com.UnitedWeGame.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.Profile;
import com.UnitedWeGame.models.Role;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.repos.ProfileRepository;
import com.UnitedWeGame.repos.RoleRepository;
import com.UnitedWeGame.repos.UserRepository;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	UserRepository userRepo;
	@Autowired
	RoleRepository roleRepo;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	ProfileRepository profileRepo;
	
	public List<User> allUsers() {
		return (List<User>) userRepo.findAll();
	}
	
	public User getLoggedInUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) loadUserByUsername(auth.getName());
		return userDetails.getUser();
	}
	
	public void saveUser(User user) {
		// This is VERY temporary, only doing this because I'm currently using H2 in memory database
		Role role = new Role("USER");
		roleRepo.save(role);
		
		Set<Role> roles = user.getRoles();
		roles.add(role);
		// Assign every user with a default blank profile
		Profile profile = new Profile();
		profileRepo.save(profile);
		user.setProfile(profile);
		user.setRoles(roles);
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepo.save(user);
	}

	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUsername(username);
		
		if (user == null) {
			throw new UsernameNotFoundException(username);
		}
		
		return new UserDetailsImpl(user);
	}
}
