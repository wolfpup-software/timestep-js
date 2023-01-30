look up timestep and confirm where it's based on framerate or 
loop
  - get time difference
  - integrate while time difference is > (1 / n fps)
  - save last state and previous state (user handles state, outside timestep)
  - alpha is the remainder not integrated
  - that is the distance between previous state and current state
  - render the interpolation between previous state and current state by alpha
  - (confirm that it's not a screenshot that needs to be left behind)

# Timestep

An implementation of a fixed timestep

There is an initial framerate.

100ms timestep
60fps

1/60	
initial render

2/60 nothing

3/60 render
calculate physics timestep up until 

we need the previous two states between the last two time steps

|        |          |
              ^ call render
    ^
get inbetween the two states

always 1/60 frames behind?

render
1/100
2/100
3/100
--new render


look up timestep and confirm where it's based on framerate or 
loop
  - get time difference
  - integrate while time difference is > (1 / n fps)
  - save last state and previous state (user handles state, outside timestep)
  - alpha is the remainder not integrated
  - that is the distance between previous state and current state
  - render the interpolation between previous state and current state by alpha
  - (confirm that it's not a screenshot that needs to be left behind)

