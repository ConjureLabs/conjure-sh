CREATE TABLE account (
  id serial primary key,
  first_name varchar(60),
  last_name varchar(60),
  email varchar(100) not null,
  password varchar(60),
  phone varchar(30),
  added timestamp with time zone not null,
  registered timestamp with time zone,
  updated timestamp with time zone
);
COMMENT ON TABLE account IS 'cosmo user records';
