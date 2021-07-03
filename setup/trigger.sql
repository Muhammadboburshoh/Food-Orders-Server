create function new_order() returns trigger language plpgsql as $$

  begin
    if ((select status from orders where table_id = NEW.table_id) = 0) then
      return NEW
    else
      insert into orders(table_id) values (NEW.table_id);
      insert into
        order_item(order_id, product_id, table_id, count)
        values (
          (select order_id from orders where table_id = NEW.table_id and status = 0),
          NEW.product_id,
          NEW.table_id,
          NEW.count,
        )
      return null;
    end if;

  end;
$$;

insert into orders(table_id) values (5);
insert into order_item(order_id, product_id, table_id, count) values ((select order_id from orders where table_id = 5), 3, 1, 5);




create trigger new_order_t before insert on order_item for each row execute procedure new_order()