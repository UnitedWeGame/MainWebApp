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
	
	public List<GameRating> getFriendsRatings(User user) {
		return gameRatingRepo.findByUserIn(user.getFriends());
	}
	
	public List<GameRating> getUserGameRatings(User user) {
		return gameRatingRepo.findByUser(user);
	}
	
	public GameRating getUserGameRatingByGame(User user, Game game) {
		return gameRatingRepo.findByUserAndGame(user, game);
	}
	
	public List<GameRating> getFriendRatingsByGame(User user, Game game) {
		return gameRatingRepo.findByUserInAndGame(user.getFriends(), game);
	}
	
	public List<GameRating> getGameRatings(Game game) {
		return gameRatingRepo.findByGame(game);
	}
	
	public GameRating saveGameRating(GameRating gameRating) {
		gameRatingRepo.save(gameRating);
		return gameRating;
	}
	
	public GameRating findByUserAndGame(User user, Game game) {
		return gameRatingRepo.findByUserAndGame(user, game);
	}
}
