#!/bin/bash

REPOSITORY=~/DOSHA
PROJECT_NAME=dosha_backend
PROJECT_NAME2=dosha_frontend

cd $REPOSITORY/$PROJECT_NAME/

# echo "> Git Pull server project"
# git pull

echo "> Build server project"
mvn package

cd $REPOSITORY

echo "> copy Server Project Build file"
cp $REPOSITORY/$PROJECT_NAME/target/*.jar $REPOSITORY/

echo "> check Server Application pid"
CURRENT_PID=$(pgrep -f ${PROJECT_NAME}.*.jar)

echo "> Server Application Pid: $CURRENT_PID"
if [ -z "$CURRENT_PID" ]; then
  echo "> there is no running Application"
else
  echo "> kill -15 $CURRENT_PID (safe kill)"
  kill -15 $CURRENT_PID
  sleep 5

  CURRENT_PID_AFTER_KILL=$(pgrep -f ${PROJECT_NAME})
  if [ -z $CURRENT_PID_AFTER_KILL ]; then
    echo "> Application kill well"
  else
    echo "> Kill Application Forced"
    kill -9 $CURRENT_PID_AFTER_KILL
    sleep 5
  fi
fi

echo "> deploy new Application"
cd $REPOSITORY
JAR_NAME=$(ls -tr $REPOSITORY/ | grep jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"
nohup java -jar $REPOSITORY/$JAR_NAME 2>&1 &

echo "> run client project"
cd $REPOSITORY/$PROJECT_NAME2

echo "> pm2 kill"
pm2 kill

# echo "> git pull"
# git pull

echo "> pm2 build"
pm2 serve build/ 3000 --spa