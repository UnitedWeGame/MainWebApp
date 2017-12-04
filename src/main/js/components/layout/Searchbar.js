import React from "react";
import { hashHistory } from 'react-router';
import {Menu, MenuItem, Typeahead} from 'react-bootstrap-typeahead';
import {groupBy, map, isEmpty } from 'lodash';
import * as LibraryActions from "../../actions/LibraryActions";
import * as GameInfoActions from "../../actions/GameInfoActions";
import * as GeneralUserActions from "../../actions/GeneralUserActions";
import * as GroupActions from "../../actions/GroupActions";
import DbGameStore from "../../stores/DbGameStore";
import GeneralUserStore from "../../stores/GeneralUserStore";
import GroupStore from "../../stores/GroupStore"

const MenuDivider = props => <li className="divider" role="separator" />;
const MenuHeader = props => <li {...props} className="dropdown-header" />;


export default class Searchbar extends React.Component {

  constructor(props) {
      super(props);
      this.setSearchList = this.setSearchList.bind(this);
      this.addGamesToList = this.addGamesToList.bind(this);
      this.addPeopleToList = this.addPeopleToList.bind(this);
      this.addGroupsToList = this.addGroupsToList.bind(this);
      this.handleChange = this.handleChange.bind(this);

      this.state = {
        disabled: false,
        selectHintOnEnter: false,
        listData: [{id: 1, name: "Games, groups and people not yet loaded", type: "games"}],
      };

      LibraryActions.getAllGames();
      GeneralUserActions.getAllUsers();
      GroupActions.getAllGroups();

    }

    componentWillMount() {
        DbGameStore.on("change", this.setSearchList);
        GroupStore.on("change", this.setSearchList);
    }

    componentWillUnmount() {
        DbGameStore.removeListener("change", this.setSearchList);
        GroupStore.removeListener("change", this.setSearchList);
    }

    // used to properly re-render app when redirecting to a game page
    componentWillReceiveProps(nextProps){
      this.setState({
        children: nextProps.children
      })
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

    addPeopleToList(peopleList, searchList){
      for(var i = 0; i < peopleList.length; i++){
        var person = {
                    id: peopleList[i].id,
                    name: peopleList[i].username,
                    type: "People"
        };
        searchList.push(person);
      }

      return searchList;
    }

    addGroupsToList(groupsList, searchList){
      for(var i = 0; i < groupsList.length; i++){
        var group = {
                    id: groupsList[i].id,
                    name: groupsList[i].groupName,
                    type: "Groups"
        };
        searchList.push(group);
      }

      return searchList;
    }



    // merge games, groups and people into a single list
    setSearchList(){
      var gamesList = DbGameStore.getAll();
      if(_.isEmpty(gamesList)) return;
      var searchList = [];
      searchList = this.addGamesToList(gamesList);

      var peopleList = GeneralUserStore.getAllUsers();
      if(peopleList.length === 0) return;
      searchList = this.addPeopleToList(peopleList, searchList);

      var groupsList = GroupStore.getAllGroups();
      if(groupsList.length === 0) return;
      searchList = this.addGroupsToList(groupsList, searchList);

      this.setState({listData: searchList})
    }

    handleChange(selectedOptions){
      if(selectedOptions[0] === undefined) return;
      if(selectedOptions[0].type.toLowerCase() === "games"){
        GameInfoActions.getGameInfo(selectedOptions[0].id);
        hashHistory.push('/game/');
      }
      else if(selectedOptions[0].type.toLowerCase() === "people"){
        var id = selectedOptions[0].id;
        GeneralUserActions.getUserData(id);
        GeneralUserActions.getGroups(id);
        GeneralUserActions.getFriends(id);
        hashHistory.push('/profile/' + id);
      }
      else if(selectedOptions[0].type.toLowerCase() === "groups"){
        GroupActions.getGroup(selectedOptions[0].id);
        hashHistory.push('/group/' + selectedOptions[0].id);
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
