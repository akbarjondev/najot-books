create database books;

create table books(
	book_id serial primary key,
	book_name varchar(255),
	book_desc text,
	book_number varchar(50),
	book_author varchar(150),
	book_added_at timestamp with time zone default current_timestamp
);
