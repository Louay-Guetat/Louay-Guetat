import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import '../scss/components/Works.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import WorkCard from '../hooks/WorkCard';
const images = require.context('../images/works', false, /\.(png|jpe?g|svg)$/);

const Works = ({ works, deviconsData, currentLanguage }) => {
    const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
    const [isTouchingCurrentWork, setIsTouchingCurrentWork] = useState(false);

    const handleNext = () => {
        setCurrentWorkIndex((prevIndex) => (prevIndex + 1) % works.length);
    };

    const handlePrevious = () => {
        setCurrentWorkIndex((prevIndex) => (prevIndex - 1 + works.length) % works.length);
    };

    // Configure swipe handlers
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (!isTouchingCurrentWork) handleNext();
        },
        onSwipedRight: () => {
            if (!isTouchingCurrentWork) handlePrevious();
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    return (
        <div className="works" {...handlers}>
            {works.length > 0 ? (
                <>
                    <div className="previous" onClick={handlePrevious}>
                        <FontAwesomeIcon icon={currentLanguage === 'ar' ? faArrowRight : faArrowLeft} />
                    </div>
                    <div className="carrousel">
                        <div className="previous-work" onClick={handlePrevious}>
                            <WorkCard
                                work={works[(currentWorkIndex - 1 + works.length) % works.length]}
                                deviconsData={deviconsData}
                                isCurrent={false}
                                images={images}
                            />
                        </div>
                        <div
                            className="current-work"
                        >
                            <WorkCard
                                work={works[currentWorkIndex]}
                                deviconsData={deviconsData}
                                isCurrent={true}
                                images={images}
                                setIsTouchingCurrentWork = {setIsTouchingCurrentWork}
                            />
                        </div>
                        <div className="next-work" onClick={handleNext}>
                            <WorkCard
                                work={works[(currentWorkIndex + 1) % works.length]}
                                deviconsData={deviconsData}
                                isCurrent={false}
                                images={images}
                            />
                        </div>
                    </div>
                    <div className="next" onClick={handleNext}>
                        <FontAwesomeIcon icon={currentLanguage === 'ar' ? faArrowLeft : faArrowRight} />
                    </div>
                </>
            ) : (
                <div className="not-found">No Projects done, yet...</div>
            )}
        </div>
    );
};

export default Works;
