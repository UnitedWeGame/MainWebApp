import React from "react";
import {Typeahead} from 'react-bootstrap-typeahead';

export default class Searchbar extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        disabled: false,
        minLength: 2,
        selectHintOnEnter: false,
      };
    }

    render() {
      const {
        disabled,
        emptyLabel,
        minLength,
        selectHintOnEnter,
      } = this.state;

      return (
        <div>
          <Typeahead
            {...this.state}
            emptyLabel={emptyLabel ? '' : undefined}
            labelKey="name"
            options={options}
            placeholder="Search people and games..."
            onChange={this._handleChange}

          />

<Typeahead
  onChange={this._handleChange}
  options={myData}
/>
