import { mockPatient } from "../services/mockPatient";

export function usePatientWorkspace() {

    return {

        data: mockPatient,

        loading: false

    };

}