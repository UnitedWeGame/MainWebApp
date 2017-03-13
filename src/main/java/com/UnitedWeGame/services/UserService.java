package com.UnitedWeGame.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.Role;
import com.UnitedWeGame.models.User;
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
	
	public List<User> allUsers() {
		return (List<User>) userRepo.findAll();
	}
	
	public void saveUser(User user) {
		// This is VERY temporary, only doing this because I'm currently using H2 in memory database
		Role role = new Role("USER");
		roleRepo.save(role);
		
		Set<Role> roles = user.getRoles();
		roles.add(role);
		user.setRoles(roles);
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepo.save(user);
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
