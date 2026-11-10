import { test } from "./fixtures/apiFixtures";
import{expect}from "@playwright/test"
const baseUrl="https://api.eventhub.rahulshettyacademy.com/api"
test("Create new event",async({request,authToken})=>{
 const eventData={
 
  "title": "Tech Summit 2027",
  "description": "Playwright Automation Test Event",
  "category": "Conference",
  "venue": "Madison square garden",
  "city": "New York",
  "eventDate": "2027-06-15T09:00:00.000Z",
  "price": 1500,
  "totalSeats": 500,
  "imageUrl": "https://example.com/banner.jpg"
}
 const response =await request.post(baseUrl+"/events",{data:
    eventData,
 headers:{   Authorization:`Bearer ${authToken}`}

})
expect(response.status()).toBe(201)

const responseJson= await response.json()
//console.log(responseJson)
expect(responseJson.success).toBe(true)
expect(responseJson.data.availableSeats).toEqual(eventData.totalSeats)
expect(responseJson.data.totalSeats).toEqual(eventData.totalSeats)
const eventId= responseJson.data.id
//check event on server

const getEvent=await request.get(`${baseUrl}/events/${eventId}`,
  {headers:{ Authorization:`Bearer ${authToken}`}}
)
expect(getEvent.status()).toBe(200)
const getEventJson = await getEvent.json()
expect(getEventJson.data.id).toBe(eventId)
//delete event
const deleteEvent = await request.delete(`${baseUrl}/events/${eventId}`,{
  headers:{Authorization:`Bearer ${authToken}`}
})
 expect(deleteEvent.status()).toBe(200)
 
})


test("Repeat previous test event try-catch",async({request,authToken})=>{
 const eventData={
 
  "title":"Playwright summit",
  "description": "Playwright Automation Test Event",
  "category": "Conference",
  "venue": "Madison square garden",
  "city": "New York",
  "eventDate": "2027-06-15T09:00:00.000Z",
  "price": 1500,
  "totalSeats": 500,
  "imageUrl": "https://example.com/banner.jpg"
}
let eventId
 try{const response =await request.post(baseUrl+"/events",{data:
    eventData,
 headers:{   Authorization:`Bearer ${authToken}`}

})
expect(response.status()).toBe(201)

const responseJson= await response.json()
console.log(responseJson)
expect(responseJson.success).toBe(true)
expect(responseJson.data.availableSeats).toEqual(eventData.totalSeats)
expect(responseJson.data.totalSeats).toEqual(eventData.totalSeats)
 eventId= responseJson.data.id
//check event on server

const getEvent=await request.get(`${baseUrl}/events/${eventId}`,
  {headers:{ Authorization:`Bearer ${authToken}`}}
)
expect(getEvent.status()).toBe(200)
const getEventJson = await getEvent.json()
expect(getEventJson.data.id).toBe(eventId)
expect(Number(getEventJson.data.price)).toBe(eventData.price)
expect(getEventJson.data.title).toBe(eventData.title)
expect(getEventJson.data.category).toBe(eventData.category)
expect(getEventJson.data.availableSeats).toBe(eventData.totalSeats)
}
//delete event
finally{
  if(eventId!=undefined){//to check if evaentId was created
const deleteEvent = await request.delete(`${baseUrl}/events/${eventId}`,{
  headers:{Authorization:`Bearer ${authToken}`}
})
 expect(deleteEvent.status()).toBe(200)
 
//check deletion

 const getEventAfterDelete=await request.get(`${baseUrl}/events/${eventId}`,
  {headers:{ Authorization:`Bearer ${authToken}`}}
)
expect(getEventAfterDelete.status()).toBe(404)
}

}
})
