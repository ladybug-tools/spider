SET RAYPATH=.;c:\radiance\lib
PATH=c:\radiance\bin\;$PATH
c:
cd c:\ladybug\unnamed\gridBasedSimulation\
rtrace -I  -h -dp 64 -ds 0.5 -dt 0.5 -dc 0.25 -dr 0 -st 0.85 -lr 4 -lw 0.05 -ab 2 -ad 1000 -as 128 -ar 300 -aa 0.1  -e error.log unnamed_RAD.oct < unnamed_3.pts > unnamed_3.res
