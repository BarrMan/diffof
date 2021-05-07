DIRNAME=$(echo $(dirname $0))

docker-compose -f $DIRNAME/docker-compose.yml down