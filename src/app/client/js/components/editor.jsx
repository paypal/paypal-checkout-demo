
import React from 'react';

import { stripIndent, debounce } from '../lib';

export class Editor extends React.Component {

    render() {
        return (
            <div id="editor" className="editor"></div>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            code: stripIndent(props.code)
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.code !== nextProps.code;
    }

    componentDidMount() {

        let editor = ace.edit('editor');
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/html');
        editor.setShowPrintMargin(false);
        editor.$blockScrolling = Infinity;

        editor.getSession().on('change', debounce(() => {
            let value = editor.getValue();
            if (this.props.onChange && value && value !== stripIndent(this.props.code)) {
                this.props.onChange(value);
            }
        }, 300));

        editor.setValue(stripIndent(this.props.code), -1);
        this.props.onChange(this.props.code);

        this.setState({ editor: editor });
    }

    componentDidUpdate() {
        this.state.editor.setValue(stripIndent(this.props.code), -1);
    }
}
