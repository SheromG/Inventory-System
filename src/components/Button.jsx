const Button = ({text, width , margin, padding,  textsize , textcolor,  color, border, onClick, disabled }) => 
{
    return (
        <button 
            onClick={ onClick }
            disabled = {disabled}
            className = 
            { `
                transition-colors
                ease-in-out 
                delay-100

                rounded-full 
                font-main

                ${ width }
                ${ margin }
                ${ padding } 
                ${ textsize }
                ${ textcolor }
                ${ color } 
                ${ border }
        `}
        >

            {text}

        </button>
    )
}

export default Button