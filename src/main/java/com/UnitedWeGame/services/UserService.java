package com.UnitedWeGame.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.User;
import com.UnitedWeGame.repos.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepo;
	
	public List<User> allUsers() {
		return (List<User>) userRepo.findAll();
	}
	public void saveUser(User user) {
		userRepo.save(user);
	}
}
