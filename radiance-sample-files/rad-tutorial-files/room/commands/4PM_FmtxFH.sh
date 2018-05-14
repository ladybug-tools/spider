#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)


#Commands for running an FACADE-MATRIX SIMULATION WITH THE FH APPROACH.
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 306

#NOTES:
#	Set the current working directory to "room" before running the commands below.
#	Commands are separated by empty line-breaks.
#	The epw file used in the current tutorial contains only 40 timesteps so that the simulations can completed in a reasonable time.



# Create an octree
oconv -f materials.rad room.rad overhang/aluminiumGrate.rad > octrees/roomFmtx.oct


#V matrix for Illuminance
rfluxmtx -v -I+ -ab 4 -ad 5000 -lw 0.0002 -n 16 -y 100  - objects/GlazingVmtx.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vF.mtx


#V matrix for Images.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/southF%03d.hdr -ab 4 -ad 1000 -lw 1e-4 -c 9 -n 16 - objects/GlazingVmtx.rad -i octrees/roomFmtx.oct


#Calculating F Matrices and Daylight Matrices.
##F Matrix
rfluxmtx -v -ff -ab 4 -ad 1000 -lw 0.001 -c 1000 -n 16 objects/GlazingVmtx.rad fports/FH.rad -i octrees/roomFmtx.oct > matrices/fmtx/FH.fmx

## D Matrix
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 0.001 -c 1000 -n 16 fports/FH.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFH.dmx

#Multiply F and D Matrix into a single matrix.
dctimestep -of matrices/fmtx/FH.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFH.dfmx


#Create sky-vectors
##Point-in-time sky vector
gendaylit 3 20 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 1 > skyVectors/NYC_Per.vec


##Annual sky-matrix
epw2wea assets/USA_NY_New.York-Central.Park.725033_TMY3m.epw assets/NYC.wea

#Create an annual daylight matrix with 145 patches.
gendaymtx -m 1 assets/NYC.wea > skyVectors/NYC.smx


#RESULTS

#Illuminance
##For a point-in-time simulation.
dctimestep  matrices/vmtx/vF.mtx matrices/tmtx/clear.xml matrices/dmtx/DFH.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -c 47.4 119.9 11.6 - > results/fmtx/FH.ill

##For an annual simulation
dctimestep  matrices/vmtx/vF.mtx matrices/tmtx/clear.xml matrices/dmtx/DFH.dfmx skyVectors/NYC.smx | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/FHAnnual.ill


#Images
##For a point-in-time simulation.
dctimestep -h matrices/vmtx/hdr/southF%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/DFH.dfmx skyVectors/NYC_Per.vec > results/fmtx/FH.hdr

##For an annual simulation
dctimestep -o results/fmtx/hdr/southFH%04d.hdr matrices/vmtx/hdr/southF%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/DFH.dfmx skyVectors/NYC.smx

#Done! (results can be found in the results/fmtx folder)