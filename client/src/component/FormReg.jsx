import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultInput from "./DefaltInput";
import DefaultButton from "./DefautButton";
const Registration = () => {
  const [user, setUser] = useState({ name: "", password: "" });
  const nav = useNavigate();
  const Vxod = async () => {
    const res = await axios.post("http://localhost:3000/registration", user);
    const data = res.data;
    if (data.password) {
      nav("/");
    }
  };
  return (
    <div className="Registration">
      <div className="Registration_body">
        <p className="Registration_title">Авторизация</p>
        <DefaultInput 
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="Registration_name"
          placeholder="Логин"
        />
        <DefaultInput
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="Registration_password"
          placeholder="Пароль"
        />
        <DefaultButton onClick={Vxod} className="Registration_button">
          вход
        </DefaultButton>
      </div>
    </div>
  );
};

export default Registration;
