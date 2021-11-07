create database orders_food;

create table users(
  user_id int generated by default as identity primary key,
  role smallint default 0,
  username varchar(40) not null,
  password varchar(64) not null
);

create unique index username_idx on users (lower(username));

create extension pgcrypto;


create table categories (
  category_id int generated by default as identity primary key,
  category_name varchar(32) not null
);

create table products (
  product_id int generated by default as identity primary key,
  product_name varchar(64) not null,
  category_id int not null references categories(category_id),
  product_price decimal(15, 2) not null,
  product_image varchar(70),
  product_available boolean default true
);

create table tables(
  table_id int generated by default as identity primary key,
  table_number int not null
);

CREATE UNIQUE INDEX table_nomber_phone
ON tables(table_number);


create table orders (
  order_id int generated by default as identity primary key,
  time timestamp with time zone default current_timestamp,
  status smallint default 0 not null,
  table_id int
);


create table order_item(
  item_id int generated by default as identity primary key,
  item_time timestamp with time zone default current_timestamp,
  product_count int,
  order_id int,
  product_id int
);


-- functions



create or replace function dont_duplicate_orderitems(_oic int, _pi int, _ti int) returns int language plpgsql as $$

  declare
    _oi int := (select order_id from orders where table_id = _ti and status = 0);

  begin

    if (_oi > 0) then
      _oi = (select order_id from orders where table_id = _ti and status = 0);
    else
      insert into orders(table_id) values (_ti) returning order_id INTO _oi;
    end if;


    if (
      select
        oi.order_id
      from
        order_item as oi
      join
        orders as o on o.order_id = oi.order_id
        where
          o.status = 0 and oi.product_id = _pi and o.order_id = _oi
    ) > 0 then
      update order_item set product_count = (product_count + _oic)
      from orders where status = 0 and product_id = _pi and order_item.order_id = _oi;

      return 2;

    else
      insert into order_item(product_count, order_id, product_id) values (_oic, _oi, _pi);
      return 1;
    end if;

  end;
$$;


create or replace function get_all_orders (_status int, page_size int = 1, page_number int = 10) returns table(
  id int,
  table_num int,
  product varchar [],
  created timestamp with time zone,
  count int [],
  all_count int,
  price decimal
) language plpgsql as $$
  begin

    return query 
      select
        o.order_id as id,
        t.table_number as table_num,
        array_agg(p.product_name) as product,
        o.time as created,
        array_agg(oi.product_count) as count,
        sum(oi.product_count) as all_count,
        sum(p.product_price * oi.product_count) as price
      from
        orders as o
      join
        order_item as oi on o.order_id = oi.order_id
      join
        products as p on p.product_id = oi.product_id
      join
        tables as t on t.table_id = o.table_id
      where
        o.status = _status
      group by
        id, table_num, time, status
      order by
        id DESC
      limit
        page_size
      offset
        ((page_number - 1) * page_size)
      ;

  end;
$$;


