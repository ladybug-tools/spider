#!/usr/bin/env bash

#Lines beginning with # are comments.
#This file is a part of a Radiance Tutorial commissioned by the Lawrence Berkeley National Laboratory.
#Date:19 AUG 2017
#Created by Sarith Subramaniam(sarith@sarith.in)


#Commands for running an FACADE-MATRIX (FN) simulation for a ROOM WITH WINDOWS IN MULTIPLE DIRECTIONS.



#NOTES:
#	Set the current working directory to "room2" before running the commands below.
#	Commands are separated by empty line-breaks.
#	The commands in the file FH.sh must be run before running the commands in this file (to avoid repeating the steps for creating the View Matrix) 

#These commands were tested on a dedicated Intel Xeon CPU E5-2680 (v2 @ 2.80GHz) processor.
#Processor runtime for executing all the commands (in seconds): 3102


#Create 13 F matrices for Glazing1 by using the %s option.
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 -o matrices/fmtx/Gl1%s.fmx objects/Glazing1.rad fports/FN.rad -i octrees/roomFmtx.oct

#Create 13 F matrices for Glazing2 by using the %s option.
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 -o matrices/fmtx/Gl2%s.fmx objects/Glazing2.rad fports/FN.rad -i octrees/roomFmtx.oct

#Create 13 F matrices for Glazing3 by using the %s option.
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 -o matrices/fmtx/Gl3%s.fmx objects/Glazing3.rad fports/FN.rad -i octrees/roomFmtx.oct

#Create 13 F matrices for Clerestory 1 by using the %s option.
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 -o matrices/fmtx/Cl1%s.fmx objects/Clerestory1.rad fports/FN.rad -i octrees/roomFmtx.oct

#Create 13 F matrices for Clerestory 2 by using the %s option.
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 -o matrices/fmtx/Cl2%s.fmx objects/Clerestory2.rad fports/FN.rad -i octrees/roomFmtx.oct

#Create 13 F matrices for Clerestory 3 by using the %s option.
rfluxmtx -v -ff -ab 16 -ad 10000 -lw 1e-4 -c 5000 -n 16 -o matrices/fmtx/Cl3%s.fmx objects/Clerestory3.rad fports/FN.rad -i octrees/roomFmtx.oct

#Create 13 D Matrices
rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNa.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNa.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNb.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNb.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNc.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNc.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNd.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNd.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNe.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNe.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNf.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNf.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNg.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNg.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNh.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNh.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNi.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNi.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNj.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNj.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNk.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNk.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNl.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNl.dmx

rfluxmtx -v -ff -ad 1000 -ab 4 -lw 1e-4 -c 1000 -n 16 fports/FNm.rad skyDomes/skyglow.rad -i octrees/roomFmtx.oct > matrices/dmtx/DFNm.dmx


#Generate resultant matrices for window group Gl1

dctimestep -of matrices/fmtx/Gl1FNa.fmx matrices/dmtx/DFNa.dmx > matrices/fmtx/Gl1FNa.dfmx

dctimestep -of matrices/fmtx/Gl1FNb.fmx matrices/dmtx/DFNb.dmx > matrices/fmtx/Gl1FNb.dfmx

dctimestep -of matrices/fmtx/Gl1FNc.fmx matrices/dmtx/DFNc.dmx > matrices/fmtx/Gl1FNc.dfmx

dctimestep -of matrices/fmtx/Gl1FNd.fmx matrices/dmtx/DFNd.dmx > matrices/fmtx/Gl1FNd.dfmx

dctimestep -of matrices/fmtx/Gl1FNe.fmx matrices/dmtx/DFNe.dmx > matrices/fmtx/Gl1FNe.dfmx

dctimestep -of matrices/fmtx/Gl1FNf.fmx matrices/dmtx/DFNf.dmx > matrices/fmtx/Gl1FNf.dfmx

dctimestep -of matrices/fmtx/Gl1FNg.fmx matrices/dmtx/DFNg.dmx > matrices/fmtx/Gl1FNg.dfmx

