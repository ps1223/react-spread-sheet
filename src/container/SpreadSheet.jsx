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
            clipboard: null,
            selectedCell: {
                row: [],
                column: []
            },
            showCopied: false,
            editableCell: {
                row: null,
                column: null
            },
            sheet: sheet
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', e => {
            this.handleKeyEvents(e);
        });
    }

    onChange(row, column, data) {
        const sheet = [...this.state.sheet];
        sheet[row][column] = data;
        this.setState({sheet});
    }

    onMouseEnter(row, column, event) {
        if(event.buttons === 1) {
            this.onClick(row, column, event);
        }
    }

    onClick(row, column, event) {
        event.preventDefault();
        const { editableCell, selectedCell } = this.state;
        if(event.shiftKey || (event.buttons === 1 && event.type !== "mousedown")) {
            editableCell.row = null;
            editableCell.column = null;
        } else {
            editableCell.row = row;
            editableCell.column = column;
            selectedCell.row[0] = row;
            selectedCell.column[0] = column;
        }
        selectedCell.row[1] = row;
        selectedCell.column[1] = column;
        this.setState({
            showCopied: false,
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

    handleKeyEvents(e) {
        const selectedCell = this.state.selectedCell;
        if(e.key === 'c' && e.ctrlKey) {
            if(selectedCell.row.length > 0) {
                const sortSelectRows = [...selectedCell.row].sort();
                const sortSelectColumns = [...selectedCell.column].sort();
                const clipboard = [];
                    // new Array(sortSelectRows[1] - sortSelectRows[0] + 1)
                    // .fill("")
                    // .map(row => new Array(sortSelectColumns[1] - sortSelectColumns[0]));
                for(let i = sortSelectRows[0]; i <= sortSelectRows[1]; i++) {
                    const row = [];
                    for(let j = sortSelectColumns[0]; j <= sortSelectColumns[1]; j++) {
                        row.push(this.state.sheet[i][j]);
                    }
                    clipboard.push(row);
                }
                this.setState({
                    showCopied: true,
                    clipboard
                });
            }
        } else if(e.key === 'v' && e.ctrlKey) {
            if(this.state.clipboard) {
                this.pasteData();
                e.preventDefault();
            }
        } else if(e.key === 'Tab') {
            this.setState({isSelectionMode: false});
        } else if(e.key === 'ArrowLeft') {
            if(selectedCell.column[1] > 0) {
                this.onClick(selectedCell.row[1], selectedCell.column[1] - 1, e);
            }
        } else if(e.key === 'ArrowRight') {
            if(selectedCell.column[1] < this.state.column - 1) {
                this.onClick(selectedCell.row[1], selectedCell.column[1] + 1, e);
            }
        } else if(e.key === 'ArrowUp') {
            if(selectedCell.row[1] > 0) {
                this.onClick(selectedCell.row[1] - 1, selectedCell.column[1], e);
            }
        } else if(e.key === 'ArrowDown') {
            if(selectedCell.row[1] < this.state.row - 1) {
                this.onClick(selectedCell.row[1] + 1, selectedCell.column[1], e);
            }
        }
    }

    pasteData() {
        const { clipboard, selectedCell, row, column } = this.state;
        const targetRow = selectedCell.row[0];
        const targetColumn = selectedCell.column[0];
        const newRowsRequired = targetRow + clipboard.length - row;
        const newColumnsRequired = targetColumn + clipboard[0].length - column;
        const sheet = [...this.state.sheet];
        // this.setState({sheet});
        this.increaseSpreadSheet(newRowsRequired, sheet, 'row');
        this.increaseSpreadSheet(newColumnsRequired, sheet, 'column');
        for(let row = 0; row < clipboard.length; row++) {
            for(let column = 0; column < clipboard[0].length; column++) {
                sheet[row + targetRow][column + targetColumn] = clipboard[row][column];
            }
        }
        this.setState({
            sheet,
            row: row + (newRowsRequired > 0 ? newRowsRequired : 0),
            column: column + (newColumnsRequired > 0 ? newColumnsRequired : 0),
            editableCell: {
                row: null,
                column: null
            }
        })
    }

    increaseSpreadSheet(count, sheet, type) {
        if(count > 0) {
            for(let i = 0; i < count; i++) {
                if(type === 'row')
                    sheet.push(new Array(sheet[0].length).fill(""));
                else
                    sheet.forEach(row => row.push(""));
            }
        }
        return sheet;
    }

    render() {
        const { sheet, column, editableCell, selectedCell, showCopied } = this.state;
        return <div style={{width: this.state.column * 103 + 60}}>
            {
                <Row row={new Array(column).fill('')}
                     onMouseEnter={() => {}}
                     onClick={() => {}}
                     selectedCell={selectedCell}
                     onAdd={this.addColumn.bind(this)}
                     isHeader />
            }
            {
                sheet.map((row, index) => <Row key={index}
                                               row={row}
                                               showCopied={showCopied}
                                               rowIndex={index}
                                               editableCell={editableCell}
                                               selectedCell={selectedCell}
                                               onMouseEnter={this.onMouseEnter.bind(this)}
                                               onChange={this.onChange.bind(this)}
                                               onClick={this.onClick.bind(this)} />)
            }
            <AddNew onClick={this.addRow.bind(this)} />
        </div>
    }

}
