import './scss/App.scss';
import logo from './images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Skills from './components/Skills';
import Works from './components/Works';
import Contact from './components/Contact';
import HireUs from './components/HireUs';
import Navbar from './hooks/Navbar';
import { useTranslation } from 'react-i18next';

const App = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const [navbarOn, setNavbarOn] = useState(false);
    const [returnEffect, setReturnEffect] = useState(false);
    const [isMouseOverCard, setIsMouseOverCard] = useState(false);
    const sections = t('general', { returnObjects: true }).sections;
    const languages = t('languages', { returnObjects: true })
    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
        document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

    }, [darkMode, currentLanguage]);

    const toggleTheme = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    };

    const changeLanguage = (lng) => {
        setCurrentLanguage(lng);
        i18n.changeLanguage(lng);
    };

    const changeSection = (index, direction) => {
        if (index >= 0 && index < sections.length) {
            setScrollDirection(direction);
            setIsScrolling(true);
            setTimeout(() => {
                setActiveIndex(index);
                setIsScrolling(false);
            }, 500); // Animation duration
        }
    };

    const handleScroll = (e) => {
        if (isScrolling || window.innerWidth < 768 || isMouseOverCard) return;

        if (e.deltaY > 0 && activeIndex < sections.length - 1) {
            changeSection(activeIndex + 1, 'down');
        } else if (e.deltaY < 0 && activeIndex > 0) {
            changeSection(activeIndex - 1, 'up');
        }
    };

    const handleNavbarToggle = () => {
        if (navbarOn) {
            setReturnEffect(true);
            setTimeout(() => setNavbarOn(false), 300);
        } else {
            setReturnEffect(false);
            setNavbarOn(true);
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [isScrolling, isMouseOverCard]);

    return (
        <div
            className={`App ${
                navbarOn
                    ? 'perspective--modalview effect-rotate-left--animate'
                    : returnEffect
                    ? 'perspective--modalview return-effect'
                    : ''
            } ${darkMode ? 'dark-mode' : 'light-mode'}`}
        >
            <div className="container" onClick={() => navbarOn && handleNavbarToggle()}>
                <div className="headers">
                    <img
                        src={logo}
                        alt="Logo"
                        onClick={() => activeIndex !== 0 && changeSection(0, 'down')}
                    />
                    {activeIndex !== 0 && (
                        <button
                            className={`hireus-button ${
                                activeIndex === 0 || activeIndex === 4 ? 'hide' : ''
                            }`}
                            onClick={() =>
                                activeIndex !== 4
                                    ? changeSection(4, 4 > activeIndex ? 'down' : 'up')
                                    : null
                            }
                        >
                            {t('general', { returnObjects: true }).hireus}
                        </button>
                    )}
                    <FontAwesomeIcon icon={faBars} onClick={handleNavbarToggle} />
                </div>
                <main>
                    <div className="navigation">
                        <ul>
                            {sections.map((item, index) => (
                                <li
                                    key={index}
                                    className={activeIndex === index ? 'active' : ''}
                                    onClick={() =>
                                        changeSection(
                                            index,
                                            index > activeIndex ? 'down' : 'up'
                                        )
                                    }
                                >
                                    <span
                                        key={'number' + index}
                                        className="number"
                                    >{`0${index + 1}`}</span>
                                    <span
                                        key={'text' + index}
                                        className="text"
                                    >
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className={`main-content ${
                            isScrolling
                                ? scrollDirection === 'down'
                                    ? 'fade-up'
                                    : 'fade-down'
                                : ''
                        }`}
                    >
                        {activeIndex === 0 ? (
                            <Home
                                data={t('general', { returnObjects: true })}
                                educations={t('educations', { returnObjects: true })}
                                experiences={t('experiences', { returnObjects: true })}
                                setIsMouseOverCard={setIsMouseOverCard}
                                changeSection={changeSection}
                                activeIndex={activeIndex}
                                currentLanguage={i18n.language}
                            />
                        ) : activeIndex === 1 ? (
                            <Skills
                                deviconsData={t('skills', { returnObjects: true })}
                                setIsMouseOverCard={setIsMouseOverCard}
                            />
                        ) : activeIndex === 2 ? (
                            <Works
                                works={t('works', { returnObjects: true })}
                                deviconsData={t('skills', { returnObjects: true })}
                                currentLanguage={i18n.language}
                            />
                        ) : activeIndex === 3 ? (
                            <Contact data={t('general', { returnObjects: true })} />
                        ) : activeIndex === 4 ? (
                            <HireUs
                                jobCategories={t('JobCategories', { returnObjects: true })}
                                HireUs={t('HireUs', { returnObjects: true })}
                            />
                        ) : null}
                    </div>
                </main>
            </div>
            <nav className={`outer-nav ${navbarOn ? 'is-vis' : ''}`}>
                <Navbar
                    darkMode={darkMode}
                    toggleTheme={toggleTheme}
                    languages={languages}
                    currentLanguage={currentLanguage}
                    changeLanguage={changeLanguage}
                    sections={sections}
                    currentSection={sections[activeIndex]}
                    setActiveIndex={setActiveIndex}
                    handleNavbarToggle={handleNavbarToggle}
                />
            </nav>
        </div>
    );
};

export default App;
