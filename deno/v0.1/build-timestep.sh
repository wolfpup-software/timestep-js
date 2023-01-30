#!/bin/bash

curr_dir=`dirname $0`

tsconfig=$curr_dir/tsconfig.json
timestep=$curr_dir/mod.ts
# timestep_test=$curr_dir/mod.test.ts

es_dir=$curr_dir/../../es/v0.1
es_timestep=$es_dir/timestep.js
# es_timestep_test=$es_dir/timestep.test.js

deno bundle --config $tsconfig $timestep $es_timestep
# deno bundle $timestep_test $es_timestep_test

# deno fmt $current_dir
# deno fmt $es_dir
