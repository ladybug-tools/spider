
## Campus

documentation: The Campus element should be used as the base for all physical objects. On a campus, place one or more buildings

attribute name="id" type="xsd:ID" use="required"

	<xsd:complexType>
    <xsd:choice minOccurs="0" maxOccurs="unbounded">
      <xsd:element ref="Name" minOccurs="0"/>
      <xsd:element ref="Description" minOccurs="0"/>
      <xsd:element ref="Location"/>
      <xsd:element ref="Building" maxOccurs="unbounded"/>
      <xsd:element ref="Surface" minOccurs="4" maxOccurs="unbounded"/>
      <xsd:element ref="YearModeled" minOccurs="0"/>
      <xsd:element ref="DaylightSavings" minOccurs="0"/>
      <xsd:element ref="Life" minOccurs="0"/>
      <xsd:element ref="AltEnergySource" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element ref="ShellGeometry" minOccurs="0"/>
      <xsd:element ref="Vegetation" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element ref="Transportation" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element ref="MeterId" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element ref="ExtEquipId" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element ref="Lighting" minOccurs="0" maxOccurs="unbounded"/>
      <xsd:element ref="LightControlId" minOccurs="0" maxOccurs="unbounded"/>
    </xsd:choice>