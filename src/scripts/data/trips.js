export let trips;
export let id;

loadTrips();
loadId();

function loadTrips() {
  trips = JSON.parse(localStorage.getItem("trips"));

  if (!trips) {
    trips = [];
    // trips = [
    //   {
    //     title: "Trip 1 title that is really long",
    //     startDate: "2025-01-02",
    //     endDate: "2025-01-12",
    //     id: "0"
    //   }, 
    //   {
    //     title: "Trip 2 Is Long",
    //     startDate: "2025-01-02",
    //     endDate: "2025-01-12",
    //     id: "1"
    //   }, 
    //   {
    //     title: "Sydney, Australia",
    //     startDate: "2025-01-02",
    //     endDate: "2025-01-12",
    //     id: "2"
    //   }
    // ]
  }
}

function loadId() {
  id = JSON.parse(localStorage.getItem("id"));

  if (!id) {
    id = 0;
  }
}

function updateId() {
  id += 1;
  localStorage.setItem("id", String(id));
}

function saveTrips() {
  localStorage.setItem("trips", JSON.stringify(trips));
}

export function addTrip(title, startDate, endDate, id) {
  trips.push({
    title: title,
    startDate: startDate,
    endDate: endDate,
    id: String(id)
  });

  saveTrips();
  updateId();
}

export function removeTrip(tripId) {
  const updateTrips = [];

  trips.forEach((trip) => {
    if (trip.id !== tripId) {
      updateTrips.push(trip);
    }
  });

  trips = updateTrips;
  saveTrips();
}

export function renameTrip(index, newName) {
  trips[index].title = newName;
  saveTrips();
}

export function changeDate(index, newStart, newEnd) {
  trips[index].startDate = newStart;
  trips[index].endDate = newEnd;
  saveTrips();
}