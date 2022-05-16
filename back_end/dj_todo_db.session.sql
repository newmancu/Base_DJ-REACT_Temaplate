
-- drop trigger delete_task_and_box_trigger on back_api_task_and_box;

-- drop function delete_task_and_box_proc;

-- drop view back_api_task_and_box;

-- create function delete_task_and_box_proc()
-- returns TRIGGER AS
-- $$
--   BEGIN
--     delete from back_api_todobox tb
--       where tb.id = old.box_id;
--     return null;
--   end;
-- $$ LANGUAGE plpgsql;

-- create trigger delete_task_and_box_trigger 
-- INSTEAD of delete on back_api_task_and_box for each row execute function delete_task_and_box_proc();

-- create or replace function delete_task_and_box_proc()
-- returns TRIGGER AS
-- $$
--   BEGIN
--     raise warning 'old_id = %', old.box_id;
--     if TG_OP = 'DELETE' then
--       delete from back_api_todobox
--         where id = old.box_id;
--     elsif TG_OP = 'UPDATE' then
--       update back_api_todobox
--       set
--         id = new.box_id,
--         box_name = new.box_name,
--         color = new.color,
--         author_id = new.author_id
--       where old.box_id = tb.id;
--     elsif TG_OP = 'INSERT' then
--       INSERT into back_api_todobox
--       values
--         (new.box_id, new.box_name, new.color, new.author_id);
--     end if;
--     return NEW;
--   end;
-- $$ LANGUAGE plpgsql;

-- create trigger delete_task_and_box_trigger 
-- INSTEAD OF DELETE on back_api_task_and_box 
-- for each row execute function delete_task_and_box_proc();


-- delete from back_api_todobox where id = 11;


-- drop rule delete_task_and_box on back_api_todobox;

create or replace rule delete_task_and_box as 
    on delete to back_api_task_and_box
    do instead 
    (
    delete from back_api_todobox tb
      where tb.id = old.box_id ;
    )
    ;


-- create or REPLACE VIEW back_api_task_and_box as (
--   select 
--     tt.id as task_id,
--     tb.id as box_id,
--     tt.task_text,
--     tt.create_date,
--     tt.end_date,
--     tt.finished_date,
--     tb.box_name,
--     tb.color,
--     tb.author_id
--   from back_api_todotask tt
--   right join back_api_todobox tb on tt.todo_box_id = tb.id
-- )
-- ;

-- create or REPLACE VIEW back_api_task_and_box as (
--   select 
--     tt.id as task_id,
--     tb.id as box_id,
--     tt.task_text,
--     tt.create_date,
--     tt.end_date,
--     tt.finished_date,
--     tb.box_name,
--     tb.color,
--     tb.author_id
--   from back_api_todotask tt, back_api_todobox tb
--   where tt.todo_box_id = (select id from back_api_todobox)
-- )
-- ;