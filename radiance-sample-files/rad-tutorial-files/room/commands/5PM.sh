#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)

#Commands for running a FIVE-PHASE SIMULATION.
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 12501

#Ulimit needs to be set to a high enough value so that multiple files can be opened simulataneously.
#For the present simulation, maximum number of open files will be 5165.
#This command is applicable to Unix-like systems only. On Windows the number of simultaneous files is limited to 512.
ulimit -n 9999


#Set the current working directory to "room" before running the commands below.
#Commands are separated by empty line-breaks.


#PART1 : THREE PHASE METHOD SIMULATION.
##Create octree
oconv -f materials.rad room.rad > octrees/room3ph.oct

##View matrix for Illuminance (The value for -y 100 is derived from the 100 grid points inside the file points.txt).
rfluxmtx -v -I+ -ab 4 -ad 5000 -lw 0.0002 -n 16 -y 100  - objects/GlazingVmtx.rad -i octrees/room3ph.oct < points.txt > matrices/vmtx/v.mtx

##View matrix for Images.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/south%03d.hdr -ab 4 -ad 1000 -lw 1e-4 -c 9 -n 16 - objects/GlazingVmtx.rad -i octrees/room3ph.oct
vwrays -vf views/eastBlinds.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc `vwrays -vf views/eastBlinds.vf -x 400 -y 400 -d` -o matrices/vmtx/hdr/eastBlinds%03d.hdr -ab 4 -ad 1000 -lw 1e-4 -c 9 -n 16 - objects/GlazingVmtx.rad -i octrees/room3ph.oct


##D matrix
rfluxmtx -v -ff  -ab 4 -ad 1000 -lw 0.001 -c 1000 -n 16 objects/GlazingVmtx.rad skyDomes/skyglow.rad -i octrees/room3ph.oct > matrices/dmtx/daylight.dmx


##Create sky-vectors

##Annual sky-matrix
epw2wea assets/USA_NY_New.York-Central.Park.725033_TMY3m.epw assets/NYC.wea

###Create an annual sky matrix with 145 patches.
gendaymtx -m 1 assets/NYC.wea > skyVectors/NYC.smx


##RESULTS

###Illuminance
dctimestep  matrices/vmtx/v.mtx matrices/tmtx/blinds.xml matrices/dmtx/daylight.dmx skyVectors/NYC.smx | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/5ph/3ph/3phAnnual.ill

###Images

###Results for views/south.vf
dctimestep -o results/5ph/3ph/hdr/south%04d.hdr matrices/vmtx/hdr/south%03d.hdr matrices/tmtx/blinds.xml matrices/dmtx/daylight.dmx skyVectors/NYC.smx

###Results for views/eastBlinds.vf
dctimestep -o results/5ph/3ph/hdr/eastBlinds%04d.hdr matrices/vmtx/hdr/eastBlinds%03d.hdr matrices/tmtx/blinds.xml matrices/dmtx/daylight.dmx skyVectors/NYC.smx

######################### THREE PHASE SIMULATION ENDS


#PART2 : DIRECT SOLAR PART OF THE THREE PHASE SIMULATION.

##Create a black octree for direct calculation.
oconv -f materialBlack.rad roomBlack.rad > octrees/room3phDirect.oct


##Direct View matrix for Illuminance 
rfluxmtx -v -I+ -ab 1 -ad 5000 -lw 0.0002 -n 16 -y 100  - objects/GlazingVmtx.rad -i octrees/room3phDirect.oct < points.txt > matrices/vmtxd/v.mtx

##Direct View matrix for Images.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -ffc -i `vwrays -vf views/south.vf -x 400 -y 400 -d` -o matrices/vmtxd/hdrIllum/south%03d.hdr -ab 1 -ad 1000 -lw 1e-4 -c 9 -n 16 - objects/GlazingVmtx.rad -i octrees/room3phDirect.oct
vwrays -vf views/eastBlinds.vf -x 400 -y 400 -pj 0.7 -c 9 -ff | rfluxmtx -v -i -ffc `vwrays -vf views/eastBlinds.vf -x 400 -y 400 -d` -o matrices/vmtxd/hdrIllum/eastBlinds%03d.hdr -ab 1 -ad 1000 -lw 1e-4 -c 9 -n 16 - objects/GlazingVmtx.rad -i octrees/room3phDirect.oct


##Create an octree with opaque glazing for material map.
oconv -f materials.rad room.rad objects/GlazingVmtx.rad > octrees/materialMap3PhaseDirect.oct
rpict -x 400 -y 400 -ps 1 -av 0.31831 0.31831 0.31831 -ab 0 -vf views/south.vf octrees/materialMap3PhaseDirect.oct > matrices/vmtxd/materialMapSouth.hdr
rpict -x 400 -y 400 -ps 1 -av 0.31831 0.31831 0.31831 -ab 0 -vf views/eastBlinds.vf octrees/materialMap3PhaseDirect.oct > matrices/vmtxd/materialMapEastBlinds.hdr

