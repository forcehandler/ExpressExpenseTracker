var records = [
    {
        uid: 1,
        name: "User1",
        password:"Pass1",
        email:"User@gmail.com",
        isAdmin: false,
        expenses: [
            {
                id: 1,
                description: "First Expense",
                date: "date",
                category: 2
            },
            {
                id: 2,
                description: "doosra Expense",
                date: "date",
                category: 1
            }
        ],
        income: [
            {
                id: 1,
                description: "First Income",
                date: "date"
            }
        ]
    },
    {
        uid: 2,
        name: "User2",
        password:"Pass2",
        email:"User2@gmail.com",
        isAdmin: true,
        expenses: [
            {
                id: 1,
                description: "First Expense u2" ,
                date: "date",
                category: 0
            },
            {
                id: 2,
                description: "doosra Expense u2",
                date: "date",
                category: 1
            }
        ]
    }
];

var categories = ['Grocery', 'Travel', 'Food'];


module.exports.findUserByName = function(name, cb){
    console.log(name)
    var idX = records.findIndex(rec => rec.name === name)
    if(idX == -1){
        cb(new Error('User ' + name + ' does not exist'))
    }
    else{
        cb(null, records[idX])
    }
}

module.exports.findUserById = function(id, cb){
    var idX = records.findIndex(rec => rec.uid === id)
    if(idX == -1){
        cb(new Error('User ' + idX + ' does not exist'))
    }
    else{
        cb(null, records[idX])
    }
}

module.exports.addUser = function(username, password, email, cb){
    var expenses = []
    var income = []
    var uid = records.length + 1
    var user = new User(uid, username, password, email)
    records.push(user)
    cb(null, user)
}

module.exports.getAllUserExpenses = function(name, cb){
    console.log(name)
    var idX = records.findIndex(rec => rec.name === name)
    console.log(idX)
    if(idX == -1){
        cb(new Error('User ' + idX + ' does not exist'))
    }
    else{
        
        cb(null, records[idX].expenses)
    }
}

module.exports.getAllUserIncome = function(name, cb){
    var idX = records.findIndex(rec => rec.name === name)
    if(idX == -1){
        cb(new Error('User ' + idX + ' does not exist'))
    }
    else{
        console.log(JSON.stringify(records[idX].income))
        cb(null, records[idX].income)
    }
}

module.exports.getAllUserIncomeBetweenDates = function(name, cb){
    var idX = records.findIndex(rec => rec.name === name)
    if(idX == -1){
        cb(new Error('User ' + idX + ' does not exist'))
    }
    else{
        console.log(JSON.stringify(records[idX].income))
        cb(null, records[idX].income)
    }
}

module.exports.getCategory = function(id, cb){
    var idX = id;
    cb(null, categories[idX])
}

        
// ADD

module.exports.addUserExpense = function(username, description, amount, date, category, cb){
    this.findUserByName(username, function(err, data){
        var expense = new Record(data.expenses.length + 1, description, date, category, amount)
        data.expenses.push(expense)
        cb(null, expense)
    })
}

function User(uid, name, pwd, email, isAdmin, expenses, incomes){
    this.uid = uid
    this.name = name
    this.password = pwd
    this.email = email
    this.isAdmin = isAdmin
    this.expenses = expenses
    this.income = incomes
}

function Record(id, description, date, category, amount){
    this.id = id
    this.description = description
    this.category = category
    this.date = date
    this.amount = amount
}

