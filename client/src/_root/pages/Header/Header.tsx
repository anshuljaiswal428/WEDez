import './Header.css';
import '/src/index.css';
const Header = () => {
    return (
        <section className="h-wrapper">
            <div className="flexCenter paddings innerWidth h-container">
                <img
                    src="/assets/images/logo.png"
                    alt="logo"
                    width={100}
                />
                <div className="h-menu">
                    <a href="#">Home</a>
                    <a href="#">Gallery</a>
                    <a href="#">About Us</a>
                    <a href="#">Services</a>
                    <button className="button">
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</a>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Header;