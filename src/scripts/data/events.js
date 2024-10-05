export let dayList;

loadDayList();

function loadDayList() {
  dayList = JSON.parse(localStorage.getItem("dayList"));

  if (!dayList) {
    dayList = {}
    // dayList = {
    //   "2025-01-02": [
    //     {
    //       numPeople: 7,
    //       name: "Uber to lunch",
    //       date: "2025-01-02",
    //       startTime: "12:57",
    //       endTime: "13:40",
    //       // Below are in expanded details
    //       cost: 70,
    //       costSplitting: true,
    //       type: "Transportation",
    //       people: [
    //         "Person 1",
    //         "Person 2",
    //         "Person 3",
    //         "Person 4",
    //         "Person 5",
    //         "Person 6",
    //         "Person 7"
    //       ],
    //       paid: [
    //         false,
    //         false,
    //         true,
    //         false,
    //         false,
    //         false,
    //         true
    //       ],
    //       payments: [
    //         0,
    //         0,
    //         50,
    //         0,
    //         0,
    //         0,
    //         20
    //       ],
    //       id: String(Math.floor(Math.random() * 1000000000000000))
    //     },
    //     {
    //       numPeople: 4,
    //       name: "Had lunch",
    //       date: "2025-01-02",
    //       startTime: "07:00",
    //       endTime: "10:00",
    //       cost: 80,
    //       costSplitting: true,
    //       type: "Food",
    //       people: [
    //         "Person 1",
    //         "Person 2",
    //         "Person 3",
    //         "Person 4"
    //       ],
    //       paid: [
    //         false,
    //         false,
    //         true,
    //         true
    //       ],
    //       payments: [
    //         0,
    //         0,
    //         50,
    //         30
    //       ],
    //       id: String(Math.floor(Math.random() * 1000000000000000))
    //     },
    //     {
    //       numPeople: 7,
    //       name: "Universal booth games",
    //       date: "2024-12-29",
    //       startTime: "03:45",
    //       endTime: "04:10",
    //       // Below are in expanded details
    //       cost: 56,
    //       costSplitting: true,
    //       type: "Activity",
    //       people: [
    //         "Person 1",
    //         "Person 2",
    //         "Person 3",
    //         "Person 4",
    //         "Person 5",
    //         "Person 6",
    //         "Person 7"
    //       ],
    //       paid: [
    //         false,
    //         true,
    //         false,
    //         true,
    //         true,
    //         false,
    //         false
    //       ],
    //       payments: [
    //         0,
    //         36,
    //         0,
    //         10,
    //         10,
    //         0,
    //         0
    //       ],
    //       id: String(Math.floor(Math.random() * 1000000000000000))
    //     },
    //     {
    //       numPeople: 7,
    //       name: "2nd Airbnb",
    //       date: "2024-12-29",
    //       startTime: "19:45",
    //       endTime: "20:00",
    //       // Below are in expanded details
    //       cost: 70,
    //       costSplitting: true,
    //       type: "Hotel/Lodging",
    //       people: [
    //         "Person 1",
    //         "Person 2",
    //         "Person 3",
    //         "Person 4",
    //         "Person 5",
    //         "Person 6",
    //         "Person 7"
    //       ],
    //       paid: [
    //         false,
    //         false,
    //         true,
    //         false,
    //         false,
    //         false,
    //         true
    //       ],
    //       payments: [
    //         0,
    //         0,
    //         50,
    //         0,
    //         0,
    //         0,
    //         20
    //       ],
    //       id: String(Math.floor(Math.random() * 1000000000000000))
    //     }
    //   ],
    //   "2024-12-29": [
    //     {
    //       numPeople: 7,
    //       name: "Went to park and skated",
    //       date: "2024-12-29",
    //       startTime: "00:45",
    //       endTime: "03:00",
    //       // Below are in expanded details
    //       cost: 70,
    //       costSplitting: true,
    //       type: "Activity",
    //       people: [
    //         "Person 1",
    //         "Person 2",
    //         "Person 3",
    //         "Person 4",
    //         "Person 5",
    //         "Person 6",
    //         "Person 7"
    //       ],
    //       paid: [
    //         false,
    //         false,
    //         true,
    //         false,
    //         false,
    //         false,
    //         true
    //       ],
    //       payments: [
    //         0,
    //         0,
    //         50,
    //         0,
    //         0,
    //         0,
    //         20
    //       ],
    //       id: String(Math.floor(Math.random() * 1000000000000000))
    //     },
    //     {
    //       numPeople: 7,
    //       name: "1st Airbnb",
    //       date: "2024-12-29",
    //       startTime: "05:45",
    //       endTime: "07:00",
    //       // Below are in expanded details
    //       cost: 84,
    //       costSplitting: true,
    //       type: "Hotel/Lodging",
    //       people: [
    //         "Person 1",
    //         "Person 2",
    //         "Person 3",
    //         "Person 4",
    //         "Person 5",
    //         "Person 6",
    //         "Person 7"
    //       ],
    //       paid: [
    //         true,
    //         false,
    //         true,
    //         false,
    //         false,
    //         false,
    //         true
    //       ],
    //       payments: [
    //         14,
    //         0,
    //         50,
    //         0,
    //         0,
    //         0,
    //         20
    //       ],
    //       id: String(Math.floor(Math.random() * 1000000000000000))
    //     },
    //     {
    //       numPeople: 7,
    //       name: "Breakfast",
    //       date: "2024-12-29",
    //       startTime: "08:45",
    //       endTime: "10:00",
    //       // Below are in expanded details
    //       cost: 35,
    //       costSplitting: true,
    //       type: "Food",
    //       people: [
    //         "Person 1",
    //         "Person 2",
    //         "Person 3",
    //         "Person 4",
    //         "Person 5",
    //         "Person 6",
    //         "Person 7"
    //       ],
    //       paid: [
    //         false,
    //         false,
    //         false,
    //         false,
    //         false,
    //         true,
    //         false
    //       ],
    //       payments: [
    //         0,
    //         0,
    //         0,
    //         0,
    //         0,
    //         35,
    //         0
    //       ],
    //       id: String(Math.floor(Math.random() * 1000000000000000))
    //     },
    //     {
    //       numPeople: 7,
    //       name: "Uber to universal",
    //       date: "2024-12-29",
    //       startTime: "10:30",
    //       endTime: "11:00",
    //       // Below are in expanded details
    //       cost: 35,
    //       costSplitting: true,
    //       type: "Transportation",
    //       people: [
    //         "Person 1",
    //         "Person 2",
    //         "Person 3",
    //         "Person 4",
    //         "Person 5",
    //         "Person 6",
    //         "Person 7"
    //       ],
    //       paid: [
    //         false,
    //         true,
    //         true,
    //         false,
    //         false,
    //         false,
    //         true
    //       ],
    //       payments: [
    //         0,
    //         5,
    //         10,
    //         0,
    //         0,
    //         0,
    //         20
    //       ],
    //       id: String(Math.floor(Math.random() * 1000000000000000))
    //     }
    //   ]
    // };
  }
}

