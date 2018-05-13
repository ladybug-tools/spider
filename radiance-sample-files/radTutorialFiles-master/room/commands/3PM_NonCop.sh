#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)

#Commands for simulating NON-COPLNAR SHADING SYSTEMS using the Three-Phase Method. 
#The shading system is considered as a part of the overall scene.
#A more efficient way to evaluate such a system would be using the F-Matrix Method (4PM).
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 374

#NOTES:
#	Set the current working directory to "room" before running the commands below.
#	Commands are separated by empty line-breaks.

#Create octree
oconv -f materials.rad room.rad overhang/aluminiumGrate.rad > octrees/room3phNonCop.oct

#View Matrix for Illuminance (The value for -y 100 is derived from the 100 grid points inside the file points.txt).
rfluxmtx -v -I+ -ab 4 -ad 5000 -lw 0.0002 -n 16 -y 100  - objects/GlazingVmtx.rad -i octrees/room3phNonCop.oct < points.txt > matrices/vmtx/vNonCop.mtx

#View Matrix for Images.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/southNonCop%03d.hdr -ab 4 -ad 1000 -lw 1e-4 -c 9 -n 16 - objects/GlazingVmtx.rad -i octrees/room3phNonCop.oct

#Daylight Matrix
rfluxmtx -v -ff  -ab 7 -ad 10000 -lw 0.0001 -c 1000 -n 16 objects/GlazingVmtx.rad skyDomes/skyglow.rad -i octrees/room3phNonCop.oct > matrices/dmtx/daylightNonCop.dmx

#Create sky-vectors
#Point-in-time sky vector
gendaylit 3 20 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 1 > skies/NYC_Per_DH.sky

#Commands for point-in-time calculations are listed below. Commands for annual calculations will be similar to the ones shown in 3Ph.sh

#Results for illuminance.
dctimestep  matrices/vmtx/vNonCop.mtx matrices/tmtx/clear.xml matrices/dmtx/daylightNonCop.dmx skyVectors/NYC_Per.vec | rmtxop -fa -c 47.4 119.9 11.6 - > results/3ph/3phNonCop.ill

#Results for image.
dctimestep -h matrices/vmtx/hdr/southNonCop%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/daylightNonCop.dmx skyVectors/NYC_Per.vec > results/3ph/3phNonCop.hdr

#Done! (The results can be found in the results/3ph folder).