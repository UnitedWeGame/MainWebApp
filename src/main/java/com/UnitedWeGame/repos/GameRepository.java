package com.UnitedWeGame.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.UnitedWeGame.models.Game;

public interface GameRepository extends CrudRepository<Game, Long> {
	public Game findByTitle(String title);
	public List<Game> findByTitleContaining(String title);
}
