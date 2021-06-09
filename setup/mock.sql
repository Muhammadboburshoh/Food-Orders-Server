insert into categories (category_name) values
('Uyg''ur'),
('Japan'),
('Milliy'),
('Turk'),
('Ichimlik')
;

insert into products (
  product_name,
  product_price,
  product_image,
  category_id
) values
('Osh', '25000', 'osh.png', 3),
('Uyg''urcha qovurma', '30000', 'u_qovurma.png', 1),
('Manti', '5000', 'manti.png', 3),
('Ko''za sho''rva', '25000', 'k_shorva.png', 3),
('Sushe', '56000', 'pushe.png', 2),
('Pepsi', '11000', 'pepsi.png', 5),
('Fanta', '11000', 'fanta.png', 5),
('Aliviya', '18000', 'aliviya.png', 3)
;

insert into tables(table_number) values (1), (2), (3), (4), (5);

insert into users (username, password, role) values ('admin', crypt('1234', gen_salt('bf')), 1);
