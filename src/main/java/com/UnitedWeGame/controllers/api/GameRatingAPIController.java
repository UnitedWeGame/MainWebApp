package com.UnitedWeGame.controllers.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.Game;
import com.UnitedWeGame.models.GameRating;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.repos.GameRatingRepository;
import com.UnitedWeGame.services.GameRatingService;
import com.UnitedWeGame.services.GameService;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api/gameRatings")
public class GameRatingAPIController {

	@Autowired
	GameService gameService;

	@Autowired
	GameRatingService gameRatingService;

	@Autowired
	GameRatingRepository gameRepo;

	@Autowired
	UserService userService;
	
	//Check for other end points relating to GameRatings in the GamesAPIController
	
	@RequestMapping("/friends")
	public List<GameRating> fetchAllFriendsRatings() {
		return gameRatingService.getFriendsRatings(userService.getLoggedInUser());
	}
	
	@RequestMapping("/me")
	public List<GameRating> fetchLoggedInUserRatings() {
		return gameRatingService.getUserGameRatings(userService.getLoggedInUser());
	}
	
	@RequestMapping("/all")
	public List<GameRating> thisIsOnlyUsedForTestingPurposes() {
		return (List<GameRating>) gameRepo.findAll();
	}
}
