import React,{Component} from 'react'

class Moov extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>{this.props.text}</h2>
        <h3>
          {this.props.name}
        </h3>
        <input onChange={this.props.onChange} />
      </div>
    )
  }
}
export default Moov
