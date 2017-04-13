package com.UnitedWeGame.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.Game;
import com.UnitedWeGame.repos.GameRepository;

@Service
public class GameService {
	
	@Autowired
	GameRepository gameRepo;
	
	public List<Game> allGames() {
		return (List<Game>) gameRepo.findAll();
	}
	
	public void saveGame(Game game) {
		gameRepo.save(game);
	}
	
	public Game findById(Long id) {
		return gameRepo.findOne(id);
	}
	
	public Game findByTitle(String title) {
		return gameRepo.findByTitle(title);
	}
}
