const CronJob = require('cron').CronJob;
const { exec } = require('child_process');

console.log(`>> ${new Date()} Service up`);


let cronjobs = [
  { name: 'weekday', schedule: '00 20 09 * * *', command: 'node scripts/tweet-happy-weekday.js >> log/happy.log'},
  { name: 'deputy1', schedule: '00 23 12 * * *', command: 'node scripts/tweet-by-deputy.js >> log/deputy.log'},
  { name: 'trend', schedule: '00 35 15 * * *', command: 'node scripts/tweet-by-trend.js >> log/trend.log'},
  { name: 'deputy2', schedule: '00 10 18 * * *', command: 'node scripts/tweet-by-deputy.js >> log/deputy.log'}
];

cronjobs.forEach(cronjob => {
  new CronJob(cronjob.schedule, function() {
    exec(cronjob.command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`>> ${cronjob.name} executed at ${new Date()}`)
      // console.log(`stdout: ${stdout}`);
      // console.log(`stderr: ${stderr}`);
    });

  }, null, true, 'America/Mexico_City');

});
