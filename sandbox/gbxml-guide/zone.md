
## Zone


### http://community.gbxml.org/Knowledgebase/explain-the-zone-element/

> The gbXML “Zone” element describes an HVAC zone that encompasses one or more building spaces and includes all necessary child elements to describe a typical HVAC zone. These child elements include information about air flow rates, cooling and heating design set points, ventilation air rates, air flow schedules, hydronic and air loop information, and mo

### Schema GreenBuildingXML_Ver6.01.xsd 

* <http://gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html#Link1D3>


### Choices

From Schema


				<xsd:element ref="Name" minOccurs="0"/>
				<xsd:element ref="Description" minOccurs="0"/>
				<xsd:element ref="Flow" minOccurs="0"/>
				<xsd:element ref="SecondaryFlow" minOccurs="0"/>
				<xsd:element ref="AirChangesPerHour" minOccurs="0"/>
				<xsd:element ref="FlowPerArea" minOccurs="0"/>
				<xsd:element ref="FlowPerPerson" minOccurs="0"/>
				<xsd:element ref="OAFlowPerArea" minOccurs="0"/>
				<xsd:element ref="OAFlowPerPerson" minOccurs="0"/>
				<xsd:element ref="OAFlowPerZone" minOccurs="0"/>
				<xsd:element ref="MaxOAFlowPerZone" minOccurs="0"/>
				<xsd:element ref="MinOAFlowPerZone" minOccurs="0"/>
				<xsd:element ref="MinimumOutdoorAirControlType" minOccurs="0"/>
				<xsd:element ref="DesignHeatT" minOccurs="0"/>
				<xsd:element ref="DesignCoolT" minOccurs="0"/>
				<xsd:element ref="IndoorAirQuality" minOccurs="0"/>
				<xsd:element ref="HydronicLoopId" minOccurs="0" maxOccurs="unbounded"/>
				<xsd:element ref="AirLoopId" minOccurs="0" maxOccurs="unbounded"/>
				<xsd:element ref="CADObjectId" minOccurs="0" maxOccurs="unbounded"/>
				<xsd:element ref="TypeCode" minOccurs="0"/>
				<xsd:element ref="CoolingSizingFactor" minOccurs="0"/>
				<xsd:element ref="HeatingSizingFactor" minOccurs="0"/>
				<xsd:element ref="BaseboardHeatingType" minOccurs="0"/>
				<xsd:element ref="BaseboardHeatingCapacity" minOccurs="0"/>


### Attributes


From Schema


			<xsd:attribute name="id" type="xsd:ID" use="required"/>
			<xsd:attribute name="heatSchedIdRef" type="xsd:IDREF">
				<xsd:documentation>ID of heating schedule</xsd:documentation>

			<xsd:attribute name="coolSchedIdRef" type="xsd:IDREF">
				<xsd:documentation>Design temperature for cooling</xsd:documentation>

			<xsd:attribute name="outAirSchedIdRef" type="xsd:IDREF">
				<xsd:documentation>Outside air schedule ID</xsd:documentation>

			<xsd:attribute name="airChangesSchedIdRef" type="xsd:IDREF">
				<xsd:documentation>Air changes schedule ID</xsd:documentation>

			<xsd:attribute name="fanSchedIdRef" type="xsd:IDREF">
				<xsd:documentation>ID of the fan schedule for this zone</xsd:documentation>

			<xsd:attribute name="fanTempSchedIdRef" type="xsd:IDREF" use="optional">
				<xsd:documentation>ID of the fan temperature schedule for this zone</xsd:documentation>

			<xsd:attribute name="ifcGUID" type="xsd:string" use="optional">
				<xsd:documentation>Global Unique ID from Industry Foundation Class (IFC) file.</xsd:documentation>

			<xsd:attribute name="programId" type="xsd:IDREF" use="optional">
				<xsd:documentation>Please specify the program that added this element.</xsd:documentation>
