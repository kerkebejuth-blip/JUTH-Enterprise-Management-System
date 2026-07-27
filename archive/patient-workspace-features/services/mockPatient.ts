import { WorkspaceState } from "../types/patientWorkspace";

export const mockPatient: WorkspaceState = {

    patient: {

        id: "1",

        hospitalNumber: "JUTH00024571",

        fullName: "Mrs Mary Yusuf",

        age: 54,

        gender: "Female",

        phone: "0803xxxxxxx",

        bloodGroup: "O+",

        genotype: "AA",

        allergies: [

            "Penicillin"

        ],

        alerts: [

            "Diabetic",

            "Hypertension"

        ]

    },

    activeClinics: [

        {

            id: "1",

            name: "Eye Clinic",

            lastVisit: "Today",

            active: true,

            unreadResults: 2

        },

        {

            id: "2",

            name: "Medical OPD",

            lastVisit: "3 weeks",

            active: true,

            unreadResults: 0

        },

        {

            id: "3",

            name: "Cardiology",

            lastVisit: "2 months",

            active: false,

            unreadResults: 1

        }

    ],

    vitals: {

        bp: "150/90",

        pulse: 92,

        spo2: 97,

        temperature: 37.4,

        respiratoryRate: 20

    },

    timeline: [

        {

            id: "1",

            type: "Lab",

            clinic: "Eye",

            title: "Blood Sugar",

            date: "Today"

        },

        {

            id: "2",

            type: "Consultation",

            clinic: "Medical",

            title: "Consultant Review",

            date: "Yesterday"

        }

    ]

};