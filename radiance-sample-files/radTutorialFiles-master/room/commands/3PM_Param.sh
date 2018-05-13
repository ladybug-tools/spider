#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)

#Commands for running PARAMETRIC SIMULATIONS using THE THREE-PHASE METHOD. 
#The commands listed in 3PM.sh should be run prior to running commands in this file.
#Results from previous simulations can thus be used to save computational effort.
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 2

#NOTES:
#	Set the current working directory to "room" before running the commands below.
#	Commands are separated by empty line-breaks.


#SIMULATION WITH VENETIAN BLINDS AT 0 DEG.
##Results for illuminance.
dctimestep matrices/vmtx/v.mtx matrices/tmtx/ven0.xml matrices/dmtx/daylight.dmx skyVectors/NYC_Per.vec | rmtxop -fa -c 47.4 119.9 11.6 - > results/3ph/3phVen0.ill

##Results for images.
dctimestep matrices/vmtx/hdr/south%03d.hdr matrices/tmtx/ven0.xml matrices/dmtx/daylight.dmx skyVectors/NYC_Per.vec > results/3ph/3phVen0.hdr


#SIMULATION WITH VENETIAN BLINDS AT 45 DEG.
##Results for illuminance.
dctimestep matrices/vmtx/v.mtx matrices/tmtx/ven45.xml matrices/dmtx/daylight.dmx skyVectors/NYC_Per.vec | rmtxop -fa -c 47.4 119.9 11.6 - > results/3ph/3phVen45.ill

##Results for images.
dctimestep -h matrices/vmtx/hdr/south%03d.hdr matrices/tmtx/ven45.xml matrices/dmtx/daylight.dmx skyVectors/NYC_Per.vec > results/3ph/3phVen45.hdr

#Done! (The results can be found in the results/3ph folder).