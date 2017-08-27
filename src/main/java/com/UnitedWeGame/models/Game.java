package com.UnitedWeGame.models;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Game {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String title;
	private String imageUrl;
	@ManyToOne
	private Platform platform;
	@Column(columnDefinition="TEXT")
	private String summary;
	@Column
	@Type(type="date")
	private Date firstReleaseDate;
	@Column(nullable=true)
	private Float totalRating;
	@Column(nullable=true)
	private Integer totalRatingCount;
	@OneToMany(mappedBy="game", fetch = FetchType.EAGER)
	private Set<Screenshot> screenshots;
	
	@JsonBackReference
	@ManyToMany(mappedBy = "games")
	private Set<User> users;
	
	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Platform getPlatform() {
		return platform;
	}

	public void setPlatform(Platform platform) {
		this.platform = platform;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String pictureUrl) {
		this.imageUrl = pictureUrl;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public Date getFirstReleaseDate() {
		return firstReleaseDate;
	}

	public void setFirstReleaseDate(Date firstReleaseDate) {
		this.firstReleaseDate = firstReleaseDate;
	}

	public Float getTotalRating() {
		return totalRating;
	}

	public void setTotalRating(Float totalRating) {
		this.totalRating = totalRating;
	}

	public Integer getTotalRatingCount() {
		return totalRatingCount;
	}

	public void setTotalRatingCount(Integer totalRatingCount) {
		this.totalRatingCount = totalRatingCount;
	}

	public Set<Screenshot> getScreenshots() {
		return screenshots;
	}

	public void setScreenshots(Set<Screenshot> screenshots) {
		this.screenshots = screenshots;
	}
}
