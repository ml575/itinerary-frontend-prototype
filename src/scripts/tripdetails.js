import {trips, renameTrip, changeDate} from "./data/trips.js";
import {dayList, addEvent, removeEvent, saveDayList, getDebts} from "./data/events.js";
import {renderDetailsTab} from "./tabs/details-tab.js";
import {renderExpensesTab, renderDebts} from "./tabs/expenses-tab.js";

renderTripDetails(true);

function renderTripDetails(isDetails) {
  console.log(dayList);

  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  let thisTrip;
  let tripIndex = 0;

  for (; tripIndex < trips.length; tripIndex++) {
    if (trips[tripIndex].id === id) {
      thisTrip = trips[tripIndex];
      break;
    }
  }

  renderBasicTripDetails(thisTrip);

  if (isDetails) {
    renderDetailsTab(dayList);

    document.querySelector(".unselected-tab").addEventListener("click", () => {
      renderTripDetails(false)
    })

    document.querySelector(".add-event-button").addEventListener("click", () => {
      renderAddEventPage1({}, "Add an");
    });
  
    document.querySelector(".rename-trip-button").addEventListener("click", () => {
      renderRenameTrip(thisTrip, tripIndex);
    });
  
    document.querySelector(".change-date-button").addEventListener("click", () => {
      renderChangeDate(thisTrip, tripIndex);
    });
  
    document.querySelectorAll(".basic-event-info").forEach((eventHeader) => {
      eventHeader.addEventListener("click", () => {
        const eventId = eventHeader.dataset.eventId;
        
        if (document.querySelector(`.event-info-${eventId}`).hasAttribute("open")) {
          document.querySelector(`.expand-collapse-icon-${eventId}`).src = "images/plus-line-icon.svg";
        }
        else {
          document.querySelector(`.expand-collapse-icon-${eventId}`).src = "images/minus-line-icon.svg";
        }
      })
    })
  
    document.querySelectorAll(".edit-event-button").forEach((button) => {
      button.addEventListener("click", () => {
        const event = dayList[button.dataset.dayKey][button.dataset.eventIndex];
        renderAddEventPage1(event, "Edit");
      });
    })
  
    document.querySelectorAll(".remove-event-button").forEach((button) => {
      button.addEventListener("click", () => {
        removeEvent(button.dataset.dayKey, button.dataset.eventId);
        renderTripDetails(true);
        
      })
    })
  }
  else {
    renderExpensesTab(dayList);
    renderDebts(getDebts());

    document.querySelector(".unselected-tab").addEventListener("click", () => {
      renderTripDetails(true);
    })
  }
}

function renderBasicTripDetails(thisTrip) {  
  const startReformat = `${thisTrip.startDate.slice(5, 7)}/${thisTrip.startDate.slice(8, 10)}/${thisTrip.startDate.slice(0, 4)}`;
  const endReformat = `${thisTrip.endDate.slice(5, 7)}/${thisTrip.endDate.slice(8, 10)}/${thisTrip.endDate.slice(0, 4)}`;

  const basicDetailsHTML = `
  <div class="trip-name">
    ${thisTrip.title}
  </div>
  <div class="trip-date">
    ${startReformat} - ${endReformat}
  </div>
  `

  document.querySelector(".basic-trip-details").innerHTML = basicDetailsHTML;
}

