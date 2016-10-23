import React from 'react'

export default class PlayerInterface extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="play">
                <p className="current">{this.props.currentBox}</p>
                <div className="buttons">
                    <button onClick={this.props.onHit}>Hit</button>
                    <button onClick={this.props.onStand}>Stand</button>
                    {(() => {
                        if (this.props.double)
                            return (<button onClick={this.props.onDouble}>Double</button>);
                    })()}                  
                    {(() => {
                        if (this.props.split)
                            return (<button onClick={this.props.onSplit}>Split</button>);
                    })()}
                </div>
            </div>
        );
    }
}

PlayerInterface.propTypes = {
    currentBox: React.PropTypes.number,
};