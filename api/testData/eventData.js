export function createEventData(overrides={}) {
    return   {
    title: `Tech Summit ${Date.now()}`,
    description: "Playwright Automation Test Event",
    category: "Conference",
    venue: "Madison square garden",
    city: "New York",
    eventDate: "2027-06-15T09:00:00.000Z",
    price: 150,
    totalSeats: 10,
    imageUrl: "https://example.com/banner.jpg",
    ...overrides
  };
}