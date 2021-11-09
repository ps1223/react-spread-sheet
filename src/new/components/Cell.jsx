import React from 'react';

export default class Cell extends React.Component {

    onChange(row, column, event) {
        this.props.onChange(row, column, event.target.value);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.value !== nextProps.value ||
                this.props.isSelected !== nextProps.isSelected ||
                this.props.showCopied !== nextProps.showCopied ||
                this.props.isEditable !== nextProps.isEditable;
    }

    render() {
        const { row, column, value, isHeader, isSelected, isEditable, showCopied, onClick, onMouseEnter, style } = this.props;
        const selectedStyle = isSelected ? selectedCellStyle : {};
        const copiedStyle = showCopied && isSelected ? copiedCellStyle : {};
        const headerStyle = isHeader ? headerCellStyle : {};
        const cellStyle = {...baseStyle, ...selectedStyle, ...copiedStyle, ...headerStyle, ...style};
        return <div style={cellStyle}
                    onMouseDown={onClick.bind(null, row, column)}
                    onMouseEnter={onMouseEnter.bind(null, row, column)}
                    onClick={onClick.bind(null, row, column)}>
            {
                isEditable ?
                    <input value={value}
                           autoFocus
                           onChange={this.onChange.bind(this, row, column)} />
                    :
                    <span>
                        {value}
                    </span>
            }
        </div>
    }

}

const copiedCellStyle = {
    border: '2px dotted green',
    height: 23,
    width: 98
}

const selectedCellStyle = {
    border: '2px solid green',
    height: 23,
    width: 98
}

const baseStyle = {
    width: 100,
    height: 25,
    textAlign: 'center',
    border: '1px solid #888'
}

const headerCellStyle = {
    backgroundColor: '#CCC',
    textTransform: 'uppercase'
}
