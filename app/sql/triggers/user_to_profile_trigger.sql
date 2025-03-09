create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if new.raw_app_meta_data is not null then
        if new.raw_app_meta_data ? 'provider' and new.raw_app_meta_data ->> 'provider' = 'email' then
            insert into public.profiles (profile_id, name, username, role)
            values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'username', 'developer');
        end if;
        if new.raw_app_meta_data ? 'provider' and new.raw_app_meta_data ->> 'provider' = 'kakao' then
            insert into public.profiles (profile_id, name, username, avatar, role)
            values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'user_name', new.raw_user_meta_data ->> 'avatar_url', 'developer');
        end if;
    end if;
    return new;
end;
$$;

create or replace trigger user_to_profile_trigger
after insert on auth.users
for each row execute function public.handle_new_user();