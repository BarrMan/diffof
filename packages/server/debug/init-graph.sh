DIRNAME=$(dirname "${BASH_SOURCE[0]}")

docker-compose -f $DIRNAME/gremlin/docker-compose.yml up gremlin