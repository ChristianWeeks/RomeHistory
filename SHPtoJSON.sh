rm json/*

ogr2ogr \
	-f GeoJSON \
	json/land.json \
	vectors/Europe_Land.shp

ogr2ogr \
	-f GeoJSON \
	json/territories.json \
	vectors/Europe_Territories.shp

ogr2ogr \
	-f GeoJSON \
	json/rivers.json \
	vectors/Europe_Rivers.shp

ogr2ogr \
	-f GeoJSON \
	json/events.json \
	vectors/Events.shp

ogr2ogr \
	-f GeoJSON \
	json/cities.json \
	vectors/Europe_Cities.shp

topojson \
	-o json/RomeHistory.json \
	--id-property Name \
	-p Name \
	-p Sovereign \
	-p YearStart \
	-p YearEnd \
	-- \
	json/rivers.json \
	json/cities.json \
	json/events.json \
	json/territories.json \
	json/land.json
