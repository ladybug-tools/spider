#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)


#Commands for running an FACADE MATRIX SIMULATION WITH MULTIPLE WINDOW GROUPS.

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 1216

#NOTES:
#	Set the current working directory to "room" before running the commands below.
#	Commands are separated by empty line-breaks.


#Create octree
oconv -f materials.rad room.rad overhang/aluminiumGrate.rad  > octrees/roomFmtx.oct


#View matrices for Illuminance
rfluxmtx -v -I+ -ab 4 -ad 5000 -lw 0.0002 -n 16 -y 100  - varShading/GlazingVmtx1.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vF11.mtx

rfluxmtx -v -I+ -ab 4 -ad 5000 -lw 0.0002 -n 16 -y 100  - varShading/GlazingVmtx2.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vF12.mtx

rfluxmtx -v -I+ -ab 4 -ad 5000 -lw 0.0002 -n 16 -y 100  - varShading/GlazingVmtx3.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vF13.mtx

rfluxmtx -v -I+ -ab 4 -ad 5000 -lw 0.0002 -n 16 -y 100  - varShading/GlazingVmtx4.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vF14.mtx


#View matrices for Images.

vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/southF1%03d.hdr -ab 4 -ad 1000 -lw 1e-4 -c 9 -n 16 - varShading/GlazingVmtx1.rad -i octrees/roomFmtx.oct

vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/southF2%03d.hdr -ab 4 -ad 1000 -lw 1e-4 -c 9 -n 16 - varShading/GlazingVmtx2.rad -i octrees/roomFmtx.oct

vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/southF3%03d.hdr -ab 4 -ad 1000 -lw 1e-4 -c 9 -n 16 - varShading/GlazingVmtx3.rad -i octrees/roomFmtx.oct

vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/southF4%03d.hdr -ab 4 -ad 1000 -lw 1e-4 -c 9 -n 16 - varShading/GlazingVmtx4.rad -i octrees/roomFmtx.oct


# Daylight Matrix
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 0.001 -c 1000 -n 16 fports/F1.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DF1.dmx

#Creating the F Matrices and resultant Daylight Matrices for each window group.
rfluxmtx -v -ff -ab 4 -ad 1000 -lw 0.001 -c 1000 -n 16 varShading/GlazingVmtx1.rad fports/F1.rad -i octrees/roomFmtx.oct > matrices/fmtx/F11.fmx

dctimestep -of matrices/fmtx/F11.fmx matrices/dmtx/DF1.dmx > matrices/dmtx/DF11.dfmx


rfluxmtx -v -ff -ab 4 -ad 1000 -lw 0.001 -c 1000 -n 16 varShading/GlazingVmtx2.rad fports/F1.rad -i octrees/roomFmtx.oct > matrices/fmtx/F12.fmx

dctimestep -of matrices/fmtx/F12.fmx matrices/dmtx/DF1.dmx > matrices/dmtx/DF12.dfmx


rfluxmtx -v -ff -ab 4 -ad 1000 -lw 0.001 -c 1000 -n 16 varShading/GlazingVmtx3.rad fports/F1.rad -i octrees/roomFmtx.oct > matrices/fmtx/F13.fmx

dctimestep -of matrices/fmtx/F13.fmx matrices/dmtx/DF1.dmx > matrices/dmtx/DF13.dfmx


rfluxmtx -v -ff -ab 4 -ad 1000 -lw 0.001 -c 1000 -n 16 varShading/GlazingVmtx4.rad fports/F1.rad -i octrees/roomFmtx.oct > matrices/fmtx/F14.fmx

dctimestep -of matrices/fmtx/F14.fmx matrices/dmtx/DF1.dmx > matrices/dmtx/DF14.dfmx


#Create sky-vectors
##Point-in-time sky vector
gendaylit 3 20 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 1 > skyVectors/NYC_Per.vec


#Generating results.
##Commands for point-in-time calculations are listed below. Commands for annual calculations will be similar to the ones shown in F1.sh

##Generating results with clear glazing.

###Illuminance
dctimestep matrices/vmtx/vF11.mtx matrices/tmtx/clear.xml matrices/dmtx/DF11.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/F11C.ill

dctimestep matrices/vmtx/vF12.mtx matrices/tmtx/clear.xml matrices/dmtx/DF12.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/F12C.ill

dctimestep matrices/vmtx/vF13.mtx matrices/tmtx/clear.xml matrices/dmtx/DF13.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/F13C.ill

dctimestep matrices/vmtx/vF14.mtx matrices/tmtx/clear.xml matrices/dmtx/DF14.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/F14C.ill


