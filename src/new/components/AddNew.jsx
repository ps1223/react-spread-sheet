import React from 'react';
import Row from './Row';
import AddButton from '../../components/AddButton';
import Cell from './Cell';

export default class AddNew extends React.Component {

    render() {
        return <Cell value="+"
                     isHeader
                     style={defaultStyle}
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
