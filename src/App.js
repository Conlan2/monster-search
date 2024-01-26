import logo from './logo.svg';
import './App.css';

import CardList from "./components/cardlist/cardlist.component";
import { useState, useEffect } from "react";
import SearchBar from "./components/searchbar/searchbar.component";
import axios from "axios";
function App() {
    const [monsters, setMonsters] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [filteredMonsters, setFilteredMonsters] = useState([])
    const url = 'https://jsonplaceholder.typicode.com/posts'
    const data = {
        a: 10,
        b: 20,
    };
    axios.post(url, data, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            },
})
.then(({data}) => {
console.log(data);
});

    useEffect(() => {
        const fetchUsers = async () => {
        const response = await axios(
            'https://jsonplaceholder.typicode.com/users',
            );
            setMonsters(response.data);
            };
            fetchUsers();
        }, []);


    useEffect(() => {
        let filtered = [];
        if (searchInput === "") {
            filtered = monsters
        } else {
            filtered = monsters.filter(monster =>
                monster.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        }


        setFilteredMonsters(filtered)
    }, [monsters, searchInput]);

    const handleInput = e => {
        setSearchInput(e.target.value)
    };



  return (
    <div className="App">
      <h1>Monster Rolodex</h1>
      <SearchBar
        placeholder='Search Monster'
        handleInput={handleInput}
      />
      <CardList monsters={filteredMonsters}></CardList>
    </div>
  );
}

export default App;
