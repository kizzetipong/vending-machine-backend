CREATE TABLE machines (
	id serial PRIMARY KEY,
  lat NUMERIC(10, 8) NOT NULL,
  lng NUMERIC(11, 8) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE products (
	id serial PRIMARY KEY,
  machine_id VARCHAR(255) NOT NULL,
  machine_slot NUMERIC NOT NULL,
  name VARCHAR(255),
  amount NUMERIC,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE transactions (
	id serial PRIMARY KEY,
  machine_id VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  amount NUMERIC,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);