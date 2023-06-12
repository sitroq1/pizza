import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="288" rx="8" ry="8" width="280" height="29" /> 
    <rect x="0" y="337" rx="8" ry="8" width="280" height="87" /> 
    <rect x="0" y="446" rx="8" ry="8" width="90" height="27" /> 
    <rect x="127" y="436" rx="23" ry="23" width="150" height="44" /> 
    <circle cx="138" cy="140" r="120" />
  </ContentLoader>
)

export default Skeleton