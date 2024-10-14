docker
docker compose up -d
docker ps // list the containers
docker exec -it "containers_name" bash //run postgres in bash mode or commandline
su postgres //postgres is name of user like root after that command run the below command
psql
//now the bash command of postgres in bash mode
\l //for list the database
\c threads // here threads is the database
\d users // show all the table of the database or describe
select \* from users
\x // expand display

To clear bash terminal command + k in mac and ctrl + k in window
select \* from users;
delete from users where 1=1;

prisma
npx prisma init
npx prisma migrate dev --name create_user_table
npx prisma migrate dev --name make_lastname_optional
