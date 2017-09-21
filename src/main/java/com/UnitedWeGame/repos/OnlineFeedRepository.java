package com.UnitedWeGame.repos;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

import com.UnitedWeGame.models.OnlineFeed;

@Transactional
public interface OnlineFeedRepository extends CrudRepository<OnlineFeed, Long> {

}
