import styles from "./styles.module.css";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div className={styles.main_container}>
      <Navbar />
    </div>
  );
};

export default Main;