export function saveDayList() {
  localStorage.setItem("dayList", JSON.stringify(dayList));
}

export function addEvent(eventObj) {
  const key = eventObj.date
  if (dayList[key]) {
    dayList[key].push(eventObj);
  }
  else {
    dayList[key] = [eventObj]; 
  }

  saveDayList();
}

export function removeEvent(key, id) {
  for (let i = 0; i < dayList[key].length; i++) {
    if (dayList[key][i].id === id) {
      dayList[key].splice(i, 1);
      break;
    }
  }

  if (dayList[key].length === 0) {
    delete dayList[key];
  }

  saveDayList();

  console.log(dayList);
}

export function getDebts() {
  const debts = {}

  Object.keys(dayList).sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
      return 0;
  }).forEach((dayKey) => {
    // console.log(dayKey);
    dayList[dayKey].forEach((event) => {
      // console.log("Event:", event);
      if (event.costSplitting) {
        const fairPrice = parseFloat((event.cost / event.numPeople).toFixed(2));
        // console.log("Fair price for this event: ", fairPrice);
        // console.log("People for this event: ", event.people);
        // console.log("Payments for this event: ", event.payments);
        const lowerStack = []
        const greaterStack = []

        for (let i = 0; i < event.payments.length; i++) {
          if (!debts[event.people[i]]) {
            debts[event.people[i]] = {}; // Creates debt for current if debt doesn't exist yet
          }
          const differential = parseFloat((event.payments[i] - fairPrice).toFixed(2));
          // console.log(differential);

          if (differential < 0) {
            lowerStack.push([Math.abs(differential), i]);
          }
          else if (differential > 0) {
            greaterStack.push([differential, i]);
          }

          while (lowerStack.length && greaterStack.length) {
            // console.log("Entered while loop; time to calculate debts");
            const lowerToPop = lowerStack[lowerStack.length - 1];
            const greaterToPop = greaterStack[greaterStack.length - 1];
            // console.log("Amount owed, person", lowerToPop[0], lowerToPop[1]);
            // console.log("Amount needed, person", greaterToPop[0], greaterToPop[1])

            if (Math.abs(lowerToPop[0]) < greaterToPop[0]) { // owe less than what person needs
              const owed = lowerStack.pop()[0];
              greaterToPop[0] = parseFloat((greaterToPop[0] - owed).toFixed(2));
              
            // If the reverse (debts[event.people[greaterToPop[1]]][event.people[lowerToPop[1]]]) is in debts already, 
            // If reverse is greater, then subtract from reverse and don't even create key
            // If current is greater, then subtract reverse from it and then create key if needed

              if (debts[event.people[lowerToPop[1]]][event.people[greaterToPop[1]]]) {
                debts[event.people[lowerToPop[1]]][event.people[greaterToPop[1]]] += owed;
              }
              else {
                debts[event.people[lowerToPop[1]]][event.people[greaterToPop[1]]] = owed;
              }
              // First part uses lower's index to find name matching lowerToPop's person 
              // Second part uses higher's index to find the name matching greater
            }
            else if (Math.abs(lowerToPop[0]) > greaterToPop[0]) {
              const owed = greaterStack.pop()[0];
              lowerToPop[0] = parseFloat((lowerToPop[0] - owed).toFixed(2));
              if (debts[event.people[lowerToPop[1]]][event.people[greaterToPop[1]]]) {
                debts[event.people[lowerToPop[1]]][event.people[greaterToPop[1]]] += owed;
              }
              else {
                debts[event.people[lowerToPop[1]]][event.people[greaterToPop[1]]] = owed;
              }
            }
            else {
              const owed = lowerStack.pop()[0];
              greaterStack.pop();
              if (debts[event.people[lowerToPop[1]]][event.people[greaterToPop[1]]]) {
                debts[event.people[lowerToPop[1]]][event.people[greaterToPop[1]]] += owed;
              }
              else {
                debts[event.people[lowerToPop[1]]][event.people[greaterToPop[1]]] = owed;
              }
            }
          }
        }
      }
    });
  });

  Object.keys(debts).forEach((debtor) => {
    Object.keys(debts[debtor]).forEach((receiver) => {
      if (debts[debtor][receiver]) {
        if (debts[receiver][debtor]) {
          if (debts[receiver][debtor] >= debts[debtor][receiver]) {
            debts[receiver][debtor] = parseFloat((debts[receiver][debtor] - debts[debtor][receiver]).toFixed(2));
            delete debts[debtor][receiver];
            if (debts[receiver][debtor] == 0) {
              delete debts[receiver][debtor];
            }
          }
          else {
            debts[debtor][receiver] = parseFloat((debts[debtor][receiver] - debts[receiver][debtor]).toFixed(2));
            delete debts[receiver][debtor];
          }
        }
      }
    });
  });

  return debts;
}