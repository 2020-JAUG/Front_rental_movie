import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ADD_MOVIES } from "../../redux/types";
import spinner from "../../assets/spinner2.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {
  let history = useHistory();

  const [, setRecommendations] = useState([]);
  const [page, setPage] = useState(1);
  const [oldpage, setOldPage] = useState(1);

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w200";

  useEffect(() => {
    setTimeout(() => {
      recommendations();
    }, 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (page !== oldpage) {
      setOldPage(page);
      recommendations();
    }
  });
  const changePage = (operacion) => {
    if (operacion === "+") {
      //Cambiamos la página
      let newPage = page + 1;

      setOldPage(page);
      setPage(newPage);
    } else if (operacion === "-" && page > 1) {
      let newPage = page - 1;
      setOldPage(page);
      setPage(newPage);
    }
  };

  const recommendations = async () => {
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_cast=31&sort_by=release_date.asc&api_key=79a61f5dc13e3e9e4834fadbf4f326c7&page=${page}`
      );
      setRecommendations(res.data.results);

      props.dispatch({ type: ADD_MOVIES, payload: res.data.results });
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = async (movie) => {
    try {
      props.dispatch({ type: ADD_MOVIES, payload: movie });
      history.push("/detail");
    } catch (err) {
      console.log(err);
    }
  };

  if (props.movies[0]?.id) {
    return (
      <div className="allContent">
        <div className="movieImage">
          <div className="fondoIMage"></div>
        </div>
        <div className="movieContent">
              <div Style="color: white;" onClick={()=> changePage("-")}><FontAwesomeIcon icon={faArrowLeft}/></div><div Style="width: 17em;"></div>
              <div Style="color: white;" onClick={()=> changePage("+")}><FontAwesomeIcon icon={faArrowRight}/></div>
          {props.movies.map((movie, index) => (
            <div
              className="content"
              key={index}
              onClick={() => clickHandler(movie)}
            >
              <div className="content2">
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
}))(Home);
