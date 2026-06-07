import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="left">
        <h1>A Visitor Pass Management System !</h1>
      </div>

      <div className="right">
        <div className="cart">
          <div className="cart-one">
            <p className="para">Visitor's apply for appointment</p>

            <button 
              className="btn" 
              onClick={() => 
              navigate("/visitor")}>
              Visitor's
            </button>
          </div>

          <div className="cart-two">
            <p className="para">Help Visitor's</p>
            <button
              className="btn"
              onClick={() => {
                navigate("/helpdesk");
              }}
            >
              Front Desk
            </button>
          </div>

          <div className="cart-three">
            <p className="para">Give Appointment to the Visitor's</p>
            <button className="btn" onClick={() => {
                navigate("/employee");
              }}>Employee</button>
          </div>

          <div className="cart-four">
            <p className="para">ALL the access & report's</p>
            <button className="btn" onClick={() => {
                navigate("/admin");
              }}>Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
