function showConfirmationModal(event) {
    if (event.detail.path === '/suggested-locations') {
        return;
    }
    event.preventDefault()
    const action = event.detail.elt.dataset.action
    const modalWindow = `
          <dialog class="modal">
            <div id="confirmation">
              <h2>Are you sure?</h2>
              <p>Do you really want to ${action} this place?</p>
              <div id="confirmation-actions">
                <button id="action-no" className="button-text">
                  No
                </button>
                <button id="action-yes" className="button">
                  Yes
                </button>
              </div>
            </div>
          </dialog>
    `

    document.body.insertAdjacentHTML('beforeend', modalWindow)
    document.querySelector('.modal').showModal()

    const noBtn = document.getElementById('action-no')
    noBtn.addEventListener('click', () => {
        document.querySelector('.modal').remove();
    })

    const yesBtn = document.getElementById('action-yes')
    yesBtn.addEventListener('click', () => {
        event.detail.issueRequest()
        document.querySelector('.modal').remove();
    })
}

document.addEventListener('htmx:confirm', showConfirmationModal)