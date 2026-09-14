# Campaign Commander

Act as a Senior Developer and Product Designer and take a clone from https://github.com/awais786ahmad/connect-converse.git
And implement the frontend of campaign Module following the same design patteren and structure


# Campaigns Module

The Campaigns module is where users **create, manage, run, and monitor campaigns**.

Everything related to a campaign is managed from a **single screen**. Users never leave the Campaign page—they simply open drawers or tabs to configure different parts of the campaign.

```text

Campaigns

```

---

## Purpose

Create outbound, inbound, AI, or mixed campaigns, assign a team, configure how the campaign works, and monitor its performance.

apart from teh app shell there is a sidebar on the left side, aat the top is create new campaing button and below that all the campaign list with campaign name and status,  user can click on the campaign to view the campaign details int eh empty inner component

in the inner component at the top there is the campaing name with campaing type,  and action buttons like edit, delete duplicate on the top right, 

below are the tabs for multiple data, 

tabs like Segments ( it includes all teh segments selected by the user, user can add and remove segments and clicking ont eh segment opens the right drawers with all the leads in that segmetns, at the top of the drawer is the metrics of contacted, leads, total leads, follow up , interested or reejected and so on. After that are the list of leads for each type, user can filter out or check the lead as well )

Details ( Deatils tab includes all the configurations nad details of th campaigns )

Team ( team details includes who are working on that campaign and team performance, all members and ai agents included in the team are shown as table and how was their performace what si their progress and what is the QA score for those members )

Scripts ( It shows all the scripts attached for that campaign in the form of accordion, user can open an accrodion to view the complete script )

Templates ( all the templates used in the camapgin same as the scripts , it will be displayed as accrodions, there will be multuple sections, for sms, email etc ) 

Analytics ( this will show all the analytics and metrics for that campaign ) 

data Tables ( The data collected during the campaing is toe be displayed in these data tables, a table would be displayed in this cards, with a a paginatore and a link to ask user to view in the data tables screen, )

User can create a new campaign clicking the new campaing button in the left sidebar, By cliucking on that a modal opens, this modal woudl have a stepper form

In the first step, user needs to add a basic data like campaign name, campaign type,Campaign Purpose,Campaign Goal

in teh seconda step use user needs to assign Assign Team, Lead Segments (Outbound & Broadcast only) for each campaign

in the thord step, there are some basic configurations for the campaign

COnfigurations includes

Inbound Configure: 

	Business Hours

	Queue Settings

	AI Receptionist

Outbound Configure: 

	Dialing Mode

	Working Hours

	Retry Rules

	Maximum Call Attempts

	Ring Duration

	Retry Delay

	Stop Calling Rules

Broadcast Configure: 

	Channel

	Schedule

	Sending Limits

	Message Timing

	Daily Message Limit

In teh forth step, usre needs to assign templates and scripts to the user, 

In this step  there will be a tabs on the side like a sidbar,  which will reveal sections for each type of resoruce

Tabs will SCripts, Templates, Automations, Data Tables 

IN scripts tab, there will be accordion list which will display the scripts avaiable, user can open the accordion for the script and view the complete script, also they can select any script one or more, if user does not have a specifc script here, then they can click add new script at the top of the accordion and go the script sub module and add script modal opens, the campaign is saved as draft, 

IN the Templates tab, Same as scripts , their will be a list of accordions, for both email template and sms template, use can view and select it same as scripts, if they want to crwate a new on they click new template button at the top of accordions, and go to templates sub module and opens the addd templates modal , the campaign is saved as draft. 

IN the automations tab, there is a checklist of all automations, avaiable for the Campaigns with a create new auatomation button at the top, clickin it can open the automations page and save the camapgin in draft. user can select the automation by checking the automations checkbox

For Data Tables Tab, User can use select any premade Data table, or create a new one by clicking new data table button which opens  the Data table module and opens the creatin modal, saves teh campaign as draft.

After every thing is selected at step 5 there is a Overview of all teh campaign settgins and confirmation button for ready and launch campaigs, 

