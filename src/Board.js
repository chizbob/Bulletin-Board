import React, {Component} from 'react';
import Note from './Note'

class Board extends Component {
  constructor(props){
    super(props)
    this.state={
      notes: []
    }
    this.update = this.update.bind(this)
    this.nextId = this.nextId.bind(this)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  componentWillMount() {
    var self = this
    if(this.props.count) {
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
        .then(response => response.json())
        .then(json => json[0]
                .split('. ')
                .forEach(sentence => self.add(sentence.substring(0, 25))))
    }
  }

  update(newText, i){
    console.log("updating note at index", i, newText)
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i) ? note : {...note, note: newText}
      )
    }))
  }

  add(text){
    this.setState(prevState => ({
      notes: [
                ...prevState.notes,
                {
                  id: this.nextId(),
                  note: text
                }
              ]
    }))
  }

  nextId(){
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  remove(id) {
    console.log('removing item at', id)
    this.setState(prevState => ({
			notes: prevState.notes.filter(note => note.id !== id)
		}))
  }

  render(){
    return(
      <div className="board">
        {this.state.notes.map((note, i) =>
          <Note key={note.id}
                index={note.id}
                onChange={this.update}
                onRemove={this.remove}>
                {note.note}
          </Note>
        )}
        <button onClick={this.add.bind(null, "New Text")}
                id="add">
            Add a new note
        </button>
      </div>
    )
  }
}

export default Board;