###Images
dctimestep matrices/vmtx/hdr/southF1%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/DF11.dfmx skyVectors/NYC_Per.vec > results/fmtx/F11C.hdr

dctimestep matrices/vmtx/hdr/southF2%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/DF12.dfmx skyVectors/NYC_Per.vec > results/fmtx/F12C.hdr

dctimestep matrices/vmtx/hdr/southF3%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/DF13.dfmx skyVectors/NYC_Per.vec > results/fmtx/F13C.hdr

dctimestep matrices/vmtx/hdr/southF4%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/DF14.dfmx skyVectors/NYC_Per.vec > results/fmtx/F14C.hdr




##Generating results with venetian blinds at 45 degrees
###Illuminance
dctimestep matrices/vmtx/vF11.mtx matrices/tmtx/ven45.xml matrices/dmtx/DF11.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/F11V.ill

dctimestep matrices/vmtx/vF12.mtx matrices/tmtx/ven45.xml matrices/dmtx/DF12.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/F12V.ill

dctimestep matrices/vmtx/vF13.mtx matrices/tmtx/ven45.xml matrices/dmtx/DF13.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/F13V.ill

dctimestep matrices/vmtx/vF14.mtx matrices/tmtx/ven45.xml matrices/dmtx/DF14.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/F14V.ill



###Images
dctimestep matrices/vmtx/hdr/southF1%03d.hdr matrices/tmtx/ven45.xml matrices/dmtx/DF11.dfmx skyVectors/NYC_Per.vec > results/fmtx/F11V.hdr

dctimestep matrices/vmtx/hdr/southF2%03d.hdr matrices/tmtx/ven45.xml matrices/dmtx/DF12.dfmx skyVectors/NYC_Per.vec > results/fmtx/F12V.hdr

dctimestep matrices/vmtx/hdr/southF3%03d.hdr matrices/tmtx/ven45.xml matrices/dmtx/DF13.dfmx skyVectors/NYC_Per.vec > results/fmtx/F13V.hdr

dctimestep matrices/vmtx/hdr/southF4%03d.hdr matrices/tmtx/ven45.xml matrices/dmtx/DF14.dfmx skyVectors/NYC_Per.vec > results/fmtx/F14V.hdr



#Combining images with pcomb and illuminance values with rmtxop to generate results for different shading options.

##Shades pulled up.
###Image
pcomb results/fmtx/F11C.hdr  results/fmtx/F12C.hdr  results/fmtx/F13C.hdr  results/fmtx/F14C.hdr > results/fmtx/F10.hdr

###Illuminance
rmtxop results/fmtx/F11C.ill + results/fmtx/F12C.ill + results/fmtx/F13C.ill + results/fmtx/F14C.ill > results/fmtx/F10.ill


##Shades down 25%.
###Image
pcomb results/fmtx/F11V.hdr  results/fmtx/F12C.hdr  results/fmtx/F13C.hdr  results/fmtx/F14C.hdr > results/fmtx/F125.hdr

###Illuminance
rmtxop results/fmtx/F11V.ill + results/fmtx/F12C.ill + results/fmtx/F13C.ill + results/fmtx/F14C.ill > results/fmtx/F125.ill

##Shades down 50%.
###Image
pcomb results/fmtx/F11V.hdr  results/fmtx/F12V.hdr  results/fmtx/F13C.hdr  results/fmtx/F14C.hdr > results/fmtx/F150.hdr

###Illuminance
rmtxop results/fmtx/F11V.ill + results/fmtx/F12V.ill + results/fmtx/F13C.ill + results/fmtx/F14C.ill > results/fmtx/F150.ill

##Shades down 75%.
###Image
pcomb results/fmtx/F11V.hdr  results/fmtx/F12V.hdr  results/fmtx/F13V.hdr  results/fmtx/F14C.hdr > results/fmtx/F175.hdr

###Illuminance
rmtxop results/fmtx/F11V.ill + results/fmtx/F12V.ill + results/fmtx/F13V.ill + results/fmtx/F14C.ill > results/fmtx/F175.ill


##Shades down 100%.
###Image
pcomb results/fmtx/F11V.hdr  results/fmtx/F12V.hdr  results/fmtx/F13V.hdr  results/fmtx/F14V.hdr > results/fmtx/F1100.hdr

###Illuminance
rmtxop results/fmtx/F11V.ill + results/fmtx/F12V.ill + results/fmtx/F13V.ill + results/fmtx/F14V.ill > results/fmtx/F1100.ill

#Done! (results can be found in results/fmtx folder)
