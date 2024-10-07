import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function renderExpensesTab(dayList) {
  console.log(dayList);
  const baseHTML = `
  <div class="page-title-grid">
    <div class="page-title unselected-tab">
      Trip Details
    </div>
    <div class="page-title">
        Expenses and Debts
    </div>
  </div>
  <div class="expenses-graph-container">
    <div class="expenses-graph-title">
      All-Time Trip Expenses by Event Type
    </div>
    <div class="graph-and-legend">
      <div class="graph expenses-by-type">
      </div>
    </div>
  </div>
  <div class="expenses-graph-container">
    <div class="expenses-graph-title">
      Trip Expenses by Day
    </div>
    <div class="graph-and-legend">
      <div class="graph expenses-by-day">
      </div>
      <div class="legend expenses-by-day-legend">
      </div>
    </div>
  </div>
  <div class="costplitting-container">
    <div class="debts-title">
      End of Trip Costsplitting
    </div>
    <div class="debts-list">
    </div>
  </div>
  `

  document.querySelector(".main-body").innerHTML = baseHTML;

  if (Object.keys(dayList).length == 0) {

    const expensesByTypeHTML = `
    <div class="no-graph">
      No expenses yet.
    </div>
    `;

    const expensesByDayHTML = `
    <div class="no-graph">
      No expenses yet.
    </div>
    `;

    document.querySelector(".expenses-by-type").innerHTML = expensesByTypeHTML;
    document.querySelector(".expenses-by-day").innerHTML = expensesByDayHTML;

    return;
  }

  /*
    A day's expenses will look like:
    dayExpense {
      date: "MM-DD-YYYY"
      activityCost: 100
      foodCost: 200
      transportationCost: 100
      hotelCost: 200
    }
  */
  const expensesByType = [
    {
      key: "activity",
      cost: 0
    },
    {
      key: "food",
      cost: 0
    },
    {
      key: "transportation",
      cost: 0
    },
    {
      key: "hotel/lodging",
      cost: 0
    },
    {
      key: "other",
      cost: 0
    }
  ]

  const expensesByDay = [];
  let largestDaily = -1;

  Object.keys(dayList).sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
      return 0;
  }).forEach((dayKey) => {
    // iterate over dayKey's seq
    const dayEvents = dayList[dayKey];

    let activity = 0;
    let food = 0;
    let transportation = 0;
    let hotel = 0;
    let other = 0;

    for (let i = 0; i < dayEvents.length; i++) {
      if (dayEvents[i].type == "Activity") {
        expensesByType[0].cost += dayEvents[i].cost;
        activity += dayEvents[i].cost;
      }
      else if (dayEvents[i].type == "Food") {
        expensesByType[1].cost += dayEvents[i].cost;
        food += dayEvents[i].cost;
      }
      else if (dayEvents[i].type == "Transportation") {
        expensesByType[2].cost += dayEvents[i].cost;
        transportation += dayEvents[i].cost;
      }
      else if (dayEvents[i].type == "Hotel/Lodging") {
        expensesByType[3].cost += dayEvents[i].cost;
        hotel += dayEvents[i].cost;
      }
      else {
        expensesByType[4].cost += dayEvents[i].cost;
        other += dayEvents[i].cost;
      }
    }

    const dayExpense = {
      key: `${dayKey.slice(5, 7)}/${dayKey.slice(8, 10)}/${dayKey.slice(0, 4)}`,
      activity: activity,
      food: food,
      transportation: transportation,
      hotel: hotel,
      other: other
    }

    const dailyTotal = activity + food + transportation + hotel + other;
    largestDaily = Math.max(largestDaily, dailyTotal);

    expensesByDay.push(dayExpense)
  });

  const largestType = Math.max(...expensesByType.map(item => item.cost));
  console.log(expensesByType);
  console.log(expensesByDay);
  drawExpensesPlot(expensesByType, ".expenses-by-type", largestType + 20, false);
  drawExpensesPlot(expensesByDay, ".expenses-by-day", largestDaily + 20, true);

}

