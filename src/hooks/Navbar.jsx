import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../scss/hooks/Navbar.scss';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import Flag from 'react-world-flags';

const Navbar = ({ darkMode, toggleTheme, languages, currentLanguage, changeLanguage, sections, currentSection, setActiveIndex, handleNavbarToggle }) => {
    return (
        <div className="Navbar">
            {sections.length > 0 &&
                sections.map((section, index) => (
                    <div className={`section ${currentSection === section ? 'is-active' : ''}`} key={index} onClick={() => {
                        setActiveIndex(index)
                        handleNavbarToggle()
                    }}>
                        {section}
                    </div>
            ))}
            <div className='navbar-utils'>
                <button onClick={() => toggleTheme()}><FontAwesomeIcon icon={darkMode ? faMoon : faSun} /></button>
                <div className='navbar-languages'>
                    {languages.filter((lang) => lang.code !== currentLanguage).map((lang) => (
                        <button key={lang.code} onClick={() => changeLanguage(lang.code)}>
                            <Flag code={lang.code === 'ar' ? 'SA' : lang.code === 'fr' ? 'FR' : 'GB'} />
                            <span className='language-text'>{lang.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