function renderAddEventPage1(tempObj, type) {
  let placeholder = "";

  if (Object.keys(tempObj).length !== 0) {
    placeholder = tempObj.numPeople;
  }

  const overlayHTML = `
  <div class="overlay">
    <div class="overlay-page">
      <div class="overlay-title">
        ${type} Event
      </div>
      <div class="overlay-body">
        <div class="overlay-section">
          <div class="overlay-section-half">
            <div class="overlay-section-half-title">How many people going?</div>
            <input class="overlay-input js-input-num-people" type="number" value="${placeholder}">
          </div>
        </div>
        <div class="overlay-buttons">
          <button class="overlay-cancel">
            Cancel
          </button>
          <button class="overlay-next js-next-page-1">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.innerHTML = overlayHTML + document.body.innerHTML;

  document.querySelector(".overlay-cancel").addEventListener("click", () => {
    document.querySelector(".overlay").remove();
    renderTripDetails(true);
  });

  document.querySelector(".js-next-page-1").addEventListener("click", () => {
    tempObj.numPeople = document.querySelector(".js-input-num-people").value;
    document.querySelector(".overlay").remove();
    
    renderTripDetails(true);
    renderAddEventPage2(tempObj, type);
  })
}

function renderAddEventPage2(tempObj, type) {

  let peopleGrid = "";

  for (let i = 0; i < tempObj.numPeople; i++) {
    let placeholderPerson = "";
    let placeholderPaid = "";

    if (Object.keys(tempObj).length !== 1) {
      placeholderPerson = tempObj.people[i];
      placeholderPaid = (tempObj.paid[i]) ? ("checked") : ("");
    }

    peopleGrid += `<div class="overlay-grid-people">
                    <input class="overlay-payer-name js-input-event-person" value="${placeholderPerson}">
                    <div class="pay-or-not">
                      <div class="pay-or-not-text">Paid?</div>
                      <input class="overlay-input-checkbox js-input-event-payornot" type="checkbox" ${placeholderPaid}>
                    </div>
                  </div>
                  `
  }

  let placeholderName = "";
  let placeholderDate = "";
  let placeholderStartTime = "";
  let placeholderEndTime = "";
  let placeholderCost = "";
  let placeholderCostSplitting = "";

  if (Object.keys(tempObj).length !== 1) {
    placeholderName = tempObj.name;
    placeholderDate = tempObj.date;
    placeholderStartTime = tempObj.startTime;
    placeholderEndTime = tempObj.endTime;
    placeholderCost = tempObj.cost;
    placeholderCostSplitting = (tempObj.costSplitting) ? ("checked") : ("");
  }
  console.log(placeholderCostSplitting);

  const overlayHTML = `
  <div class="overlay">
    <div class="overlay-page">
      <div class="overlay-title">
        ${type} Event
      </div>
      <div class="overlay-body">
        <div class="overlay-section section-name">
          <div class="overlay-section-title">
            What is the event called?
          </div>
          <input class="overlay-input js-input-event-name" maxlength="40" value="${placeholderName}">
        </div>
        <div class="overlay-section">
          <div class="overlay-section-title">
            When is the event?
          </div>
          <input class="overlay-input-date-event js-input-event-date" type="date" value="${placeholderDate}">
          <div class="overlay-section-daterange">
            <input class="overlay-input-date js-input-event-starttime" type="time" step="any" value="${placeholderStartTime}">
            <div class="overlay-section-daterange-to">to</div>
            <input class="overlay-input-date js-input-event-endtime" type="time" step="any" value="${placeholderEndTime}">
          </div>
        </div>
        <div class="overlay-section">
          <div class="overlay-section-cost">
            <div class="overlay-section-half-title"> Cost: </div>
          <input class="overlay-input js-input-event-cost" type="number" value="${placeholderCost}">
          </div>
          <div class="overlay-section-costsplit">
            <div class="overlay-section-costsplit-title"> Enable cost-splitting? </div>
            <input class="overlay-input-checkbox js-input-event-costsplitting" type="checkbox" ${placeholderCostSplitting}>
          </div>
          <div class="overlay-section-half">
            <div class="overlay-section-half-title">
              What type of event is it?
            </div>
            <select name="trip-type" class="overlay-input-select js-input-event-type">
              <option value="">Select option...</option>
              <option value="Activity">Activity</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Hotel/Lodging">Hotel/Lodging</option>
            </select>
          </div>
        </div>
        <div class="overlay-section-short">
          <div class="overlay-section-short-title">
            People:
          </div>
          <div class="overlay-section-grid">
            ${peopleGrid}
          </div>
        </div>
        <div class="overlay-buttons">
          <button class="overlay-cancel">
            Cancel
          </button>
          <button class="overlay-next js-next-page-2">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.innerHTML = overlayHTML + document.body.innerHTML;

  document.querySelector(".overlay-cancel").addEventListener("click", () => {
    document.querySelector(".overlay").remove();
    renderTripDetails(true);
  });

  document.querySelector(".js-next-page-2").addEventListener("click", () => {
    tempObj.name = document.querySelector(".js-input-event-name").value;
    tempObj.date = document.querySelector(".js-input-event-date").value;
    tempObj.startTime = document.querySelector(".js-input-event-starttime").value;
    tempObj.endTime = document.querySelector(".js-input-event-endtime").value;
    tempObj.cost = document.querySelector(".js-input-event-cost").value;
    tempObj.costSplitting = document.querySelector(".js-input-event-costsplitting").checked;
    tempObj.type = document.querySelector(".js-input-event-type").value;
    let people = [];
    document.querySelectorAll(".js-input-event-person").forEach((element) => {
      people.push(element.value);
    });
    let paid = [];
    document.querySelectorAll(".js-input-event-payornot").forEach((element) => {
      paid.push(element.checked);
    })

    tempObj.people = people;
    tempObj.paid = paid;

    document.querySelector(".overlay").remove();

    renderTripDetails(true);
    renderAddEventPage3(tempObj, type);
  })
}

