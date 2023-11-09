      // Updated categories data to match your new data-categories
      const projectsData = {
        'design-code': [
            { title: "breath affects", id: 4, image_url: "Content/breath.gif", like_factor: 8, content_file: "breathaffects.html", date:"2022-03-24"},
            { title: "flocka", id: 8, image_url: "Content/flockfuck1.png", like_factor: 8, content_file: "flocka.html", date:""},
            { title: "TUNER", id: 15, image_url: "Content/tuner.png", like_factor: 8, content_file: "tuner.html", date:"2022-08-08"},
            { title: "cca", id: 9, image_url: "Content/cca.png", like_factor: 8, content_file: "cca.html", date:"2022-08-10"}],
        'data-visualization-interaction': [
            { title: "spatial whispers", id: 5, image_url: "Content/sonicwhispers.png", like_factor: 5, content_file: "spatialwhispers.html", date:"2022-04-26"}, 
            { title: "textual tension", id: 6, image_url: "Content/textualtension3.png", like_factor: 8, content_file: "textualtension.html", date:"2022-06-09" },
            { title: "metaWHAT!?", id: 7, image_url: "Content/metawhat1.jpeg", like_factor: 8, content_file: "metawhat.html", date:"2022-06-01"}
    ],
        'consciousness': [
            { title: "screaming plants", id: 11, image_url: "", like_factor: 7, content_file: "screamingplants.html", date:"2023-02-01"},
            { title: "delay", id: 12, image_url: "", like_factor: 9, content_file: "delay.html", date:"2023-07-06"},
            { title: "human magnetoreception - draft", id: 13, image_url: "", like_factor: 9, content_file: "magnetoreception.html", date:""},
            { title: "physarum", id: 14, image_url: "", like_factor: 9, content_file: "physarum.html", date:"2022-09-26"},
    
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
      const projectsList = projectsData[category] || [];
      let projectsListHTML = '';
  
      for (const project of projectsList) {
        projectsListHTML += `<li class="data-item" data-date="${project.date}" data-project-id="${project.id}">${project.title}</li>`;
      }
  
      projectsColumn.querySelector('#projectsList').innerHTML = projectsListHTML;
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
        const contentBasePath = '';
    
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
      }

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
        // Create a dot for each item
        const dot = document.createElement('div');
        dot.classList.add('timeline-dot');
    
        // Get the item's date
        const itemDate = new Date(item.dataset.date);
    
        // Calculate the position of the dot based on the date
        const position = ((maxDate - itemDate) / dateRange) * 95;
        dot.style.top = `${position}%`;
    
        // Append the dot to the timeline
        timeline.appendChild(dot);
    
        // Event listener for clicks
        item.addEventListener('click', function() {
            // Remove active class from all dots
            document.querySelectorAll('.timeline-dot').forEach(dot => dot.classList.remove('active'));
    
            // Add active class to clicked item's dot
            dot.classList.add('active');
        });
    });    

  });
  