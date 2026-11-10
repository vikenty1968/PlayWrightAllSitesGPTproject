import { test } from "./fixtures/apiFixtures.js";
import { expect } from "@playwright/test";
import {
  createBooking,
  createEvent,
  deleteBooking,
  deleteEvent,
  getEvent,
} from "./helpers/apiHelper.js";
import { createEventData } from "./testData/eventData.js";
import { createBookingData } from "./testData/bookingData.js";
const baseUrl = "https://api.eventhub.rahulshettyacademy.com/api";
test("user could create booking and update available seats", async ({
  request,
  authToken,
}) => {
  const eventData = createEventData();
  const bookingData = createBookingData();
  let eventId;
  let bookingId;
  let bookingCancelled = false;
  //try block
  try {
    const response = await createEvent(request, authToken, eventData);
    expect(response.status()).toBe(201);
    const responseJson = await response.json();
    eventId = responseJson.data.id;
    // add eventid to eventData
    bookingData.eventId = eventId;
    //create booking
    const responseBooking = await createBooking(
      request,
      authToken,
      bookingData,
    );
    expect(responseBooking.status()).toBe(201);
    const responseBookingJson = await responseBooking.json();
    bookingId = responseBookingJson.data.id;
    //get event data after booking
    const getEventAfterBooking = await getEvent(request, authToken, eventId);
    const getEventData = await getEventAfterBooking.json();
    // check number of available seats left
    expect(responseBookingJson.data.status).toBe("confirmed");
    expect(getEventData.data.availableSeats).toBe(
      eventData.totalSeats - bookingData.quantity,
    );
    // and price
    expect(Number(responseBookingJson.data.totalPrice)).toBe(
      eventData.price * bookingData.quantity,
    );
    //delete booking
    const deleteBooking1 =await deleteBooking(request,authToken,bookingId);
    expect(deleteBooking1.status()).toBe(200);
    // in case test failed before delete booking we need doublecheck it
    bookingCancelled = true;
    const deleteBookingJson = await deleteBooking1.json();
    expect(deleteBookingJson.success).toBe(true);
    // check deletion and restore available seats
    const responseAfterCancellation = await getEvent(request,authToken,eventId)
    expect(responseAfterCancellation.status()).toBe(200);

    const eventAfterCancellation = await responseAfterCancellation.json();
    expect(eventAfterCancellation.data.availableSeats).toBe(
      eventData.totalSeats,
    );
  } finally {
    if (bookingId != undefined && !bookingCancelled) {
      // delete booking if id exist and was not deleted because of failing test
      await request.delete(`${baseUrl}/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
    }
    //delete event even if bookingId is undefined but event was created
    if (eventId != undefined) {
      const deleteEvent1 = await deleteEvent(request, authToken, eventId);
      expect(deleteEvent1.status()).toBe(200);
      //check deleted eventId
      const checkDeletedEvent = await getEvent(request,authToken,eventId)
      expect(checkDeletedEvent.status()).toBe(404);
    }
    console.log("CleanUp completed!");
  }
});

test("Book over allowed number of tickets (10)", async ({
  request,
  authToken,
}) => {
  //create event
  let eventId;

  const eventData = createEventData();
  const bookingData = createBookingData({ quantity: 11 });

  try {
    const response = await createEvent(request, authToken, eventData);
    expect(response.status()).toBe(201);
    const eventJson = await response.json();
    eventId = eventJson.data.id;
    //add eventId to bookingData
    bookingData.eventId = eventId;
    const booking11 = await createBooking(request, authToken, bookingData);
    expect(booking11.status()).toBe(400);
    const bookingErrorJson = await booking11.json();
    expect(bookingErrorJson.success).toBe(false);
    expect(bookingErrorJson.details[0].field).toBe("quantity");
    //check event data after canceled booking
    const eventDataAfterBooking = await getEvent(request, authToken, eventId);
    const eventDataAfterJson = await eventDataAfterBooking.json();
    const availableSeatsAfterbooking = eventDataAfterJson.data.availableSeats;
    expect(availableSeatsAfterbooking).toBe(eventData.totalSeats);
  } finally {
    if (eventId != undefined) {
      const deleteEvent1 = await deleteEvent(request, authToken, eventId);
      expect(deleteEvent1.status()).toBe(200);
      console.log("event deleted successfully");
    }
  }
});
test("User  can not book more seats than available", async ({
  request,
  authToken,
}) => {
  let eventId;
  let bookingId;
  const eventData = createEventData({ totalSeats: 5 });
  const bookingData = createBookingData({ quantity: 4 });
  console.log(bookingData);
  try {
    const firstEvent = await createEvent(request, authToken, eventData);
    expect(firstEvent.status()).toBe(201);
    const firsrEventJson = await firstEvent.json();
    eventId = firsrEventJson.data.id;
    bookingData.eventId = eventId;
    //first booking
    const firstBooking = await createBooking(request, authToken, bookingData);
    expect(firstBooking.status()).toBe(201);

    const firstBookingResponse = await firstBooking.json();
    bookingId = firstBookingResponse.data.id;
    // console.log(firstBookingResponse);
    expect(firstBookingResponse.success).toBe(true);
    expect(firstBookingResponse.data.status).toBe("confirmed");
    // check number available seats left
    const getEventafterBooking = await getEvent(request, authToken, eventId);
    expect(getEventafterBooking.status()).toBe(200);
    const eventAfterBookingJson = await getEventafterBooking.json();
    console.log(eventAfterBookingJson);
    expect(eventAfterBookingJson.success).toBe(true);
    expect(eventData.totalSeats).toBe(
      bookingData.quantity + eventAfterBookingJson.data.availableSeats,
    );
    // second booking to overbook after first correct booking
    const secondBookingData = {
      ...bookingData,
      quantity: 2,
    };
    const secondBooking = await createBooking(
      request,
      authToken,
      secondBookingData,
    );

    expect(secondBooking.status()).toBe(400);
    const secondBookingJson = await secondBooking.json();
    expect(secondBookingJson.success).toBe(false);
    expect(secondBookingJson.error).toBe(
      "Only 1 seat(s) available, but 2 requested",
    );
    //check number og available seats left after failed second attempt

    const getEventafterBooking2 = await getEvent(request, authToken, eventId);
    expect(getEventafterBooking2.status()).toBe(200);
    const afterBooking2json = await getEventafterBooking2.json();
    expect(afterBooking2json.data.availableSeats).toBe(
      eventAfterBookingJson.data.availableSeats,
    );
  } finally {
    if (bookingId != undefined) {
      const deleteCreatedBooking = await deleteBooking(
        request,
        authToken,
        bookingId,
      );
      expect(deleteCreatedBooking.status()).toBe(200);
    }
    if (eventId != undefined) {
      const deleteCreatedEvent = await deleteEvent(request, authToken, eventId);
      expect(deleteCreatedEvent.status()).toBe(200);
    }
  }
  console.log("Booking and Event deleted");
});
