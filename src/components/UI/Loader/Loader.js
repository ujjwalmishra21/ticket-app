import React from 'react';
import { Dimmer, Loader, Segment} from 'semantic-ui-react';

const LoaderUI = () => (
    <Segment>
        <Dimmer active>
            <Loader size='medium'/>
        </Dimmer>
    </Segment>
);

export default LoaderUI;