dctimestep -of matrices/fmtx/Gl1FNh.fmx matrices/dmtx/DFNh.dmx > matrices/fmtx/Gl1FNh.dfmx

dctimestep -of matrices/fmtx/Gl1FNi.fmx matrices/dmtx/DFNi.dmx > matrices/fmtx/Gl1FNi.dfmx

dctimestep -of matrices/fmtx/Gl1FNj.fmx matrices/dmtx/DFNj.dmx > matrices/fmtx/Gl1FNj.dfmx

dctimestep -of matrices/fmtx/Gl1FNk.fmx matrices/dmtx/DFNk.dmx > matrices/fmtx/Gl1FNk.dfmx

dctimestep -of matrices/fmtx/Gl1FNl.fmx matrices/dmtx/DFNl.dmx > matrices/fmtx/Gl1FNl.dfmx

dctimestep -of matrices/fmtx/Gl1FNm.fmx matrices/dmtx/DFNm.dmx > matrices/fmtx/Gl1FNm.dfmx


#Add all the matrices for the window group Gl1
rmtxop matrices/fmtx/Gl1FNa.dfmx + matrices/fmtx/Gl1FNb.dfmx + matrices/fmtx/Gl1FNc.dfmx + matrices/fmtx/Gl1FNd.dfmx + matrices/fmtx/Gl1FNe.dfmx + matrices/fmtx/Gl1FNf.dfmx + matrices/fmtx/Gl1FNg.dfmx + matrices/fmtx/Gl1FNh.dfmx + matrices/fmtx/Gl1FNi.dfmx + matrices/fmtx/Gl1FNj.dfmx + matrices/fmtx/Gl1FNk.dfmx + matrices/fmtx/Gl1FNl.dfmx + matrices/fmtx/Gl1FNm.dfmx > matrices/dmtx/Gl1FN.dfmx


#Generate resultant matrices for window group Gl2

dctimestep -of matrices/fmtx/Gl2FNa.fmx matrices/dmtx/DFNa.dmx > matrices/fmtx/Gl2FNa.dfmx

dctimestep -of matrices/fmtx/Gl2FNb.fmx matrices/dmtx/DFNb.dmx > matrices/fmtx/Gl2FNb.dfmx

dctimestep -of matrices/fmtx/Gl2FNc.fmx matrices/dmtx/DFNc.dmx > matrices/fmtx/Gl2FNc.dfmx

dctimestep -of matrices/fmtx/Gl2FNd.fmx matrices/dmtx/DFNd.dmx > matrices/fmtx/Gl2FNd.dfmx

dctimestep -of matrices/fmtx/Gl2FNe.fmx matrices/dmtx/DFNe.dmx > matrices/fmtx/Gl2FNe.dfmx

dctimestep -of matrices/fmtx/Gl2FNf.fmx matrices/dmtx/DFNf.dmx > matrices/fmtx/Gl2FNf.dfmx

dctimestep -of matrices/fmtx/Gl2FNg.fmx matrices/dmtx/DFNg.dmx > matrices/fmtx/Gl2FNg.dfmx

dctimestep -of matrices/fmtx/Gl2FNh.fmx matrices/dmtx/DFNh.dmx > matrices/fmtx/Gl2FNh.dfmx

dctimestep -of matrices/fmtx/Gl2FNi.fmx matrices/dmtx/DFNi.dmx > matrices/fmtx/Gl2FNi.dfmx

dctimestep -of matrices/fmtx/Gl2FNj.fmx matrices/dmtx/DFNj.dmx > matrices/fmtx/Gl2FNj.dfmx

dctimestep -of matrices/fmtx/Gl2FNk.fmx matrices/dmtx/DFNk.dmx > matrices/fmtx/Gl2FNk.dfmx

dctimestep -of matrices/fmtx/Gl2FNl.fmx matrices/dmtx/DFNl.dmx > matrices/fmtx/Gl2FNl.dfmx

