class Item {
  constructor(nameCompany, nrPhone, email, www) {
    this.nameCompany = nameCompany
    this.nrPhone = nrPhone
    this.email = email
    this.www = www
  }
}
export class Suppliers {
  constructor() {
    this.suppliersBtnClose = document.querySelector('.suppliers-close')
    this.suppliersBtnOpen = document.querySelector('.suppliers-btn')
    this.suppliersContainer = document.querySelector('.suppliers-container')
    this.suppliersBtnOpen.addEventListener(
      'click',
      this.openSuppliers.bind(this)
    )
    this.suppliersBtnClose.addEventListener(
      'click',
      this.closeSuppliers.bind(this)
    )
    this.nameCompany = document.getElementById('name-company')
    this.nrPhone = document.getElementById('nr-phone')
    this.email = document.getElementById('email')
    this.www = document.getElementById('www-address')
    this.alert = document.querySelector('.alert')
    this.alertTxt = document.querySelector('.alert-txt')
    this.containerList = document.querySelector('.suppliers-list-container')
    this.itemsList = []
    this.storeItems = this.storeGetItem()

    //display items from local storage
    this.displayItems()

    // Add item to list
    document
      .querySelector('#suppliers-form-to-do')
      .addEventListener('submit', (e) => {
        e.preventDefault()
        const nameCompany = this.nameCompany.value
        const nrPhone = this.nrPhone.value
        const email = this.email.value
        const www = this.www.value
        const item = new Item(nameCompany, nrPhone, email, www)

        //this.acces = retun z wunkcji checking
        for (const i in this.storeItems) {
          if (item.nrPhone === this.storeItems[i].nrPhone) {
            this.alertTxt.textContent = `Numer telefonu ${item.nrPhone} już istnieje`
            this.alert.classList.add('alert--active')
            return
          } else if (item.email === this.storeItems[i].email) {
            this.alertTxt.textContent = `Adre email ${item.email} już istnieje`
            this.alert.classList.add('alert--active')
            return
          } else {
            this.alertTxt.textContent = ' '
            this.alert.classList.remove('alert--active')
          }
        }

        this.addItemToList(item)
        this.storeAddItem(item)
      })

    //remove from list
    this.containerList.addEventListener('click', (e) =>
      this.deleteItem(e.target)
    )

    //acept alert
    document
      .querySelector('.acept-alert')
      .addEventListener('click', (e) =>
        e.target.parentElement.classList.remove('alert--active')
      )
  }
  //open containers suppliers
  openSuppliers() {
    this.suppliersContainer.classList.add('suppliers-container--active')
    this.suppliersBtnOpen.classList.add('suppliers-btn--active')
  }

  //close containers suppliers
  closeSuppliers() {
    this.suppliersContainer.classList.remove('suppliers-container--active')
    this.suppliersBtnOpen.classList.remove('suppliers-btn--active')
  }

  //display items from localStorage
  displayItems() {
    this.storeItems.forEach((item) => this.addItemToList(item))
  }

  //set key data for player item
  renderList() {
    this.itemsList.forEach((item, key) => {
      item.dataset.key = key
      this.containerList.appendChild(item)
    })
  }

  //clear inputs
  clearFields() {
    this.nameCompany.value = ''
    this.nrPhone.value = ''
    this.email.value = ''
    this.www.value = ''
  }

  //add item to list
  addItemToList(item) {
    if (item) {
      const row = document.createElement('div')
      row.className = 'suppliers-items'
      row.innerHTML = `
                        <div class="suppliers-item"><p>${item.nameCompany}</p></div>
                        <div class="suppliers-item"><p>${item.nrPhone}</p></div>
                        <div class="suppliers-item suppliers-item-link"><a href="mailto:${item.email}">${item.email}</a></div>
                        <div class="suppliers-item suppliers-item-link"><a href="${item.www}" target="_blank">${item.www}</a></div>
                        <button class="delete-item" title="Usuń"><ion-icon name="trash-outline" class="delete"></ion-icon></button>
                       `

      this.itemsList.push(row)
      this.renderList()
      this.containerList.appendChild(row)
      this.clearFields()
    }
  }

  //localStorage array
  storeGetItem() {
    let storeItems
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
      this.storeItems.push(item)
      localStorage.setItem('storeItems', JSON.stringify(this.storeItems))
    }
  }

  //remove item from list
  deleteItem(el) {
    const index = el.parentElement.dataset.key
    if (el.classList.contains('delete-item')) {
      this.renderList()
      el.parentElement.remove()
      this.itemsList.splice(index, 1)
      this.storeItems.splice(index, 1)
      localStorage.removeItem(index)
    }
    localStorage.setItem('storeItems', JSON.stringify(this.storeItems))
  }
}
