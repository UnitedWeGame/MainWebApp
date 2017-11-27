import React from "react";
import { hashHistory } from 'react-router';
import {Menu, MenuItem, Typeahead} from 'react-bootstrap-typeahead';
import {groupBy, map} from 'lodash';
import * as LibraryActions from "../../actions/LibraryActions";
import * as GameInfoActions from "../../actions/GameInfoActions";
import * as GeneralUserActions from "../../actions/GeneralUserActions";
import DbGameStore from "../../stores/DbGameStore";
import GeneralUserStore from "../../stores/GeneralUserStore";

const MenuDivider = props => <li className="divider" role="separator" />;
const MenuHeader = props => <li {...props} className="dropdown-header" />;


export default class Searchbar extends React.Component {

  constructor(props) {
      super(props);
      this.setSearchList = this.setSearchList.bind(this);
      this.addGamesToList = this.addGamesToList.bind(this);
      this.addPeopleToList = this.addPeopleToList.bind(this);
      this.handleChange = this.handleChange.bind(this);

      this.state = {
        disabled: false,
        selectHintOnEnter: false,
        listData: [{id: 1, name: "Games and people not yet loaded", type: "games"}],
      };

      LibraryActions.getAllGames();
      GeneralUserActions.getAllUsers();

    }

    componentWillMount() {
        DbGameStore.on("change", this.setSearchList);
    }

    componentWillUnmount() {
        DbGameStore.removeListener("change", this.setSearchList);
    }

    // used to properly re-render app when redirecting to a game page
    componentWillReceiveProps(nextProps){
      this.setState({
        children: nextProps.children
      })
    }

    addPeopleToList(peopleList, gamesAndPeopleList){
      for(var i = 0; i < peopleList.length; i++){
        var person = {
                    id: peopleList[i].id,
                    name: peopleList[i].username,
                    type: "People"
        };
        gamesAndPeopleList.push(person);
      }

      return gamesAndPeopleList;
    }

    addGamesToList(games){
      var gameList = [];

      gameList = games.PS3.concat(games.PS4).concat(games.Steam).concat(games.Xbox360).concat(games.XboxOne);
      for(var i = 0; i < gameList.length; i++){
        gameList[i].name = gameList[i].title;
        gameList[i].type = "Games";
      }

      return gameList;
    }

    // merge games and people into a single list
    setSearchList(){
      var id = 0;
      var gamesList = DbGameStore.getAll();
      var gamesAndPeopleList = [];

      gamesAndPeopleList = this.addGamesToList(gamesList)

      var peopleList = GeneralUserStore.getAllUsers();

    gamesAndPeopleList = this.addPeopleToList(peopleList, gamesAndPeopleList)
    this.setState({listData: gamesAndPeopleList})
  }

    handleChange(selectedOptions){
      if(selectedOptions[0] === undefined) return;
      if(selectedOptions[0].type.toLowerCase() === "games"){
        GameInfoActions.getGameInfo(selectedOptions[0].id);
        hashHistory.push('/game/');
      }
      else if(selectedOptions[0].type.toLowerCase() === "people"){
        hashHistory.push('/profile/' + selectedOptions[0].id);
      }
    }

    render() {

      const {
        disabled,
        emptyLabel,
        minLength,
        selectHintOnEnter,
      } = this.state;

      const props = {};
      var listData = this.state.listData

      return (
        <div>
          <Typeahead
            {...props}
            emptyLabel={emptyLabel ? '' : undefined}
            labelKey="name"
            options={listData}
            placeholder="Search..."
            onChange={this.handleChange}
            minLength={1}
            renderMenu={this._renderMenu}


          />
        </div>
      )
    }

    _renderMenu(results, menuProps) {
      let idx = 0;
      const grouped = groupBy(results, r => r.type); // type is "Games" or "People"
      const items = Object.keys(grouped).sort().map(type => {
        return [
          !!idx && <MenuDivider key={`${type}-divider`} />,
          <MenuHeader key={`${type}-header`}>
            {type}
          </MenuHeader>,
          map(grouped[type], listObj => {
            const item =
              <MenuItem key={idx} option={listObj} position={idx}>
                {listObj.name}
              </MenuItem>;

            idx++;
            return item;
          }),
        ];
      });

      return <Menu {...menuProps}>{items}</Menu>;
  }
  }
