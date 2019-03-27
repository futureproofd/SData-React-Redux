import React from 'react';
import { css } from '@emotion/core';

import { PropagateLoader } from 'react-spinners';

// eslint-disable-next-line no-unused-vars
const override = css`
flex: 1,
marginTop:240,
justifyContent: 'center',
alignItems:'center'
`;

const Loading = (props) => {
  const { loading } = props;

  return (
    <div className="loader">
      <PropagateLoader sizeUnit="px" size={10} color="#3977B5" loading={loading} />
    </div>
  );
};

export default Loading;
