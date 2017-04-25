package com.UnitedWeGame.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.NewUsers;
import com.UnitedWeGame.repos.NewUsersRepository;

@Service
public class NewUsersService {
	@Autowired
	NewUsersRepository newUsersRepo;
	
	public void saveNewUser(NewUsers newUser) {
		newUsersRepo.save(newUser);
	}
}
