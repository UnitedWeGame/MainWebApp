package com.UnitedWeGame.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.Game;
import com.UnitedWeGame.models.GameRating;
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
	UserService userService;
	
	@RequestMapping(value="/{gameId}", method=RequestMethod.POST)
	public GameRating createGameRating(@PathVariable long gameId, @RequestBody GameRating gameRating) {
		Game game = gameService.findById(gameId);
		gameRating.setGame(game);
		//gameRating.setUser(userService.getLoggedInUser());
		return gameRatingService.saveGameRating(gameRating);
	}
}
