import React from 'react';
import Cell from './Cell';
import {colName} from '../../utils/Utils';
import AddNew from './AddNew';

export default class Row extends React.Component {

    render() {
        const { row, rowIndex, isHeader, selectedCell, editableCell, onBlur, onAdd, onChange, onClick } = this.props
        return <div style={{display: 'flex'}}>
            <Cell isHeader
                  style={{width: 30}}
                  value={isHeader ? ' ' : rowIndex + 1}
                  onClick={() => {}} />
            {
                row.map((value, column) => {
                    const columnLetter = colName(column);
                    if(isHeader) {
                        value = columnLetter;
                    }
                    const isSelected = selectedCell && selectedCell.row.includes(rowIndex) && selectedCell.column.includes(column);
                    const isEditable = editableCell && editableCell.row === rowIndex && editableCell.column === column;
                    return <Cell key={`${columnLetter}${row}`}
                                 row={rowIndex}
                                 column={column}
                                 isHeader={isHeader}
                                 isSelected={isSelected}
                                 isEditable={isEditable}
                                 onBlur={onBlur}
                                 onChange={onChange}
                                 onClick={onClick}
                                 value={value} />
                })
            }
            {
                isHeader && <AddNew onClick={onAdd} />
            }
        </div>
    }

}
