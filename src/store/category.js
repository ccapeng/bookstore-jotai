import { atom } from "jotai";

const initialCategoryListState = []

export const initialCategoryState = {
    id: 0,
    name: "",
    status: ""
}

export const categoryListAtom = atom(initialCategoryListState)
export const categoryAtom = atom(initialCategoryState)