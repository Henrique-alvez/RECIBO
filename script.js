document.addEventListener('DOMContentLoaded', () => {
    // Form elements
    const form = document.getElementById('receiptForm');
    const inputs = form.querySelectorAll('input, select');
    const printBtn = document.getElementById('printBtn');

    // Print functionality
    printBtn.addEventListener('click', () => {
        window.print();
    });

    // Formatting helper functions
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const parseNumber = (val) => {
        const num = parseFloat(val);
        return isNaN(num) ? 0 : num;
    };

    // Update function
    const updateReceipt = () => {
        // Company
        document.getElementById('outCompanyName').textContent = document.getElementById('companyName').value;
        document.getElementById('outCompanyDoc').textContent = document.getElementById('companyDoc').value;
        document.getElementById('outCompanyPhone').textContent = document.getElementById('companyPhone').value;

        // Receipt Meta
        document.getElementById('outReceiptNumber').textContent = document.getElementById('receiptNumber').value;
        document.getElementById('outReceiptDate').textContent = document.getElementById('receiptDate').value;

        // Client
        document.getElementById('outClientName').textContent = document.getElementById('clientName').value;
        document.getElementById('outClientDoc').textContent = document.getElementById('clientDoc').value;
        document.getElementById('outClientContact').textContent = document.getElementById('clientContact').value;

        // Items (calculating total)
        document.getElementById('outItemDesc').textContent = document.getElementById('itemDesc').value.toUpperCase();
        
        const qty = parseNumber(document.getElementById('itemQty').value);
        const price = parseNumber(document.getElementById('itemPrice').value);
        const itemTotal = qty * price;
        
        document.getElementById('outItemQty').textContent = qty;
        document.getElementById('outItemPrice').textContent = formatCurrency(price);
        document.getElementById('outItemTotal').textContent = formatCurrency(itemTotal);

        // Payment Info
        document.getElementById('outPayMethod').textContent = document.getElementById('payMethod').value;
        
        const statusEl = document.getElementById('outPayStatus');
        const statusVal = document.getElementById('payStatus').value;
        statusEl.textContent = statusVal;
        if (statusVal === 'Pendente') {
            statusEl.classList.add('pending');
        } else {
            statusEl.classList.remove('pending');
        }

        // Summary calculations
        const subtotal = itemTotal; // Since there's only one item in this simple version
        const discount = parseNumber(document.getElementById('discount').value);
        const addition = parseNumber(document.getElementById('addition').value);
        const total = subtotal - discount + addition;

        document.getElementById('outSubtotal').textContent = formatCurrency(subtotal);
        document.getElementById('outDiscount').textContent = discount > 0 ? `- ${formatCurrency(discount)}` : `- R$ 0,00`;
        document.getElementById('outAddition').textContent = addition > 0 ? `+ ${formatCurrency(addition)}` : `+ R$ 0,00`;
        document.getElementById('outTotal').textContent = formatCurrency(total);
    };

    // Add event listeners to all inputs to update live
    inputs.forEach(input => {
        input.addEventListener('input', updateReceipt);
    });

    // Initial update to set formatted currency values
    updateReceipt();
});