function drawExpensesPlot(expenseObj, domName, plotHeight, isStacked) {
  const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 850 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  
  const svg = d3.select(domName)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  const groups = expenseObj.map(d => d.key);

  const x = d3.scaleBand()
  .domain(groups)
  .range([0, width])
  .padding(0.2);

  svg.append("g")
  .style("font", "14px trebuchet ms")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickSizeOuter(0));

  const y = d3.scaleLinear()
    .domain([0, plotHeight])
    .range([height, 0]);

  svg.append("g")
    .style("font", "14px trebuchet ms")
    .call(d3.axisLeft(y));

  if (!isStacked) {
    svg.selectAll("mybar")
    .data(expenseObj)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.key); })
      .attr("y", function(d) { return y(d.cost); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.cost); })
      .attr("fill", "#fd7f6f")
  }
  else {
    const subgroups = Object.keys(expenseObj[0]).slice(1);

    const color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a"]);

    const stackedExpensesByDay = d3.stack()
      .keys(subgroups)
      (expenseObj);

    svg.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedExpensesByDay)
      .join("g")
        .attr("fill", d => color(d.key))
        .attr("class", d => "myRect " + d.key) // Add a class to each subgroup: their name
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(d => d)
        .join("rect")
          .attr("x", d => x(d.data.key))
          .attr("y", d => y(d[1]))
          .attr("height", d => y(d[0]) - y(d[1]))
          .attr("width",x.bandwidth())
          .attr("stroke", "grey")
          .on("mouseover", function (event,d) { // What happens when user hover a bar

            // what subgroup are we hovering?
            const subGroupName = d3.select(this.parentNode).datum().key

            // Reduce opacity of all rect to 0.2
            d3.selectAll(".myRect").style("opacity", 0.2)

            // Highlight all rects of this subgroup with opacity 1. It is possible to select them since they have a specific class = their name.
            d3.selectAll("."+subGroupName).style("opacity", 1)
          })
          .on("mouseleave", function (event, d) { // When user do not hover anymore

            // Back to normal opacity: 1
            d3.selectAll(".myRect")
            .style("opacity", 1)
        });
    
    const legend_margin = {top: 30, right: 30, bottom: 70, left: 60},
      legend_width = 200 - legend_margin.left - legend_margin.right,
      legend_height = 200 - legend_margin.top - legend_margin.bottom;
  
    const legend_svg = d3.select(`${domName}-legend`)
    .append("svg")
      .attr("width", legend_width + legend_margin.left + legend_margin.right)
      .attr("height", legend_height + legend_margin.top + legend_margin.bottom)
    .append("g")
      .attr("transform", "translate(" + legend_margin.left + "," + legend_margin.top + ")");

    legend_svg.selectAll("mydots")
    .data(subgroups)
    .enter()
    .append("circle")
      .attr("cx", -20)
      .attr("cy", function(d, i) {return i * 35}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 7)
      .style("fill", function(d) {return color(d)});
    
    legend_svg.selectAll("mylabels")
    .data(subgroups)
    .enter()
    .append("text")
      .attr("x", 0)
      .attr("y", function(d, i) {return i * 35}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function(d) {return color(d)})
      .text(function(d) {return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");
  }
}

export function renderDebts(debts) {
  console.log(debts);
  /*
    debts has the following form:
    {
      Person 1: {   // The person who owes money
        Person 2: 50,   // The people who are owed money + the amount they're owed
        Person 3: 50
      },
      Person 2: {
        ...
      },
      ...
    }
  */

  let debtsListHTML = "";

  if (Object.keys(debts).length == 0) {

    debtsListHTML += `
    <div class="no-debts">
      No costsplitting yet.
    </div>
    `;

    document.querySelector(".debts-list").innerHTML = debtsListHTML;

    return;
  }

  Object.keys(debts).sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
      return 0;
  }).forEach((debtor) => {

    if (Object.keys(debts[debtor]).length) {
      let debtorHTML = `
      <details class="debtor-wrapper" open>
        <summary class="debtor-header">
            <img src="images/triangle-right-icon.svg" class="triangle-right-icon">
            ${debtor}
        </summary>
        <div class="receiver-list">${renderReceivers(debts, debtor)}</div>
      </details>
      `;

      debtsListHTML += debtorHTML;
    }
  })

  // ${debtor} owes ${receiver} $${debts[debtor][receiver]}  
  document.querySelector(".debts-list").innerHTML = debtsListHTML;
}

function renderReceivers(debts, debtor) {
  let receiversHTML = "";

  Object.keys(debts[debtor]).sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
      return 0;
  }).forEach((receiver) => {
    receiversHTML += `
    <div class="receiver-info">
      <div class="receiver-name">
        Owes ${receiver}:
      </div>
      <div class="receiver-amount">
        $${debts[debtor][receiver]}
      </div>
    </div>
    `;
  });

  return receiversHTML;
}