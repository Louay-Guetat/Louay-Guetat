import React, { useState, useEffect } from 'react';
import '../scss/components/Home.scss';
import picture from '../images/Louay.png';
import Card from '../hooks/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = ({ data, educations, experiences, setIsMouseOverCard, changeSection, activeSectionIndex, currentLanguage }) => {
    const name = data.name;
    const titles = data.titles;
    const sections = data.aboutmeSections;
    const [activeIndex, setActiveIndex] = useState(0);

    const [section, setSection] = useState(sections[0]);
    const [currentTitle, setCurrentTitle] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    const [typedSentences, setTypedSentences] = useState([]);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    useEffect(() => {
        const typingSpeed = 50;
        const deletingSpeed = 100;
        const delayBetweenTitles = 1000;

        const handleTyping = () => {
            const title = titles[currentIndex];
            if (!isDeleting) {
                setCurrentTitle(title.substring(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);

                if (charIndex === title.length) {
                    setTimeout(() => setIsDeleting(true), delayBetweenTitles);
                }
            } else {
                setCurrentTitle(title.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);

                if (charIndex === 0) {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % titles.length);
                }
            }
        };

        const titleTimeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(titleTimeout);
    }, [currentIndex, charIndex, isDeleting]);

    useEffect(() => {
        if (data.aboutme && data.aboutme.length > 0) {
            setTypedSentences([]);
            setCurrentSentenceIndex(0);
            setCurrentCharIndex(0);
        }
    }, [data.aboutme]);
    
    useEffect(() => {
        const typingSpeed = 35;
    
        if (currentSentenceIndex < data.aboutme.length) {
            const currentSentence = data.aboutme[currentSentenceIndex];
    
            if (currentCharIndex < currentSentence.length) {
                const timeout = setTimeout(() => {
                    setTypedSentences((prev) => {
                        const updated = [...prev];
                        if (!updated[currentSentenceIndex]) updated[currentSentenceIndex] = "";
                        updated[currentSentenceIndex] += currentSentence[currentCharIndex];
                        return updated;
                    });
                    setCurrentCharIndex((prev) => prev + 1);
                }, typingSpeed);
    
                return () => clearTimeout(timeout);
            } else {
                const delay = setTimeout(() => {
                    setCurrentSentenceIndex((prev) => prev + 1);
                    setCurrentCharIndex(0);
                }, 500);
    
                return () => clearTimeout(delay);
            }
        }
    }, [currentCharIndex, currentSentenceIndex, data.aboutme]); 

    const handleClick = (section, index) => {
        setSection(section);
        setActiveIndex(index);
    };

    return (
        <div className="Home">
            <div className="introduction">
                <div className="name-titles">
                    <h1>{name}</h1>
                    <div className="title-container">
                        {currentTitle}
                        <span className="cursor">|</span>
                    </div>
                    <button className='hireus-button' onClick={() => changeSection(4, 4 > activeSectionIndex ? 'down' : 'up')}> <div className='hireus-text'>{data.hireus} <FontAwesomeIcon icon={currentLanguage === 'ar' ? faArrowLeft : faArrowRight} /></div> </button>
                </div>
                <div className="picture">
                    <img src={picture} alt="my-picture" />
                </div>
            </div>
            <div className="horizontal-line">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className={activeIndex === index ? 'dot active' : 'dot'}
                        onClick={() => handleClick(section, index)}
                        title={section}
                    ></div>
                ))}
            </div>
            <div className="section-content">
                {section === sections[0] ? (
                    <div className="aboutme">
                        {typedSentences.map((sentence, index) => (
                            <span key={`${sentence}-${index}`}>{sentence}</span>
                        ))}
                    </div>
                ) : section === sections[1] ? (
                    <div className="education">
                        {educations.length > 0 &&
                            educations.map((education) => (
                                <Card education={education} setIsMouseOverCard={setIsMouseOverCard} />
                            ))}
                    </div>
                ) : section === sections[2] ? (
                    <div className="experience">
                        {experiences.length > 0 &&
                            experiences.map((experience) => (
                                <Card experience={experience} setIsMouseOverCard={setIsMouseOverCard} />
                            ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Home;
