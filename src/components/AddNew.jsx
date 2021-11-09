import React from 'react';
import Cell from './Cell';

export default class AddNew extends React.Component {

    render() {
        return <Cell value="+"
                     isHeader
                     style={defaultStyle}
                     onMouseDown={() => {}}
                     onMouseUp={() => {}}
                     onMouseEnter={() => {}}
                     onClick={this.props.onClick} />

    }

}

const defaultStyle = {
    width: 30,
    color: 'green',
    backgroundColor: 'white',
    border: '1px solid',
    fontWeight: 'bold',
    cursor: 'pointer'
}
