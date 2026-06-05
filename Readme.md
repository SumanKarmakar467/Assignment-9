## A Visitor Pass Management System

## Requirments

# Visitor Registration 

    Visitor (self-service) or Employee (invite)

    Before arriving, a visitor fills out a pre-registration form — or an employee sends them an invite link. This creates a pending appointment in the system.

    1 Visitor opens the web portal or receives an invite email
    2 Fills in name, photo, ID number, purpose of visit, expected time
    3 Selects the host employee they are visiting
    4 Submits — system saves a Visitor record + Appointment (status: pending)
    5 Host employee receives an email notification to approve or reject

# Host approval

    Role: Employee / Host

    Status: approved
    The host employee logs into their dashboard, reviews the visitor details, and either approves or rejects the appointment.

    1 Host receives email with a one-click Approve / Reject link
    2 Clicks Approve — Appointment status changes to approved
    3 System triggers an email to the visitor with appointment confirmation
    4 If rejected, visitor gets a rejection email with optional reason
    5 Approved appointment is now visible to Frontdesk staff

# Pass issuance at front desk

    Role: Security / Frontdesk

    Pass issued
    When the visitor arrives, the frontdesk staff looks up their pre-registered appointment and issues a digital visitor pass.

    1 Frontdesk searches visitor by name, phone, or appointment ID
    2 Verifies photo ID against the uploaded photo
    3 Clicks "Issue Pass" — system generates a unique pass
    4 QR code is created using the qrcode library (encodes pass ID + hash)
    5 PDF badge is generated (visitor name, photo, host, valid time, QR code)
    6 Pass is printed or sent digitally to visitor's phone

# QR code check-in

    Role: Security guard at gate

    Checked in
    At the entry gate, security scans the visitor's QR code using the React QR scanner. The system validates the pass in real time.

    1 Security opens the scan screen on a tablet or phone
    2 Visitor shows their QR code (printed or on phone screen)
    3 Camera scans and decodes the QR — sends pass ID to backend
    4 Backend verifies: is pass valid? not expired? not already used?
    5 If valid → green screen, CheckLog saved (event: check-in)
    6 If invalid → red alert shown, entry denied

# Visit in progress

    Role: Visitor (inside premises)

    Status: active
    The visitor is now inside the building. The system tracks their active session. The host is notified of their arrival automatically.

    1 Host employee gets a notification: "Your visitor [Name] has arrived"
    2 Visitor's pass shows status: active on the dashboard
    3 Admin dashboard shows real-time count of visitors inside
    4 Visitor can optionally be escorted or given a temporary access badge
    5 Pass has a validity window (e.g. valid until 6 PM today)

# Check-out

    Role: Security guard at exit

    Status: completed
    When the visitor leaves, they scan out at the exit gate. The system records the departure and marks the pass as used.

    1 Visitor scans QR code at the exit scanner
    2 Backend logs a check-out event with timestamp
    3 Pass status changes from active → completed
    4 Duration of visit is calculated and stored
    5 Host employee notified: "Your visitor has left"
    6 Pass can no longer be used to re-enter

# Admin dashboard & reports

    Role: Admin

    Admin view
    The admin has a full view of all visitors — past, present, and upcoming. They can search, filter, and export reports.

    1 View real-time count of visitors currently inside
    2 Search by visitor name, date, host, or department
    3 Export visit logs as CSV or PDF report
    4 View analytics: peak hours, frequent visitors, average duration
    5 Audit log: every action (issue, scan, approve) is timestamped
    6 Manage user roles: add/remove frontdesk or security staff

# Tech Stack 
    Database - MongoDB
    Backend - Node.js , Express.js
    Frontend - React.js