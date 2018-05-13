#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)


#Commands for running a SIX-PHASE SIMULATION (Which implies a FACADE-MATRIX SIMULATION WITH DIRECT-SUN CORRECTION.)
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 3391

#NOTES:
#	Set the current working directory to "room" before running the commands below.
#	Commands are separated by empty line-breaks.
#	The epw file used in the current tutorial contains only 40 timesteps so that the simulations can completed in a reasonable time.


#Ulimit needs to be set to a high enough value so that multiple files can be opened simulataneously.
#For the present simulation, maximum number of open files will be 5165.
ulimit -n 9999

#PART1 : Facade-Matrix (FH) Simulation.
## Create an octree
oconv -f materials.rad room.rad overhang/aluminiumGrate.rad > octrees/roomFmtx.oct

##View-Matrix for Illuminance
rfluxmtx -v -I+ -ab 4 -ad 5000 -lw 0.0002 -n 16 -y 100  - objects/GlazingVmtx.rad -i octrees/roomFmtx.oct < points.txt > matrices/vmtx/vF.mtx


##View-Matrix for Images.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/southF%03d.hdr -ab 4 -ad 1000 -lw 1e-4 -c 9 -n 16 - objects/GlazingVmtx.rad -i octrees/roomFmtx.oct


##Create Facade-Matrices and Daylight-Matrices. 

###Creating a FH type Facade-Matrix
rfluxmtx -v -ff -ab 4 -ad 1000 -lw 0.001 -c 1000 -n 16 objects/GlazingVmtx.rad fports/FH.rad -i octrees/roomFmtx.oct > matrices/fmtx/FH.fmx

###Creating a corresponding Daylight-Matrix
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 0.001 -c 1000 -n 16 fports/FH.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFH.dmx

##Multiply F and D Matrix into a single matrix.
dctimestep -of matrices/fmtx/FH.fmx matrices/dmtx/DFH.dmx > matrices/dmtx/DFH.dfmx


##Create sky-vectors
###Convert EPW file to a WEA file.
epw2wea assets/USA_NY_New.York-Central.Park.725033_TMY3m.epw assets/NYC.wea

###Create an annual sky matrix with 145 patches.
gendaymtx -m 1 assets/NYC.wea > skyVectors/NYC.smx

##RESULTS

###Illuminance
dctimestep  matrices/vmtx/vF.mtx matrices/tmtx/clear.xml matrices/dmtx/DFH.dfmx skyVectors/NYC.smx | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/6ph/fmtx/FHAnnual.ill

###Images
dctimestep -o results/6ph/fmtx/hdr/southFH%04d.hdr matrices/vmtx/hdr/southF%03d.hdr matrices/tmtx/clear.xml matrices/dmtx/DFH.dfmx skyVectors/NYC.smx

######################### F-MATRIX SIMULATION ENDS######################################


#PART2 : DIRECT SOLAR PART OF THE F-MATRIX SIMULATION.

##Create a black octree for direct calculation.
oconv -f materialBlack.rad roomBlack.rad overhang/aluminiumGrate.rad > octrees/roomFmtxDirect.oct


##Direct View matrix for Illuminance 
rfluxmtx -v -I+ -ab 1 -ad 5000 -lw 0.0002 -n 16 -y 100  - objects/GlazingVmtx.rad -i octrees/roomFmtxDirect.oct < points.txt > matrices/vmtxd/vFH.mtx

##Direct View matrix for Images.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc -i `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtxd/hdrIllum/southFH%03d.hdr -ab 1 -ad 1000 -lw 1e-4 -c 9 -n 16 - objects/GlazingVmtx.rad -i octrees/roomFmtxDirect.oct

##Create an octree with opaque glazing for material map.
oconv -f materials.rad room.rad objects/GlazingVmtx.rad overhang/aluminiumGrate.rad > octrees/materialMapFHMatrixDirect.oct

##Create the material map.
rpict -x 400 -y 400 -ps 1 -av 0.31831 0.31831 0.31831 -ab 0 -vf views/south.vf octrees/materialMapFHMatrixDirect.oct > matrices/vmtxd/materialMapSouthFH.hdr

##Calculate luminance-based images from illuminance based images using material maps.
for idx in {00..145}
do
	pcomb -h -e 'ro=ri(1)*ri(2);go=gi(1)*gi(2);bo=bi(1)*bi(2)' -o matrices/vmtxd/materialMapSouthFH.hdr -o matrices/vmtxd/hdrIllum/southFH${idx}.hdr > matrices/vmtxd/hdrLum/southFH${idx}.hdr
done

##FH direct matrix
rfluxmtx -v -ff  -ab 0 -ad 1000 -lw 0.001 -c 1000 -n 16 objects/GlazingVmtx.rad fports/FH.rad -i octrees/roomFmtxDirect.oct > matrices/fmtxd/FH.fmx

##D matrix
rfluxmtx -v -ff  -ab 0 -ad 1000 -lw 0.001 -c 1000 -n 16 fports/FH.rad skyDomes/skyglow.rad -i octrees/roomFmtxDirect.oct > matrices/dmtxd/daylightFH.dmx

##Combine FH matrix and D matrix into a single matrix 
dctimestep -of matrices/fmtxd/FH.fmx matrices/dmtxd/daylightFH.dmx > matrices/dmtxd/daylightFH.dfmx

##Generate a direct-only sky matrix with 145 patches.
gendaymtx -m 1 -d assets/NYC.wea > skyVectors/NYCd.smx

