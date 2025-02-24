/* eslint-disable react/prop-types */

const Image = ({src, style}) => {
  return (
    <img className={`${style} h-full w-full flex items-center justify-center object-contain`} src={src} alt='Img'/>
  )
}

export default Image