import React from "react";
import { hashHistory } from 'react-router';
import {Menu, MenuDivider, MenuHeader, MenuItem, Typeahead} from 'react-bootstrap-typeahead';
import {groupBy, map} from 'lodash';
import * as LibraryActions from "../../actions/LibraryActions"
import DbGameStore from "../../stores/DbGameStore";


export default class Searchbar extends React.Component {

  constructor(props) {
      super(props);
      this.setSearchList = this.setSearchList.bind(this);
      this.addGamesToList = this.addGamesToList.bind(this);
      this.addPeopleToList = this.addPeopleToList.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.renderMenu = this.renderMenu.bind(this);

      this.state = {
        disabled: false,
        selectHintOnEnter: false,
        listData: [{id: 1, name: "Games and people not yet loaded", type: "games"}],
      };

      LibraryActions.getAllGames();

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
      var initLength = gamesAndPeopleList.length
      var id = gamesAndPeopleList.length;
      var peopleIdx = 0;
      for(id; id < (initLength + peopleList.length); id++, peopleIdx++){
        gamesAndPeopleList.push(peopleList[peopleIdx]);
        gamesAndPeopleList[id].id = id;
        gamesAndPeopleList[id].type = "people";
        console.log("person added to list");
      }

      return gamesAndPeopleList;
    }

    addGamesToList(games){
      var gameList = [];

      gameList = games.PS3.concat(games.PS4).concat(games.Steam).concat(games.Xbox360).concat(games.XboxOne);
      for(var i = 0; i < gameList.length; i++){
        gameList[i].name = gameList[i].title;
        gameList[i].type = "games";
        console.log("game added to list")
      }

      return gameList;
    }

    // merge games and people into a single list
    setSearchList(){
      var id = 0;
      var gamesList = DbGameStore.getAll();
      var gamesAndPeopleList = [];

      gamesAndPeopleList = this.addGamesToList(gamesList)

      var peopleList = [{name: "logangsta"},
      {name: "jacksonmeister"},
      {name: "kelpaso"},
      {name: "weetermachine"}
    ];

    gamesAndPeopleList = this.addPeopleToList(peopleList, gamesAndPeopleList)
    console.log("the game/people list was successfully initialized and has size: " + gamesAndPeopleList.length)
    this.setState({listData: gamesAndPeopleList})
  }

    handleChange(selectedOptions){

      console.log("a search item was selected")
      console.log("this many items selected: "  + selectedOptions)
      console.log(selectedOptions[0])
      if(selectedOptions[0].type == "games"){
        LibraryActions.getGameInfo(selectedOptions[0].id)
        hashHistory.push('/game');
      }
    }

    renderMenu(results, menuProps) {
      console.log("renderMenu was executed")
      let idx = 0;
      const grouped = groupBy(results, r => r.type); // type is "games" or "people"
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

    render() {

      const {
        disabled,
        emptyLabel,
        minLength,
        selectHintOnEnter,
      } = this.state;

      const props = {};
      {/*props.renderMenu = this.renderMenu;*/}

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


          />
        </div>
      )
    }
  }
