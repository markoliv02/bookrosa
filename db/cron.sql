select
    cron.schedule(
        'zerar-contagem',
        -- name of the cron job
        '0 0 * * *',
        -- every minute
        $ $
        update
            public.acompanhantes
        set
            clicks = (0);

$ $
);