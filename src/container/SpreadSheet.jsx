import React from 'react';
import ColumnHeader from '../components/ColumnHeader';
import Table from '../components/Table';
import AddButton from '../components/AddButton';

export default class SpreadSheet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            row: props.row,
            column: props.column,
            value: new Array(props.row).fill(null).map(row => new Array(props.column).fill(""))
        }
    }

    addColumn() {
        const column = this.state.column + 1;
        const value = this.state.value;
        value.forEach(column => column.push(""));
        this.setState({column, value})
    }

    addRow() {
        const row = this.state.row + 1;
        const value = this.state.value;
        value.push(new Array(this.state.column).fill(""));
        this.setState({row, value})
    }

    onDataChange(row, column, data) {
        const value = this.state.value;
        value[row][column] = data;
        this.setState({value});
    }

    increaseSpreadSheet(count, type) {
        if(count > 0) {
            for(let i = 0; i < count; i++) {
                if(type === 'row')
                    this.addRow();
                else
                    this.addColumn();
            }
        }
    }

    onDataPaste(sourceRows, sourceColumns, targetRow, targetColumn) {
        const newRowsRequired = targetRow + sourceRows[1] + 1 - sourceRows[0] - this.state.row;
        const newColumnsRequired = targetColumn + sourceColumns[1] + 1 - sourceColumns[0] - this.state.column;
        this.increaseSpreadSheet(newRowsRequired, 'row');
        this.increaseSpreadSheet(newColumnsRequired, 'column');
        for(let row = sourceRows[0]; row <= sourceRows[1]; row++) {
            let newTargetColumn = targetColumn;
            for(let column = sourceColumns[0]; column <= sourceColumns[1]; column++) {
                this.onDataChange(targetRow, newTargetColumn, this.state.value[row][column]);
                newTargetColumn++;
            }
            targetRow++;
        }
    }

    render() {
        return <table className="container" style={{borderCollapse: 'collapse', width: this.state.column * 110}}>
            <tbody>
                <ColumnHeader column={this.state.column} add={this.addColumn.bind(this)} />
                <Table column={this.state.column}
                       row={this.state.row}
                       value={this.state.value}
                       onDataPaste={this.onDataPaste.bind(this)}
                       onChange={this.onDataChange.bind(this)} />
                <tr>
                    <td>
                        <AddButton onClick={this.addRow.bind((this))} />
                    </td>
                </tr>
            </tbody>
        </table>
    }

}
