package com.UnitedWeGame.controllers.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.ActivityPost;
import com.UnitedWeGame.models.Game;
import com.UnitedWeGame.models.GameRating;
import com.UnitedWeGame.models.Platform;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.ActivityPostService;
import com.UnitedWeGame.services.GameRatingService;
import com.UnitedWeGame.services.GameService;
import com.UnitedWeGame.services.PlatformService;
import com.UnitedWeGame.services.TwilioService;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api/games")
public class GamesAPIController {

	@Autowired
	GameService gameService;
	@Autowired
	UserService userService;
	@Autowired
	PlatformService platformService;
	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	TwilioService textService;
	@Autowired
	GameRatingService gameRatingService;
	@Autowired
	ActivityPostService activityService;

	@RequestMapping("")
	public List<Game> index() {
		return gameService.allGames();
	}

	@RequestMapping("/{gameId}")
	public Game fetchSingleGame(@PathVariable Long gameId) {
		Game game = gameService.findById(gameId);
		game.setUserRating(gameRatingService.findByUserAndGame(userService.getLoggedInUser(), game));
		game.setFriendsRatings(gameRatingService.getFriendRatingsByGame(userService.getLoggedInUser(), game));
		return game;
	}

	@RequestMapping(value = "/{gameId}/addRating", method = RequestMethod.POST)
	public GameRating createGameRating(@PathVariable long gameId, @RequestBody GameRating gameRating) {
		Game game = gameService.findById(gameId);
		User user = userService.getLoggedInUser();
		GameRating existingRating = gameRatingService.findByUserAndGame(userService.getLoggedInUser(), game);
		List<GameRating> gameRatings = game.getRatings();
		List<GameRating> userRatings = user.getGameRatings();

		// If they have already rated the game, don't add a new one, just change
		// previous score
		if (existingRating == null) {
			gameRating.setGame(game);
			gameRating.setUser(user);
			gameRatingService.saveGameRating(gameRating);
			gameRatings.add(gameRating);
			userRatings.add(gameRating);
			gameService.saveGame(game);
			userService.saveUser(user);
			ActivityPost activityPost = new ActivityPost();
			activityPost.setUser(user);
			activityPost.setContent(" reviewed " + game.getTitle() + " and gave it " + gameRating.getRating());
			activityService.createActivity(activityPost);
			return gameRating;
		} else {
			existingRating.setRating(gameRating.getRating());
			existingRating.setReviewTitle(gameRating.getReviewTitle());
			existingRating.setReview(gameRating.getReview());
			gameRatingService.saveGameRating(existingRating);
			return existingRating;
		}
	}

	@RequestMapping("/{gameId}/ratings")
	public List<GameRating> fetchRatingsForGame(@PathVariable long gameId) {
		Game game = gameService.findById(gameId);
		return game.getRatings();
	}

	@RequestMapping("/{gameId}/friendsRatings")
	public List<GameRating> fetchRatingsForGameByriends(@PathVariable long gameId) {
		Game game = gameService.findById(gameId);
		return gameRatingService.getFriendRatingsByGame(userService.getLoggedInUser(), game);
	}

	@RequestMapping("/{gameId}/{platformTitle}/addToLibrary")
	public String addGameToUser(@PathVariable Long gameId, @PathVariable String platformTitle) {
		User user = userService.getLoggedInUser();
		Platform platform = platformService.findPlatform(platformTitle);
		Game game = gameService.findByIdAndPlatform(gameId, platform);

		// We set hide games as we don't always want to display games on the user json to save on resources
		if (game != null) {
			Set<Game> games = user.getHiddenGames();
			if (!games.contains(game))
				games.add(game);
			user.setHiddenGames(games);
			userService.saveUser(user);
			ActivityPost activityPost = new ActivityPost();
			activityPost.setUser(user);
			activityPost.setContent(" added " + game.getTitle() + " to their library");
			activityService.createActivity(activityPost);
			return "Game has been added";
		}
		return "Game couldn't be found";
	}

	@RequestMapping("/{gameId}/{platformTitle}/removeFromLibrary")
	public String removeGameFromUser(@PathVariable Long gameId, @PathVariable String platformTitle) {
		User user = userService.getLoggedInUser();
		Platform platform = platformService.findPlatform(platformTitle);
		Game game = gameService.findByIdAndPlatform(gameId, platform);

		// Remove the game from the hidden games
		if (game != null) {
			Set<Game> games = user.getHiddenGames();
			games.remove(game);
			user.setHiddenGames(games);
			userService.saveUser(user);
			return "Game has been removed.";
		}
		return "Game couldn't be found";
	}

	@RequestMapping("/owned/{platform}")
	public List<Game> gamesOwnedByPlatform(@PathVariable String platform) {
		return userService.gamesOwnedByPlatform(platform);
	}

	@RequestMapping(value = "/{platform}", method = RequestMethod.POST)
	public Game createGame(@PathVariable String platform, @RequestBody Game game) {
		Platform platformForGame = platformService.findPlatform(platform);
		game.setPlatform(platformForGame);
		gameService.saveGame(game);
		return game;
	}

	@RequestMapping("/addPlatform/{gameId}/{platformTitle}")
	public Game addPlatformToGame(@PathVariable Long gameId, @PathVariable String platformTitle) {
		Game game = gameService.findById(gameId);
		Platform platform = platformService.findPlatform(platformTitle);
		game.setPlatform(platform);
		gameService.saveGame(game);
		return game;
	}

	@RequestMapping("/friendsOwn")
	public List<User> friendsOwnAll() {
		return userService.gamesOwnedByFriends();
	}

	@RequestMapping("/{gameId}/friendsOwn")
	public List<User> friendsOwn(@PathVariable Long gameId) {
		return userService.gameOwnedByFriends(gameId);
	}

	@RequestMapping("/search/{gameTitle}")
	public List<Game> gameTitleContains(@PathVariable String gameTitle) {
		return gameService.findByTitleContaining(gameTitle);
	}

	@RequestMapping("/{gameId}/groupNotification")
	public String friendsGroupNotification(@PathVariable Long gameId) {
		String username = userService.getLoggedInUser().getUsername();
		Game game = gameService.findById(gameId);
		List<User> users = userService.gameOwnedByFriends(gameId);
		// We use the twilio serviice with our own custom message to send out a notification
		String body = String.format("Hello, your friend %s would like to play %s", username, game.getTitle());
		body += ". Generated SMS sent from United We Game, please do not reply.";
		List<Long> userIds = new ArrayList<>();
		for (User user : users) {
			if (user.getPhoneNum() != null && !user.getPhoneNum().equals("") && user.getProfile().isSmsEnabled()
					&& !userIds.contains(user.getId())) {
				textService.sendSMS(user.getPhoneNum(), body);
				// Avoid sending multiple text messages
				userIds.add(user.getId());
			}
		}
		return "Text messages sent.";
	}

	@RequestMapping("/{gameId}/sendNotification/{userId}")
	public String friendsGroupNotification(@PathVariable Long gameId, @PathVariable Long userId) {
		String username = userService.getLoggedInUser().getUsername();
		Game game = gameService.findById(gameId);
		User user = userService.findById(userId);
		String body = String.format("Hello, your friend %s would like to play %s", username, game.getTitle());
		body += ". Generated SMS sent from United We Game, please do not reply.";
		if (!StringUtils.isEmpty(user.getPhoneNum()) && user.getProfile().isSmsEnabled()) {
			textService.sendSMS(user.getPhoneNum(), body);
		}
		return "Text messages sent.";
	}
}
