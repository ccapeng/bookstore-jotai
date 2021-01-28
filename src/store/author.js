import { atom } from "jotai";

const initialAuthorListState = []

export const initialAuthorState = {
    id: 0,
    lastName: "",
    firstName: "",
    status: ""
}

export const authorListAtom = atom(initialAuthorListState)
export const authorAtom = atom(initialAuthorState)