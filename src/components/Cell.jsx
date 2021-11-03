import React from 'react';

export default class Cell extends React.Component {

    onDataChange(row, column, e) {
        this.props.onChange(row, column, e.target.value)
    }

    render() {
        const {style , data, row, column, value, onClicked, onFocused, onSelectionComplete, onNewCell, selectionMode, isSelectedCell} = this.props;
        const selectedStyle = isSelectedCell ? selectedCellStyle : {}
        return <td style={{...defaultStyle, ...style, ...selectedStyle}}>
            {
                data !== undefined ?
                    <input value={data}
                           style={{...selectedStyle}}
                           onFocus={onFocused.bind(null, row, column)}
                           onMouseDown={onClicked.bind(null, row, column)}
                           onMouseEnter={selectionMode ? onNewCell.bind(null, row, column) : null}
                           onMouseUp={onSelectionComplete}
                           onChange={this.onDataChange.bind(this, row, column)} />
                    :
                    value
            }
        </td>
    }

}

const defaultStyle = {
    width: 100,
    height: 20,
    border: '1px solid #aaa',
    textAlign: 'center'
}

const selectedCellStyle = {
    border : '1px solid blue'
}
