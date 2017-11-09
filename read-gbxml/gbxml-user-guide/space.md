

# Space Element

## [Definition from Schema GreenBuildingXML_Ver6.01.xsd]( http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link34B )

Documentation

> A space represents a volume enclosed by surfaces

## Usage

From various anecdotal observations

* Area and Volume should occur according to the Schema but are not required by Open Studio in order to import without warning.
* Shell Geometry elements and Space Boundary elements and their data frequently appear in Space elements but are not required.
* There is no need for space shell geometry for Open Studio, nor for the import into FZK Viewer.

### The Phase 2 Validator - Space Element Tests (stage 3)

From <https://github.com/GreenBuildingXML/ValidatorPhase1/wiki>

The Phase 2 validator is solely focused on validating gbXML as in the Phase 1 validator, with the additional checks of the geometry descriptions that are contained within the gbXML file format. Since all of this geometry information is contained within the Space and Surface Elements (and their children), the validator is designed to hone in on these elements and thoroughly review them.

Beyond checking for valid XML and well-formedness when compared to the XSD, the validator also performs the following checks. At the Space level of the document, for each Space found in the document:

* Are all required fields in place?
* Unique Space id test (this is a duplicate of the Phase 1 test)
	* all Space id attributes have to be unique
* Space surfaces Planarity tests
	* do the spaces contain ShellGeometry and SpaceBoundary elements? If so, check otherwise do nothing
* Space surface polygons winding in counter-clockwise order (this code is currently being debated and subject for review)
	* same applies regarding ShellGeometry and SpaceBoundary elements
* Space surfaces are all non-intersecting polygons (this code is currently being debated and subject for review)
	* same applies regarding ShellGeometry and SpaceBoundary elements as stated above
* do Space surfaces form a valid enclosure, i.e. – how watertight is the enclosure definition
	* we can only do these tests if either ShellGeometry or SurfaceBoundary elements are present

Since the ShellGeometry element and SurfaceBoundary element are optional in the Space definition as of the latest XSD, we’ve had to make special accommodation to only check them if they are present. There is not a requirement currently that requires both to be present in a Space element. Either one or the other can be present exclusively.


## Space Attributes

### [spaceType Schema Definition]( http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#LinkB6 )

