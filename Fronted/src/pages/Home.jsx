const Home = () => {
  return (
    <div className="home">
      <div className="left">
        <h1>A Visitor Pass Management System !</h1>
      </div>
      <div className="right">
        <div className="cart">
          <div className="cart-one">
            <p className="para">Visitor's apply for appointment</p>
            <button className="btn">Visitor's</button>
          </div>
          <div className="cart-two">
            <p className="para">Help Visitor's</p>
            <button className="btn">Front Desk</button>
          </div>
          <div className="cart-three">
            <p className="para">Give Appointment to the Visitor's</p>
            <button className="btn">Employee</button>
          </div>
          <div className="cart-four">
            <p className="para">ALL the access & report's</p>
            <button className="btn">Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