# Campaigns Module

The **Campaigns** module is where users **create, manage, run, and monitor campaigns**.

A campaign represents a complete workflow that combines a **Team**, **Lead Segments**, **Scripts**, **Templates**, **Data Tables**, and **Automations** to achieve a specific business goal.

Every campaign is always assigned to **one Team**. That team may contain Human Agents, AI Agents, or both.

Everything related to a campaign is managed from a **single screen**.

```text

Campaigns

```

---

# Purpose

Create inbound, outbound, or broadcast campaigns, assign them to a team, configure how they work, collect campaign data, automate follow-ups, and monitor their performance.

Apart from the main application sidebar, the Campaign module has its own **secondary sidebar**.

At the top is

```text

+ New Campaign

```

Below it is the list of campaigns showing

* Campaign Name

* Status

* Campaign Type

Clicking a campaign opens it in the main content area.

The main content displays

Top Header

* Campaign Name

* Campaign Type

* Campaign Purpose

* Status

Top Right Actions

* Edit

* Duplicate

* Pause / Resume

* Archive

* Delete

Below the header are the campaign tabs.

```text

Segments

Team

Scripts

Templates

Data Tables

Automations

Analytics

```

---

# Features

* Create Campaign

* Edit Campaign

* Duplicate Campaign

* Pause / Resume

* Archive

* Campaign Status

* Schedule

* Team Assignment

* Segment Assignment

* Scripts

* Templates

* Data Tables

* Automations

* Campaign Analytics

---

# Campaign Type

Campaign Type defines **how communication happens**.

```text

Inbound

Outbound

Broadcast

```

### Inbound

Customer starts the conversation.

Examples

* Customer Support

* Technical Support

* Receptionist

* Booking Calls

* Billing

* Help Desk

---

### Outbound

The assigned Team starts the conversation.

Examples

* Sales

* Lead Qualification

* Collections

* Appointment Calls

* Surveys

* Follow-ups

---

### Broadcast

Send messages or AI calls to many contacts automatically.

Examples

* SMS Campaigns

* Email Campaigns

* WhatsApp Campaigns

* Promotional AI Calls

* Appointment Reminders

* Payment Reminders

---

# Campaign Purpose

Campaign Purpose tells the system **why the campaign exists**.

```text

Sales

Lead Qualification

Customer Support

Appointment Booking

Follow-up

Collections

Survey & Research

Customer Retention

Welcome & Onboarding

Custom

```

Purpose helps AI understand the objective and improves reporting, workflows, and recommendations.

---

# Campaign Goal

Campaign Goal is an optional free-text description.

Examples

```text

Sell Solar Panels

Book 100 Medical Appointments

Recover Outstanding Payments

Collect Customer Feedback

Promote Premium Internet Package

```

This gives AI additional business context.

---

# Campaign Tabs

## Segments

Displays all Segments assigned to the campaign.

### Features

* View Assigned Segments

* Add / Remove Segments

* Lead Metrics

* Search

* Filters

Clicking a Segment opens a right drawer.

The drawer displays

* Total Leads

* Contacted

* Interested

* Follow-up

* Qualified

* Converted

* Rejected

Below the metrics is the complete list of leads.

---

## Team

Displays the Team assigned to the campaign.

### Features

* Supervisor

* Human Agents

* AI Agents

* Agent Status

* Calls Made

* Conversion Rate

* QA Score

* Performance

Only one Team can be assigned to a campaign.

---

## Scripts

Displays all Scripts assigned to the campaign.

### Features

* View Scripts

* Assign Scripts

* Remove Scripts

Scripts are displayed as Accordions.

Opening an accordion shows the complete script.

---

## Templates

Displays all Templates assigned to the campaign.

Templates are grouped into

```text

SMS

Email

WhatsApp

```

Each template is displayed as an Accordion.

---

## Data Tables

Displays the Data Tables assigned to the campaign.

### Features

* Preview Data

* Pagination

* Search

* View Full Table