> spaceType represents how a space is used.
> an IESNA and ASHRAE project for determining lighting power density for individual spaces.

		enumeration 	ActiveStorage
		enumeration 	ActiveStorageHospitalOrHealthcare
		enumeration 	AirOrTrainOrBusBaggageArea
		enumeration 	AirportConcourse
		enumeration 	AtriumEachAdditionalFloor
		enumeration 	AtriumFirstThreeFloors
		enumeration 	AudienceOrSeatingAreaPenitentiary
		enumeration 	AudienceOrSeatingAreaExerciseCenter
		enumeration 	AudienceOrSeatingAreaGymnasium
		enumeration 	AudienceOrSeatingAreaSportsArena
		enumeration 	AudienceOrSeatingAreaConventionCenter
		enumeration 	AudienceOrSeatingAreaMotionPictureTheatre
		enumeration 	AudienceOrSeatingAreaPerformingArtsTheatre
		enumeration 	AudienceOrSeatingAreaReligious
		enumeration 	AudienceOrSeatingAreaPoliceOrFireStations
		enumeration 	AudienceOrSeatingAreaCourtHouse
		enumeration 	AudienceOrSeatingAreaAuditorium
		enumeration 	BankCustomerArea
		enumeration 	BankingActivityAreaOffice
		enumeration 	BarberAndBeautyParlor
		enumeration 	CardFileAndCataloguingLibrary
		enumeration 	ClassroomOrLectureOrTrainingPenitentiary
		enumeration 	ClassroomOrLectureOrTraining
		enumeration 	ConfinementCellsPenitentiary
		enumeration 	ConfinementCellsCourtHouse
		enumeration 	ConferenceMeetingOrMultipurpose
		enumeration 	CorridorOrTransition
		enumeration 	CorridorOrTransitionManufacturingFacility
		enumeration 	CorridorsWithPatientWaitingExamHospitalOrHealthcare
		enumeration 	CourtSportsAreaSportsArena
		enumeration 	CourtroomCourtHouse
		enumeration 	DepartmentStoreSalesAreaRetail
		enumeration 	DetailedManufacturingFacility
		enumeration 	DiningArea
		enumeration 	DiningAreaHotel
		enumeration 	DiningAreaFamilyDining
		enumeration 	DiningAreaLoungeOrLeisureDining
		enumeration 	DiningAreaMotel
		enumeration 	DiningAreaTransportation
		enumeration 	DiningAreaPenitentiary
		enumeration 	DiningAreaCivilServices
		enumeration 	DormitoryBedroom
		enumeration 	DormitoryStudyHall
		enumeration 	DressingOrLockerOrFittingRoomGymnasium
		enumeration 	DressingOrLockerOrFittingRoomCourtHouse
		enumeration 	DressingOrLockerOrFittingRoomPerformingArtsTheatre
		enumeration 	DressingOrLockerOrFittingRoomAuditorium
		enumeration 	DressingOrLockerOrFittingRoomExerciseCenter
		enumeration 	ElectricalOrMechanical
		enumeration 	ElevatorLobbies
		enumeration 	EmergencyHospitalOrHealthcare
		enumeration 	EquipmentRoomManufacturingFacility
		enumeration 	ExamOrTreatmentHospitalOrHealthcare
		enumeration 	ExcerciseAreaExerciseCenter
		enumeration 	ExcerciseAreaGymnasium
		enumeration 	ExhibitSpaceConventionCenter
		enumeration 	FellowshipHallReligiousBuildings
		enumeration 	FineMaterialWarehouse
		enumeration 	FineMerchandiseSalesAreaRetail
		enumeration 	FireStationEngineRoomPoliceOrFireStation
		enumeration 	FoodPreparation
		enumeration 	GarageServiceOrRepairAutomotiveFacility
		enumeration 	GeneralHighBayManufacturingFacility
		enumeration 	GeneralLowBayManufacturingFacility
		enumeration 	GeneralExhibitionMuseum
		enumeration 	HospitalNurseryHospitalOrHealthcare
		enumeration 	HospitalOrMedicalSuppliesHospitalOrHealthcare
		enumeration 	HospitalOrRadiologyHospitalOrHealthcare
		enumeration 	HotelOrConferenceCenterConferenceOrMeeting
		enumeration 	InactiveStorage
		enumeration 	JudgesChambersCourtHouse
		enumeration 	LaboratoryOffice
		enumeration 	LaundryIroningAndSorting
		enumeration 	LaundryWashingHospitalOrHealthcare
		enumeration 	LibraryAudioVisualLibraryAudioVisual
		enumeration 	LivingQuartersDormitory
		enumeration 	LivingQuartersMotel
		enumeration 	LivingQuartersHotel
		enumeration 	Lobby
		enumeration 	LobbyReligiousBuildings
		enumeration 	LobbyMotionPictureTheatre
		enumeration 	LobbyAuditorium
		enumeration 	LobbyPerformingArtsTheatre
		enumeration 	LobbyPostOffice
		enumeration 	LobbyHotel
		enumeration 	LoungeOrRecreation
		enumeration 	MallConcourseSalesAreaRetail
		enumeration 	MassMerchandisingSalesAreaRetail
		enumeration 	MediumOrBulkyMaterialWarehouse
		enumeration 	MerchandisingSalesAreaRetail
		enumeration 	MuseumAndGalleryStorage
		enumeration 	NurseStationHospitalOrHealthcare
		enumeration 	OfficeEnclosed
		enumeration 	OfficeOpenPlan
		enumeration 	OfficeCommonActivityAreasInactiveStorage
		enumeration 	OperatingRoomHospitalOrHealthcare
		enumeration 	OtherTelevisedPlayingAreaSportsArena
		enumeration 	ParkingAreaAttendantOnlyParkingGarage
		enumeration 	ParkingAreaPedestrianParkingGarage
		enumeration 	PatientRoomHospitalOrHealthcare
		enumeration 	PersonalServicesSalesAreaRetail
		enumeration 	PharmacyHospitalOrHealthcare
		enumeration 	PhysicalTherapyHospitalOrHealthcare
		enumeration 	PlayingAreaGymnasium
		enumeration 	Plenum
		enumeration 	PoliceStationLaboratoryPoliceOrFireStations
		enumeration 	PublicAndStaffLoungeHospitalOrHealthcare
		enumeration 	ReadingAreaLibrary
		enumeration 	ReceptionOrWaitingTransportation
		enumeration 	ReceptionOrWaitingMotel
		enumeration 	ReceptionOrWaitingHotel
		enumeration 	RecoveryHospitalOrHealthcare
		enumeration 	RestorationMuseum
		enumeration 	Restrooms
		enumeration 	RingSportsAreaSportsArena
		enumeration 	ServerRoom
		enumeration 	SleepingQuartersPoliceOrFireStation
		enumeration 	SortingAreaPostOffice
		enumeration 	SpecialtyStoreSalesAreaRetail
		enumeration 	StacksLibrary
		enumeration 	StairsInactive
		enumeration 	Stairway
		enumeration 	SupermarketSalesAreaRetail
		enumeration 	TerminalTicketCounterTransportation
		enumeration 	WorkshopWorkshop
		enumeration 	WorshipPulpitChoirReligious



