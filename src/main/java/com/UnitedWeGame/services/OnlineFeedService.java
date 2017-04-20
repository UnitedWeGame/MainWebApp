package com.UnitedWeGame.services;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.OnlineFeed;
import com.UnitedWeGame.repos.OnlineFeedRepository;

@Service
public class OnlineFeedService {
	@Autowired
	OnlineFeedRepository onlineFeedRepo;
	@Autowired
	SessionFactory sessionFactory;
}
