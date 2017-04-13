package com.UnitedWeGame.controllers.api;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.Game;
import com.UnitedWeGame.models.Platform;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.GameService;
import com.UnitedWeGame.services.PlatformService;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api/games")
public class GamesApiController {
	
	@Autowired
	GameService gameService;	
	@Autowired
	UserService userService;
	@Autowired
	PlatformService platformService;
	
	@RequestMapping("/")
	public List<Game> index() {
		return gameService.allGames();
	}
	
	@RequestMapping("/addToLibrary/{gameId}")
	public void addGameToUser(@PathVariable Long gameId) {
		User user = userService.getLoggedInUser();
		Game game = gameService.findById(gameId);
		
		Set<Game> games = user.getGames();
		System.out.println(game);
		games.add(game);
		user.setGames(games);
		userService.saveUser(user);
	}
	
	@RequestMapping(value="/{platform}", method=RequestMethod.POST)
	public Game createGame(@PathVariable String platform, @RequestBody Game game) {
		Platform platformForGame = platformService.findPlatform(platform);
		Set<Platform> platforms = new HashSet<Platform>();
		platforms.add(platformForGame);
		game.setPlatforms(platforms);
		gameService.saveGame(game);
		return game;
	}
	
	@RequestMapping("/addPlatform/{gameId}/{platformTitle}")
	public Game addPlatformToGame(@PathVariable Long gameId, @PathVariable String platformTitle) {
		Game game = gameService.findById(gameId);
		Platform platform = platformService.findPlatform(platformTitle);
		Set<Platform> gamePlatforms = game.getPlatforms();
		gamePlatforms.add(platform);
		gameService.saveGame(game);
		return game;
	}
}
