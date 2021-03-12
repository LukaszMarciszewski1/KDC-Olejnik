
class Item {
    constructor(nameCompany, nrPhone, email, www){
        this.nameCompany = nameCompany;
        this.nrPhone = nrPhone;
        this.email = email;
        this.www = www
    }
}
export class Suppliers {
    constructor() {
        //button operation
        this.suppliersBtnClose = document.querySelector('.suppliers-close');
        this.suppliersBtnOpen = document.querySelector('.suppliers-btn');
        this.suppliersContainer = document.querySelector('.suppliers-container');
        this.suppliersBtnOpen.addEventListener('click', this.openSuppliers.bind(this));
        this.suppliersBtnClose.addEventListener('click', this.closeSuppliers.bind(this));

        this.containerList = document.querySelector('.suppliers-list-container');
        this.itemsList = [];
        this.storeItems = this.storeGetItem()

        //display items from local storage
        this.displayItems()

        // Add item to list
        document.querySelector('#suppliers-form-to-do').addEventListener('submit', this.addItemToDoList.bind(this));

        //remove from list
        this.containerList.addEventListener('click', (e) => this.deleteItem(e.target))

        //acept alert
        document.querySelector('.acept-alert').addEventListener('click', e => e.target.parentElement.classList.remove('alert--active'))

    }

    openSuppliers() {
        this.suppliersContainer.classList.add('suppliers-container--active')
        this.suppliersBtnOpen.classList.add('suppliers-btn--active')

    }

    closeSuppliers() {
        this.suppliersContainer.classList.remove('suppliers-container--active')
        this.suppliersBtnOpen.classList.remove('suppliers-btn--active')
    }

    //display items from localStorage
    displayItems() {
        this.storeItems.forEach(item => this.addItemToList(item))
    }

    
    addItemToDoList(e) {
        e.preventDefault();
        const alert = document.querySelector('.alert')
        const alertTxt = document.querySelector('.alert-txt')
        const nameCompany = document.getElementById('name-company').value.trim();
        const nrPhone = document.getElementById('nr-phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const www = document.getElementById('www-address').value.trim();
        const item = {
            nameCompany,
            nrPhone,
            email,
            www
        }
        //checking if an item already exists in a list
        for (const i in this.storeItems) {
            if (item.nrPhone === this.storeItems[i].nrPhone) {
                alertTxt.textContent = `Numer telefonu ${item.nrPhone} już istnieje`;
                alert.classList.add('alert--active')
                return;
            } else if (item.email === this.storeItems[i].email) {
                alertTxt.textContent = `Adre email ${item.email} już istnieje`;
                alert.classList.add('alert--active');
                return
            }else{
                alertTxt.textContent = " ";
                alert.classList.remove('alert--active');
            }
        }
        this.addItemToList(item)
        this.storeAddItem(item)
    }

    //set key data for player item
    renderList() {
        this.itemsList.forEach((item, key) => {
            item.dataset.key = key;
            this.containerList.appendChild(item);
        })
    }

    //clear inputs
    clearFields() {
        document.getElementById('name-company').value = '';
        document.getElementById('nr-phone').value = '';
        document.getElementById('email').value = '';
        document.getElementById('www-address').value = '';
    }

    //add item to list
    addItem(item) {
        if (item) {
            const row = document.createElement('div');
            row.className = 'suppliers-items';
            row.innerHTML = `
                        <div class="suppliers-item"><p>${item.nameCompany}</p></div>
                        <div class="suppliers-item"><p>${item.nrPhone}</p></div>
                        <div class="suppliers-item suppliers-item-link"><a href="mailto:${item.email}">${item.email}</a></div>
                        <div class="suppliers-item suppliers-item-link"><a href="${item.www}" target="_blank">${item.www}</a></div>
                        <button class="delete-item"><ion-icon name="trash-outline" class="delete"></ion-icon></button>
                       `;

            this.itemsList.push(row);
            this.renderList();
            this.containerList.appendChild(row);
            this.clearFields();
        }
    }

    //localStorage array
    storeGetItem() {
        let storeItems;
        if (localStorage.getItem('storeItems') === null) {
            storeItems = []
        } else {
            storeItems = JSON.parse(localStorage.getItem('storeItems'))
        }
        return storeItems
    }

    //add item to localStorage
    storeAddItem(item) {
        if (item) {
            this.storeItems.push(item);
            localStorage.setItem('storeItems', JSON.stringify(this.storeItems))
        }
    }

    //remove item from list
    deleteItem(el) {
        const index = el.parentElement.dataset.key;
        if (el.classList.contains('delete-item')) {
            this.renderList()
            el.parentElement.remove();
            this.itemsList.splice(index, 1);
            this.storeItems.splice(index, 1);
            localStorage.removeItem(index)
        }
        localStorage.setItem('storeItems', JSON.stringify(this.storeItems))
    }

}