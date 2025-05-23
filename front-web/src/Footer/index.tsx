import './styles.css';
import { ReactComponent as YoutubeIcon } from './youtube.svg';
import { ReactComponent as InstagramIcon } from './instagram.svg';
import { ReactComponent as LinkedinIcon } from './linkedin.svg';

function Footer() {
    return (
        <footer className="main-footer">
            App desenvolvido durante a 2 edição do evento Semana DevSuperior
            <div className="footer-icons">
                <a href="youtube" target="_new">
                    <YoutubeIcon />
                </a>
                <a href="linkedin" target="_new">
                    <LinkedinIcon />
                </a>
                <a href="instagram" target="_new">
                    <InstagramIcon />
                </a>
            </div>
        </footer>
    )
}

export default Footer;