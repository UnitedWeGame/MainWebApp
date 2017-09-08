insert into platform values ('PS3');
insert into platform values ('PS4');
insert into platform values ('Xbox360');
insert into platform values('XboxOne');
insert into platform values ('Steam');
insert into game (id, image_url, title, platform_title, summary, first_release_date) values (11123, 'http://images.igdb.com/igdb/image/upload/t_cover_big/kln2xrk7av3dzrt60auq.png', 'Mass Effect: Andromeda', 'Xbox360', 'Mass Effect: Andromeda takes you to the Andromeda galaxy, far beyond the Milky Way. There, youll lead our fight for a new home in hostile territory - where WE are the aliens.', '2017-Mar-21');
insert into screenshot (id, url, game_id) values (999998, 'https://images.igdb.com/igdb/image/upload/t_screenshot_huge/og2vhbqftsdljfhornu1.jpg', 11123);
insert into screenshot (id, url, game_id) values (999999, 'https://images.igdb.com/igdb/image/upload/t_screenshot_huge/fq8e0gyyv4kupamkawyu.jpg', 11123);
insert into game (id, image_url, title, platform_title, summary, first_release_date) values (111234, 'http://images.igdb.com/igdb/image/upload/t_cover_big/m1qtsn4ehaen83bbp1ee.png', 'Forza Motorsport 3', 'Xbox360', 'Forza Motorsport 3 is a racing video game developed for Xbox360 by Turn 10 Studios. It was released in October 2009. It is the sequel to Forza Motorsport 2 and the third installment in the Forza Motorsport series. The game includes more than 400 customizable cars (More than 500 cars in the Ultimate Collection version) from 50 manufacturers and more than 100 race track variations with the ability to race up to eight cars on track at a time. These cars vary from production cars to race cars such as those from the American Le Mans Series.', '2009-Oct-22');
insert into game (id, image_url, title, platform_title, summary, first_release_date) values (11125, 'http://images.igdb.com/igdb/image/upload/t_cover_big/gy5jzbxk068kduoki6wx.png', 'Fallout 4: Nuka World', 'PS3', 'Take a trip to Nuka-World, a vast amusement park now a lawless city of Raiders. Explore an all-new region with an open wasteland and park zones like Safari Adventure, Dry Rock Gulch, Kiddie Kingdom, and the Galactic Zone. Lead lethal gangs of Raiders and use them to conquer settlements, bending the Commonwealth to your will. Nuka-World features new quests, Raiders, weapons, creatures, and more. Enjoy the ride!', '2016-Aug-30');
insert into game (id, image_url, title, platform_title, summary, first_release_date) values (111236, 'http://images.igdb.com/igdb/image/upload/t_cover_big/fhbeilnghyhhmjqhinqa.png', 'Titanfall 2', 'PS3', 'Titanfall 2 will deliver a crafted experience that explores the unique bond between man and machine. Playable offline, the single player campaign in Titanfall 2 will let fans step out onto the Frontier as a Militia rifleman with aspirations of becoming an elite Pilot. Stranded behind enemy lines and facing overwhelming odds, players must team up with a veteran Titan to uphold a mission they were never meant to carry out.', '2016-Oct-28');
insert into game (id, image_url, title, platform_title, summary, first_release_date) values (19459, 'http://images.igdb.com/igdb/image/upload/t_cover_big/cmtplicvdajycqx2vz6t.png', 'FIFA 17', 'PS4', 'For the first time ever in FIFA, live your story on and off the pitch as the Premier League’s next rising star, Alex Hunter. Play on any club in the Premier league, for authentic managers and alongside some of the best players on the planet. Experience brand new worlds in FIFA 17, all while navigating your way through the emotional highs and lows of The Journey.', '2016-Sep-27');
insert into game (id, image_url, title, platform_title, summary, first_release_date) values (11071, 'http://images.igdb.com/igdb/image/upload/t_cover_big/z6ukyh2er3ntgeax0yew.png', 'FIFA 16', 'Xbox360', 'FIFA 16 innovates across the entire pitch to deliver a balanced, authentic, and exciting football experience that lets you play your way, and compete at a higher level. Youll have Confidence in Defending, take Control in Midfield, and youll produce more Moments of Magic than ever before. FIFA 16 - Play Beautiful.', '2015-Sep-22');
insert into game (id, image_url, title, platform_title, summary, first_release_date) values (9254, 'http://images.igdb.com/igdb/image/upload/t_cover_big/uppylnya8h7k7jblynnj.png', 'Subnautica', 'Steam', 'Subnautica is an open world, underwater exploration and adventure game currently under construction at Unknown Worlds, the independent developer behind Natural Selection 2.', '2014-Dec-16');
insert into game (id, image_url, title, platform_title, summary, first_release_date) values (10233, 'http://images.igdb.com/igdb/image/upload/t_cover_big/nis45tdtxwveq3lde7wz.png', 'Brawlhalla', 'Steam', 'A 2D platform fighter where the best of the baddest-ass warriors in history battle each other in an eternal tourney of champions for bragging rights, infinite mead, and the pure pleasure of delivering a beatdown.', '2014-Apr-30');



