
insert into platform values ('PS3');
insert into platform values ('Xbox 360');
insert into platform values('Xbox One');
insert into platform values ('Steam');
insert into platform values ('PC');
insert into game (id, picture_url, title, platform_title) values (1, 'test.com', 'MLP', 'Xbox 360');
insert into game (id, picture_url, title, platform_title) values (123, 'http://images.igdb.com/igdb/image/upload/t_cover_big/kln2xrk7av3dzrt60auq.png', 'Mass Effect: Andromeda', 'Xbox 360');
insert into game (id, picture_url, title, platform_title) values (1234, 'http://images.igdb.com/igdb/image/upload/t_cover_big/m1qtsn4ehaen83bbp1ee.png', 'Forza Motorsport 3', 'Xbox 360');
insert into game (id, picture_url, title, platform_title) values (125, 'http://images.igdb.com/igdb/image/upload/t_cover_big/gy5jzbxk068kduoki6wx.png', 'Fallout 4: Nuka World', 'PS3');
insert into game (id, picture_url, title, platform_title) values (1236, 'http://images.igdb.com/igdb/image/upload/t_cover_big/fhbeilnghyhhmjqhinqa.png', 'Titanfall 2', 'PS3');


insert into profile values (3, 'Hello, Im Logan')
insert into users (id, email, password, phone_num, username, profile_id) values (2, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8016789986', 'logangster', 3)
insert into user_library values (2, 123)
insert into user_library values (2, 1234)

insert into profile values (5, 'Hello, Im Jackson')
insert into users (id, email, password, phone_num, username, profile_id) values (4, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8019138949', 'jacksonmeister', 5)
insert into user_library values (4, 123)
insert into user_library values (4, 125)

insert into profile values (7, 'Hello, Im Chris')
insert into users (id, email, password, phone_num, username, profile_id) values (6, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8014139990', 'weetermachine', 7)
insert into user_library values (6, 123)
insert into user_library values (6, 1234)

insert into profile values (9, 'Hello, Im Kelsey')
insert into users (id, email, password, phone_num, username, profile_id) values (8, 'email@email.com', '$2a$10$B3817q3eSePRvTpSqewAZeKwZX1l2HoLyeRnX0VdEBE4gnJg76ZFe', '8015574857', 'kelpaso', 9)
insert into user_library values (8, 123)
insert into user_library values (8, 125)

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




