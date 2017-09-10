package com.UnitedWeGame.repos;

import java.util.List;
import java.util.Set;

import org.springframework.data.repository.CrudRepository;

import com.UnitedWeGame.models.Game;
import com.UnitedWeGame.models.GameRating;
import com.UnitedWeGame.models.User;

public interface GameRatingRepository extends CrudRepository<GameRating, Long> {
	public List<GameRating> findByUserIn(Set<User> users);
	public List<GameRating> findByUserInAndGame(Set<User> users, Game game);
	public List<GameRating> findByGame(Game game);
	public List<GameRating> findByUser(User user);
	public GameRating findByUserAndGame(User user, Game game);
}
