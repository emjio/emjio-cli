const program = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
program
  .version('1.0.0')
  .option('-i, init [name]', '初始化项目')
  .parse(process.argv);
  if (program.init) {  
    const spinner = ora('下载中').start();
    download('direct:https://github.com/emjio/vuepress-theme-demo.git', program.init, { clone: true }, function (err) {
        spinner.stop();
        if(!err) {    
            console.info(chalk.blueBright('下载完成'));
          }else{          
            console.info(chalk.red(err));
          }
    })
  }