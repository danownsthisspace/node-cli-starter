const rl = require('readline');
const exec = require('child_process').exec;

const prompt = async (question) => {
  const r = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  return new Promise((resolve, error) => {
    r.question(question, answer => {
      r.close()
      resolve(answer)
    });
  })
}

const asyncExec = async command => {
  return new Promise((resolve, error) => {
    exec(command, (err, stdOut, stdErr) => {

      if (err) {
        error(err)
      }

      if (stdErr) {
        error(stdErr)
      }

      if (stdOut) {
        resolve(stdOut)
      }
      
    })
  })
  
}

const run = async _ => {

  const shouldListFiles = await prompt("List files in dir? (Y/n): ")
  
  if (shouldListFiles === "n") {
    console.log("¯\_(ツ)_/¯");
    console.log("Not listing your files :-(");
  } else {
    const list = await asyncExec("ls -la")
    console.log(list);
  }
}

run()

