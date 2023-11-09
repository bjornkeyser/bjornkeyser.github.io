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
        displayProjectDetails(projectId);
      }
    });
  
    function displayProjects(category) {
      // Updated categories data to match your new data-categories
      const projectsData = {
        'design-code': [
            { title: "Breath Affects", id: 4, image_url: "Content/breath.gif", like_factor: 8, content_file: "breathaffects.html" },
            { title: "Flocka", id: 8, image_url: "Content/flockfuck1.png", like_factor: 8, content_file: "flocka.html" }, 
            { title: "CCA", id: 9, image_url: "Content/cca.png", like_factor: 8, content_file: "cca.html" }],
        'data-visualization-interaction': [
            { title: "Spatial Whispers", id: 5, image_url: "Content/sonicwhispers.png", like_factor: 5, content_file: "spatialwhispers.html" }, 
            { title: "Textual Tension", id: 6, image_url: "Content/textualtension3.png", like_factor: 8, content_file: "textualtension.html" },
            { title: "MetaWHAT!?", id: 7, image_url: "Content/metawhat1.jpeg", like_factor: 8, content_file: "metawhat.html" }
    ],
        'consciousness': [
            { title: "Screaming Plants", id: 11, image_url: "", like_factor: 7, content_file: "screamingplants.html"},
            { title: "Delayed Audio", id: 12, image_url: "", like_factor: 9, content_file: "delay.html"},
            { title: "Human Magnetoreception - draft", id: 12, image_url: "", like_factor: 9, content_file: "magnetoreception.html"},
            { title: "Physarum", id: 13, image_url: "", like_factor: 9, content_file: "physarum.html"},
    
        ],
        'ai-creativity': [
            { title: "Black-out Poetry", id: 1, image_url: "Content/arraysure1.png", like_factor: 7.5, content_file: "blackout.html"},
            { title: "Haikuki", id: 2, image_url: "Content/haikuki_thumbnail2.png", like_factor: 9, content_file: "haikuki.html" },
            { title: "Reversing Roles", id: 3, image_url: "Content/rr1.jpeg", like_factor: 7.75, content_file: "reversingroles.html" },
            { title: "Split Learning", id: 10, image_url: "Content/splitlearning.png", like_factor: 3, content_file: "splitlearning.html" }
        ]
      };
  
      
      const portfolioData = [
        { title: "Black-out Poetry", id: 1, image_url: "Content/arraysure1.png", like_factor: 7.5, content_file: "blackout.html"},
        { title: "Haikuki", id: 2, image_url: "Content/haikuki_thumbnail2.png", like_factor: 9, content_file: "haikuki.html" },
        { title: "Reversing Roles", id: 3, image_url: "Content/rr1.jpeg", like_factor: 7.75, content_file: "reversingroles.html" },
        { title: "Breath Affects", id: 4, image_url: "Content/breath.gif", like_factor: 8, content_file: "breathaffects.html" },
        { title: "Spatial Whispers", id: 5, image_url: "Content/sonicwhispers.png", like_factor: 5, content_file: "spatialwhispers.html" },
        { title: "Textual Tension", id: 6, image_url: "Content/textualtension3.png", like_factor: 8, content_file: "textualtension.html" },
        { title: "MetaWHAT!?", id: 7, image_url: "Content/metawhat1.jpeg", like_factor: 8, content_file: "metawhat.html" },
        { title: "Flocka", id: 8, image_url: "Content/flockfuck1.png", like_factor: 8, content_file: "flocka.html" },
        { title: "CCA", id: 9, image_url: "Content/cca.png", like_factor: 8, content_file: "cca.html" },
        { title: "Split Learning", id: 10, image_url: "Content/splitlearning.png", like_factor: 3, content_file: "splitlearning.html" },
        { title: "Screaming Plants", id: 11, image_url: "", like_factor: 7, content_file: "screamingplants.html"},
        { title: "Delayed Audio", id: 12, image_url: "", like_factor: 9, content_file: "delay.html"},
        { title: "Human Magnetoreception - draft", id: 12, image_url: "", like_factor: 9, content_file: "magnetoreception.html"},
        { title: "Physarum", id: 13, image_url: "", like_factor: 9, content_file: "physarum.html"},
      ];
      
  
      const projectsList = projectsData[category] || [];
      let projectsListHTML = '';
  
      for (const project of projectsList) {
        projectsListHTML += `<li data-project-id="${project.id}">${project.title}</li>`;
      }
  
      projectsColumn.querySelector('#projectsList').innerHTML = projectsListHTML;
    }
  
    function displayProjectDetails(projectId) {
      // Updated project details data to match your projects
      const projectsDetails = {
        1: 'Extensive information about Creative Coding Project...',
        2: 'Extensive information about Generative Art Piece...',
        // ... Add the rest of your projects' details here
      };
  
      const projectInfo = projectsDetails[projectId] || 'Project information not found.';
      projectDetails.innerHTML = `<p>${projectInfo}</p>`;
    }
  });
  