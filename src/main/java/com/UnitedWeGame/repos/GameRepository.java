package com.UnitedWeGame.repos;

import org.springframework.data.repository.CrudRepository;

import com.UnitedWeGame.models.Game;

public interface GameRepository extends CrudRepository<Game, Long> {
	public Game findByTitle(String title);
}
