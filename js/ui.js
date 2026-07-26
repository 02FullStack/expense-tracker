import { transactions } from "./transactions.js";

export function renderTransactions() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        const li = createTransactionItem(transaction);
        transactionList.append(li);
    });
}

function createTransactionItem(transaction) {

    const li = document.createElement("li");
    li.classList.add("transaction");

    const div = document.createElement("div");
    div.classList.add("transaction-info");
    li.append(div);

    const title = document.createElement("h3");
    title.textContent = transaction.title;
    div.append(title);

    const category = document.createElement("p");
    category.textContent = transaction.category;
    div.append(category);

    const date = document.createElement("small");
    date.textContent = transaction.date;
    div.append(date);

    const actions = document.createElement("div");
    actions.classList.add("transaction-actions");
    li.append(actions);

    const amount = document.createElement("span");
    amount.classList.add("amount", transaction.type);
    amount.textContent = transaction.amount;
    actions.append(amount);

    const button = document.createElement("button");
    button.classList.add("delete-btn")
    button.dataset.id = transaction.id;
    button.textContent = "🗑";
    actions.append(button);

    button.addEventListener("click", () => {
        const id = Number(button.dataset.id);

        const index = transactions.findIndex(
            transaction => transaction.id === id
        );

        if (index !== -1) {
            transactions.splice(index, 1);
            renderTransactions();
            renderSummary();
        }
    });

    return li;
}

export function renderSummary() {
    const balanceTotal = document.getElementById("balance-total");
    const incomeTotal = document.getElementById("income-total");
    const expenseTotal = document.getElementById("expense-total");

    const incomeTransactions = transactions.filter(transaction => transaction.type === "income");
    const incomeSummary = incomeTransactions.reduce((sum, item) => {
        return sum + item.amount;
    }, 0);

    const expenseTransactions = transactions.filter(transaction => transaction.type === "expense")
    const expenseSummary = expenseTransactions.reduce((sum, item) => {
        return sum + item.amount;
    }, 0);
    const balance = incomeSummary - expenseSummary;

    balanceTotal.textContent = balance;
    incomeTotal.textContent = incomeSummary;
    expenseTotal.textContent = expenseSummary;
}