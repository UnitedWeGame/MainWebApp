
insert into platform values ('PS3');
insert into platform values ('PS4');
insert into platform values ('Xbox 360');
insert into platform values('Xbox One');
insert into platform values ('Steam');
insert into game (id, image_url, title, platform_title) values (11123, 'http://images.igdb.com/igdb/image/upload/t_cover_big/kln2xrk7av3dzrt60auq.png', 'Mass Effect: Andromeda', 'Xbox 360');
insert into game (id, image_url, title, platform_title) values (111234, 'http://images.igdb.com/igdb/image/upload/t_cover_big/m1qtsn4ehaen83bbp1ee.png', 'Forza Motorsport 3', 'Xbox 360');
insert into game (id, image_url, title, platform_title) values (11125, 'http://images.igdb.com/igdb/image/upload/t_cover_big/gy5jzbxk068kduoki6wx.png', 'Fallout 4: Nuka World', 'PS3');
insert into game (id, image_url, title, platform_title) values (111236, 'http://images.igdb.com/igdb/image/upload/t_cover_big/fhbeilnghyhhmjqhinqa.png', 'Titanfall 2', 'PS3');

insert into profile values (3, 'Hello, Im Logan')
insert into users (id, email, password, phone_num, username, profile_id, last_activity, image_url) values (2, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8016789986', 'logangster', 3, now(), 'https://images.igdb.com/igdb/image/upload/t_micro/mjustxpafje74fzjbeuy.jpg')
insert into user_library values (2, 11123)
insert into user_library values (2, 111234)
insert into gamer_identifier (identifier, platform, user_id) values ('logangster', 'Xbox Live', 2)

insert into profile values (5, 'Hello, Im Jackson')
insert into users (id, email, password, phone_num, username, profile_id, last_activity, image_url) values (4, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8019138949', 'jacksonmeister', 5, now(), 'https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg')
insert into user_library values (4, 11123)
insert into user_library values (4, 11125)

insert into profile values (7, 'Hello, Im Chris')
insert into users (id, email, password, phone_num, username, profile_id, last_activity, image_url) values (6, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8014139990', 'weetermachine', 7, now(), 'http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png')
insert into user_library values (6, 11123)
insert into user_library values (6, 111234)
insert into gamer_identifier (identifier, platform, user_id) values ('weetermachine', 'Xbox Live', 6)

insert into profile values (9, 'Hello, Im Kelsey')
insert into users (id, email, password, phone_num, username, profile_id, last_activity, image_url) values (8, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8015574857', 'kelpaso', 9, now(), 'https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg')
insert into user_library values (8, 11123)
insert into user_library values (8, 11125)

insert into users_friends values (2, 4)
insert into users_friends values (2, 6)
insert into users_friends values (2, 8)

insert into users_friends values (4, 2)
insert into users_friends values (4, 6)
insert into users_friends values (4, 8)

insert into users_friends values (6, 2)
insert into users_friends values (6, 4)
insert into users_friends values (6, 8)

insert into users_friends values (8, 2)
insert into users_friends values (8, 4)
insert into users_friends values (8, 6)

insert into game (image_url, title, platform_title) values ('test.com', 'MLP', 'Xbox 360');

