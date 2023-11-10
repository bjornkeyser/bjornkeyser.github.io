// Updated categories data to match your new data-categories
const projectsData = {
'design-code': [
    { title: "breath affects", id: 4, image_url: "Content/breath.gif", like_factor: 8, content_file: "breathaffects.html", date:"2022-03-24"},
    { title: "flocka", id: 8, image_url: "Content/flockfuck1.png", like_factor: 8, content_file: "flocka.html", date:"2021-07-01"},
    { title: "TUNER", id: 15, image_url: "Content/tuner_letgo.png", like_factor: 8, content_file: "tuner.html", date:"2022-08-08"},
    { title: "cca", id: 9, image_url: "Content/cca.png", like_factor: 8, content_file: "cca.html", date:"2022-08-10"}],
'data-visualization-interaction': [
    { title: "spatial whispers", id: 5, image_url: "Content/sonicwhispers.png", like_factor: 5, content_file: "spatialwhispers.html", date:"2022-04-26"}, 
    { title: "textual tension", id: 6, image_url: "Content/textualtension3.png", like_factor: 8, content_file: "textualtension.html", date:"2022-06-09" },
    { title: "metaWHAT!?", id: 7, image_url: "Content/metawhat1.jpeg", like_factor: 8, content_file: "metawhat.html", date:"2022-07-01"}
],
'consciousness': [
    { title: "screaming plants", id: 11, image_url: "Content/screamingplants.png", like_factor: 7, content_file: "screamingplants.html", date:"2023-02-01"},
    { title: "delay", id: 12, image_url: "Content/delay_screenshot.png", like_factor: 9, content_file: "delay.html", date:"2023-07-06"},
    { title: "human magnetoreception - draft", id: 13, image_url: "", like_factor: 9, content_file: "magnetoreception.html", date:"2024-06-04"},
    { title: "physarum", id: 14, image_url: "Content/physarum.png", like_factor: 9, content_file: "physarum.html", date:"2022-09-26"},

],
'ai-creativity': [
    { title: "blackout poetry", id: 1, image_url: "Content/arraysure1.png", like_factor: 7.5, content_file: "blackout.html", date:"2022-10-15"},
    { title: "haikuki", id: 2, image_url: "Content/haikuki_thumbnail2.png", like_factor: 9, content_file: "haikuki.html", date:"2022-11-02"},
    { title: "reversing roles", id: 3, image_url: "Content/rr1.jpeg", like_factor: 7.75, content_file: "reversingroles.html", date: "2022-12-30" },
    { title: "split learning", id: 10, image_url: "Content/splitlearning.png", like_factor: 3, content_file: "splitlearning.html", date:"2021-07-01"}
]
}; 