##RESULTS
###Illuminance
dctimestep  matrices/vmtxd/vFH.mtx matrices/tmtx/clear.xml matrices/dmtxd/daylightFH.dfmx skyVectors/NYCd.smx | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/6ph/fmtxd/FmtxFHD.ill

###Images
dctimestep -o results/6ph/fmtxd/hdr/southFH%04d.hdr matrices/vmtxd/hdrLum/southFH%03d.hdr matrices/tmtx/clear.xml matrices/dmtxd/daylightFH.dfmx skyVectors/NYCd.smx

######################### DIRECT SOLAR PART OF THE F-MATRIX SIMULATION ENDS



#PART3 : DIRECT SUN COEFFICIENTS SIMULATION

##Create sun primitive definition for solar calculations.
echo "void light solar 0 0 3 1e6 1e6 1e6" > skies/suns.rad

##Create solar discs and corresponding modifiers for 5185 suns corresponding to a Reinhart MF:6 subdivision.
##Windows users, who are unlikely to be able to run a MF:6 simulation, should set "cnt 5185" to "cnt 145" and "MF:6" to "MF:1".
cnt 5185 | rcalc -e MF:6 -f reinsrc.cal -e Rbin=recno -o 'solar source sun 0 0 4 ${Dx} ${Dy} ${Dz} 0.533' >> skies/suns.rad

##Create an octree black octree, shading device with proxy BSDFs and solar discs.
oconv -f materialBlack.rad roomBlack.rad skies/suns.rad materials.rad objects/Glazing.rad overhang/aluminiumGrate.rad > octrees/sunCoefficientsFH.oct

##Calculate illuminance sun coefficients for images for the view file south.vf.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -ff | rcontrib  -w- -i -ab 1 -ad 256 -lw 1.0e-3 -dc 1 -dt 0 -dj 0 -ffc -n 16 `vwrays -vf views/south.vf -x 400 -y 400 -d`  -o matrices/cds/hdrIllSpace/southM6FH%04d.hdr -e MF:6 -f reinhart.cal -b rbin -bn Nrbins -m solar octrees/sunCoefficientsFH.oct

##Calculate illuminance sun coefficients for illuminance calculations.
rcontrib -I+ -ab 1 -y 100 -n 16 -ad 256 -lw 1.0e-3 -dc 1 -dt 0 -dj 0 -faf -e MF:6 -f reinhart.cal -b rbin -bn Nrbins -m solar octrees/sunCoefficientsFH.oct < points.txt > matrices/cds/cdsFH.mtx


##Create an octree for the material map
oconv -f materials.rad room.rad objects/GlazingVmtxBlack.rad > octrees/materialMapFHcds.oct

##Create the material map
rpict -x 400 -y 400 -ps 1 -av 0.31831 0.31831 0.31831 -ab 0 -vf views/south.vf octrees/materialMapFHcds.oct > matrices/cds/materialMapSouthFH.hdr


#Calculate luminance sun coefficients for images for the view file south.vf.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -ff | rcontrib  -w- -ab 1 -ad 256 -lw 1.0e-3 -dc 1 -dt 0 -dj 0 -ffc -n 16 `vwrays -vf views/south.vf -x 400 -y 400 -d`  -o matrices/cds/hdrLumFacade/southM6FH%04d.hdr -e MF:6 -f reinhart.cal -b rbin -bn Nrbins -m solar octrees/sunCoefficientsFH.oct

#Generate luminance-based images by multiplying the material map with the illuminance image and then add the sun coefficients
for idx in {0000..5185}
do
	pcomb -h -e 'ro=ri(1)*ri(2)+ri(3);go=gi(1)*gi(2)+gi(3);bo=bi(1)*bi(2)+bi(3)' -o matrices/cds/materialMapSouthFH.hdr -o matrices/cds/hdrIllSpace/southM6FH${idx}.hdr -o matrices/cds/hdrLumFacade/southM6FH${idx}.hdr > matrices/cds/hdr/southFH${idx}.hdr
done

#Generate a sun-matrix for the sun coefficients calculation.
gendaymtx -5 0.533 -d -m 6 assets/NYC.wea > skyVectors/NYCsun.smx

###Images
dctimestep -o results/6ph/cds/hdr/southFH%04d.hdr matrices/cds/hdr/southFH%04d.hdr skyVectors/NYCsun.smx

###Illuminance
dctimestep  matrices/cds/cdsFH.mtx skyVectors/NYCsun.smx | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/6ph/cds/cdsFH.ill

######################### DIRECT SUN COEFFICIENTS SIMULATION ENDS



#Combine Image results using the 5 Phase Equation VTDs - VdTDdsd +CdsDsun (The Five Phase equation is equally applicable to the 6 Phase Method).
for idx in {0001..0040}
do
	pcomb -h -e 'ro=ri(1)-ri(2)+ri(3);go=gi(1)-gi(2)+gi(3);bo=bi(1)-bi(2)+bi(3)' -o results/6ph/fmtx/hdr/southFH${idx}.hdr -o results/6ph/fmtxd/hdr/southFH${idx}.hdr -o -o results/6ph/cds/hdr/southFH${idx}.hdr > results/6ph/hdr/south${idx}.hdr

done


#Combine illuminance results using the 5 Phase equation.
rmtxop results/6ph/fmtx/FHAnnual.ill + -s -1 results/6ph/fmtxd/FmtxFHD.ill + results/6ph/cds/cdsFH.ill > results/6ph/6Phannual.ill

#Done (results can be found in the results/6ph folder)!
