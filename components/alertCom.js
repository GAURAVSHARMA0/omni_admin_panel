//const colorArray = ['primary','secondary','success','danger','warning','info','light','dark'];
import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertCom = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <div>
      <Alert color={props.color} isOpen={visible} toggle={onDismiss} fade={false} style={{float: 'right'}}>
        I am a primary alert and I can be dismissed without animating!
      </Alert>
      </div>
  );
}
export default AlertCom;