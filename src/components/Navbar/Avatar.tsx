import Image from 'next/image'
import mypic from "../../assets/avatar.png"

import style from "./style.module.scss"

const Avatar = () => {
    return (
        <div className={`${style.logo} background`}>
            <div className={`${style.logo__avatar} reversebg`}>
                <Image alt="Picture of the author" src={mypic}/>
            </div>
            <p className='text'>
                &lt; Gustavo Lima &#47;&gt;
            </p>       
        </div>
        
    )
}

export default Avatar