import{ Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/" >
            <h1>
              Gym Bro   
              <p className="material-symbols-outlined"> 
                exercise
              </p>  
            </h1>          
        </Link>
      </div>
    </header>
  );
};

export default Navbar
