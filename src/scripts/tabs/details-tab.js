export function renderDetailsTab(dayList) {
  const baseHTML = `
  <div class="page-title-grid">
    <div class="page-title">
      Trip Details
    </div>
    <div class="page-title unselected-tab">
      Expenses and Debts
    </div>
  </div>
  <div class="trip-actions">
    <button class="action-option add-event-button">
      Add Event
    </button>
    <button class="action-option rename-trip-button">
      Rename Trip
    </button>
    <button class="action-option change-date-button">
      Change Date
    </button>
  </div>
  <div class="details-container">
    <div class="day-list">
    </div>
  </div>
  `

  document.querySelector(".main-body").innerHTML = baseHTML;

  let dayListHTML = "";
  
  if (Object.keys(dayList).length == 0) {
    dayListHTML = `
    <div class="no-events">
      No events yet.
    </div>
    `;
  }
  else {
    Object.keys(dayList).sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
        return 0;
    }).forEach((dayKey) => {
      let dayHTML = `
      <details class="day-wrapper" open>
        <summary class="day-header js-day-header-${dayKey}">
            <img src="images/triangle-right-icon.svg" class="triangle-right-icon">
            ${getDayOfWeek(`${dayKey}`)}, ${dayKey.slice(5, 7)}/${dayKey.slice(8, 10)}
        </summary>
        <div class="event-list js-event-list-${dayKey}">${renderEventList(dayList, dayKey)}</div>
      </details>
      `;
  
      dayListHTML += dayHTML;
    });
  }

  document.querySelector(".day-list").innerHTML = dayListHTML;
}

function getDayOfWeek(day) {
  const date = new Date(day);
  const dayNum = date.getDay();

  if (dayNum === 0) {
    return "Sunday";
  }
  if (dayNum === 1) {
    return "Monday";
  }
  if (dayNum === 2) {
    return "Tuesday";
  }
  if (dayNum === 3) {
    return "Wednesday";
  }
  if (dayNum === 4) {
    return "Thursday";
  }
  if (dayNum === 5) {
    return "Friday";
  }
  if (dayNum === 6) {
    return "Saturday";
  }
}

function renderEventList(dayList, key) {
  let eventListHTML = "";

  for (let index = 0; index < dayList[key].length; index++) {
    const event = dayList[key][index];

    let costSplitting;

    if (event.costSplitting) {
      costSplitting = "Yes";
    }
    else {
      costSplitting = "No";
    }

    eventListHTML += `
    <details class="event-info event-info-${event.id}">
    <summary class="basic-event-info" data-event-id="${event.id}">
        <div class="event-name">${event.name}</div>
        <div class="event-time">${timeMilitaryToNormal(event.startTime)} - ${timeMilitaryToNormal(event.endTime)}</div>
        <img src="images/plus-line-icon.svg" class="expand-collapse-icon expand-collapse-icon-${event.id}">
    </summary>
    <div class="expanded-event-info">
        <div class="event-money">
        <div class="event-cost">Cost: $${event.cost}</div>
        <div class="event-costsplitting">Cost-splitting: ${costSplitting}</div>
        <div class="event-spacing"> </div>
        </div>
        <div class="event-type">
        Event Type: ${event.type}
        </div>
        <div class="event-people">
        <div class="identifying-question">Who: </div>
        ${event.people.join(", ")}
        </div>
        <div class="event-payers">
        <div class="identifying-question">Who paid: </div>
        ${renderPayments(event)}
        </div>
        <div class="expanded-event-options">
        <button class="edit-event-button" data-day-key="${key}" data-event-index="${index}">Edit Event</button>
        <button class="remove-event-button" data-day-key="${key}" data-event-id="${event.id}">Remove Event</button>
        </div>
    </div>
    </details>
    `
  }

  return eventListHTML;
}

function timeMilitaryToNormal(timeString) {
  let hours = Number(timeString.slice(0, 2));
      
  if (hours >= 12) {
    if (hours >= 13) {
      hours -= 12;
    }

    return hours + timeString.slice(2) + " PM";
  }
  else if (hours >= 10) {
    return timeString + " AM";
  }
  else if (hours >= 1) {
    return timeString.slice(1) + " AM";
  }
  else {
    return "12" + timeString.slice(2) + " AM";
  }
}

function renderPayments(eventObj) {
  let paymentHTML = "";

  for (let i = 0; i < eventObj.people.length; i++) {

    if (eventObj.paid[i]) {
      if (paymentHTML !== "") {
        paymentHTML += ", "
      }
      paymentHTML += `${eventObj.people[i]} - $${eventObj.payments[i]}`
    }
  }
  return paymentHTML;
}