#!/bin/bash
apps=("pizzarank-restaurants" "pizzarank-users")

pwd

root=/mnt/C/Users/grant/Documents/GitHub/pizzarank

nginx_config="$root/nginx.conf"


for i in "${apps[@]}"
do
	if [ -d "$i" ]
	then
		echo "Starting $i"
		cd "$i"	
		npm start &
		cd ..
	fi
done