dctimestep -of matrices/fmtx/Gl2FNm.fmx matrices/dmtx/DFNm.dmx > matrices/fmtx/Gl2FNm.dfmx


#Add all the matrices for the window group Gl2
rmtxop matrices/fmtx/Gl2FNa.dfmx + matrices/fmtx/Gl2FNb.dfmx + matrices/fmtx/Gl2FNc.dfmx + matrices/fmtx/Gl2FNd.dfmx + matrices/fmtx/Gl2FNe.dfmx + matrices/fmtx/Gl2FNf.dfmx + matrices/fmtx/Gl2FNg.dfmx + matrices/fmtx/Gl2FNh.dfmx + matrices/fmtx/Gl2FNi.dfmx + matrices/fmtx/Gl2FNj.dfmx + matrices/fmtx/Gl2FNk.dfmx + matrices/fmtx/Gl2FNl.dfmx + matrices/fmtx/Gl2FNm.dfmx > matrices/dmtx/Gl2FN.dfmx

#Generate resultant matrices for window group Gl3
dctimestep -of matrices/fmtx/Gl3FNa.fmx matrices/dmtx/DFNa.dmx > matrices/fmtx/Gl3FNa.dfmx

dctimestep -of matrices/fmtx/Gl3FNb.fmx matrices/dmtx/DFNb.dmx > matrices/fmtx/Gl3FNb.dfmx

dctimestep -of matrices/fmtx/Gl3FNc.fmx matrices/dmtx/DFNc.dmx > matrices/fmtx/Gl3FNc.dfmx

dctimestep -of matrices/fmtx/Gl3FNd.fmx matrices/dmtx/DFNd.dmx > matrices/fmtx/Gl3FNd.dfmx

dctimestep -of matrices/fmtx/Gl3FNe.fmx matrices/dmtx/DFNe.dmx > matrices/fmtx/Gl3FNe.dfmx

dctimestep -of matrices/fmtx/Gl3FNf.fmx matrices/dmtx/DFNf.dmx > matrices/fmtx/Gl3FNf.dfmx

dctimestep -of matrices/fmtx/Gl3FNg.fmx matrices/dmtx/DFNg.dmx > matrices/fmtx/Gl3FNg.dfmx

dctimestep -of matrices/fmtx/Gl3FNh.fmx matrices/dmtx/DFNh.dmx > matrices/fmtx/Gl3FNh.dfmx

dctimestep -of matrices/fmtx/Gl3FNi.fmx matrices/dmtx/DFNi.dmx > matrices/fmtx/Gl3FNi.dfmx

dctimestep -of matrices/fmtx/Gl3FNj.fmx matrices/dmtx/DFNj.dmx > matrices/fmtx/Gl3FNj.dfmx

dctimestep -of matrices/fmtx/Gl3FNk.fmx matrices/dmtx/DFNk.dmx > matrices/fmtx/Gl3FNk.dfmx

dctimestep -of matrices/fmtx/Gl3FNl.fmx matrices/dmtx/DFNl.dmx > matrices/fmtx/Gl3FNl.dfmx

dctimestep -of matrices/fmtx/Gl3FNm.fmx matrices/dmtx/DFNm.dmx > matrices/fmtx/Gl3FNm.dfmx


#Add all the matrices for the window group Gl3
rmtxop matrices/fmtx/Gl3FNa.dfmx + matrices/fmtx/Gl3FNb.dfmx + matrices/fmtx/Gl3FNc.dfmx + matrices/fmtx/Gl3FNd.dfmx + matrices/fmtx/Gl3FNe.dfmx + matrices/fmtx/Gl3FNf.dfmx + matrices/fmtx/Gl3FNg.dfmx + matrices/fmtx/Gl3FNh.dfmx + matrices/fmtx/Gl3FNi.dfmx + matrices/fmtx/Gl3FNj.dfmx + matrices/fmtx/Gl3FNk.dfmx + matrices/fmtx/Gl3FNl.dfmx + matrices/fmtx/Gl3FNm.dfmx > matrices/dmtx/Gl3FN.dfmx

