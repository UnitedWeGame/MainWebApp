package com.UnitedWeGame.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Platform {
	@Id
	private String title;
	
	@OneToMany
	private Set<Game> games;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
