import React from 'react';

export default function AddButton(props) {
    return <button onClick={props.onClick} style={{margin: '0px 10px', ...props.style}}>
        Add
    </button>
}
