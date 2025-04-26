export const SelectTravelerOptions = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole travelers in exploration',
        icon:'✈️',
        people:'1'
    }   
    ,
    {
        id:2,
        title:'Couple',
        desc:'Two travelers in tandem',
        icon:'💑',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adventurers',
        icon:'👨‍👩‍👧‍👦',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekers',
        icon:'👯‍♂️',
        people:'5 to 10 People'
    }
    ,
]

export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of cost',
        icon:'💰',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💵',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Don\'t worry about the cost',
        icon:'💎',
    },
]

export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days and {totalNight} Night for {titleTraveler} ({traveler}) with a {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and places to visit nearby with PlaceName, Place Details, Place Image Url, Geo Coordinates, ticket pricing. time t travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit. Respond ONLY with valid JSON format. Do not add any other text or explanation. The JSON should have the following structure: { "tripPlan": { "Location", "travelers", "duration", "budget" ,"flight": { "flightDetails": [ { "flightName": "", "flightPrice": "", "bookingUrl": "" } ], }, "hotels": [ { "hotelName": "", "hotelAddress": "", "hotelPrice": "", "hotelImageUrl": "", "geoCoordinates": "", "rating": "", "description": "" } ], "placesToVisit": [ { "placeName": "", "placeDetails": "", "placeImageUrl": "", "geoCoordinates": "", "ticketPricing": "" } ], }, }'
