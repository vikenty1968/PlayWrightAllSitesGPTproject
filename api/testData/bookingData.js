export function createBookingData(overrides={}){
return {
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@email.com",
    customerPhone: "+91-9876543210",
    quantity: 2,
    ...overrides
  };

}