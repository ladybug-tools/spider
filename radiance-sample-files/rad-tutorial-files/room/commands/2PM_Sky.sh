#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:20 SEP 2017
#Created by Sarith Subramaniam(sarith@sarith.in)

# Commands for generating images of SKY PATCHES using DAYLIGHT COEFFICIENTS.

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 9

#NOTES:
#	Set the current working directory to "room" before running the commands below.
#	Commands are separated by empty line-breaks.


#Create octree
oconv materials.rad objects/Ground.rad > octrees/sky.oct


#Steps for creating daylight coefficients for images
vwrays -vf views/skyUp.vf -x 300 -y 300 -pj 0.7 -c 9 -ff | rfluxmtx -ffc -v -n 16 `vwrays -vf views/skyUp.vf -x 300 -y 300 -d` -c 9  -ab 1 -ad 1000 -lw 0.001 -o matrices/dc/hdr/skyTregenza%04d.hdr - skyDomes/skyglow.rad -i octrees/sky.oct

#Create a sky vector with 145 patches. The sky definition corresponds to 19th September at 10:30AM EDT for New York City.
gendaylit 9 19 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 1 > skyVectors/NYC_Per.vec

#Create a similar sky vector with 145 patches for direct radiation only. 
gendaylit 9 19 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 1 -d > skyVectors/NYC_Per_Direct.vec

#Generate the image for full sky.
dctimestep matrices/dc/hdr/skyTregenza%04d.hdr skyVectors/NYC_Per.vec > results/dc/Sky.hdr

#Generate a falsecolor image of the above image
falsecolor -i results/dc/Sky.hdr -log 3 -s 3000000 -lh 150 > results/dc/SkyFalsecolor.hdr

#Generate the image 
dctimestep matrices/dc/hdr/skyTregenza%04d.hdr skyVectors/NYC_Per_Direct.vec > results/dc/SkyDirect.hdr

#Generate a falsecolor image of the above image
falsecolor -i results/dc/SkyDirect.hdr -log 3 -s 3000000 -lh 150 > results/dc/SkyDirectFalsecolor.hdr
