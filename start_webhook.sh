
#!/bin/bash

function localtunnel {
lt -s farstudystrategiccompose --port 80
}

until localtunnel; do
echo "localtunnel  server crashed"
sleep 2
done