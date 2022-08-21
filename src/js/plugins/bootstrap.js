import * as bootstrap from 'bootstrap';

function initTabs() {
  const triggerTabList = document.querySelectorAll('#myTab button');

  console.log(triggerTabList);

  triggerTabList.forEach((triggerEl) => {
    const tabTrigger = new bootstrap.Tab(triggerEl);

    triggerEl.addEventListener('click', (event) => {
      event.preventDefault();
      tabTrigger.show();
    });
  });
}

// initTabs();

export default initTabs;
