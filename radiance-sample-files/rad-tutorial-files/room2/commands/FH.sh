#!/usr/bin/env bash


#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)

#Commands for running an FACADE-MATRIX (FH) simulation for a ROOM WITH WINDOWS IN MULTIPLE DIRECTIONS.

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 7552

#NOTES:
#	Set the current working directory to "room2" before running the commands below.
#	Commands are separated by empty line-breaks.


#Create octree
oconv materials.rad room.rad overhang/Grates.rad > octrees/roomFmtx.oct


#V matrix for Illuminance
#The value of -y 93 corresponds to the 93 grid points in the file points.txt.
rfluxmtx -v -I+ -ab 4 -ad 10000 -lw 1e-4 -n 16 -y 93  - objects/Clerestory1.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vFCl1.mtx

rfluxmtx -v -I+ -ab 4 -ad 10000 -lw 1e-4 -n 16 -y 93  - objects/Clerestory2.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vFCl2.mtx

rfluxmtx -v -I+ -ab 4 -ad 10000 -lw 1e-4 -n 16 -y 93  - objects/Clerestory3.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vFCl3.mtx

rfluxmtx -v -I+ -ab 4 -ad 10000 -lw 1e-4 -n 16 -y 93  - objects/Glazing1.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vFGl1.mtx

rfluxmtx -v -I+ -ab 4 -ad 10000 -lw 1e-4 -n 16 -y 93  - objects/Glazing2.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vFGl2.mtx

rfluxmtx -v -I+ -ab 4 -ad 10000 -lw 1e-4 -n 16 -y 93  - objects/Glazing3.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vFGl3.mtx



#V matrix for Images.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/FCl1%03d.hdr -ab 4 -ad 10000 -lw 1e-4 -c 9 -n 16 - objects/Clerestory1.rad -i octrees/roomFmtx.oct 

vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/FCl2%03d.hdr -ab 4 -ad 10000 -lw 1e-4 -c 9 -n 16 - objects/Clerestory2.rad -i octrees/roomFmtx.oct

vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/FCl3%03d.hdr -ab 4 -ad 10000 -lw 1e-4 -c 9 -n 16 - objects/Clerestory3.rad -i octrees/roomFmtx.oct

vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/FGl1%03d.hdr -ab 4 -ad 10000 -lw 1e-4 -c 9 -n 16 - objects/Glazing1.rad -i octrees/roomFmtx.oct

vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/FGl2%03d.hdr -ab 4 -ad 10000 -lw 1e-4 -c 9 -n 16 - objects/Glazing2.rad -i octrees/roomFmtx.oct

vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/FGl3%03d.hdr -ab 4 -ad 10000 -lw 1e-4 -c 9 -n 16 - objects/Glazing3.rad -i octrees/roomFmtx.oct 





#Calculating F Matrices and Daylight Matrices.

##Calculating a single daylight matrix.
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-3 -c 5000 -n 16 fports/FH.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFH.dmx


##Calculating F matrix for Glazing1
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 objects/Glazing1.rad fports/FH.rad -i octrees/roomFmtx.oct > matrices/fmtx/FHGl1.fmx

##Calculating the resultant matrix for Glazing1
dctimestep -of matrices/fmtx/FHGl1.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHGl1.dfmx


##Calculating F matrix for Glazing2
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 objects/Glazing2.rad fports/FH.rad -i octrees/roomFmtx.oct > matrices/fmtx/FHGl2.fmx

##Calculating the resultant matrix for Glazing2
dctimestep -of matrices/fmtx/FHGl2.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHGl2.dfmx

##Calculating F matrix for Glazing3
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 objects/Glazing3.rad fports/FH.rad -i octrees/roomFmtx.oct > matrices/fmtx/FHGl3.fmx

##Calculating the resultant matrix for Glazing3
dctimestep -of matrices/fmtx/FHGl3.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHGl3.dfmx


##Calculating F matrix for Clerestory1
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 objects/Clerestory1.rad fports/FH.rad -i octrees/roomFmtx.oct > matrices/fmtx/FHCl1.fmx

##Calculating the resultant matrix for Clerestory1
dctimestep -of matrices/fmtx/FHCl1.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHCl1.dfmx

##Calculating F matrix for Clerestory2
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 objects/Clerestory2.rad fports/FH.rad -i octrees/roomFmtx.oct > matrices/fmtx/FHCl2.fmx

##Calculating the resultant matrix for Clerestory2
dctimestep -of matrices/fmtx/FHCl2.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHCl2.dfmx

##Calculating F matrix for Clerestory3
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 objects/Clerestory3.rad fports/FH.rad -i octrees/roomFmtx.oct > matrices/fmtx/FHCl3.fmx

##Calculating the resultant matrix for Clerestory3
dctimestep -of matrices/fmtx/FHCl3.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHCl3.dfmx




#Create sky-vectors
##Point-in-time sky vector
gendaylit 3 20 10:30EDT -m 75 -o 73.96 -a 40.78 -W 706 162 | genskyvec -m 1 > skyVectors/NYC_Per.vec



#RESULTS

#Generate images for individual window groups.
dctimestep matrices/vmtx/hdr/FCl1%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHCl1.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHCl1.hdr

dctimestep matrices/vmtx/hdr/FCl2%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHCl2.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHCl2.hdr

dctimestep matrices/vmtx/hdr/FCl3%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHCl3.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHCl3.hdr

dctimestep matrices/vmtx/hdr/FGl1%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHGl1.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHGl1.hdr

dctimestep matrices/vmtx/hdr/FGl2%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHGl2.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHGl2.hdr

dctimestep matrices/vmtx/hdr/FGl3%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHGl3.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHGl3.hdr

#Combine results from window groups together.
pcomb results/fmtx/windowGroups/FHCl1.hdr results/fmtx/windowGroups/FHCl2.hdr results/fmtx/windowGroups/FHCl3.hdr results/fmtx/windowGroups/FHGl1.hdr results/fmtx/windowGroups/FHGl2.hdr results/fmtx/windowGroups/FHGl3.hdr > results/fmtx/FH.hdr


#Generate illuminance results for individual window groups.
dctimestep matrices/vmtx/vFCl1.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHCl1.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHCl1.ill

dctimestep matrices/vmtx/vFCl2.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHCl2.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHCl2.ill

dctimestep matrices/vmtx/vFCl3.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHCl3.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHCl3.ill

dctimestep matrices/vmtx/vFGl1.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHGl1.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHGl1.ill

dctimestep matrices/vmtx/vFGl2.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHGl2.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHGl2.ill

dctimestep matrices/vmtx/vFGl3.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHGl3.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHGl3.ill

#Combine results from window groups together.
rmtxop results/fmtx/windowGroups/FHCl1.ill + results/fmtx/windowGroups/FHCl2.ill + results/fmtx/windowGroups/FHCl3.ill + results/fmtx/windowGroups/FHGl1.ill + results/fmtx/windowGroups/FHGl2.ill + results/fmtx/windowGroups/FHGl3.ill > results/fmtx/FH.ill

#Done! (results can be found in results/fmtx folder).