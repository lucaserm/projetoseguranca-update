npm i 
=========================================
criar a .env e setar:

user=postgres
password=postgres
host=192.168.100.13(ou seu ipv4, que se pega com o ipconfig no cmd. ou seta host=localhost)
porta=5432
database=projeto

ou

connectionString=url de conexao com o banco

=========================================

rodar o sql no banco

1 terminal 
set NODE_OPTIONS=--openssl-legacy-provider
npm run dev

2 terminal
npm run start
