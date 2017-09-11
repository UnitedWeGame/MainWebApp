package com.UnitedWeGame.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonSerialize(using = GameRatingSerializer.class)
public class GameRating {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@JsonIgnore
	@ManyToOne
	private Game game;
	@JsonIgnore
	@ManyToOne
	private User user;
	private float rating;

	public Long getId() {
		return id;
	}

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
