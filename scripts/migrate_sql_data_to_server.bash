#!/bin/bash
# Dump all data on dev machine, and then server import dumped data.

SERVER=103.72.98.179
SERVER_HOST=root
DB_NAME=star_colony

# Dump database
mysqldump -u root -pmysqlpassword $DB_NAME > $DB_NAME.sql

# Copy backup to server
#scp $DB_NAME.sql $SERVER_HOST@$SERVER:/$SERVER_HOST/$DB_NAME.sql

# Import backup to server
ssh $SERVER_HOST@$SERVER "mysql -u root -pmysqlpassword $DB_NAME < $DB_NAME.sql"
