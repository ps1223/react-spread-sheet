import React from 'react';
import Cell from './Cell';

export default function Row(props) {
    const [minRow, maxRow] = [...props.selectedCell.row].sort();
    const [minColumn, maxColumn] = [...props.selectedCell.column].sort();
    return <tr>
        <Cell style={{width: 30}} value={props.row + 1} />
        {
            props.elements.map((element , j) => {
                return <Cell data={element} key={j}
                             value={element}
                             row={props.row}
                             selectionMode={props.selectionMode}
                             onSelectionComplete={props.onSelectionComplete}
                             onNewCell={props.onNewCell}
                             column={j}
                             onClicked={props.onClicked}
                             onFocused={props.onFocused}
                             isSelectedCell={props.row >= minRow && props.row <= maxRow && j >= minColumn && j <= maxColumn}
                             onChange={props.onChange}/>
            })
        }
    </tr>

}
