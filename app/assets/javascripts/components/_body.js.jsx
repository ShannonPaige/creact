var Body = React.createClass({
  getInitialState() {
    return { skills: [] }
  },

  componentDidMount() {
    $.getJSON('/api/v1/skills.json', (response) => { this.setState({ skills: response }) });
  },

  handleDelete(id) {
    $.ajax({
      url: `/api/v1/skills/${id}`,
      type: 'DELETE',
      success: () => {
        this.removeSkillFromDOM(id);
      }
    });
  },

  removeSkillFromDOM(id) {
    var newSkills = this.state.skills.filter((skill) => {
      return skill.id != id;
    });

    this.setState({ skills: newSkills });
  },


  handleSubmit(skill) {
    var newState = this.state.skills.concat(skill);
    this.setState({ skills: newState })
  },

  handleUpdate(skill) {
    $.ajax({
      url: `/api/v1/skills/${skill.id}`,
      type: 'PUT',
      data: { skill: skill },
      success: (skill) => {
        this.updateSkills(skill)
      }
    });
  },

  handleLevelChange(action) {
    var levels  = ['bad', 'halfbad', 'fantastic'];
    var name    = this.props.skill.name;
    var details = this.props.skill.details;
    var level   = this.props.skill.level;
    var index   = levels.indexOf(level);

    if (action === 'up' && index < 2) {
      var newLevel = levels[index + 1];
      this.props.handleUpdate({id: this.props.skill.id, name: name, details: details, level: newLevel})
    } else if (action === 'down' && index > 0) {
      var newLevel = levels[index - 1];
      this.props.handleUpdate({id: this.props.skill.id, name: name, details: details, level: newLevel})
    }
  },

  updateSkills(skill) {
    var skills = this.state.skills.filter((s) => { return s.id != skill.id });
    skills.push(skill);

    this.setState({ skills: skills });
  },

  render() {
    return (
      <div>
        <NewSkill handleSubmit={this.handleSubmit} />
        <AllSkills skills={this.state.skills}
                   handleDelete={this.handleDelete}
                   handleUpdate={this.handleUpdate} />
      </div>
    )
  }
});
