import '../scss/hooks/WorkCard.scss'
import logo from '../images/logo.svg';
import * as DevIcons from 'devicons-react'; // Import all icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useRef } from 'react';

const WorkCard = ({work, deviconsData, isCurrent, images, setIsTouchingCurrentWork}) =>{
    const techUsedRef = useRef(null);
    const imageSrc = work.picture ? images(`./${work.picture.split('/').pop()}`) : logo;
    const techIconsMap = deviconsData.flatMap((category) =>
        category.icons.map((icon) => ({
            name: icon.name,
            component: DevIcons[icon.component]
        }))
    );

    return(
        <div className="workCard">
            {isCurrent ? (
                <div className='current-work-card'>
                    <div className='image-container'><img src={imageSrc} alt={work.title} /></div>
                    <div className='title'>
                        <h1> {work.title} </h1>
                        {work.deployment_url && <a href={work.deployment_url} target='_blank' rel="noreferrer" title={work.deployment_url}><FontAwesomeIcon icon={faLink}/></a>}
                        {work.github_repo && <a href={work.github_repo} target='_blank' rel="noreferrer" title={work.github_repo}><FontAwesomeIcon icon={faGithub}/></a>}
                        {(!work.deployment_url && !work.github_repo) && <button title='Private' className='private'><FontAwesomeIcon icon={faLock} /></button>} 
                    </div>
                    <span> {work.description} </span>
                    <div
                        className="tech-used"
                        ref={techUsedRef}
                    >
                        {work.tech?.length > 0 && (
                            <div className="tech-icons"
                                onTouchStart={() => setIsTouchingCurrentWork(true)}
                                onTouchEnd={() => setIsTouchingCurrentWork(false)}
                                onMouseEnter={() => setIsTouchingCurrentWork(true)}
                                onMouseLeave={() => setIsTouchingCurrentWork(false)}
                            >
                                {work.tech.map((techName) => {
                                    const techIcon = techIconsMap.find((icon) => icon.name === techName);
                                    return (
                                        techIcon && (
                                            <div key={techName} title={techName}>
                                                <techIcon.component size={window.innerWidth < 768 ? 38 : 48} />
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='not-current-work-card'>
                    <div className='image-container-not-current'><img src={imageSrc} alt={work.title} /></div>
                    <div className='title'>
                        <h1> {work.title} </h1>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WorkCard;