
insert into platform values ('PS3');
insert into platform values ('PS4');
insert into platform values ('Xbox 360');
insert into platform values('Xbox One');
insert into platform values ('Steam');
insert into game (id, image_url, title, platform_title) values (11123, 'http://images.igdb.com/igdb/image/upload/t_cover_big/kln2xrk7av3dzrt60auq.png', 'Mass Effect: Andromeda', 'Xbox 360');
insert into game (id, image_url, title, platform_title) values (111234, 'http://images.igdb.com/igdb/image/upload/t_cover_big/m1qtsn4ehaen83bbp1ee.png', 'Forza Motorsport 3', 'Xbox 360');
insert into game (id, image_url, title, platform_title) values (11125, 'http://images.igdb.com/igdb/image/upload/t_cover_big/gy5jzbxk068kduoki6wx.png', 'Fallout 4: Nuka World', 'PS3');
insert into game (id, image_url, title, platform_title) values (111236, 'http://images.igdb.com/igdb/image/upload/t_cover_big/fhbeilnghyhhmjqhinqa.png', 'Titanfall 2', 'PS3');
insert into game (id, image_url, title, platform_title) values (19459, 'http://images.igdb.com/igdb/image/upload/t_cover_big/cmtplicvdajycqx2vz6t.png', 'FIFA 17', 'PS4');
insert into game (id, image_url, title, platform_title) values (11071, 'http://images.igdb.com/igdb/image/upload/t_cover_big/z6ukyh2er3ntgeax0yew.png', 'FIFA 16', 'Xbox 360');
insert into game (id, image_url, title, platform_title) values (9254, 'http://images.igdb.com/igdb/image/upload/t_cover_big/uppylnya8h7k7jblynnj.png', 'Subnautica', 'Steam');
insert into game (id, image_url, title, platform_title) values (10233, 'http://images.igdb.com/igdb/image/upload/t_cover_big/nis45tdtxwveq3lde7wz.png', 'Brawlhalla', 'Steam');




insert into profile values (3333, 'Hello, Im Logan')
insert into users (id, email, password, phone_num, username, profile_id, last_activity, image_url) values (2222, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8016789986', 'logangster', 3333, now(), 'https://images.igdb.com/igdb/image/upload/t_micro/mjustxpafje74fzjbeuy.jpg')
insert into user_library values (2222, 11123)
insert into user_library values (2222, 111234)
insert into gamer_identifier (identifier, platform, user_id) values ('logangster', 'Xbox Live', 2222)

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

insert into game (image_url, title, platform_title) values ('test.com', 'MLP', 'Xbox 360');
insert into online_feed (gamer_tag, last_activity, game_id, user_id) values ('weeterMachine', now(), 11123, 2222)