document.addEventListener('DOMContentLoaded', () => {
    const bioColumn = document.getElementById('aboutText');
    const projectsColumn = document.getElementById('projectsColumn');
    const projectDetails = document.getElementById('projectDetails');
  
    // Update the event listener to listen for clicks on span tags with data-category
    bioColumn.addEventListener('click', function(event) {
      if (event.target.tagName === 'SPAN' && event.target.hasAttribute('data-category')) {
        const category = event.target.getAttribute('data-category');
        displayProjects(category);
      }
    });
  
    projectsColumn.addEventListener('click', function(event) {
      if (event.target.tagName === 'LI') {
        const projectId = event.target.getAttribute('data-project-id');
        loadProjectDetails(projectId);
      }
    });
  
    function displayProjects(category) {
        // Hide all project list items first
        const allProjectListItems = document.querySelectorAll('#projectsList .data-item');
        allProjectListItems.forEach(item => item.style.display = 'none');
      
        // Filter the projects for the selected category
        const projectsList = projectsData[category] || [];
        
        // Display the projects of the selected category
        projectsList.forEach(project => {
          const projectListItem = document.querySelector(`li[data-project-id="${project.id}"]`);
          if (projectListItem) {
            projectListItem.style.display = ''; // or you can use 'block', 'flex', etc. depending on your layout
          } else {
            // If the item doesn't exist, add it to the list
            const projectListElement = document.querySelector('#projectsList');
            const listItemHTML = `<li class="data-item" data-date="${project.date}" data-project-id="${project.id}">${project.title}</li>`;
            projectListElement.insertAdjacentHTML('beforeend', listItemHTML);
          }
        });
      }
      
  
    function loadProjectDetails(projectId) {
        // Extract content_file from projectsData based on projectId
        let contentFile = '';
        for (let category in projectsData) {
          const project = projectsData[category].find(project => project.id.toString() === projectId);
          if (project) {
            contentFile = project.content_file;
            break;
          }
        }
    
        // Base path for content files
        const contentBasePath = 'subpages/';
    
        if (contentFile) {
          fetch(`${contentBasePath}${contentFile}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.text();
            })
            .then(html => {
                projectDetails.innerHTML = html;
              
                // Now that the content is loaded, check if there's a flipbook and initialize it
                if ($('.flipbook').length > 0) {
                    $('.flipbook').turn({
                        // Options for turn.js
                        autoCenter: true
                    });
                }
            })
            .catch(error => {
              projectDetails.innerHTML = `<p>Error loading project details: ${error.message}</p>`;
            });
        } else {
          projectDetails.innerHTML = `<p>Project information not found.</p>`;
        }

        // Event delegation for images inside detailsColumn
        document.getElementById('detailsColumn').addEventListener('click', function(event) {
            // Check if the clicked element is an image
            if (event.target.tagName === 'IMG') {
                console.log('Image clicked: ', event.target.src); // Debugging log
                openOverlay(event.target.src);
            }
        });
        // Find flipbooks and adjust their size after image loads
        const flipbooks = document.querySelectorAll('.flipbook');
        flipbooks.forEach(flipbook => {
            adjustFlipbookAfterImageLoad(flipbook);
        });

    }

    // Function to open the overlay with the clicked image
    function openOverlay(src) {
        document.getElementById('overlay').style.display = 'flex';
        document.getElementById('overlay-image').src = src;
    }

    // Function to close the overlay
    function closeOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }

    // Add click event listener to overlay for closing
    document.getElementById('overlay').addEventListener('click', closeOverlay);

    function displayTimeLine() {
        // timeline stuff
        const items = document.querySelectorAll('li[data-date]');
        const timeline = document.querySelector('.timeline');
        
        // Convert the date attributes to actual Date objects
        const dates = Array.from(items).map(item => new Date(item.dataset.date));
        
        // Find the max and min dates
        const maxDate = new Date(Math.max.apply(null, dates));
        const minDate = new Date(Math.min.apply(null, dates));
        
        // Calculate the total date range
        const dateRange = maxDate - minDate;
        
        items.forEach(item => {
            // Create a container for the dot and the timestamp
            const entry = document.createElement('div');
            entry.classList.add('timeline-entry');
        
            // Create a timestamp for each item
            const timestamp = document.createElement('div');
            timestamp.classList.add('timeline-timestamp');
            timestamp.textContent = item.dataset.date; // Set the text to the item's date
            timestamp.style.display = 'none'; // Initially hide the timestamp
        
            // Create a dot for each item
            const dot = document.createElement('div');
            dot.classList.add('timeline-dot');

            // Extract the project ID from the data attribute
            const projectId = item.getAttribute('data-project-id');
            
            // Set the project ID on the dot
            dot.setAttribute('data-project-id', projectId);

            // Add click event listener to the dot
            dot.addEventListener('click', function() {
                // Remove active class from all dots
                document.querySelectorAll('.timeline-dot').forEach(dot => {
                    dot.classList.remove('active');
                    dot.previousSibling.style.display = 'none'; // Assuming the next sibling is the timestamp
                });

                // Add active class to clicked dot
                this.classList.add('active');
                this.previousSibling.style.display = 'block'; // Show the timestamp

                // Load the project details
                const projectId = this.getAttribute('data-project-id');
                if (projectId) {
                    loadProjectDetails(projectId);
                }
            });

            // Get the item's date
            const itemDate = new Date(item.dataset.date);
        
            // Calculate the position of the dot based on the date
            const position = ((maxDate - itemDate) / dateRange) * 95 + 2;
            entry.style.top = `${position}%`;
        
            // Append the timestamp and the dot to the entry
            entry.appendChild(timestamp); // Timestamp first
            entry.appendChild(dot);       // Dot second
        
            // Append the entry to the timeline
            timeline.appendChild(entry);
        
            // Event listener for clicks
            item.addEventListener('click', function() {
                // Remove active class from all dots and hide all timestamps
                document.querySelectorAll('.timeline-entry').forEach(entry => {
                    entry.querySelector('.timeline-dot').classList.remove('active');
                    entry.querySelector('.timeline-timestamp').style.display = 'none';
                });
        
                // Add active class to clicked item's dot and show the timestamp
                dot.classList.add('active');
                timestamp.style.display = 'block'; // Show only the active item's timestamp
                timestamp.style.backgroundColor = 'white';
            });
        });
    }

    displayTimeLine();
      
    function showProjectImage(projectId) {
        // Find the project data by searching through each category
        let projectData;
        for (const category in projectsData) {
            projectData = projectsData[category].find(project => project.id.toString() === projectId);
            if (projectData) {
                break; // If we've found the project, exit the loop
            }
        }
    
        if (projectData && projectData.image_url) {
            const imagePreview = document.getElementById('imagePreview');
            // Clear previous content
            imagePreview.innerHTML = '';

            // Create a new img element
            const img = document.createElement('img');
            img.src = projectData.image_url;
            img.style.width = '100%'; // or any other styles to fit the image as needed
            img.style.height = 'auto';
            img.style.maxHeight = '100%';
            
            // Append the new img element
            imagePreview.appendChild(img);
            imagePreview.style.display = 'block'; // Show the image container
        }
    }

    function clearProjectImages() {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = ''; // Clear all appended images
      }
      

    // Add event listeners to project list items
    document.querySelectorAll('#projectsList li').forEach(item => {
        item.addEventListener('mouseenter', function() {
        const projectId = this.getAttribute('data-project-id');
        showProjectImage(projectId);
        });
    
        item.addEventListener('mouseleave', clearProjectImages);
        
    });
    
    // Add event listeners to timeline dots
    document.querySelectorAll('.timeline-dot').forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            const projectId = this.getAttribute('data-project-id');
            showProjectImage(projectId);

            // Show the timestamp associated with the dot
            const timestamp = this.previousSibling; // Assuming the timestamp is the next sibling
            if (timestamp) { 
                timestamp.style.display = 'block'; // Show the timestamp
            }
        });
        dot.addEventListener('mouseleave', function() {
            clearProjectImages();
        
            // Hide the timestamp
            const timestamp = this.previousSibling; // Assuming the timestamp is the next sibling
            if (timestamp) {
              timestamp.style.display = 'none'; // Hide the timestamp
            }
        });            
    });     
    function adjustFlipbookAfterImageLoad(flipbook) {
        const images = flipbook.querySelectorAll('img');
        let imagesLoaded = 0;
    
        images.forEach(img => {
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    // All images have loaded, adjust the height
                    const maxHeight = window.innerHeight * 0.7;
                    if (flipbook.scrollHeight > maxHeight) {
                        flipbook.style.height = `${maxHeight}px`;
                    } else {
                        flipbook.style.height = 'auto';
                    }
                }
            };
    
            // If the image is already loaded (cached), manually trigger onload
            if (img.complete) {
                img.onload();
            }
        });
    }  
});
  