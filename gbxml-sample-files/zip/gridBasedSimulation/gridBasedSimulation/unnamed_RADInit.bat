SET RAYPATH=.;c:\radiance\lib
PATH=c:\radiance\bin\;$PATH
c:
cd c:\ladybug\unnamed\gridBasedSimulation\
oconv -r 2048 -f c:/ladybug/unnamed/gridBasedSimulation//material_unnamed.rad c:/ladybug/unnamed/gridBasedSimulation/CIE_cloudySky_sky_12_21@1200.sky c:/ladybug/unnamed/gridBasedSimulation/unnamed.rad  > unnamed_RAD.oct
