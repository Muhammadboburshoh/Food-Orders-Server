create or replace function new_order() returns trigger language plpgsql as $$

  declare
    order_is_exist int := (select order_id from orders where table_id = new.table_id and status = 0);

  begin

    if order_is_exist > 0 then
      return null;
    else
      return new;
    end if;

  end;
$$;

create trigger new_order_t
before insert on orders
for each row
execute procedure new_order();