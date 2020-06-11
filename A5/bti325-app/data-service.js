const Sequelize = require('sequelize');

// set up sequelize to point to our postgres database
var sequelize = new Sequelize('d7rd7pksc2j8pr', 'ekzrjpkamkzmez', 'cd6931595163bff71b2a144a0da2c5770f95fde6799bd286b297ff8a71185c4b', {
    host: 'ec2-174-129-253-113.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

// synchronize the Database with our models and automatically add the table if it does not exist
sequelize.authenticate()
.then(()=> console.log('Connection has been established successfully.'))
.catch((err)=>console.log("Unable to connect to DB: ", err));

//define Employee model
var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});

//define Department model
var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});

module.exports = {
initialize: function() {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(() => {
            resolve("Successfully connect to DB!");
        }).catch(() => {
            reject("Unable to sync the database");
        })
    });
},

getAllEmployees: function() {
    return new Promise(function (resolve, reject) {
        Employee.findAll().then((data) => {
            resolve(data);
        }).catch(() => {
            reject("No results returned.");
        });
    });
},

getEmployeesByStatus: function(status) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                status: status
            }
        }).then((data) => {
            resolve(data);
        }).catch(() => {
            reject("No results returned.");
        });
    });
},

getEmployeesByDepartment: function(department) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                department: department
            }
        }).then((data) => {
            resolve(data);
        }).catch(() => {
            reject("No results returned.");
        });
    });
},

getEmployeesByManager: function(manager) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                employeeManagerNum: manager
            }
        }).then((data) => {
            resolve(data);
        }).catch(() => {
            reject("No results returned.");
        });
    });
},

getEmployeeByNum: function(num) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                employeeNum: num
            }
        }).then((data) => {
            resolve(data[0]);
        }).catch(() => {
            reject("No results returned.");
        });
    });
},

addEmployee: function(employeeData) {
    return new Promise(function (resolve, reject) {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for(const employeeInfo in employeeData) {
            if(employeeData[employeeInfo] == "") {
                employeeData[employeeInfo] = null;
            }
        }
        Employee.create({
            employeeNum: employeeData.employeeNum,
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            SSN: employeeData.SSN,
            addressStreet: employeeData.addressStreet,
            addressCity: employeeData.addressCity,
            addressState: employeeData.addressState,
            addressPostal: employeeData.addressPostal,
            maritalStatus: employeeData.martialStatus,
            isManager: employeeData.isManager,
            employeeManagerNum: employeeData.employeeManagerNum,
            status: employeeData.status,
            department: employeeData.department,
            hireDate: employeeData.hireDate
        }).then(() => {
            resolve("Operation was a success!");
        }).catch(() => {
            resolve("Unable to create employee.");
        });
    });
},
getDepartments: function() {
    return new Promise(function (resolve, reject) {
        Department.findAll().then((data) => {
            resolve(data);
        }).catch(() => {
            reject("No results returned.");
        });
    });
},

addEmployee: function(employdata) {
    return new Promise(function (resolve, reject) {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for(const employeeInfo in employeeData) {
            if(employeeData[employeeInfo] == "") {
                employeeData[employeeInfo] = null;
            }
        }
        Employee.create({
            employeeNum: employeeData.employeeNum,
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            SSN: employeeData.SSN,
            addressStreet: employeeData.addressStreet,
            addressCity: employeeData.addressCity,
            addressState: employeeData.addressState,
            addressPostal: employeeData.addressPostal,
            maritalStatus: employeeData.martialStatus,
            isManager: employeeData.isManager,
            employeeManagerNum: employeeData.employeeManagerNum,
            status: employeeData.status,
            department: employeeData.department,
            hireDate: employeeData.hireDate
        }).then(() => {
            resolve("Operation was a success!");
        }).catch(() => {
            resolve("Unable to create employee.");
        });
    });
},

updateEmployee: function(employdata) {
    return new Promise(function (resolve, reject) {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for(const employeeInfo in employeeData) {
            if(employeeData[employeeInfo] == "") {
                employeeData[employeeInfo] = null;
            }
        }
        Employee.update({
            employeeNum: employeeData.employeeNum,
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            SSN: employeeData.SSN,
            addressStreet: employeeData.addressStreet,
            addressCity: employeeData.addressCity,
            addressState: employeeData.addressState,
            addressPostal: employeeData.addressPostal,
            maritalStatus: employeeData.martialStatus,
            isManager: employeeData.isManager,
            employeeManagerNum: employeeData.employeeManagerNum,
            status: employeeData.status,
            department: employeeData.department,
            hireDate: employeeData.hireDate
        }, {
            where: {
                employeeNum: employeeData.employeeNum
            }
        }).then(() => {
            resolve("Operation was a success!");
        }).catch(() => {
            reject("Unable to update employee.");
        })
    });
},

addDepartment: function(departmentData) {
    return new Promise(function (resolve, reject) {
        for(const departmentInfo in departmentData) {
            if(departmentData[departmentInfo] == "") {
                departmentData[departmentInfo] = null;
            }
        }
        Department.create({
            departmentId: departmentData.departmentId,
            departmentName: departmentData.departmentName
        }).then(() => {
            resolve("Operation was a success!");
        }).catch(() => {
            reject("Unable to create the department.");
        })
    });
},

updateDepartment: function(departmentData) {
    return new Promise(function (resolve, reject) {
        for(const departmentInfo in departmentData) {
            if(departmentData[departmentInfo] == "") {
                departmentData[departmentInfo] = null;
            }
        }
        Department.update({
            departmentId: departmentData.departmentId,
            departmentName: departmentData.departmentName
        }, {
            where : {
                departmentId: departmentData.departmentId
            }
        }).then(() => {
            resolve("Operation was a success!");
        }).catch(() => {
            reject("Unable to update the department.");
        })
    });
},

getDepartmentById: function(id) {
    return new Promise(function (resolve, reject) {
        Department.findAll({
            where: {
                departmentId: id
            }
        }).then((data) => {
            resolve(data[0]);
        }).catch(() => {
            reject("No results returned.");
        });
    });
},

deleteEmployeeByNum: function(empNum) {
    return new Promise(function (resolve, reject) {
        Employee.destroy({
            where: {
                employeeNum: empNum
            }
        }).then(() => {
            resolve("Operation was a success!");
        }).catch(() => {
            reject("Operation failed.");
        });
    });
}
};