#Calculate luminance-based images from illuminance based images using material maps.
for idx in {00..145}
do
	pcomb -h -e 'ro=ri(1)*ri(2);go=gi(1)*gi(2);bo=bi(1)*bi(2)' -o matrices/vmtxd/materialMapSouth.hdr -o matrices/vmtxd/hdrIllum/south${idx}.hdr > matrices/vmtxd/hdrLum/south${idx}.hdr
	
	pcomb -h -e 'ro=ri(1)*ri(2);go=gi(1)*gi(2);bo=bi(1)*bi(2)' -o matrices/vmtxd/materialMapEastBlinds.hdr -o matrices/vmtxd/hdrIllum/eastBlinds${idx}.hdr > matrices/vmtxd/hdrLum/eastBlinds${idx}.hdr
done


##D matrix
rfluxmtx -v -ff  -ab 0 -ad 1000 -lw 0.001 -c 1000 -n 16 objects/GlazingVmtx.rad skyDomes/skyglow.rad -i octrees/room3phDirect.oct > matrices/dmtxd/daylight.dmx

##A direct-only sky-matrix
gendaymtx -m 1 -d assets/NYC.wea > skyVectors/NYCd.smx

##RESULTS

###Illuminance
dctimestep  matrices/vmtxd/v.mtx matrices/tmtx/blinds.xml matrices/dmtxd/daylight.dmx skyVectors/NYCd.smx | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/5ph/3phdir/3phAnnual.ill

###Images
dctimestep -o results/5ph/3phdir/hdr/eastBlinds%04d.hdr matrices/vmtxd/hdrLum/eastBlinds%03d.hdr matrices/tmtx/blinds.xml matrices/dmtxd/daylight.dmx skyVectors/NYCd.smx

###Images
dctimestep -o results/5ph/3phdir/hdr/south%04d.hdr matrices/vmtxd/hdrLum/south%03d.hdr matrices/tmtx/blinds.xml matrices/dmtxd/daylight.dmx skyVectors/NYCd.smx
######################### DIRECT SOLAR PART OF THE THREE PHASE SIMULATION ENDS.



#PART3 : DIRECT SUN COEFFICIENTS SIMULATION

##Create sun primitive definition for solar calculations.
echo "void light solar 0 0 3 1e6 1e6 1e6" > skies/suns.rad

##Create solar discs and corresponding modifiers for 5185 suns corresponding to a Reinhart MF:6 subdivision.
##Windows users, who are unlikely to be able to run a MF:6 simulation, should set "cnt 5185" to "cnt 145" and "MF:6" to "MF:1".
cnt 5185 | rcalc -e MF:6 -f reinsrc.cal -e Rbin=recno -o 'solar source sun 0 0 4 ${Dx} ${Dy} ${Dz} 0.533' >> skies/suns.rad

##Create an octree black octree, shading device with proxy BSDFs and solar discs.
oconv -f materialBlack.rad roomBlack.rad skies/suns.rad blinds/blindsWithProxy.rad > octrees/sunCoefficients.oct



##Calculate illuminance sun coefficients for images for the view file south.vf.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -ff | rcontrib  -w- -i -ab 1 -ad 256 -lw 1.0e-3 -dc 1 -dt 0 -dj 0 -ffc -n 16 `vwrays -vf views/south.vf -x 400 -y 400 -d`  -o matrices/cds/hdrIllSpace/southM6%04d.hdr -e MF:6 -f reinhart.cal -b rbin -bn Nrbins -m solar octrees/sunCoefficients.oct

##Calculate illuminance sun coefficients for images for the view file eastBlinds.vf.
vwrays -vf views/eastBlinds.vf -x 400 -y 400 -pj 0.7 -ff | rcontrib  -w- -i -ab 1 -ad 256 -lw 1.0e-3 -dc 1 -dt 0 -dj 0 -ffc -n 16 `vwrays -vf views/eastBlinds.vf -x 400 -y 400 -d`  -o matrices/cds/hdrIllSpace/eastBlindsM6%04d.hdr -e MF:6 -f reinhart.cal -b rbin -bn Nrbins -m solar octrees/sunCoefficients.oct

##Calculate illuminance sun coefficients for illuminance calculations.
rcontrib -I+ -ab 1 -y 100 -n 16 -ad 256 -lw 1.0e-3 -dc 1 -dt 0 -dj 0 -faf -e MF:6 -f reinhart.cal -b rbin -bn Nrbins -m solar octrees/sunCoefficients.oct < points.txt > matrices/cds/cds.mtx


