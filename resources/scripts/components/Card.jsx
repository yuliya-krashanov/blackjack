import React from 'react'

export default class Card extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        let className = 'suit-' + this.props.suit.toLowerCase();
        className += (this.props.hide) ? ' flip' : '';
        return (
            <div className="card-wrapper">
                <div className={'card ' + className}>
                    <figure className="back"></figure>
                    {(() => {
                        if(!this.props.hide) return  (
                            <figure className="front">
                                <span className="angular">{this.props.rank}</span>
                                <span className="center">{this.props.rank}</span>
                            </figure>);
                        else return  (<figure className="front"></figure>);
                    })()}
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    suit: React.PropTypes.string
};
Card.defaultProps = {
    suit: 'H',
    rank: 10
};