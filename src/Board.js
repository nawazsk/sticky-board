import React from 'react';

import './App.css';
import Note from "./Note";

class Board extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          notes : []
      }
  }
  componentWillMount() {
    var notes = JSON.parse(window.localStorage.getItem("notes"));

    if(notes && notes.length) {
      this.setState({notes});
    }
  }

  nextId() {
      this.uniqueID = this.uniqueID || 0;
      return this.uniqueID++;
  }

  saveNotes(notes) {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }
  add(text) {
    var notes = [
        ...this.state.notes,
        {
          id:this.nextId(),
          note : text
        }
      ];
      this.saveNotes(notes);
      this.setState({notes});
  }

  update(newText, id) {
      var notes = this.state.notes.map(
          note => (note.id !== id) ? note : {...note, note : newText}
      )
      this.saveNotes(notes);
      this.setState({notes});
  }
  eachNote(note) {
    return (
      <Note
        key={note.id}
        id={note.id}
        onChange={this.update.bind(this)}
        onRemove={this.remove.bind(this)}
        >{note.note}</Note>
    )
  }
  remove(id) {
    var notes = this.state.notes.filter(note => note.id !== id);
    this.saveNotes(notes);
    this.setState({notes});
  }

  render() {
    return (<div className='board'>
              <h1>Sticky Board</h1>
               {
                 this.state.notes.map((note) => {
                   return this.eachNote(note);
                 })

               }
               <button onClick={() => this.add('New Note')}>Add Note</button>
            </div>)
  }
}

export default Board;
