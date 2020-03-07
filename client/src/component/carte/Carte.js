import React, { Component, Fragment } from 'react'

export default class Carte extends Component {
    render() {
        return (
            <Fragment>
                <div className="carte pl-2 mt-1">
                    <a
                        href={'#'+this.props.idListe}
                        name={this.props.label}
                        id={this.props.position}
                        onClick={this.props.handleShowEditCard}
                        style={{ cursor: "pointer" }}
                    >
                        {this.props.label}
                    </a>
                </div>
                {/* {console.log(this.props.idListe)} */}
            </Fragment>
        )
    }
}
