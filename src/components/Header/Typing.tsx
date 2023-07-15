import React from "react";
import Typewriter from 'typewriter-effect';
import styles from "./style.module.scss"

export const Typing = () => {
    return (
        <h1 className={`${styles.header__title} text`}>
            <Typewriter
                options={{
                    strings: ['Frontend Developer.', 'Backend Developer.', 'Fullstack Developer.'],
                    autoStart: true,
                    loop: true,
                }}
            />
        </h1>
        
    );
}

export default Typing
