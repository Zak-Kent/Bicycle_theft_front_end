'use strict';


var racks = [
        {
            "id": 70,
            "geom": {
                "type": "Point",
                "coordinates": [
                    -122.65674419494266,
                    45.52129161367416,
                    0.0
                ]
            },
            "theft_prob_per_bike_day_x_1000": "0.88120736"
        },
        {
            "id": 71,
            "geom": {
                "type": "Point",
                "coordinates": [
                    -122.65150250641943,
                    45.522571437349896,
                    0.0
                ]
            },
            "theft_prob_per_bike_day_x_1000": "0.15002538"
        },
        {
            "id": 72,
            "geom": {
                "type": "Point",
                "coordinates": [
                    -122.63949345115851,
                    45.522086529460445,
                    0.0
                ]
            },
            "theft_prob_per_bike_day_x_1000": "0.85646408"
        },
        {
            "id": 73,
            "geom": {
                "type": "Point",
                "coordinates": [
                    -122.60169675755077,
                    45.51931354074218,
                    0.0
                ]
            },
            "theft_prob_per_bike_day_x_1000": "0.20565720"
        }
    ];

var marker = {
      id: 0,
      coords: {
        latitude: 45,
        longitude: 50
      },
      options: { 
        draggable: true, 
        icon: ''
      }
    };


describe('LocationFactory checks', function() {
    var rackFactory;

    beforeEach(angular.mock.module('angularTheftAppApp'));

    beforeEach(inject(function(_rackFactory_){
      rackFactory = _rackFactory_;
    }));

    it('should exist', function(){
        expect(rackFactory).toBeDefined();
    });
    it('sortRacks method exists', function() {
        expect(rackFactory.sortRacks).toBeDefined();
    });
    it('sortRack method works as expeted', function(){
        var sortedRacks = rackFactory.sortRacks(racks, marker); 

        // needed to assign variables to objects in array otherwise can't get properties
        var rack0 = sortedRacks[0];
        var rack1 = sortedRacks[1];
        var rack2 = sortedRacks[2];
        var rack3 = sortedRacks[3];

        expect(rack0.theftProb < rack3.theftProb).toEqual(true);
        expect(rack0.theftProb < rack2.theftProb).toEqual(true);
        expect(rack0.theftProb < rack1.theftProb).toEqual(true);
    });

});