## Space Children

* Name
* Description
* Lighting
* LightingControl
* InfiltrationFlow
* PeopleNumber
* PeopleHeatGain
* LightPowerPerArea
* EquipPowerPerArea
* AirChangesPerHour
* Area
* Temperature
* Volume
* PlanarGeometry
* ShellGeometry
* AirLoopId
* HydronicLoopId
* MeterId
* IntEquipId
* AirLoopEquipmentId
* HydronicLoopEquipmentId
* CADObjectId
* TypeCode
* SpaceBoundary


## Space Samples

### From @bwelle

For Space definitions, we see this in the working file:

     <Space zoneIdRef="Zone1" id="Zone1_space" buildingStoreyIdRef="Building_Story_1">
        <Name>Zone1_space</Name>
        <Area>21.000000</Area>
        <Volume>105.000000</Volume>
      </Space>



### Space Elements from Open Studio file seb.osm exported by Open Studio as seb.xml

Source file on GitHub

* <https://github.com/NREL/OpenStudio/blob/develop/openstudiocore/resources/Examples/compact_osw/files/seb.osm>

Text for Space elements in exported gbXML file: 

      <Space id="Entry_way_1" zoneIdRef="Single_zone" buildingStoreyIdRef="Level_0">
        <Name>Entry way 1</Name>
        <Area>12.451266</Area>
        <Volume>41.746604</Volume>
        <LightPowerPerArea unit="WattPerSquareMeter">7.992762</LightPowerPerArea>
      </Space>
      <Space id="Utility_1" zoneIdRef="Single_zone" buildingStoreyIdRef="Level_0">
        <Name>Utility 1</Name>
        <Area>16.437597</Area>
        <Volume>55.111975</Volume>
        <PeopleNumber unit="SquareMPerPerson">16.437597</PeopleNumber>
        <LightPowerPerArea unit="WattPerSquareMeter">12.123427</LightPowerPerArea>
        <EquipPowerPerArea unit="WattPerSquareMeter">5.475253</EquipPowerPerArea>
      </Space>
      <Space id="Open_area_1" zoneIdRef="Single_zone" buildingStoreyIdRef="Level_0">
        <Name>Open area 1</Name>
        <Area>35.653368</Area>
        <Volume>119.538612</Volume>
        <PeopleNumber unit="SquareMPerPerson">7.130674</PeopleNumber>
        <LightPowerPerArea unit="WattPerSquareMeter">13.059075</LightPowerPerArea>
        <EquipPowerPerArea unit="WattPerSquareMeter">57.217596</EquipPowerPerArea>
      </Space>
      <Space id="Small_office_1" zoneIdRef="Single_zone" buildingStoreyIdRef="Level_0">
        <Name>Small office 1</Name>
        <Area>17.667075</Area>
        <Volume>59.234168</Volume>
        <PeopleNumber unit="SquareMPerPerson">8.833537</PeopleNumber>
        <LightPowerPerArea unit="WattPerSquareMeter">38.824764</LightPowerPerArea>
        <EquipPowerPerArea unit="WattPerSquareMeter">20.093875</EquipPowerPerArea>
      </Space>
      <Space id="Level_0_Ceiling_Plenum" zoneIdRef="Level_0_Ceiling_Plenum_Zone" buildingStoreyIdRef="Level_0">
        <Name>Level 0 Ceiling Plenum</Name>
        <Area>0.000000</Area>
        <Volume>0.000000</Volume>
      </Space>
