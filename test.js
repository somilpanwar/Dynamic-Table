document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    document.body.appendChild(table);

    const headers = ['Name', 'Age', 'Phone', 'Email', 'Gender', 'Actions'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    let editingRow = null;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const gender = document.querySelector('input[name="gender"]:checked');

        
        if (age < 0) {
            alert("Check the age!!");
            document.getElementById('age').focus();
            return;
        }

        
        if (phone.length < 10 || phone.length > 10) {
            alert("Wrong phone number");
            document.getElementById('phone').focus();
            return;
        }

        
        if (!gender) {
            alert('Please select a gender.');
            return;
        }

        const genderValue = gender.nextSibling.textContent.trim();

        if (editingRow) {
          
            editingRow.innerHTML = `
                <td>${name}</td>
                <td>${age}</td>
                <td>${phone}</td>
                <td>${email}</td>
                <td>${genderValue}</td>
                <td>
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash"></i></button>
                </td>
            `;
            editingRow = null;
        } else {
      
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${age}</td>
                <td>${phone}</td>
                <td>${email}</td>
                <td>${genderValue}</td>
                <td>
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(newRow);
        }

        form.reset();
    });

    tableBody.addEventListener('click', function(event) {
        if (event.target.closest('button.edit')) {
            const row = event.target.closest('tr');
            document.getElementById('name').value = row.cells[0].textContent;
            document.getElementById('age').value = row.cells[1].textContent;
            document.getElementById('phone').value = row.cells[2].textContent;
            document.getElementById('email').value = row.cells[3].textContent;

            const gender = row.cells[4].textContent.trim();
            const genderInput = document.querySelector(`input[name="gender"][value="${gender}"]`);
            if (genderInput) {
                genderInput.checked = true;
            }

            editingRow = row;
        } else if (event.target.closest('button.delete')) {
            if (confirm('Are you sure you want to delete this row?')) {
                const row = event.target.closest('tr');
                row.remove();
            }
        }
    });
});
