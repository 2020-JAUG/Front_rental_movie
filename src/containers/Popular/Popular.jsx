import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ADD_MOVIES } from "../../redux/types";
import { connect } from "react-redux";
import spinner from "../../assets/spinner2.gif";

const Popular = (props) => {

  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [oldpage, setOldPage] = useState(1);

  //Equivalente a componentDidMount en componentes de Clase
  useEffect(() =>{
    findPopular();
  },[])

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
                <div className="boton" onClick={()=> changePage("-")}>ANTERIOR</div>
                <div className="boton" onClick={()=> changePage("+")}>SIGUIENTE</div>
        <div className="movieImage">
          <div className="fondoIMage"></div>
        </div>

        <div className="movieContent">
          {popular.map((movie, index) => (
            <div className="content" onClick={() => clickHandler(movie)}>
              <div className="content2" key={index}>
                <p className="text">{movie.title} </p>
                <img
                  src={`${baseImgUrl}/${size}${movie.poster_path}`}
                  alt="poster"
                />
                {/* <p className="text">{movie.popularity}</p> */}
                {/* <p className="text">{movie.release_date}</p>
                                    {/* <p className="text">{movie.vote_average}</p>
                                    {/* <p className="text">{movie.genre_id}</p>
                                    {/* <p className="text">{movie.overview}</p> */}
                {/* <p className="text">{movie.getSimilarMovies}</p>

                                {/* <div className="enviar" onClick={() => llevame()}></div> */}
              </div>
            </div>
          ))}
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