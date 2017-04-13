package com.UnitedWeGame.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Platform {
	@Id
	private String title;
	
	@ManyToMany(mappedBy = "platforms")
	private Set<Game> games;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
