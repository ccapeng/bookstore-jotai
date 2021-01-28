import { atom } from "jotai";

const initialBookListState = []

export const initialBookState = {
  id: 0,
  title: "",
  category: "",
  publisher: "",
  author: "",
  status: ""
}

export const bookListAtom = atom(initialBookListState)
export const bookAtom = atom(initialBookState)