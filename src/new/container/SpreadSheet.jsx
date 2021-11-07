import React from 'react';
import Row from '../components/Row';
import AddNew from '../components/AddNew';

export default class Spreadsheet extends React.Component {

    constructor(props) {
        super(props);
        const sheet = new Array(props.row).fill(null).map(row => new Array(props.column).fill(""));
        this.state = {
            row: props.row,
            column: props.column,
            selectedCell: {
                row: [],
                column: []
            },
            editableCell: {
                row: null,
                column: null
            },
            sheet: sheet
        };
    }

    onChange(row, column, data) {
        const sheet = [...this.state.sheet];
        sheet[row][column] = data;
        this.setState({sheet});
    }

    onClick(row, column) {
        const { editableCell, selectedCell} = this.state;
        editableCell.row = row;
        editableCell.column = column;
        selectedCell.row[0] = row;
        selectedCell.row[1] = row;
        selectedCell.column[0] = column;
        selectedCell.column[1] = column;
        this.setState({
            editableCell,
            selectedCell
        });
    }

    addRow() {
        const sheet = [...this.state.sheet];
        sheet.push(new Array(this.state.column).fill(""));
        this.setState({
            row: this.state.row + 1,
            sheet
        });
    }

    addColumn() {
        const sheet = [...this.state.sheet];
        sheet.forEach(row => row.push(""));
        this.setState({
            column: this.state.column + 1,
            sheet
        });
    }

    render() {
        const { sheet, column, editableCell, selectedCell } = this.state;
        return <div>
            {
                <Row row={new Array(column).fill('')}
                     onClick={() => {}}
                     onAdd={this.addColumn.bind(this)}
                     isHeader />
            }
            {
                sheet.map((row, index) => <Row key={index}
                                               row={row}
                                               rowIndex={index}
                                               editableCell={editableCell}
                                               selectedCell={selectedCell}
                                               onChange={this.onChange.bind(this)}
                                               onBlur={() => {}}
                                               onClick={this.onClick.bind(this)} />)
            }
            <AddNew onClick={this.addRow.bind(this)} />
        </div>
    }

}
