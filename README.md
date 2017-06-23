# Wester Spirit Trip Finder

https://github.com/creativebcx/ws-trip-finder.git

## Serves client that: 
	- makes AJAX calls back to API endpoints to initially retrieve and display existing
		WS Trips.
	- allows users to view available trips based on search criteria

## Uses express.Router to route requests for /trips to separate modules.

## CRUD (create, read, update, delete) operations for available trips

Note: uses volatile, in memory storage, since we haven't built data persistence in a Mongo based db.

