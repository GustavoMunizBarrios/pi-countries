import React from "react";
import { useState, useRef } from "react";
import { useDispatch} from "react-redux";
import { searchCountry } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import style from './SearchBar.module.css'
import linkedin from '../../assets/profilePicture.png'
import github from '../../assets/profilePicture.png'

const reload = () => {
    window.location.reload(false);
}

export default function SearchBar(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
   
  const handleChange = (event) => {
    console.log(name)
    const value = event.target.value;
    setName(value);
  }; 

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCountry(name));
    setName('')
    props.onPageChange(1);
  };
  
  return (
    <div>
    <button onClick={()=>{reload()}}>Countries PI</button>
        <input type='search' placeholder=' Search Country...' value ={name} onChange={(event) => handleChange(event)}/>
        <button type='submit'  disabled={name===''}  onClick={(event) => handleSubmit(event)}>Search</button>
        <button type='submit' onClick={(event) => props.handleFilter(event)}>Reset Search</button>
    <NavLink to="/">Exit</NavLink> 
    <NavLink to="/form">Create Activity</NavLink>
    <a
        href="https://www.linkedin.com/in/developer-gustavo-mu%C3%B1iz-barrios-86708b121/"
        target="_blank"
        rel="noreferrer"
      >
        {/* <img src={linkedin} alt="linkedin" /> */}
      </a> 
      <a
        href="https://github.com/GustavoMunizBarrios"
        target="_blank"
        rel="noreferrer"
      >
        {/* <img src={github} alt="github"/> */}
      </a> 

    </div>
  )
}