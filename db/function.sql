create
or replace function handle_count_clicks() returns trigger as $ $ begin
select
    *
from
    acompanhantes
INSERT INTO
    public.acompanhantes("clicks",)
VALUES
    (0);

RETURN NEW;

END;

$ $ language plpgsql;