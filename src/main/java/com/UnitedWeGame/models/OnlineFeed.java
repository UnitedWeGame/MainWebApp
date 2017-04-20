package com.UnitedWeGame.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class OnlineFeed {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String gamerTag;
	@ManyToOne
	private Game game;
	private Date lastActivity;

}
