docker
docker compose up -d
docker ps // list the containers
docker exec -it "containers_name" bash //run postgres in bash mode or commandline
su postgres //postgres is name of user like root after that command run the below command
psql
//now the bash command of postgres in bash mode
\l //for list the database
\c threads // here threads is the database
\d users // show all the table of the database
select * from users
\x // To exit

prisma
npx prisma init
npx prisma migrate dev --name create_user_table
