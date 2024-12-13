import '../scss/hooks/Card.scss'

const Card = ({education, experience, setIsMouseOverCard}) => {
    return(
        <div className="card" onMouseEnter={() => setIsMouseOverCard(true)} onMouseLeave={() => setIsMouseOverCard(false)}>
            {education && (
                <div className='education-card'>
                    <h3> {education.title} </h3>
                    <div className='details'>
                        <span className='location-details'> {education.location} </span>
                        <span className='datetime-details'> {education.datetime} </span>
                    </div>
                </div>
            )}
            {experience && (
                <div className='experience-card'>
                    <h3> {experience.title} </h3>
                    <div className='details'>
                        <span className='location-details'> {experience.location} </span>
                        <span className='datetime-details'> {experience.datetime} </span>
                    </div>
                    <span className='work-description'> {experience.description} </span>
                </div>
            )}
        </div>
    )
}

export default Card;