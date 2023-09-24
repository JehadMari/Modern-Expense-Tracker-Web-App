 document.addEventListener("DOMContentLoaded", function () {
            // Load expenses from local storage
            const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
 const expensesList = document.getElementById("expenses");
 if (expenses.length === 0) {
        expensesList.innerHTML = "<p>No expenses to show.</p>";
    } else{
   expensesList.innerHTML = "";
            // Display existing expenses
           
            expenses.forEach((expense, index) => {
                appendExpense(expense, index);
            });
}

            // Handle form submission
            document.querySelector(".expense-form").addEventListener("submit", function (e) {
                e.preventDefault();
 const item = document.getElementById("expense-item").value;
                const amount = document.getElementById("expense-amount").value;

                if (item && amount) {
                    const newExpense = { item, amount };
                    expenses.push(newExpense);
                    localStorage.setItem("expenses", JSON.stringify(expenses));
                    appendExpense(newExpense, expenses.length - 1);

                    // Clear form inputs
                    document.getElementById("expense-item").value = "";
                    document.getElementById("expense-amount").value = "";
}
               
            });

            // Handle edit and delete buttons
            expensesList.addEventListener("click", function (e) {
                if (e.target.classList.contains("edit-btn")) {
                    const index = e.target.dataset.index;
                    const expense = expenses[index];
                    const newItem = prompt("Edit expense item:", expense.item);
                    const newAmount = prompt("Edit expense amount:", expense.amount);

                    if (newItem !== null && newAmount !== null) {
                        expense.item = newItem;
                        expense.amount = newAmount;
                        localStorage.setItem("expenses", JSON.stringify(expenses));
                        updateExpenseItem(index, newItem, newAmount);
                    }
                } else if (e.target.classList.contains("delete-btn")) {
                    const index = e.target.dataset.index;
                    if (confirm("Are you sure you want to delete this expense?")) {
                        expenses.splice(index, 1);
                        localStorage.setItem("expenses", JSON.stringify(expenses));
                        removeExpenseItem(index);
                    }
                }
            });

            // Function to append an expense to the list
            function appendExpense(expense, index) {
                const expensesList = document.getElementById("expenses");
                const li = document.createElement("li");
                li.className = "list-group-item";
               li.innerHTML = `
                    <strong>${expense.item}</strong> <span>$${expense.amount}</span>
                    <button class="btn btn-sm btn-primary edit-btn" data-index="${index}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
                `;
                expensesList.appendChild(li);
            }

            // Function to update an expense item in the list
            function updateExpenseItem(index, newItem, newAmount) {
                const expensesList = document.getElementById("expenses");
                const li = expensesList.children[index];
                 li.innerHTML = `
                    <strong>${expense.item}</strong><span>$${expense.amount}</span>
                    <button class="btn btn-sm btn-primary edit-btn" data-index="${index}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
                `;
            }

            // Function to remove an expense item from the list
            function removeExpenseItem(index) {
                const expensesList = document.getElementById("expenses");
                expensesList.children[index].remove();
            }
        });