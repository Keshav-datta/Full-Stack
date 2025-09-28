const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let employees = [];

function showMenu() {
  console.log('\nEmployee Management System');
  console.log('1. Add Employee');
  console.log('2. List Employees');
  console.log('3. Remove Employee by ID');
  console.log('4. Exit');
  rl.question('Choose an option: ', handleOption);
}

function handleOption(option) {
  switch(option.trim()) {
    case '1':
      rl.question('Enter Employee Name: ', (name) => {
        rl.question('Enter Employee ID: ', (id) => {
          employees.push({ name, id });
          console.log(`Employee ${name} (Id- ${id}) added successfully`);
          showMenu();
        });
      });
      break;
    case '2':
      console.log('\nEmployee List:');
      employees.forEach(emp => {
        console.log(`Name: ${emp.name}, ID: ${emp.id}`);
      });
      showMenu();
      break;
    case '3':
      rl.question('Enter Employee ID to remove: ', (removeId) => {
        const index = employees.findIndex(emp => emp.id === removeId.trim());
        if (index === -1) {
          console.log('Employee not found!');
        } else {
          employees.splice(index, 1);
          console.log('Employee removed!');
        }
        showMenu();
      });
      break;
    case '4':
      rl.close();
      break;
    default:
      console.log('Invalid option, try again.');
      showMenu();
  }
}

console.log('Welcome to the Employee Management CLI!');
showMenu();

rl.on('close', () => {
  console.log('Exiting program...');
  process.exit(0);
});
