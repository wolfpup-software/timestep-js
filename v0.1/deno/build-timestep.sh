#!/bin/bash

current_dir=`dirname $0`

target_pathname=$current_dir/timestep.ts

es_dir=$current_dir/../es
es_pathname=$es_dir/timestep.js

# test_target_pathname=$current_dir/timestep.test.ts
# test_es_dir=$es_dir/timestep.test.js 
# test_es_pathname=$es_dir/timestep.test.js

tsconfig_pathname=$current_dir/tsconfig.json

deno bundle --config $tsconfig_pathname $target_pathname $es_pathname
# deno bundle --config $tsconfig_pathname $test_target_pathname $test_es_pathname

deno fmt $current_dir
deno fmt $es_dir/../