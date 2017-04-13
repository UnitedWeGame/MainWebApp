package com.UnitedWeGame.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.Platform;
import com.UnitedWeGame.repos.PlatformRepository;

@Service
public class PlatformService {
	
	@Autowired
	PlatformRepository platformRepo;
	
	public List<Platform> allPlatforms() {
		return (List<Platform>) platformRepo.findAll();
	}
	
	public Platform savePlatform(Platform platform) {
		platformRepo.save(platform);
		return platform;
	}
	
	public Platform findPlatform(String title) {
		return platformRepo.findOne(title);
	}
}
