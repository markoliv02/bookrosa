select
    cron.schedule(
        'zerar-contagem',
        -- name of the cron job
        '* * * * *',
        -- every minute
        $ $ begin
        select
            *
        from
            acompanhantes;

INSERT INTO
    public.acompanhantes("clicks")
VALUES
    (0);

RETURN NEW;

END;

$ $
);