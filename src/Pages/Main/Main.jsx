import React from "react";
import Form from "../../components/Form/Form";
import "./Main.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const isToken = window.localStorage.getItem("accessToken");
  const navigate = useNavigate();

  console.log("k=tokeb", isToken);

  React.useEffect(() => {
    if (isToken) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="background">
      <Form />
    </div>
  );
};

export default Main;
