package com.UnitedWeGame.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.GamerIdentifier;
import com.UnitedWeGame.repos.GamerIdentifierRepository;

@Service
public class GamerIdentifierService {

	@Autowired
	GamerIdentifierRepository gamerIdRepo;
	
	public void removeGamerIdentifier(long id) {
		gamerIdRepo.delete(id);
	}
	
	public void save(GamerIdentifier gamerId) {
		gamerIdRepo.save(gamerId);
	}
	
	public List<GamerIdentifier> allGamerIdentifiers() {
		return (List<GamerIdentifier>) gamerIdRepo.findAll();
	}
}
