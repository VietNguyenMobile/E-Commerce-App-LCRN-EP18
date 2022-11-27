import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconNavRight(props) {
  return (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.641 13.5L9.597 7.456a.862.862 0 010-1.209c.33-.33.88-.33 1.209 0l6.593 6.594c.33.44.33.989 0 1.318l-6.593 6.594c-.33.33-.88.33-1.209 0a.862.862 0 010-1.209l6.044-6.044z"
        fill={props.color || '#656565'}
      />
    </Svg>
  );
}