insert into game (id, image_url, title, platform_title, summary, first_release_date) values (999999, 'https://lh3.googleusercontent.com/YqlXGn_KbC5zxxEDr12vsYWjcMpZokEmGZ76opYh4VmRwa2FCP6fHYzFcad5-xj4C677=w300', 'Xbox Home', 'Xbox360', 'Home screen for Xbox360.', '2017-08-27');
insert into game (id, image_url, title, platform_title, summary, first_release_date) values (999998, 'https://lh3.googleusercontent.com/YqlXGn_KbC5zxxEDr12vsYWjcMpZokEmGZ76opYh4VmRwa2FCP6fHYzFcad5-xj4C677=w300', 'Xbox Home', 'XboxOne', 'Home screen for XboxOne.', '2017-08-27');



insert into profile values (3333, 'Hello, Im Logan')
insert into users (id, email, password, phone_num, username, profile_id, last_activity, image_url) values (2222, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8016789986', 'logangster', 3333, now(), 'https://images.igdb.com/igdb/image/upload/t_micro/mjustxpafje74fzjbeuy.jpg')
insert into user_library values (2222, 11123)
insert into user_library values (2222, 111234)
insert into gamer_identifier (identifier, platform, user_id) values ('Logangsta', 'Xbox Live', 2222)

insert into profile values (5555, 'Hello, Im Jackson')
insert into users (id, email, password, phone_num, username, profile_id, last_activity, image_url) values (4444, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8019138949', 'jacksonmeister', 5555, now(), 'https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg')
insert into user_library values (4444, 11123)
insert into user_library values (4444, 11125)
insert into user_library values (4444, 111236)
insert into user_library values (4444, 11071)
insert into user_library values (4444, 9254)
insert into user_library values (4444, 10233)




insert into profile values (7777, 'Hello, Im Chris')
insert into users (id, email, password, phone_num, username, profile_id, last_activity, image_url) values (6666, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8014139990', 'weetermachine', 7777, now(), 'http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png')
insert into user_library values (6666, 11123)
insert into user_library values (6666, 111234)
insert into gamer_identifier (identifier, platform, user_id) values ('weetermachine', 'Xbox Live', 6666)

insert into profile values (9999, 'Hello, Im Kelsey')
insert into users (id, email, password, phone_num, username, profile_id, last_activity, image_url) values (8888, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8015574857', 'kelpaso', 9999, now(), 'https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg')
insert into user_library values (8888, 11123)
insert into user_library values (8888, 11125)

insert into users_friends values (2222, 4444)
insert into users_friends values (2222, 6666)
insert into users_friends values (2222, 8888)

insert into users_friends values (4444, 2222)
insert into users_friends values (4444, 6666)
insert into users_friends values (4444, 8888)

insert into users_friends values (6666, 2222)
insert into users_friends values (6666, 4444)
insert into users_friends values (6666, 8888)

insert into users_friends values (8888, 2222)
insert into users_friends values (8888, 4444)
insert into users_friends values (8888, 6666)

insert into game (image_url, title, platform_title, summary, first_release_date) values ('test.com', 'MLP', 'Xbox360', 'MLP YAY', '2017-Aug-28');
insert into online_feed (gamer_tag, last_activity, game_id, user_id) values ('weeterMachine', now(), 11123, 2222)
insert into online_feed (gamer_tag, last_activity, game_id, user_id) values ('yourMom', now(), 11123, 2222)


