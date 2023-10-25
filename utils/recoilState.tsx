import {atom} from 'recoil';

export const addNoteState = atom({
  key: 'addNote',
  default: '',
});

export const ListNoteState = atom({
  key: 'listNote',
  default: [],
});
