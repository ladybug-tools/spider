#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)

#Commands for running PARAMETRIC SIMULATIONS USING THE FACADE-MATRIX METHOD. 
#The commands below demonstrate this in the context of the F1 approach. This can be expanded to FH and FN approaches as well.
#The commands listed in 4PM_FmtxF1.sh should be run prior to running the commands in this file.
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 7.0

#NOTES:
#	Set the current working directory to "room" before running the commands below.
#	Commands are separated by empty line-breaks.
#	The epw file used in the current tutorial contains only 40 timesteps so that the simulations can completed in a reasonable time.


# Recreate octree with the glass overhang.
oconv -f materials.rad room.rad overhang/diffuseGlass.rad > octrees/roomFmtxDiff.oct

#Recalculate F1 F-Matrix with the new octree.
rfluxmtx -v -ff -ab 4 -ad 1000 -lw 0.001 -c 1000 -n 16 objects/GlazingVmtx.rad fports/F1.rad -i octrees/roomFmtxDiff.oct > matrices/fmtx/F1Diff.fmx

#Recalculate the resultant matrix. The D Marix from F1.sh can be reused as no changes were affected to the Daylight Matrix.
dctimestep -of matrices/fmtx/F1Diff.fmx matrices/dmtx/DF1.dmx > matrices/dmtx/DF1Diff.dfmx



#RESULTS

#Commands for point-in-time calculations are listed below. Commands for annual calculations will be similar to the ones shown in F1.sh

#Images
dctimestep -h matrices/vmtx/hdr/southF%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/DF1Diff.dfmx skyVectors/NYC_Per.vec > results/fmtx/F1Diff.hdr

#Illuminance
dctimestep  matrices/vmtx/vF.mtx matrices/tmtx/clear.xml matrices/dmtx/DF1Diff.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -c 47.4 119.9 11.6 - > results/fmtx/F1Diff.ill

#Done! (results can be found in results/fmtx folder)
