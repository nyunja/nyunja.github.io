    // const menuIcon = document.querySelector('.menu-icon');
    // const mobileNav = document.querySelector('.mobile');

    // menuIcon.addEventListener('click', () => {
    //     mobileNav.classList.toggle('show');
    // });
    // function hideMobileMenu() {
    //     if (window.innerWidth > 700) {
    //         mobileNav.classList.remove('show');
    //     }
    // }

    function formatTitle(s) {
        let arr = s.split("-")
        return arr.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // Github username
    const username = "nyunja"

    // Fetch GitHub profile information
    fetch(`https://api.github.com/users/${username}/repos`)
       .then(response => response.json())
       .then(data => {
        // Sort repositories by updated_at in descending order
        const sortedRepos = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Display repositories
        const reposContainer = document.querySelector('#repos');
        sortedRepos.forEach(repo => {
            repo.name = formatTitle(repo.name)
            const repoItem = document.createElement('div');
            repoItem.classList.add('repo');
            repoItem.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;
            reposContainer.appendChild(repoItem);
        });
       })

    // Close mobile menu when clicking outside
    // window.addEventListener('click', (event) => {
    //     if (!event.target.closest('.nav-container') &&!event.target.closest('.menu-icon')) {
    //         mobileNav.classList.remove('show');
    //     }
    // });

    // // Hide mobile menu on resize
    // window.addEventListener('resize', hideMobileMenu);

    // // Initial check incase the page loads on a large screen
    // hideMobileMenu();