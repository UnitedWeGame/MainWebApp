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
import com.UnitedWeGame.repos.GameRatingRepository;
import com.UnitedWeGame.services.GameRatingService;
import com.UnitedWeGame.services.GameService;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api/gameRating")
public class GameRatingAPIController {

	@Autowired
	GameService gameService;

	@Autowired
	GameRatingService gameRatingService;

	@Autowired
	GameRatingRepository gameRepo;

	@Autowired
	UserService userService;

	@RequestMapping(value = "/{gameId}", method = RequestMethod.POST)
	public GameRating createGameRating(@PathVariable long gameId, @RequestBody GameRating gameRating) {
		Game game = gameService.findById(gameId);
		gameRatingService.saveGameRating(gameRating);
		List<GameRating> gameRatings = game.getRatings();
		gameRatings.add(gameRating);
		List<GameRating> userRatings = userService.getLoggedInUser().getGameRatings();
		userRatings.add(gameRating);
		gameService.saveGame(game);
		userService.saveUser(userService.getLoggedInUser());
		return gameRating;
	}

	@RequestMapping("/all")
	public List<GameRating> test() {
		return (List<GameRating>) gameRepo.findAll();
	}
}
