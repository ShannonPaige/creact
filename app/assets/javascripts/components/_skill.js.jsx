var Skill = React.createClass({
  getInitialState() {
    return { editable: false }
  },

  handleEdit() {
    if (this.state.editable) {
      var name    = this.refs.name.value;
      var details = this.refs.details.value;
      console.log('in handleEdit', this.state.editable, name, details);
      this.onUpdate();
    }
    this.setState({ editable: !this.state.editable })

  },

  onUpdate() {
    if (this.state.editable) {
      var id      = this.props.skill.id;
      var name    = this.refs.name.value;
      var details = this.refs.details.value;
      var level   = this.props.skill.level;

      var skill = {id: id, name: name, details: details, level: level }

      this.props.handleUpdate(skill);
    }
    this.setState({ editable: !this.state.editable })
  },

  render() {
    var name = this.state.editable ? <input type='text'
                                            ref='name'
                                            defaultValue={this.props.skill.name} />
                                   : <h3>{this.props.skill.name}</h3>

    var details = this.state.editable ? <textarea type='text'
                                                  ref='details'
                                                  defaultValue={this.props.skill.details}>
                                        </textarea>
                                      : <p>{this.props.skill.details}</p>
    return (
      <div>
        {name}

        <p><strong>Level:</strong> {this.props.skill.level}</p>
        {details}

        <button onClick={this.props.handleDelete}>
          Delete
        </button>

        <button onClick={this.handleEdit}>{this.state.editable ? 'Submit' : 'Edit' }</button>
      </div>
    )
  }
});
