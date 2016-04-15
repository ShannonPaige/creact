var AllSkills = React.createClass({
  handleDelete(id) {
    this.props.handleDelete(id);
  },

  handleEdit() {
    console.log('you are in edit!');
  },

  onUpdate(skill) {
    this.props.handleUpdate(skill);
  },

  render() {
    var skills = this.props.skills.map((skill) => {
      return (
        <div key={skill.id}>
          <Skill skill={skill}
                 handleDelete={this.handleDelete.bind(this, skill.id)}
                 handleUpdate={this.onUpdate}/>
        </div>
      )
    });

    return (
      <div>
        {skills}
      </div>
    )
  }
});
