import React, { useState, useEffect }  from 'react';
const axios = require('axios');

const Occupado = () => {
  // const [delay, setDelay] = useState(2000);
  const [checkDoor, setCheckDoor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      check();
    }, 1000);
  })

  const check = () => {
    axios.get('/door').then(response => {
      console.log(response.data);
      setCheckDoor(response.data)
    })
  }

  let description;
    if (checkDoor === true) {
      description = <div><i className="fa fa-times-circle"></i> <span> Occupado!</span> </div>
    } else if (checkDoor === false) {
      description = <div><i className="fas fa-check-circle"></i> <span> Open!</span> </div>
    }

  return(
    <>
      {description}
    </>
  )
}
export default Occupado;