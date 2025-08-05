import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { v4 as uuid } from 'uuid';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  notes: Note[] = [];

  create(createNoteDto: CreateNoteDto) {
    const note: Note = {
      id: uuid(),
      ...createNoteDto,
      createdAt: new Date().getTime(),
    };
    this.notes.push(note);
    return note;
  }

  findAll() {
    return this.notes;
  }

  findOne(id: string) {
    const note = this.notes.find((note: Note) => note.id === id);
    if (!note) {
      throw new NotFoundException(`The note with id ${id} does'nt not exists`);
    }
    return note;
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    let noteDB = this.findOne(id);
    this.notes = this.notes.map((note: Note) => {
      if (note.id === id) {
        noteDB = {
          ...note,
          ...updateNoteDto,
          id,
          updatedAt: new Date().getTime(),
        };
        return noteDB;
      }
      return note;
    });
    return noteDB;
  }

  remove(id: string) {
    this.findOne(id);
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}
