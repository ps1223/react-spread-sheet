import React from 'react';
import Cell from './Cell';
import {colName} from '../utils/Utils';
import AddNew from './AddNew';

export default class Row extends React.Component {

    render() {
        const { row, rowIndex, isHeader, selectedCell, editableCell, showCopied, onAdd, onChange, onClick, onMouseEnter } = this.props
        const selectedRows = [...selectedCell.row].sort((a, b) => a - b);
        const selectedColumns = [...selectedCell.column].sort((a, b) => a - b);
        return <div style={{display: 'flex'}}>
            <Cell isHeader
                  style={{width: 30}}
                  onMouseEnter={() => {}}
                  value={isHeader ? ' ' : rowIndex + 1}
                  onClick={() => {}} />
            {
                row.map((value, column) => {
                    const columnLetter = colName(column);
                    if(isHeader) {
                        value = columnLetter;
                    }
                    const isSelected = (selectedRows[0] <= rowIndex && selectedRows[1] >= rowIndex) && (selectedColumns[0] <= column && selectedColumns[1] >= column);
                    const isEditable = editableCell && editableCell.row === rowIndex && editableCell.column === column;
                    return <Cell key={`${columnLetter}${row}`}
                                 row={rowIndex}
                                 column={column}
                                 isHeader={isHeader}
                                 isSelected={isSelected}
                                 showCopied={showCopied}
                                 isEditable={isEditable}
                                 onChange={onChange}
                                 onMouseEnter={onMouseEnter}
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
