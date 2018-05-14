#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)

#Commands for running an FACADE-MATRIX (FH) simulation for a ROOM WITH WINDOWS IN MULTIPLE DIRECTIONS.
#This simulation is for a space without an overhang/shading-device. 
#The purpose of this simulation is to demonstrate phase-reuse. Therefore, results from previous simulations will be reused to reduce the simulation runtime.
#The simulations in the file FH.sh must be completed before running the commands on this file.

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 43

#NOTES:
#	Set the current working directory to "room2" before running the commands below.
#	Commands are separated by empty line-breaks.


#Create octree
oconv materials.rad room.rad > octrees/roomFmtxN.oct


#Calculating F Matrices and Daylight Matrices.

#Note that the Daylight Matrix matrices/dmtx/DFH.dmx has already been created through the commands in the file FH.sh

##Calculating F matrix for Glazing1
rfluxmtx -v -ff -ab 4 -ad 1000 -lw 1e-3 -c 1000 -n 16 objects/Glazing1.rad fports/FH.rad -i octrees/roomFmtxN.oct > matrices/fmtx/FHGl1N.fmx

##Calculating the resultant matrix for Glazing1
dctimestep -of matrices/fmtx/FHGl1N.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHGl1N.dfmx


##Calculating F matrix for Glazing2
rfluxmtx -v -ff -ab 4 -ad 1000 -lw 1e-3 -c 1000 -n 16 objects/Glazing2.rad fports/FH.rad -i octrees/roomFmtxN.oct > matrices/fmtx/FHGl2N.fmx

##Calculating the resultant matrix for Glazing2
dctimestep -of matrices/fmtx/FHGl2N.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHGl2N.dfmx

##Calculating F matrix for Glazing3
dctimestep -of matrices/fmtx/FHGl3N.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHGl3N.dfmx


##Calculating F matrix for Clerestory1
rfluxmtx -v -ff -ab 4 -ad 1000 -lw 1e-3 -c 1000 -n 16 objects/Clerestory1.rad fports/FH.rad -i octrees/roomFmtxN.oct > matrices/fmtx/FHCl1N.fmx

##Calculating the resultant matrix for Clerestory1
dctimestep -of matrices/fmtx/FHCl1N.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHCl1N.dfmx

##Calculating F matrix for Clerestory2
rfluxmtx -v -ff -ab 4 -ad 1000 -lw 1e-3 -c 1000 -n 16 objects/Clerestory2.rad fports/FH.rad -i octrees/roomFmtxN.oct > matrices/fmtx/FHCl2N.fmx

##Calculating the resultant matrix for Clerestory2
dctimestep -of matrices/fmtx/FHCl2N.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHCl2N.dfmx

##Calculating F matrix for Clerestory3
rfluxmtx -v -ff -ab 4 -ad 1000 -lw 1e-3 -c 1000 -n 16 objects/Clerestory3.rad fports/FH.rad -i octrees/roomFmtxN.oct > matrices/fmtx/FHCl3N.fmx

##Calculating the resultant matrix for Clerestory3
dctimestep -of matrices/fmtx/FHCl3N.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFHCl3N.dfmx



#RESULTS

#Generate images for individual window groups.
dctimestep matrices/vmtx/hdr/FCl1%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHCl1N.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHCl1N.hdr

dctimestep matrices/vmtx/hdr/FCl2%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHCl2N.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHCl2N.hdr

dctimestep matrices/vmtx/hdr/FCl3%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHCl3N.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHCl3N.hdr

dctimestep matrices/vmtx/hdr/FGl1%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHGl1N.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHGl1N.hdr

dctimestep matrices/vmtx/hdr/FGl2%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHGl2N.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHGl2N.hdr

dctimestep matrices/vmtx/hdr/FGl3%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/DFHGl3N.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FHGl3N.hdr

#Combine results from window groups together.
pcomb results/fmtx/windowGroups/FHCl1N.hdr results/fmtx/windowGroups/FHCl2N.hdr results/fmtx/windowGroups/FHCl3N.hdr results/fmtx/windowGroups/FHGl1N.hdr results/fmtx/windowGroups/FHGl2N.hdr results/fmtx/windowGroups/FHGl3N.hdr > results/fmtx/FHN.hdr




#Generate illuminance results for individual window groups.
dctimestep matrices/vmtx/vFCl1.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHCl1N.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHCl1N.ill

dctimestep matrices/vmtx/vFCl2.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHCl2N.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHCl2N.ill

dctimestep matrices/vmtx/vFCl3.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHCl3N.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHCl3N.ill

dctimestep matrices/vmtx/vFGl1.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHGl1N.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHGl1N.ill

dctimestep matrices/vmtx/vFGl2.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHGl2N.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHGl2N.ill

dctimestep matrices/vmtx/vFGl3.mtx  matrices/tmtx/clear.xml matrices/dmtx/DFHGl3N.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FHGl3N.ill

#Combine results from window groups together.
rmtxop results/fmtx/windowGroups/FHCl1N.ill + results/fmtx/windowGroups/FHCl2N.ill + results/fmtx/windowGroupsFHCl3N.ill + results/fmtx/windowGroups/FHGl1N.ill + results/fmtx/windowGroupsFHGl2N.ill + results/fmtx/windowGroups/FHGl3N.ill > results/fmtx/FHN.ill


#Done! (results can be found in results/fmtx folder).
