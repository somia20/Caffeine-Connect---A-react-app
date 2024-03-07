function sessionTimeout(req, res, next) {
    console.log("Checking session timeout");
  
    if (req.session && req.session.user) {
      console.log("Session found, checking timeout...");
      console.log("Last activity:", req.session.lastActivity);
  
      const now = new Date().getTime();
      const sessionTimeout = req.session.lastActivity + (  24*60*60 * 1000); // 30 seconds in milliseconds
  
      console.log("Current time:", now);
      console.log("Session timeout:", sessionTimeout);
  
      if (now > sessionTimeout) { // session has timed out
        console.log("Session timed out, destroying session:", req.session);
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Session destroyed successfully");
            res.clearCookie("connect.sid");
            res.redirect("/login");
          }
        });
      } else { // update last activity time
        console.log("Session still active, updating last activity time...");
        req.session.lastActivity = now;
      }
    }
  
    next();
  }
  
  module.exports = sessionTimeout;