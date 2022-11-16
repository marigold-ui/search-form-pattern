import React from 'react';
import ContentLoader from 'react-content-loader';

const CardLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={400}
    height={500}
    viewBox="0 0 400 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="16" cy="140" r="8" />
    <rect x="31" y="135" rx="5" ry="5" width="220" height="10" />
    <circle cx="16" cy="170" r="8" />
    <rect x="31" y="165" rx="5" ry="5" width="220" height="10" />
    <circle cx="16" cy="200" r="8" />
    <rect x="31" y="195" rx="5" ry="5" width="220" height="10" />
    <circle cx="16" cy="230" r="8" />
    <rect x="31" y="225" rx="5" ry="5" width="220" height="10" />
    <circle cx="15" cy="255" r="8" />
    <rect x="30" y="250" rx="5" ry="5" width="220" height="10" />
    <circle cx="15" cy="285" r="8" />
    <rect x="30" y="280" rx="5" ry="5" width="220" height="10" />
    <circle cx="15" cy="315" r="8" />
    <rect x="30" y="310" rx="5" ry="5" width="220" height="10" />
    <circle cx="15" cy="345" r="8" />
    <rect x="30" y="340" rx="5" ry="5" width="220" height="10" />
    <circle cx="73" cy="380" r="8" />
    <rect x="88" y="375" rx="5" ry="5" width="220" height="10" />
    <circle cx="18" cy="405" r="8" />
    <rect x="33" y="400" rx="5" ry="5" width="220" height="10" />
    <circle cx="76" cy="440" r="8" />
    <rect x="91" y="435" rx="5" ry="5" width="220" height="10" />
    <rect x="183" y="4" rx="0" ry="0" width="247" height="34" />
    <rect x="317" y="2" rx="0" ry="0" width="6" height="18" />
    <rect x="227" y="60" rx="0" ry="0" width="127" height="27" />
  </ContentLoader>
);

export default CardLoader;
