import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ADD_MOVIES } from "../../redux/types";
import { connect } from "react-redux";
import spinner from "../../assets/spinner2.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Popular = (props) => {

  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [oldpage, setOldPage] = useState(1);

  //Equivalente a componentDidMount en componentes de Clase
  useEffect(() =>{
    findPopular();
    //eslint-disable-next-line
  },[])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=> {

    if(page !== oldpage){
      setOldPage(page);
      findPopular();
    }

  });

  const findPopular = async () => {
    try {
      let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US&page=${page}`);

      setPopular(res.data.results);
      //Guardo en RDX
      props.dispatch({type:ADD_MOVIES,payload:res.data.results});
    } catch (error) {
      console.log( { message: error.message} );
    }
  }

  const changePage = (operacion) => {

    if(operacion === "+"){

      //Cambiamos la página
      let newPage = page + 1;

      setOldPage(page);
      setPage(newPage);


    } else if (operacion === "-" && page > 1) {

      let newPage = page - 1;
      setOldPage(page);
      setPage(newPage);
    }

  }

  const clickHandler = (detail) => {

    props.dispatch({ type: ADD_MOVIES, payload: detail });
    history.push("/detail");
  };

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w200";
  let history = useHistory();

  if (popular[0]?.id) {
    return (
      <div className="allContent">

        <div className="movieContent">
            <div Style="color: white;" onClick={()=> changePage("-")}><FontAwesomeIcon icon={faArrowLeft}/></div><div Style="width: 17em;"></div>
            <div Style="color: white;" onClick={()=> changePage("+")}><FontAwesomeIcon icon={faArrowRight}/></div>
          {popular.map((movie, index) => (
            <div className="content" key={index} onClick={() => clickHandler(movie)}>
              <div className="content2" >
                <img
                  className="imgaPort"
                  src={`${baseImgUrl}/${size}${movie.poster_path}`}
                  alt="poster"
                />
              </div>
            </div>
          ))}
            <div Style="width: 3em;"></div> <div Style="width: 4em;"></div>  <div className="t" Style="color: white;" onClick={()=> changePage("-")}><FontAwesomeIcon icon={faArrowLeft}/></div><div Style="width: 8em;"></div>
            <div Style="width: 16em;"></div><div className="t" Style="color: white;" onClick={()=> changePage("+")}><FontAwesomeIcon icon={faArrowRight}/></div><div Style="width: -6em;"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinnerContainer">
        <div className="spinner">
          <img src={spinner} alt="spinner" width="60" />
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  movies: state.movies,
}))(Popular);
