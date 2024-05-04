import React from 'react';
const LogoutPage = ({onLogout}) => {
  return (
    <div>
      
        <div>
          <button onClick={onLogout}>Log Out</button>
        </div> 
      
    </div>
  
  );
};

export default LogoutPage;
