 const { logger } = require('../utils/logger');
 
(() => {
    require('../config/db.config.init').query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        } 
         logger.info('DB created!');
         require('../models') 
         setTimeout(()=>{
            logger.info('Tables created!');
            process.exit(0);
        },5000)
    });
})();  
