import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import spinner from "../../../assets/spinner2.gif";
import moment from "moment";

const UpdateOrders = (props) => {
  let history = useHistory();

  //hooks
  const [datos, setDatos] = useState({
    token: props.credentials?.token,
    user: props.credentials?.user,
    id: props.infoUser?.id,
    moviePoster: props.movies?.poster_path,
    rentalDate: new Date(),
    returnDate: new Date(),
  });

  useEffect(() => {});

  // Esto es un Handler
  const updateCredentials = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const UpdateOrder = async () => {
    let token = props.credentials?.token;

    let body = {
      userId: datos.user.id,
      orderId: datos.id,
      rentalDate: datos.rentalDate,
      returnDate: datos.returnDate,
    };

    axios
      .put("https://back-movie.herokuapp.com/orders/update", body, {
        headers: { authorization: "Bearer " + token },
      })
      .then((res) => {
        setTimeout(() => {
          history.push("/profile");
        }, 250);

        if (!res.data.user.isAdmin) {
          history.push("/user");
        } else {
          history.push("/admin");
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        console.log("Err");
      });
  };

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w300";

  if (props.credentials.user?.name) {
    return (
      <div className="card  text-center align-items-center mt-5  bg-dark text-white">
        <div className="row g-0">
          <div className="mt-3">
            <p>
              {" "}
              Rented by: {props.infoUser.userName} {props.infoUser.lastName}{" "}
            </p>
            <p className="order">
              {" "}
              Rental Date : {moment(props.infoUser.rentalDate).format(
                "LL"
              )}{" "}
            </p>
            <p className="order">
              {" "}
              Return Date : {moment(props.infoUser.returnDate).format(
                "LL"
              )}{" "}
            </p>
            <img
              className="imgUser2"
              src={`${baseImgUrl}/${size}${props.infoUser.moviePoster}`}
              alt="poster"
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="mt-3">
            <h3>Rental Date</h3>
            <br />
            <input
              className="input1"
              type="date"
              value={datos.rentalDate}
              name="rentalDate"
              onChange={updateCredentials}
            />
            <div className="gapInput2"></div>
          </div>
          <div className="mt-4">
            <h3>Renturn Date</h3>
            <br />
            <input
              className="input1"
              type="date"
              value={datos.returnDate}
              name="returnDate"
              onChange={updateCredentials}
            />
          </div>
          <div className="card-footer text-center">
            <div
              to={"/updateuser"}
              className="updateButton"
              onClick={() => UpdateOrder()}
            >
              UPDATE
            </div>
          </div>
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
  infoUser: state.infoUser,
}))(UpdateOrders);
