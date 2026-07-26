import { renderSummary, renderTransactions } from "./ui.js";
import { transactions } from "./transactions.js";
const form = document.getElementById("transaction-form");

renderTransactions();
renderSummary();

form.addEventListener("submit", event => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const transaction = {
        id: Date.now(),
        title,
        amount,
        category,
        type,
        date
    }

    transactions.push(transaction);
    renderTransactions();
    renderSummary();
    form.reset();

});