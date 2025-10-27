document.addEventListener('DOMContentLoaded', loadExpenses);

const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

form.addEventListener('submit', addExpense);

// Load expenses from local storage when the page loads
function loadExpenses() {
  const expenses = getExpenses();
  expenses.forEach(expense => addExpenseToDOM(expense));
  updateTotal();
}

// Get expenses from local storage
function getExpenses() {
  return localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
}

// Save expenses to local storage
function saveExpenses(expenses) {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Add new expense
function addExpense(e) {
  e.preventDefault();

  const name = document.getElementById('expense-name').value;
  const amount = document.getElementById('expense-amount').value;
  const date = document.getElementById('expense-date').value;

  if (name === '' || amount === '' || date === '') {
    alert('Please fill all fields');
    return;
  }

  const expense = { id: Date.now(), name, amount: parseFloat(amount), date };
  const expenses = getExpenses();
  expenses.push(expense);
  saveExpenses(expenses);

  addExpenseToDOM(expense);
  updateTotal();

  form.reset();
}

// Add expense to the table
function addExpenseToDOM(expense) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${expense.name}</td>
    <td>₹${expense.amount.toFixed(2)}</td>
    <td>${expense.date}</td>
    <td><button class="delete-btn" onclick="deleteExpense(${expense.id})">X</button></td>
  `;
  expenseList.appendChild(tr);
}

// Delete expense
function deleteExpense(id) {
  let expenses = getExpenses();
  expenses = expenses.filter(expense => expense.id !== id);
  saveExpenses(expenses);

  expenseList.innerHTML = '';
  expenses.forEach(expense => addExpenseToDOM(expense));
  updateTotal();
}

// Update total amount
function updateTotal() {
  const expenses = getExpenses();
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}