##Create a material map
oconv -f materials.rad room.rad objects/GlazingVmtxBlack.rad > octrees/materialMap5Phase.oct
rpict -x 400 -y 400 -ps 1 -av 0.31831 0.31831 0.31831 -ab 0 -vf views/south.vf octrees/materialMap3PhaseDirect.oct > matrices/cds/materialMapSouth.hdr
rpict -x 400 -y 400 -ps 1 -av 0.31831 0.31831 0.31831 -ab 0 -vf views/eastBlinds.vf octrees/materialMap3PhaseDirect.oct > matrices/cds/materialMapEastBlinds.hdr


##Calculate luminance sun coefficients for images for the view file south.vf.
vwrays -vf views/south.vf -x 400 -y 400 -pj 0.7 -ff | rcontrib  -w- -ab 1 -ad 256 -lw 1.0e-3 -dc 1 -dt 0 -dj 0 -ffc -n 16 `vwrays -vf views/south.vf -x 400 -y 400 -d`  -o matrices/cds/hdrLumFacade/southM6%04d.hdr -e MF:6 -f reinhart.cal -b rbin -bn Nrbins -m solar octrees/sunCoefficients.oct

##Calculate luminance sun coefficients for images for the view file eastBlinds.vf.
vwrays -vf views/eastBlinds.vf -x 400 -y 400 -pj 0.7 -ff | rcontrib  -w- -ab 1 -ad 256 -lw 1.0e-3 -dc 1 -dt 0 -dj 0 -ffc -n 16 `vwrays -vf views/eastBlinds.vf -x 400 -y 400 -d`  -o matrices/cds/hdrLumFacade/eastBlindsM6%04d.hdr -e MF:6 -f reinhart.cal -b rbin -bn Nrbins -m solar octrees/sunCoefficients.oct

##Calculate luminance sun coefficients for images for the view files views/eastBlinds.vf and views/south.vf.
for idx in {0000..5185}
do
	pcomb -h -e 'ro=ri(1)*ri(2)+ri(3);go=gi(1)*gi(2)+gi(3);bo=bi(1)*bi(2)+bi(3)' -o matrices/cds/materialMapSouth.hdr -o matrices/cds/hdrIllSpace/southM6${idx}.hdr -o matrices/cds/hdrLumFacade/southM6${idx}.hdr > matrices/cds/hdr/south${idx}.hdr
	pcomb -h -e 'ro=ri(1)*ri(2)+ri(3);go=gi(1)*gi(2)+gi(3);bo=bi(1)*bi(2)+bi(3)' -o matrices/cds/materialMapEastBlinds.hdr -o matrices/cds/hdrIllSpace/eastBlindsM6${idx}.hdr -o matrices/cds/hdrLumFacade/eastBlindsM6${idx}.hdr > matrices/cds/hdr/eastBlinds${idx}.hdr
done

##Generate a sun-matrix for the sun coefficients calculation.
gendaymtx -5 0.533 -d -m 6 assets/NYC.wea > skyVectors/NYCsun.smx

###Images
dctimestep -o results/5ph/cds/hdr/eastBlinds%04d.hdr matrices/cds/hdr/eastBlinds%04d.hdr skyVectors/NYCsun.smx
dctimestep -o results/5ph/cds/hdr/south%04d.hdr matrices/cds/hdr/south%04d.hdr skyVectors/NYCsun.smx

###Illuminance
dctimestep  matrices/cds/cds.mtx skyVectors/NYCsun.smx | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/5ph/cds/cds.ill

######################### DIRECT SUN COEFFICIENTS SIMULATION ENDS


##Combine Image results using the 5 Phase Equation.
for idx in {0001..0040}
do
	pcomb -h -e 'ro=ri(1)-ri(2)+ri(3);go=gi(1)-gi(2)+gi(3);bo=bi(1)-bi(2)+bi(3)' -o results/5ph/3ph/hdr/south${idx}.hdr -o results/5ph/3phdir/hdr/south${idx}.hdr -o -o results/5ph/cds/hdr/south${idx}.hdr > results/5ph/hdr/south${idx}.hdr

	pcomb -h -e 'ro=ri(1)-ri(2)+ri(3);go=gi(1)-gi(2)+gi(3);bo=bi(1)-bi(2)+bi(3)' -o results/5ph/3ph/hdr/eastBlinds${idx}.hdr -o results/5ph/3phdir/hdr/eastBlinds${idx}.hdr -o -o results/5ph/cds/hdr/eastBlinds${idx}.hdr > results/5ph/hdr/eastBlinds${idx}.hdr
done


#Combine illuminance results using the 5 Phase equation.
rmtxop results/5ph/3ph/3phAnnual.ill + -s -1 results/5ph/3phdir/3phAnnual.ill + results/5ph/cds/cds.ill > results/5ph/5Phannual.ill


#Done! (results can be found in the results/5ph folder)