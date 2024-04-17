#!/usr/bin/env bash

## Check if file to be tested exists and returns a message if it does not
mintjs=$(./mintjs src/App.tsx)
if [[ $? != 0 ]]; then
    echo "Our tests were unable to run. Please Try again.\n<failed>"
elif [[ $mintjs ]]; then
    ./mintjs src/App.tsx
else
    # /.runner '@1-1'    
    # This command will run one of the options below for one test in which
    # the name pattern is passed as an argument to the script.

    # Use this command to run a single test and return test output + set custom message at code labs interface
    npm run test -- -t $1 --watchAll=false

    # Use this command to run a single test and return custom message from Jest:
    # npm run -s task -- -t $1 

    # How to use it in code labs task:
    # npm run -s task --testNamePattern=@1.1
    # npm run -s task -- -t @1.1
   
    

   

fi
