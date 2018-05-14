#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)


# Commands for a TWO-PHASE simulation with Daylight Coefficients.
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 939

#NOTES:
#	Set the current working directory to "room" before running the commands below.
#	Commands are separated by empty line-breaks.
#	The epw file used in the current tutorial contains only 40 timesteps so that the simulations can completed in a reasonable time.

#Create octree
oconv materials.rad room.rad objects/Glazing.rad > octrees/roomDC.oct


#Steps for creating daylight coefficients for images

##Step for creating daylight coefficients for illuminace calculations.
###The command "vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff" generates the input rays from view file and pipes it to rfluxmtx.
###The inline command "`vwrays -vf views/south.vf -x 400 -y 400 -d`" will calculate the dimensions of the image to be generated.
###The command "rfluxmtx -ffc ...." will invoke rcontrib to do the actual raytracing calculations.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -ffc -v -n 16 `vwrays -vf views/south.vf -x 400 -y 400 -d` -c 9  -ab 4 -ad 10000 -lw 0.0001 -o matrices/dc/hdr/south%03d.hdr - skyDomes/skyglow.rad -i octrees/roomDC.oct


##Step for creating daylight coefficients for illuminace calculations.
rfluxmtx -I+ -y 100 -lw 0.0001 -ab 5 -ad 10000 -n 16 - skyDomes/skyglow.rad -i octrees/roomDC.oct < points.txt > matrices/dc/illum.mtx

#Create sky-vectors
##Point-in-time sky vector
gendaylit 3 20 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 1 > skyVectors/NYC_Per.vec

##Annual sky-matrix
epw2wea assets/USA_NY_New.York-Central.Park.725033_TMY3m.epw assets/NYC.wea

#Create an annual daylight matrix with 145 patches.
gendaymtx -m 1 assets/NYC.wea > skyVectors/NYC.smx



#RESULTS
##Images
###For a point-in-time calculation using a skyvector
dctimestep matrices/dc/hdr/south%03d.hdr skyVectors/NYC_Per.vec > results/dc/south.hdr

###Optional step for generating a falsecolor image from the simulation result.
falsecolor <results/dc/south.hdr> results/dc/southF.hdr

###For an annual calculation
dctimestep -o results/dc/hdr/south%04d.hdr matrices/dc/hdr/south%03d.hdr skyVectors/NYC.smx


##Illuminance
###For a point-in-time calculation using a skyvector
dctimestep matrices/dc/illum.mtx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/dc/R.ill

###For annual calculation
dctimestep matrices/dc/illum.mtx skyVectors/NYC.smx | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/dc/annualR.ill

#Done! (The results can be found in the results/dc folder).


