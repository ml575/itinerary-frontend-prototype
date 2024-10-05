import {trips, addTrip, removeTrip, id} from "./data/trips.js";

renderYourTrips();

function renderYourTrips() {

  renderBaseYourTrips();

  const today = new Date();
  let todayStr = "";

  if (today.getMonth() + 1 < 10) {
    if (today.getDate() < 10) {
      todayStr = `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`;
    }
    else {
      todayStr = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`;
    }
  }
  else {
    if (today.getDate() < 10) {
      todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-0${today.getDate()}`;
    }
    else {
      todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }
  }

  let upcomingHTML = "";
  let completedHTML = "";

  trips.forEach((trip) => {
    const startReformat = `${trip.startDate.slice(5, 7)}/${trip.startDate.slice(8, 10)}/${trip.startDate.slice(0, 4)}`;
    const endReformat = `${trip.endDate.slice(5, 7)}/${trip.endDate.slice(8, 10)}/${trip.endDate.slice(0, 4)}`;
    console.log(trip.endDate, todayStr);
    if (trip.endDate >= todayStr) {
      upcomingHTML += `
      <a href="tripdetails.html?id=${trip.id}" class="trip-card-container-${trip.id}">
        <div class="trip-card">
          <div class="trip-title">${trip.title}</div>
          <div class="trip-card-date">${startReformat} - ${endReformat}</div>
          <img src="images/recycle-bin-icon.svg" class="delete-trip-button 
            js-delete-trip-button-${trip.id}" data-trip-id="${trip.id}">
        </div>
      </a>
      `
    }
    else {
      completedHTML += `
      <a href="tripdetails.html" class="trip-card-container-${trip.id}">
        <div class="trip-card">
          <div class="trip-title">${trip.title}</div>
          <div class="trip-card-date">${startReformat} - ${endReformat}</div>
          <img src="images/recycle-bin-icon.svg" class="delete-trip-button 
            js-delete-trip-button-${trip.id}" data-trip-id="${trip.id}">
        </div>
      </a>
      `
    }
  });

  if (!upcomingHTML) {
    upcomingHTML = `
    <div class="no-trips">
      No trips upcoming.
    </div>
    `
  }

  if (!completedHTML) {
    completedHTML = `
    <div class="no-trips">
      No trips completed.
    </div>
    `
  }

  document.querySelector(".upcoming-trip-grid").innerHTML = upcomingHTML;
  document.querySelector(".completed-trip-grid").innerHTML = completedHTML;

  document.querySelector(".add-trip-button").addEventListener("click", () => {
    renderAddTrip();
  });
  
  if (document.querySelector(".overlay-cancel")) {
    document.querySelector(".overlay-cancel").addEventListener("click", () => {
      document.querySelector(".overlay").remove();
      renderYourTrips();
    });
    
    document.querySelector(".overlay-confirm").addEventListener("click", () => {
      const title = document.querySelector(".js-input-title").value;
      const start = document.querySelector(".js-input-start-date").value;
      const end = document.querySelector(".js-input-end-date").value;

      addTrip(title, start, end, id);
      document.querySelector(".overlay").remove();

      renderYourTrips();
    });
  }

  document.querySelectorAll(".delete-trip-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const tripId = button.dataset.tripId;

      removeTrip(tripId);
      document.body.querySelector(`.trip-card-container-${tripId}`).remove();
      
      renderYourTrips();
    })
  });

  function renderBaseYourTrips() {
    const mainHTML = `
    <div class="page-title-solo">
      Your Trips
    </div>
    <div class="upcoming-container">
      <div class="section-header">
        <div class="category-label">
          Upcoming Trips
        </div>
        <button class="add-trip-button">Add a Trip</button>
      </div>
      <div class="upcoming-trip-grid">
      </div>
    </div>
    <div class="completed-container">
      <div class="section-header">
        <div class="category-label">
          Completed Trips
        </div>
      </div>
      <div class="completed-trip-grid">
      </div>
    </div>
    `
    
    document.querySelector(".main-body").innerHTML = mainHTML;
  }
  
  function renderAddTrip() {
    const overlayHTML = `
    <div class="overlay">
      <div class="overlay-page">
        <div class="overlay-title">
          Add a Trip
        </div>
        <div class="overlay-body">
          <div class="overlay-section section-name">
            <div class="overlay-section-title">
              Where are you traveling?
            </div>
            <input class="overlay-input js-input-title" maxlength="40">
          </div>
          <div class="overlay-section section-name">
            <div class="overlay-section-title">
              When are you traveling?
            </div>
            <div class="overlay-section-daterange">
              <input class="overlay-input-date js-input-start-date" type="date">
              <div class="overlay-section-daterange-to">to</div>
              <input class="overlay-input-date js-input-end-date" type="date">
            </div>
          </div>
          <div class="overlay-buttons">
            <button class="overlay-cancel">
              Cancel
            </button>
            <button class="overlay-confirm">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    `;

    document.body.innerHTML = overlayHTML + document.body.innerHTML;
    renderYourTrips();
  }
}