#Generate resultant matrices for window group Cl1
dctimestep -of matrices/fmtx/Cl1FNa.fmx matrices/dmtx/DFNa.dmx > matrices/fmtx/Cl1FNa.dfmx

dctimestep -of matrices/fmtx/Cl1FNb.fmx matrices/dmtx/DFNb.dmx > matrices/fmtx/Cl1FNb.dfmx

dctimestep -of matrices/fmtx/Cl1FNc.fmx matrices/dmtx/DFNc.dmx > matrices/fmtx/Cl1FNc.dfmx

dctimestep -of matrices/fmtx/Cl1FNd.fmx matrices/dmtx/DFNd.dmx > matrices/fmtx/Cl1FNd.dfmx

dctimestep -of matrices/fmtx/Cl1FNe.fmx matrices/dmtx/DFNe.dmx > matrices/fmtx/Cl1FNe.dfmx

dctimestep -of matrices/fmtx/Cl1FNf.fmx matrices/dmtx/DFNf.dmx > matrices/fmtx/Cl1FNf.dfmx

dctimestep -of matrices/fmtx/Cl1FNg.fmx matrices/dmtx/DFNg.dmx > matrices/fmtx/Cl1FNg.dfmx

dctimestep -of matrices/fmtx/Cl1FNh.fmx matrices/dmtx/DFNh.dmx > matrices/fmtx/Cl1FNh.dfmx

dctimestep -of matrices/fmtx/Cl1FNi.fmx matrices/dmtx/DFNi.dmx > matrices/fmtx/Cl1FNi.dfmx

dctimestep -of matrices/fmtx/Cl1FNj.fmx matrices/dmtx/DFNj.dmx > matrices/fmtx/Cl1FNj.dfmx

dctimestep -of matrices/fmtx/Cl1FNk.fmx matrices/dmtx/DFNk.dmx > matrices/fmtx/Cl1FNk.dfmx

dctimestep -of matrices/fmtx/Cl1FNl.fmx matrices/dmtx/DFNl.dmx > matrices/fmtx/Cl1FNl.dfmx

dctimestep -of matrices/fmtx/Cl1FNm.fmx matrices/dmtx/DFNm.dmx > matrices/fmtx/Cl1FNm.dfmx


#Add all the matrices for the window group Cl1
rmtxop matrices/fmtx/Cl1FNa.dfmx + matrices/fmtx/Cl1FNb.dfmx + matrices/fmtx/Cl1FNc.dfmx + matrices/fmtx/Cl1FNd.dfmx + matrices/fmtx/Cl1FNe.dfmx + matrices/fmtx/Cl1FNf.dfmx + matrices/fmtx/Cl1FNg.dfmx + matrices/fmtx/Cl1FNh.dfmx + matrices/fmtx/Cl1FNi.dfmx + matrices/fmtx/Cl1FNj.dfmx + matrices/fmtx/Cl1FNk.dfmx + matrices/fmtx/Cl1FNl.dfmx + matrices/fmtx/Cl1FNm.dfmx > matrices/dmtx/Cl1FN.dfmx


#Generate resultant matrices for window group Cl2
dctimestep -of matrices/fmtx/Cl2FNa.fmx matrices/dmtx/DFNa.dmx > matrices/fmtx/Cl2FNa.dfmx

dctimestep -of matrices/fmtx/Cl2FNb.fmx matrices/dmtx/DFNb.dmx > matrices/fmtx/Cl2FNb.dfmx

dctimestep -of matrices/fmtx/Cl2FNc.fmx matrices/dmtx/DFNc.dmx > matrices/fmtx/Cl2FNc.dfmx

dctimestep -of matrices/fmtx/Cl2FNd.fmx matrices/dmtx/DFNd.dmx > matrices/fmtx/Cl2FNd.dfmx

dctimestep -of matrices/fmtx/Cl2FNe.fmx matrices/dmtx/DFNe.dmx > matrices/fmtx/Cl2FNe.dfmx

dctimestep -of matrices/fmtx/Cl2FNf.fmx matrices/dmtx/DFNf.dmx > matrices/fmtx/Cl2FNf.dfmx

