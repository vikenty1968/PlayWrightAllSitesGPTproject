export async function createEvent(request,authToken,eventData) {
     const response=await request.post("./events",{
   data:eventData,
   headers:{ Authorization: `Bearer ${authToken}`}
     })
     return response
}
export async function deleteEvent(request,authToken,eventId){
   const deleteEvent = await request.delete(`./events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return deleteEvent
}
export async function createBooking(request,authToken,bookingData) {
return  await request.post(`./bookings/`, {
    data: bookingData,
    headers: { Authorization: `Bearer ${authToken}` },
  });
}
export async function deleteBooking(request,authToken,bookingId){
 return  await request.delete(`./bookings/${bookingId}`,{
         headers: {
          Authorization: `Bearer ${authToken}`,
        }})
}
 export async function getEvent(request,authToken,eventId) {
   return  await request.get(`./events/${eventId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }