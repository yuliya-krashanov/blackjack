import React from 'react'

export default class Card extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="card">
                <span>{this.props.name}({this.props.value})</span>
            </div>
        );
    }
}

Card.propTypes = {
    value: React.PropTypes.number,
    name:  React.PropTypes.string
};
Card.defaultProps = {
    value: 0,
    name: '',
    rank: ''
};