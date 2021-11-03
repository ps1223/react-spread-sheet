import React from 'react';
import {colName} from '../utils/Utils';
import Cell from './Cell';
import AddButton from './AddButton';

export default function ColumnHeader(props) {
    return <tr>
        <Cell style={{width:30}}  value=" " />
        {
            [...Array(props.column)].map((column, index) => {
                return <Cell key={index} value={colName(index)} style={headerColumnCellStyle} />
            })
        }
        <td>
            <AddButton onClick={props.add} />
        </td>
    </tr>
}

const headerColumnCellStyle = {
    background: '#EEE',
};
