const Home = () => {
  return (
    <div className="home">
      <div className="left">
        <h1>A Visitor Pass Management System</h1>
      </div>
      <div className="right">
        <div className="cart">
          <div className="cart-one">
            <p className="para">Visitor's apply for appointment</p>
            <button className="btn">Visitor</button>
          </div>
          <div className="cart-two">
            <p className="para">Help Visitors</p>
            <button className="btn">Front Desk</button>
          </div>
          <div className="cart-three">
            <p className="para">Give appointment to the visitors</p>
            <button className="btn">Employee</button>
          </div>
          <div className="cart-four">
            <p className="para">ALl the access & reports</p>
            <button className="btn">Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
