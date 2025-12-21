
# Daily-U 

A Super Personalized Daily Challenge Tracker Made by Haeilee
based on so-called the SPF principle

Simplicity : One SIMPLE action a day

Priotise : No more than 3 projects at once

Final : Today's Action: Today Only


I came up with this concept out of searching for the right tracker of my own needs and failing it. I wanted a to-do list app that is simple enough for me : One simple action a day for a project, number of days of success and missing, and a note if I missed so that I can review and adjust actions for tomorrow's success.
## Demo

https://idyllic-ethos-480508-h0.web.app/

## Features

- Project CRUD
- Daily auto-generated Action of Projects
- Action CRUD



## Tech Stack

**Framework**: Next.js (App Router)


**Frontend**: TypeScript, Tailwind CSS


**Backend/Database**: Firebase (Firestore, Authentication, Function run and Scheduler)

**Deployment**: Google Cloud Platform (GCP) - Static Hosting

### Why Firebase / Google Cloud?
* **Efficient Backend Management (BaaS):** I utilized Firebase to handle database management and security, allowing me to focus on the frontend experience without the overhead of server maintenance.
* **Seamless Next.js Integration:** By fetching data directly through the Firebase SDK, I minimized the need for API middleware, resulting in a faster and more responsive development process.

* **Core Feature:** daily auto-generated action with GCS : I could developed the core feature by combinating Function Run to generate the action according to Firestore, Scheduler to run it everyday.

## Support

**STILL WORKING ON IT**
Thanks for your attention visiting here and reading it through
a lot more to come. Please be mindful that this project may have areas for improvement, and I welcome any feedback to help me grow : haeilee789@gmail.com