function renderAddEventPage3(tempObj, type) {
  console.log(tempObj);

  let paymentsGrid = "";

  for (let i = 0; i < tempObj.people.length; i++) {
    let placeholderPayment = "";

    if (tempObj.paid[i]) {
      if (tempObj.payments) {
        placeholderPayment = tempObj.payments[i];
      }

      paymentsGrid += `
                      <div class="overlay-grid-payer">
                        ${tempObj.people[i]}: &nbsp;&nbsp;$
                        <input class="overlay-payment js-input-event-payment" type="number" value="${placeholderPayment}">
                      </div>
                      `
    }
  }

  const overlayHTML = `
  <div class="overlay">
    <div class="overlay-page">
      <div class="overlay-title">
        ${type} Event
      </div>
      <div class="overlay-body">
        <div class="overlay-section">
          <div class="overlay-section-title">
            How much did the following people pay?
          </div>
        </div>
        <div class="overlay-section-short">
          <div class="overlay-section-short-title">
            People:
          </div>
          <div class="overlay-section-grid">
            ${paymentsGrid}
          </div>
        </div>
        <div class="overlay-buttons">
          <button class="overlay-cancel">
            Cancel
          </button>
          <button class="overlay-create">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.innerHTML = overlayHTML + document.body.innerHTML;

  document.querySelector(".overlay-cancel").addEventListener("click", () => {
    document.querySelector(".overlay").remove();
    renderTripDetails(true);
  });

  document.querySelector(".overlay-create").addEventListener("click", () => {
    let payments = [];
    let index = 0;
  
    // Go through payment boxes and insert the payments at the correct spot in the payments field
    document.querySelectorAll(".js-input-event-payment").forEach((element) => {
      // Go through indexes of paid, pushing a 0 for any falses
      while (!tempObj.paid[index]) {
        payments.push(0);
        index++;
      }
      // Exiting means a true was encountered (the one corresponding to this payment), so push payment 
      payments.push(Number(element.value));
      index++;
    })

    // Covers case when last n people don't pay
    while (payments.length < tempObj.paid.length) {
      payments.push(0);
    }

    tempObj.payments = payments;
    
    if (type !== "Edit") {
      const newObj = {
        numPeople: tempObj.numPeople,
        name: tempObj.name,
        date: tempObj.date, 
        startTime: tempObj.startTime, 
        endTime: tempObj.endTime, 
        cost: Number(tempObj.cost),
        costSplitting: tempObj.costSplitting,
        type: tempObj.type, 
        people: tempObj.people, 
        paid: tempObj.paid, 
        payments: tempObj.payments
      }
  
      newObj.id = String(Math.floor(Math.random() * 1000000000000000));
  
      console.log(newObj);
  
      addEvent(newObj);
    }
    else {
      saveDayList();
    }

    document.querySelector(".overlay").remove();

    renderTripDetails(true);
  });
}

function renderRenameTrip(trip, tripIndex) {
  const overlayHTML = `
  <div class="overlay">
    <div class="overlay-page">
      <div class="overlay-title">
        Rename Trip
      </div>
      <div class="overlay-body">
        <div class="overlay-section">
          <div class="overlay-section-title">
            What's this trip's new name?
          </div>
          <input class="overlay-input js-input-trip-name" maxlength="40" value="${trip.title}">
        </div>
        <div class="overlay-buttons">
          <button class="overlay-cancel">
            Cancel
          </button>
          <button class="overlay-confirm rename-confirm">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.innerHTML = overlayHTML + document.body.innerHTML;

  document.querySelector(".overlay-cancel").addEventListener("click", () => {
    document.querySelector(".overlay").remove();
    renderTripDetails(true);
  });

  document.querySelector(".rename-confirm").addEventListener("click", () => {
    renameTrip(tripIndex, document.querySelector(".js-input-trip-name").value);
    renderTripDetails(true);
  });

  document.querySelector(".overlay-confirm").addEventListener("click", () => {
    document.querySelector(".overlay").remove();
  });
}

function renderChangeDate(trip, tripIndex) {
  const overlayHTML = `
  <div class="overlay">
    <div class="overlay-page">
      <div class="overlay-title">
        Change Date
      </div>
      <div class="overlay-body">
        <div class="overlay-section">
          <div class="overlay-section-title">
            When are you traveling?
          </div>
          <div class="overlay-section-daterange">
            <input class="overlay-input-date js-input-start-date" type="date" value="${trip.startDate}">
            <div class="overlay-section-daterange-to">to</div>
            <input class="overlay-input-date js-input-end-date" type="date" value="${trip.endDate}">
          </div>
        </div>
        <div class="overlay-buttons">
          <button class="overlay-cancel">
            Cancel
          </button>
          <button class="overlay-confirm change-date-confirm">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.innerHTML = overlayHTML + document.body.innerHTML;

  document.querySelector(".overlay-cancel").addEventListener("click", () => {
    document.querySelector(".overlay").remove();
    renderTripDetails(true);
  });

  document.querySelector(".change-date-confirm").addEventListener("click", () => {
    changeDate(tripIndex, document.querySelector(".js-input-start-date").value, 
    document.querySelector(".js-input-end-date").value);
    renderTripDetails(true);
  })

  document.querySelector(".overlay-confirm").addEventListener("click", () => {
    document.querySelector(".overlay").remove();
  });
}