import { Inject, Injectable } from '@angular/core';
import { TRASH_FOLDER_ID_TOKEN } from 'zeppelin-interfaces';
import { ArrayOrderingService } from './array-ordering.service';
import { INodeList } from '../interfaces/node-list';
import { NotesInfoItem } from 'zeppelin-sdk';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  notes: INodeList = {
    root: { children: [] },
    flatList: [],
    flatFolderMap: {}
  };

  setNotes(notesList: NotesInfoItem[]) {
    // a flat list to boost searching
    this.notes.flatList = notesList.map(note => {
      const isTrash = note.path ? note.path.split('/')[0] === this.TRASH_FOLDER_ID : false;
      return { ...note, isTrash };
    });

    // construct the folder-based tree
    this.notes.root = { children: [] };
    this.notes.flatFolderMap = {};
    notesList.reduce((root, note) => {
      const notePath = note.path || note.id;
      const nodes = notePath.match(/([^\/][^\/]*)/g);

      // recursively add nodes
      this.addNode(root, nodes, note.id);

      return root;
    }, this.notes.root);
    this.notes.root.children.sort(this.arrayOrderingService.noteComparator);
  }

  addNode(curDir, nodes, noteId) {
    if (nodes.length === 1) {
      // the leaf
      curDir.children.push({
        id: noteId,
        title: nodes[0],
        isLeaf: true,
        path: curDir.id ? curDir.id + '/' + nodes[0] : nodes[0],
        isTrash: curDir.id ? curDir.id.split('/')[0] === this.TRASH_FOLDER_ID : false
      });
    } else {
      // a folder node
      const node = nodes.shift();
      const dir = curDir.children.find(c => {
        return c.title === node && c.children !== undefined;
      });
      if (dir !== undefined) {
        // found an existing dir
        this.addNode(dir, nodes, noteId);
      } else {
        const newDir = {
          id: curDir.id ? curDir.id + '/' + node : node,
          title: node,
          expanded: false,
          children: [],
          isTrash: curDir.id ? curDir.id.split('/')[0] === this.TRASH_FOLDER_ID : false
        };

        // add the folder to flat folder map
        this.notes.flatFolderMap[newDir.id] = newDir;

        curDir.children.push(newDir);
        this.addNode(newDir, nodes, noteId);
      }
    }
  }

  constructor(
    @Inject(TRASH_FOLDER_ID_TOKEN) private TRASH_FOLDER_ID: string,
    private arrayOrderingService: ArrayOrderingService
  ) {}
}