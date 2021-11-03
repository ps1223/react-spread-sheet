import React from 'react';
import Row from './Row';

export default class Table extends React.Component {

    componentDidMount() {
        document.addEventListener('keydown', e => {
            this.handleKeyEvents(e);
        });
    }

    state = {
        isSelectionMode: false,
        selectedCell: {
            row: [],
            column: []
        },
        clipboard: null
    }

    handleKeyEvents(e) {
        const selectedCell = this.state.selectedCell;
        if(e.key === 'c' && e.ctrlKey) {
            if(selectedCell) {
                const clipboard = {...selectedCell};
                this.setState({clipboard});
            }
        } else if(e.key === 'v' && e.ctrlKey) {
            if(this.state.clipboard) {
                this.pasteData();
                e.preventDefault();
                this.setState({clipboard: null});
            }
        } else if(e.key === 'Tab') {
            this.setState({isSelectionMode: false});
        }
    }

    pasteData() {
        const rowsToCopy = [...this.state.clipboard.row].sort();
        const columnsToCopy = [...this.state.clipboard.column].sort();
        const startingRow = [...this.state.selectedCell.row].sort()[0];
        const startingColumn = [...this.state.selectedCell.column].sort()[0];
        this.props.onDataPaste(rowsToCopy, columnsToCopy, startingRow, startingColumn);

    }

    onFocused(row, column, clicked) {
        const selectedCell = this.state.selectedCell;
        selectedCell.row = [row, row];
        selectedCell.column = [column, column];
        this.setState({selectedCell, isSelectionMode: clicked === true});
    }

    onClicked(row, column) {
        this.onFocused(row, column, true);
    }

    onNewCell(row, column) {
        const selectedCell = this.state.selectedCell;
        if(row !== selectedCell.row[0] && row !== selectedCell.row[1]) {
            selectedCell.row[1] = row;
        }
        if(column !== selectedCell.column[0] && column !== selectedCell.column[1]) {
            selectedCell.column[1] = column;
        }
        this.setState({selectedCell});
    }

    onSelectionComplete() {
        this.setState({isSelectionMode: false});
    }

    render() {
        const {selectedCell, isSelectionMode} = this.state;
        return <>
            {
                this.props.value.map((row, i) => {
                    return <Row key={i}
                                row={i}
                                elements={row}
                                selectionMode={isSelectionMode}
                                onFocused={this.onFocused.bind(this)}
                                onClicked={this.onClicked.bind(this)}
                                onNewCell={this.onNewCell.bind(this)}
                                onSelectionComplete={this.onSelectionComplete.bind(this)}
                                onChange={this.props.onChange}
                                selectedCell={selectedCell} />
                })
            }
        </>
    }

}
