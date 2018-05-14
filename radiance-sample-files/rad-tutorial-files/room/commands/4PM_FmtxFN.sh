#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)


#Commands for running an FACADE-MATRIX SIMULATION WITH THE FN APPROACH.
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 570

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
###Create 7 F matrices by using the %s option.
rfluxmtx -v -ff -ab 4 -ad 1000 -lw 1e-4 -c 1000 -n 16 -o matrices/fmtx/%s.fmx objects/GlazingVmtx.rad fports/FN.rad -i octrees/roomFmtx.oct


#Creating 7 F matrices and resultant D matrices from F and D.
#FNa
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNa.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNa.dmx

dctimestep -of matrices/fmtx/FNa.fmx matrices/dmtx/DFNa.dmx > matrices/dmtx/DFNa.dfmx

#FNb
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNb.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNb.dmx

dctimestep -of matrices/fmtx/FNb.fmx matrices/dmtx/DFNb.dmx > matrices/dmtx/DFNb.dfmx

#FNc
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNc.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNc.dmx

dctimestep -of matrices/fmtx/FNc.fmx matrices/dmtx/DFNc.dmx > matrices/dmtx/DFNc.dfmx


#FNd
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNd.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNd.dmx

dctimestep -of matrices/fmtx/FNd.fmx matrices/dmtx/DFNd.dmx > matrices/dmtx/DFNd.dfmx


#FNe
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNe.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNe.dmx

dctimestep -of matrices/fmtx/FNe.fmx matrices/dmtx/DFNe.dmx > matrices/dmtx/DFNe.dfmx


#FNf
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 5000 -n 16 fports/FNf.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNf.dmx

dctimestep -of matrices/fmtx/FNf.fmx matrices/dmtx/DFNf.dmx > matrices/dmtx/DFNf.dfmx


#FNg
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNg.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNg.dmx

dctimestep -of matrices/fmtx/FNg.fmx matrices/dmtx/DFNg.dmx > matrices/dmtx/DFNg.dfmx


#Combining 7 FN matrices into a single matrix.
rmtxop matrices/dmtx/DFNa.dfmx + matrices/dmtx/DFNb.dfmx + matrices/dmtx/DFNc.dfmx + matrices/dmtx/DFNd.dfmx + matrices/dmtx/DFNe.dfmx + matrices/dmtx/DFNf.dfmx + matrices/dmtx/DFNg.dfmx > matrices/dmtx/DFN.dfmx


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
dctimestep  matrices/vmtx/vF.mtx matrices/tmtx/clear.xml matrices/dmtx/DFN.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -c 47.4 119.9 11.6 - > results/fmtx/FN.ill

##For an annual simulation
dctimestep  matrices/vmtx/vF.mtx matrices/tmtx/clear.xml matrices/dmtx/DFN.dfmx skyVectors/NYC.smx | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/FNAnnual.ill


#Images
##For a point-in-time simulation.
dctimestep -h matrices/vmtx/hdr/southF%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/DFN.dfmx skyVectors/NYC_Per.vec > results/fmtx/FN.hdr

##For an annual simulation
dctimestep -o results/fmtx/hdr/southFN%04d.hdr matrices/vmtx/hdr/southF%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/DFN.dfmx skyVectors/NYC.smx

#Done! (results can be found in the results/fmtx folder)