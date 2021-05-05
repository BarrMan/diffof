DIRNAME=$(echo $(dirname $0))

docker-compose -f $DIRNAME/gremlin/docker-compose.yml up gremlin