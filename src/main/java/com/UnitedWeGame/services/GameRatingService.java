package com.UnitedWeGame.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.Game;
import com.UnitedWeGame.models.GameRating;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.repos.GameRatingRepository;

@Service
public class GameRatingService {
	
	@Autowired
	GameRatingRepository gameRatingRepo;
	
	@Autowired
	UserService userService;
	
	/*public List<GameRating> getFriendsRatings() {
		User user = userService.getLoggedInUser();
		return gameRatingRepo.findByUserIn(user.getFriends());
	}*/
	
	public List<GameRating> getGameRatings(Game game) {
		return gameRatingRepo.findByGame(game);
	}
	
	public GameRating saveGameRating(GameRating gameRating) {
		gameRatingRepo.save(gameRating);
		return gameRating;
	}
}
