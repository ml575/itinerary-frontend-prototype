## TripGenius Travel Organizer

#### TripGenius is a web application designed to help users by simplifying the logistic and budgetary chaos that often comes with organizing trips. In particular, I developed the application with expense-tracking and cost-splitting functionalities in mind.

<img width="1280" alt="Screenshot 2024-10-05 at 1 18 54 AM" src="https://github.com/user-attachments/assets/09da43f0-57aa-43c8-bf8c-209ba0034577">

##### Having no trips - like when you start out - will look like this:

<img width="1280" alt="Screenshot 2024-10-05 at 1 29 37 AM" src="https://github.com/user-attachments/assets/8a8bbb2d-7471-4337-ada3-76af885c3fbc">

##### You can add trips by pressing the "Add a Trip" button.

<img width="1280" alt="Screenshot 2024-10-05 at 1 41 38 AM" src="https://github.com/user-attachments/assets/781fbf88-0e0e-411f-884a-33b09d92f1f2">

##### Trips will be sorted based on if they're upcoming or completed:

<img width="1280" alt="Screenshot 2024-10-05 at 1 43 26 AM" src="https://github.com/user-attachments/assets/0e7c52fc-67d4-4e0e-bbed-724230170fea">
<img width="1280" alt="Screenshot 2024-10-05 at 1 43 35 AM" src="https://github.com/user-attachments/assets/bbf4aece-c096-4e77-9649-ce17faa48ef4">

##### Within each trip, you can add events. You can also rename the trip or change the start and end dates.

<img width="1280" alt="Screenshot 2024-10-05 at 1 45 55 AM" src="https://github.com/user-attachments/assets/f806d650-6029-45af-95a5-1aa833d75787">

##### Adding an event looks like this. You will first be prompted to input how many people will be at the event.

<img width="1280" alt="Screenshot 2024-10-05 at 4 58 27 PM" src="https://github.com/user-attachments/assets/728894ab-f552-4998-ae60-5d13fb01921f">

You will then be prompted for further information on the event, such as the event name, the event date and time, the event cost, and the event type. Additionally, based off of the number of participants, the event manager will create the necessary number of prompts for participant names and payment statuses. Opting in to the cost-splitting feature will add this event to the list of events being tracked for cost-splitting (explained below).

<img width="1280" alt="Screenshot 2024-10-05 at 5 06 13 PM" src="https://github.com/user-attachments/assets/30ad65e2-010e-4c6e-a2fc-51dcb026101a">

Finally, based on the number of participants who were marked as having paid, you will be prompted to input the amounts each participant paid.

<img width="1280" alt="Screenshot 2024-10-05 at 5 07 25 PM" src="https://github.com/user-attachments/assets/470c795f-ffbb-44de-b11b-56227cdbaa8b">

The event will now appear in the Trip Details tab:

<img width="1280" alt="Screenshot 2024-10-05 at 5 11 09 PM" src="https://github.com/user-attachments/assets/f9f53a7c-9c4c-44a0-a96c-f9c8c73338f6">

You can click on the event to expand it and see extra details, as well as to edit it or remove it.

<img width="1280" alt="Screenshot 2024-10-05 at 5 12 23 PM" src="https://github.com/user-attachments/assets/8e456769-fec4-458c-b460-8a6ddb680780">

After inputting all events, your trip will look something like this (events will be sorted based on date and end time):

<img width="1280" alt="Screenshot 2024-10-05 at 6 39 30 PM" src="https://github.com/user-attachments/assets/23af862f-cc79-4a2f-a06c-291d0392be14">

Clicking on the Expenses and Debts tab, we can see a graphical breakdown on trip expenses based on both event type and day:

<img width="1280" alt="Screenshot 2024-10-05 at 6 41 48 PM" src="https://github.com/user-attachments/assets/c1d55db8-8ef1-4eb1-872b-7496cb6334d9">
<img width="1280" alt="Screenshot 2024-10-05 at 6 42 01 PM" src="https://github.com/user-attachments/assets/6e4b051a-71e1-493d-95c4-6ff6ea9c53ab">

## Cost-splitting

Scrollling further down on the Expenses and Debts tab, we can see the end-of-trip debts.

Here, the events that have opted in to cost-splitting will have their costs split evenly between the participants; debts will then be calculated based on this even-split price and each participant's amount paid for the event. For example, if an event marked for cost-splitting was $90 and had 3 participants (Tom, Charlie, and Mark), and Tom paid $45 and Charlie paid $45, then this section would show that Mark owes Tom and Charlie $15 each.

Moreover, the debt calculation also calculates end debts after canceling out any potential two-way debts. For instance, if there was an event where Tom owed Mark $30 but there was also an event where Mark owed Tom $20, the system will cancel out the debts and display the remaining debt, Tom owing Mark $10.

<img width="1280" alt="Screenshot 2024-10-05 at 6 42 36 PM" src="https://github.com/user-attachments/assets/ee2044f5-4727-46dc-b8b9-30c7da8579d9">

