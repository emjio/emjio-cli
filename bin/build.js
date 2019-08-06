#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');

program.version('1.0.0', '-v, --version')
    .command('init <name>')
    .action((name) => {
        if(!fs.existsSync(name)){
            inquirer.prompt([
                  {   
                    name: 'dir',
                    message: 'Download to this directory ？',
                    default:[name]
                },
                {   
                    name: 'name',
                    message: 'Project name？',
                    default:['my-blog']
                },
                {   
                    name: 'description',
                    message: 'Project description?',
                    default:['a vue blog ']
                },
                {
                    name: 'author',
                    message: 'Author?',
                }
            ]).then((answers) => {
                const spinner = ora('downloading...');
                spinner.start();
                download('direct:https://github.com/emjio/vuepress-theme-demo.git', dir, {clone: true}, (err) => {
                    if(err){
                        spinner.fail();
                        console.log(symbols.error, chalk.red(err));
                    }else{
                        spinner.succeed();
                        const fileName = `${name}/package.json`;
                        const meta = {
                            name,
                            description: answers.description,
                            author: answers.author
                        }
                        if(fs.existsSync(fileName)){
                            const content = fs.readFileSync(fileName).toString();
                            const result = handlebars.compile(content)(meta);
                            fs.writeFileSync(fileName, result);
                        }
                        console.log(symbols.success, chalk.green('done enjoy it!'));
                    }
                })
            })
        }else{
            // 错误提示项目已存在，避免覆盖原有项目
            console.log(symbols.error, chalk.red('dirname exit!'));
        }
    })
program.parse(process.argv);