Users can click

```text

View in Data Tables

```

to open the spreadsheet view.

Both Human Agents and AI Agents store collected campaign data here.

---

## Automations

Displays all Automations assigned to the campaign.

### Features

* Assigned Automations

* Enable / Disable

* Edit Configuration

* Remove

* Add Existing Automation

* Create New Automation

Users can

* Select an Automation from the Automation Library

or

* Create a new Automation

When creating a new Automation they can choose

```text

Save to Automation Library

or

Use Only In This Campaign

```

Examples

* Send Follow-up SMS

* Create Task

* Appointment Reminder

* AI Callback

* Payment Reminder

* Move Lead Stage

* Assign Tags

---

## Analytics

Displays campaign performance.

### Features

* Calls

* Connected Calls

* Conversion Rate

* Answer Rate

* Average Duration

* AI Performance

* Team Performance

* Campaign Progress

* Revenue

---

# Campaign Rules

Every campaign has configurable rules based on its type.

These rules prevent unnecessary calls and ensure campaigns follow best practices.

### Outbound Rules

* Maximum call attempts per lead

* Ring duration before disconnecting

* Retry interval

* Daily call limit per lead

* Calling hours

* Skip weekends / holidays

* Respect Do Not Call (DNC) list

* Stop calling after successful contact

* Stop after lead is converted or rejected

---

### Broadcast Rules

* Sending schedule

* Maximum messages per day

* Delay between messages

* Stop sequence when customer replies

* Channel priority (SMS → WhatsApp → Email)

* Respect unsubscribe preferences

---

### Inbound Rules

* Business hours

* Queue timeout

* Overflow routing

* AI Receptionist

* Call recording

* Voicemail fallback

These rules are configured once during campaign setup and can be edited later.

---

# Create Campaign

Clicking

```text

+ New Campaign

```

opens a Stepper Modal.

The wizard has **only 5 steps**.

---

## Step 1 — Basic Information

Enter

* Campaign Name

* Campaign Type

* Campaign Purpose

* Campaign Goal

---

## Step 2 — Team & Audience

Assign

* Team

* Lead Segments (Outbound & Broadcast only)

Inbound campaigns skip the Segment selection automatically.

---

## Step 3 — Configuration

This step changes based on the selected Campaign Type.

Inbound Configure: 

	Business Hours

	Queue Settings

	AI Receptionist

Outbound Configure: 

	Dialing Mode

	Working Hours

	Retry Rules

	Maximum Call Attempts

	Ring Duration

	Retry Delay

	Stop Calling Rules

Broadcast Configure: 

	Channel

	Schedule

	Sending Limits

	Message Timing

	Daily Message Limit

---

## Step 4 — Resources

Assign everything the campaign needs.

* Scripts

* Templates

* Data Tables

* Automations

Users can either

```text

Select Existing Automation

```

or

```text

Create New Automation

```

If creating a new Automation, they choose

```text

Save to Automation Library

or

Use Only In This Campaign

```

---

## Step 5 — Review & Launch

Review all campaign settings.

Click

```text

Launch Campaign

```

The assigned Team immediately starts working on the campaign.

---

# Complete Campaign Flow

```text

Create Campaign

        │

        ▼

Basic Information

(Name • Type • Purpose • Goal)

        │

        ▼

Team & Audience

(Team + Segments)

        │

        ▼

Campaign Configuration

(Rules based on Campaign Type)

        │

        ▼

Resources

(Scripts • Templates • Data Tables • Automations)

        │

        ▼

Review & Launch

        │

        ▼

Campaign Starts

        │

        ▼

Monitor Analytics

```

This workflow reduces the campaign creation process from **nine steps to five**, while still capturing every important configuration. The dynamic **Configuration** step keeps the wizard clean by showing only the options relevant to the selected campaign type, and the built-in campaign rules ensure outbound and broadcast campaigns follow safe calling and messaging practices without overwhelming the user.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0fc59a46-a9d2-4ab3-a9b1-dd11a2e4f9e0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
