import React from "react";

import request from "./http";

function App() {
  React.useEffect(() => {
    request.get("/healthCheck");
  }, []);

  return <div>App</div>;
}

export default App;
