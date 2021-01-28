import { atom } from "jotai";

const initialPublisherListState = []

export const initialPublisherState = {
  id: 0,
  name: "",
  status: ""
}

export const publisherListAtom = atom(initialPublisherListState)
export const publisherAtom = atom(initialPublisherState)