dctimestep -of matrices/fmtx/Cl2FNg.fmx matrices/dmtx/DFNg.dmx > matrices/fmtx/Cl2FNg.dfmx

dctimestep -of matrices/fmtx/Cl2FNh.fmx matrices/dmtx/DFNh.dmx > matrices/fmtx/Cl2FNh.dfmx

dctimestep -of matrices/fmtx/Cl2FNi.fmx matrices/dmtx/DFNi.dmx > matrices/fmtx/Cl2FNi.dfmx

dctimestep -of matrices/fmtx/Cl2FNj.fmx matrices/dmtx/DFNj.dmx > matrices/fmtx/Cl2FNj.dfmx

dctimestep -of matrices/fmtx/Cl2FNk.fmx matrices/dmtx/DFNk.dmx > matrices/fmtx/Cl2FNk.dfmx

dctimestep -of matrices/fmtx/Cl2FNl.fmx matrices/dmtx/DFNl.dmx > matrices/fmtx/Cl2FNl.dfmx

dctimestep -of matrices/fmtx/Cl2FNm.fmx matrices/dmtx/DFNm.dmx > matrices/fmtx/Cl2FNm.dfmx


#Add all the matrices for the window group Cl2
rmtxop matrices/fmtx/Cl2FNa.dfmx + matrices/fmtx/Cl2FNb.dfmx + matrices/fmtx/Cl2FNc.dfmx + matrices/fmtx/Cl2FNd.dfmx + matrices/fmtx/Cl2FNe.dfmx + matrices/fmtx/Cl2FNf.dfmx + matrices/fmtx/Cl2FNg.dfmx + matrices/fmtx/Cl2FNh.dfmx + matrices/fmtx/Cl2FNi.dfmx + matrices/fmtx/Cl2FNj.dfmx + matrices/fmtx/Cl2FNk.dfmx + matrices/fmtx/Cl2FNl.dfmx + matrices/fmtx/Cl2FNm.dfmx > matrices/dmtx/Cl2FN.dfmx


#Generate resultant matrices for window group Cl3
dctimestep -of matrices/fmtx/Cl3FNa.fmx matrices/dmtx/DFNa.dmx > matrices/fmtx/Cl3FNa.dfmx

dctimestep -of matrices/fmtx/Cl3FNb.fmx matrices/dmtx/DFNb.dmx > matrices/fmtx/Cl3FNb.dfmx

dctimestep -of matrices/fmtx/Cl3FNc.fmx matrices/dmtx/DFNc.dmx > matrices/fmtx/Cl3FNc.dfmx

dctimestep -of matrices/fmtx/Cl3FNd.fmx matrices/dmtx/DFNd.dmx > matrices/fmtx/Cl3FNd.dfmx

dctimestep -of matrices/fmtx/Cl3FNe.fmx matrices/dmtx/DFNe.dmx > matrices/fmtx/Cl3FNe.dfmx

dctimestep -of matrices/fmtx/Cl3FNf.fmx matrices/dmtx/DFNf.dmx > matrices/fmtx/Cl3FNf.dfmx

dctimestep -of matrices/fmtx/Cl3FNg.fmx matrices/dmtx/DFNg.dmx > matrices/fmtx/Cl3FNg.dfmx

dctimestep -of matrices/fmtx/Cl3FNh.fmx matrices/dmtx/DFNh.dmx > matrices/fmtx/Cl3FNh.dfmx

dctimestep -of matrices/fmtx/Cl3FNi.fmx matrices/dmtx/DFNi.dmx > matrices/fmtx/Cl3FNi.dfmx

dctimestep -of matrices/fmtx/Cl3FNj.fmx matrices/dmtx/DFNj.dmx > matrices/fmtx/Cl3FNj.dfmx

dctimestep -of matrices/fmtx/Cl3FNk.fmx matrices/dmtx/DFNk.dmx > matrices/fmtx/Cl3FNk.dfmx

