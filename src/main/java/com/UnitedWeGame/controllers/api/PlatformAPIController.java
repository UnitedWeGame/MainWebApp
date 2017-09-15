package com.UnitedWeGame.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.Platform;
import com.UnitedWeGame.services.PlatformService;

@RestController
@RequestMapping("/api/platform")
public class PlatformAPIController {

	@Autowired
	PlatformService platformService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public Platform createPlatform(@RequestBody Platform platform) {
		platformService.savePlatform(platform);
		return platform;
	}
}
