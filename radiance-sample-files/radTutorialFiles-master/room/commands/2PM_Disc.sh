#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)


#Commands for 2-PHASE simulations with highly discretized skies. ( greater than 145 patches).
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 13329

#NOTES:
#	Set the current working directory to "room" before running the commands below.
#	Commands are separated by empty line-breaks.
#	The epw file used in the current tutorial contains only 40 timesteps so that the simulations can completed in a reasonable time.


#Ulimit needs to be set to a high enough value so that multiple files can be opened simulataneously.
#This command is applicable to Unix-like systems only. On Windows the number of simultaneous files is limited to 512.
ulimit -n 9999

#Create octree
oconv materials.rad room.rad objects/Glazing.rad > octrees/roomDC.oct


#Steps for creating daylight coefficients for images

##Generate daylight coefficients

###Images
vwrays -vf views/south.vf -x 300 -y 300 -pj 0.7 -c 9 -ff | rfluxmtx -ffc -v -n 16 `vwrays -vf views/south.vf -x 300 -y 300 -d` -c 9  -ab 4 -ad 10000 -lw 0.0001 -o matrices/dc/hdr/south1%04d.hdr - skyDomes/skyglowR1.rad -i octrees/roomDC.oct
vwrays -vf views/south.vf -x 300 -y 300 -pj 0.7 -c 9 -ff | rfluxmtx -ffc -v -n 16 `vwrays -vf views/south.vf -x 300 -y 300 -d` -c 9  -ab 4 -ad 30000 -lw 3.33e-5 -o matrices/dc/hdr/south2%04d.hdr - skyDomes/skyglowR2.rad -i octrees/roomDC.oct
vwrays -vf views/south.vf -x 300 -y 300 -pj 0.7 -c 9 -ff | rfluxmtx -ffc -v -n 16 `vwrays -vf views/south.vf -x 300 -y 300 -d` -c 9  -ab 4 -ad 90000 -lw 1.11e-5 -o matrices/dc/hdr/south3%04d.hdr - skyDomes/skyglowR3.rad -i octrees/roomDC.oct
vwrays -vf views/south.vf -x 300 -y 300 -pj 0.7 -c 9 -ff | rfluxmtx -ffc -v -n 16 `vwrays -vf views/south.vf -x 300 -y 300 -d` -c 9  -ab 4 -ad 120000 -lw 8.3e-6 -o matrices/dc/hdr/south4%04d.hdr - skyDomes/skyglowR4.rad -i octrees/roomDC.oct



###Illuminance
rfluxmtx -I+ -y 100 -ab 5 -ad 10000 -lw 0.0001 -n 16 - skyDomes/skyglowR1.rad -i octrees/roomDC.oct < points.txt > matrices/dc/illumR1.mtx
rfluxmtx -I+ -y 100 -ad 30000 -lw 3.33e-5 -ab 5 -n 16 - skyDomes/skyglowR2.rad -i octrees/roomDC.oct < points.txt > matrices/dc/illumR2.mtx
rfluxmtx -I+ -y 100 -ad 90000 -lw 1.11e-5 -ab 5 -n 16 - skyDomes/skyglowR3.rad -i octrees/roomDC.oct < points.txt > matrices/dc/illumR3.mtx
rfluxmtx -I+ -y 100 -ad 120000 -lw 8.3e-6 -ab 5 -n 16 - skyDomes/skyglowR4.rad -i octrees/roomDC.oct < points.txt > matrices/dc/illumR4.mtx


#Create sky-vectors
##Point-in-time sky vector.
gendaylit 3 20 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 1 > skyVectors/NYC_Per1.vec
gendaylit 3 20 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 2 > skyVectors/NYC_Per2.vec
gendaylit 3 20 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 3 > skyVectors/NYC_Per3.vec
gendaylit 3 20 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 4 > skyVectors/NYC_Per4.vec


#RESULTS
##Images
###For a point-in-time calculation using a skyvector
dctimestep matrices/dc/hdr/south1%04d.hdr skyVectors/NYC_Per1.vec > results/dc/southR1.hdr
dctimestep matrices/dc/hdr/south2%04d.hdr skyVectors/NYC_Per2.vec > results/dc/southR2.hdr
dctimestep matrices/dc/hdr/south3%04d.hdr skyVectors/NYC_Per3.vec > results/dc/southR3.hdr
dctimestep matrices/dc/hdr/south4%04d.hdr skyVectors/NYC_Per4.vec > results/dc/southR4.hdr

##Illuminance
###For a point-in-time calculation using a skyvector
dctimestep matrices/dc/illumR1.mtx skyVectors/NYC_Per1.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/dc/R1.ill
dctimestep matrices/dc/illumR2.mtx skyVectors/NYC_Per2.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/dc/R2.ill
dctimestep matrices/dc/illumR3.mtx skyVectors/NYC_Per3.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/dc/R3.ill
dctimestep matrices/dc/illumR4.mtx skyVectors/NYC_Per4.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/dc/R4.ill


#Done! (The results can be found in the directory results/dc).