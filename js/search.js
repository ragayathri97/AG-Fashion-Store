const searchBoxHTML = `
      <div class="search-bar-container">
        <input type="text" id="search-bar" placeholder="Search..." autocomplete="off" />
        <ul id="autocomplete-list"></ul>
      </div>
    `;

    // Inject the search box into the page
    document.getElementById('app').innerHTML = searchBoxHTML;

    // Get references to the dynamically added elements
    const searchInput = document.getElementById('search-bar');
    const autocompleteList = document.getElementById('autocomplete-list');

    // Options for the search bar
    const searchOptions = [
      { name: 'Men', link: 'men.html' },
      { name: 'Men T-shirt', link: 'tshirt.html' },
      { name: 'Men Jeans', link: 'mjean.html' },
      { name: 'Men Shirt', link: 'shirt.html' },
      { name: 'Ladies', link: 'ladies.html' },
      { name: 'Ladies Dress', link: 'w-dress.html' },
      { name: 'Ladies Bags', link: 'bags.html' },
      { name: 'Kids', link: 'kids.html' },
      { name: 'Kids Shirt', link: 'kids-shirt.html' },
      { name: 'Kids Shorts', link: 'kids-shorts.html' },
      { name: 'Toys', link: 'toys.html' },
    ];

    // Show autocomplete suggestions
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      autocompleteList.innerHTML = '';

      if (query) {
        const filteredOptions = searchOptions.filter(option =>
          option.name.toLowerCase().includes(query)
        );

        filteredOptions.forEach(option => {
          const li = document.createElement('li');
          li.textContent = option.name;
          li.setAttribute('data-link', option.link);
          autocompleteList.appendChild(li);

          // Add click event to redirect to the respective page
          li.addEventListener('click', () => {
            window.location.href = option.link;
          });
        });
      }
    });

    // Hide the autocomplete list when the user clicks outside
    document.addEventListener('click', (e) => {
      if (!autocompleteList.contains(e.target) && e.target !== searchInput) {
        autocompleteList.innerHTML = '';
      }
    });