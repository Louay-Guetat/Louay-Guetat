import '../scss/components/Skills.scss';
import React, { useState, useEffect } from 'react';
import * as DevIcons from 'devicons-react';

const Skills = ({ deviconsData, setIsMouseOverCard }) => {
    const [iconSize, setIconSize] = useState(window.innerWidth < 768 ? 48 : 64);

    useEffect(() => {
        const handleResize = () => {
            setIconSize(window.innerWidth < 768 ? 48 : 64);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='skills'>
            {deviconsData.map((category) => (
                <div key={category.category} className='skill-category'>
                    <h1>{category.category}</h1>
                    <div className='icons' onMouseEnter={() => setIsMouseOverCard(true)} onMouseLeave={() => setIsMouseOverCard(false)}>
                        {category.icons.map((icon) => {
                            const IconComponent = DevIcons[icon.component];
                            return (
                                <span key={icon.name} title={icon.name}>
                                    <IconComponent size={iconSize} />
                                </span>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Skills;