dctimestep -of matrices/fmtx/Cl3FNl.fmx matrices/dmtx/DFNl.dmx > matrices/fmtx/Cl3FNl.dfmx

dctimestep -of matrices/fmtx/Cl3FNm.fmx matrices/dmtx/DFNm.dmx > matrices/fmtx/Cl3FNm.dfmx


#Add all the matrices for the window group Cl3
rmtxop matrices/fmtx/Cl3FNa.dfmx + matrices/fmtx/Cl3FNb.dfmx + matrices/fmtx/Cl3FNc.dfmx + matrices/fmtx/Cl3FNd.dfmx + matrices/fmtx/Cl3FNe.dfmx + matrices/fmtx/Cl3FNf.dfmx + matrices/fmtx/Cl3FNg.dfmx + matrices/fmtx/Cl3FNh.dfmx + matrices/fmtx/Cl3FNi.dfmx + matrices/fmtx/Cl3FNj.dfmx + matrices/fmtx/Cl3FNk.dfmx + matrices/fmtx/Cl3FNl.dfmx + matrices/fmtx/Cl3FNm.dfmx > matrices/dmtx/Cl3FN.dfmx




#RESULTS

#Generate images for individual window groups.
dctimestep matrices/vmtx/hdr/FCl1%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/Cl1FN.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FNCl1.hdr

dctimestep matrices/vmtx/hdr/FCl2%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/Cl2FN.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FNCl2.hdr

dctimestep matrices/vmtx/hdr/FCl3%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/Cl3FN.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FNCl3.hdr

dctimestep matrices/vmtx/hdr/FGl1%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/Gl1FN.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FNGl1.hdr

dctimestep matrices/vmtx/hdr/FGl2%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/Gl2FN.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FNGl2.hdr

dctimestep matrices/vmtx/hdr/FGl3%03d.hdr  matrices/tmtx/clear.xml matrices/dmtx/Gl3FN.dfmx skyVectors/NYC_Per.vec > results/fmtx/windowGroups/FNGl3.hdr


#Combine results from window groups together.
pcomb results/fmtx/windowGroups/FNCl1.hdr results/fmtx/windowGroups/FNCl2.hdr results/fmtx/windowGroups/FNCl3.hdr results/fmtx/windowGroups/FNGl1.hdr results/fmtx/windowGroups/FNGl2.hdr results/fmtx/windowGroups/FNGl3.hdr > results/fmtx/FN.hdr


#Generate illuminance results for individual window groups.
dctimestep matrices/vmtx/vFCl1.mtx  matrices/tmtx/clear.xml matrices/dmtx/Cl1FN.dfmx  skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FNCl1.ill

dctimestep matrices/vmtx/vFCl2.mtx  matrices/tmtx/clear.xml  matrices/dmtx/Cl2FN.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FNCl2.ill

dctimestep matrices/vmtx/vFCl3.mtx  matrices/tmtx/clear.xml matrices/dmtx/Cl3FN.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FNCl3.ill

dctimestep matrices/vmtx/vFGl1.mtx  matrices/tmtx/clear.xml matrices/dmtx/Gl1FN.dfmx skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FNGl1.ill

dctimestep matrices/vmtx/vFGl2.mtx  matrices/tmtx/clear.xml matrices/dmtx/Gl2FN.dfmx  skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FNGl2.ill

dctimestep matrices/vmtx/vFGl3.mtx  matrices/tmtx/clear.xml matrices/dmtx/Gl3FN.dfmx  skyVectors/NYC_Per.vec | rmtxop -fa -t -c 47.4 119.9 11.6 - > results/fmtx/windowGroups/FNGl3.ill

#Combine results from window groups together.
rmtxop results/fmtx/windowGroups/FNCl1.ill + results/fmtx/windowGroups/FNCl2.ill + results/fmtx/windowGroups/FNCl3.ill + results/fmtx/windowGroups/FNGl1.ill + results/fmtx/windowGroups/FNGl2.ill + results/fmtx/windowGroups/FNGl3.ill > results/fmtx/FN.ill

#Done! (results can be found in results/fmtx folder).
